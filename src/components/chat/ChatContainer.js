import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Message from './Message';
import ChatInput from './ChatInput';
import PathPresentation from '../activities/PathPresentation';
import PathSummary from '../activities/PathSummary';
import ProgressBar from '../activities/ProgressBar';
import SkillsRadar from '../activities/SkillsRadar';
import { mockApiService as api } from '../../mocks/services/mockApiService';
import NavbarGPT from '../navigation/NavbarGPT';
import MobileExchangeBlock from './MobileExchangeBlock';
import ActivityRenderer from '../activities/ActivityRenderer';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [isPathStarted, setIsPathStarted] = useState(false);
  const [pathResults, setPathResults] = useState([]);
  const [isPathCompleted, setIsPathCompleted] = useState(false);
  const [waitingForUnderstanding, setWaitingForUnderstanding] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [isExchangeActive, setIsExchangeActive] = useState(false);
  const [activityUpdated, setActivityUpdated] = useState(false);
  const [isExchangeExpanded, setIsExchangeExpanded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentExplanation, setCurrentExplanation] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const loadInitialPath = async () => {
      try {
        const path = await api.getLearningPath('path1');
        setCurrentPath(path);
        setMessages([{
          text: `Bienvenue ! Je vous présente le parcours "${path.title}"`,
          isSara: true
        }]);
      } catch (error) {
        console.error('Erreur lors du chargement du parcours:', error);
      }
    };

    loadInitialPath();
  }, []);

  useEffect(() => {
    if (currentActivity) {
      setActivityUpdated(prev => !prev);
      const timer = setTimeout(() => {
        setActivityUpdated(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentActivity]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isSara) {
      setIsExchangeActive(true);
      const timer = setTimeout(() => {
        setIsExchangeActive(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleStartPath = () => {
    if (!currentPath) return;
    setIsPathStarted(true);
    setMessages(prev => [...prev, {
      text: "Super ! Commençons le parcours avec la première activité.",
      isSara: true
    }]);
    setCurrentActivity(currentPath.activities[0]);
    setCurrentResult(null);
    setLastAnswer(null);
  };

  const proceedToNextActivity = () => {
    if (!currentPath) return;

    const currentIndex = currentPath.activities.findIndex(a => a.id === currentActivity.id);
    const nextActivity = currentPath.activities[currentIndex + 1];

    if (nextActivity) {
      setMessages(prev => [...prev, {
        text: "Parfait ! Passons à l'activité suivante !",
        isSara: true
      }]);
      setCurrentActivity(nextActivity);
      setCurrentResult(null);
      setLastAnswer(null);
      setWaitingForUnderstanding(false);
    } else {
      setIsPathCompleted(true);
      setMessages(prev => [
        ...prev,
        {
          text: "Félicitations ! Vous avez terminé le parcours. Voici vos progrès :",
          isSara: true,
          showSkillsRadar: true
        }
      ]);
      setCurrentActivity(null);
    }
  };

  const handleUnderstand = () => {
    setWaitingForUnderstanding(false);
    proceedToNextActivity();
  };

  const handleNeedHelp = async () => {
    setWaitingForUnderstanding(false);
    setMessages(prev => [...prev, {
      text: "Je vais vous guider étape par étape pour comprendre ce concept.",
      isSara: true
    }]);

    try {
      const explanation = await api.getDetailedExplanation(currentActivity.id);
      // Stocker l'explication pour l'utiliser plus tard
      setCurrentExplanation(explanation);
      // Démarrer avec la première étape
      handleExplanationStep(0, explanation);
    } catch (error) {
      console.error('Erreur lors de la récupération des explications:', error);
      setWaitingForUnderstanding(true);
      setMessages(prev => [...prev, {
        text: "Désolé, je n'ai pas pu récupérer les explications détaillées.",
        isSara: true,
        showUnderstandingButtons: true
      }]);
    }
  };

  const handleExplanationStep = (currentStep, explanation) => {
    if (!explanation?.steps || currentStep >= explanation.steps.length) {
      // Fin des étapes
      setMessages(prev => [...prev, 
        {
          text: "🎉 Excellent ! Vous avez complété toutes les étapes !",
          isSara: true
        },
        {
          text: explanation.finalExplanation || "",
          isSara: true
        },
        {
          text: explanation.visualAid || "",
          isSara: true
        },
        {
          text: "Est-ce que cette explication vous aide à mieux comprendre ?",
          isSara: true,
          showUnderstandingButtons: true
        }
      ]);
      setWaitingForUnderstanding(true);
      return;
    }

    const step = explanation.steps[currentStep];
    const stepMessages = [
      {
        text: `📝 Étape ${step.step || currentStep + 1}`,
        isSara: true
      },
      {
        text: step.instruction,
        isSara: true
      },
      {
        text: `💡 Conseil : ${step.hint}`,
        isSara: true
      },
      {
        text: step.question.text,
        isSara: true,
        options: step.question.options,
        isExplanationStep: true,
        currentStep,
        explanation // Passer l'explication complète
      }
    ];

    setMessages(prev => [...prev, ...stepMessages]);
  };

  const handleAnswer = (answer, message) => {
    if (message.isExplanationStep) {
      const step = message.explanation.steps[message.currentStep];
      const isCorrect = step.question.options.find(opt => opt.text === answer)?.is_correct;
      
      setMessages(prev => [...prev, 
        {
          text: answer,
          isSara: false
        },
        {
          text: isCorrect 
            ? "✅ Correct ! Passons à l'étape suivante." 
            : "❌ Ce n'est pas tout à fait ça. Essayez de nouveau.",
          isSara: true
        }
      ]);

      if (isCorrect) {
        handleExplanationStep(message.currentStep + 1, message.explanation);
      }
    } else {
      handleQuestionAnswer(answer);
    }
  };

  const updateSkills = (skillsImpact) => {
    // Version simple de mise à jour des compétences
    console.log('Mise à jour des compétences:', skillsImpact);
    // Vous pourrez implémenter la logique complète plus tard
  };

  const handleActivityCompletion = (result) => {
    console.log("Activity completion result:", result);
    setCurrentResult(result);
    
    if ((result.type === 'revision_sheet' || result.type === 'revision_sheet_video') && result.questions) {
      console.log("Processing revision sheet questions:", result.questions);
      
      // Stocker les questions pour les poser plus tard
      setQuestions(result.questions);
      setQuestionIndex(0);
      setCurrentQuestion(result.questions[0]);

      // Ajouter le message initial et la première question immédiatement
      const newMessages = [
        {
          text: "Maintenant, vérifions votre compréhension avec quelques questions.",
          isSara: true
        },
        {
          text: result.questions[0].question,
          isSara: true,
          options: result.questions[0].options
        }
      ];

      console.log("Adding new messages:", newMessages);
      setMessages(prev => [...prev, ...newMessages]);
      
    } else {
      // Traitement normal pour les autres types d'activités
      const orderedMessages = [];

      if (result.messages && result.messages.length > 0) {
        orderedMessages.push({
          ...result.messages[0],
          activityId: currentActivity.id
        });
      }

      // 2. Messages d'explication
      const explanations = result.messages?.filter(m => m.type === 'explanation') || [];
      orderedMessages.push(...explanations);

      // 3. Messages de correction
      const corrections = result.messages?.filter(m => m.type === 'correction') || [];
      orderedMessages.push(...corrections);

      // 4. Autres messages
      const otherMessages = result.messages?.filter(m => 
        !m.type && m !== result.messages[0]
      ) || [];
      orderedMessages.push(...otherMessages);

      // 5. Ajouter le message de compréhension uniquement si la réponse est incorrecte
      const understandingMessage = {
        text: "Avez-vous compris pourquoi ce n'était pas la bonne réponse ?",
        isSara: true,
        showUnderstandingButtons: true
      };
      orderedMessages.push(understandingMessage);
      setWaitingForUnderstanding(true);

      setMessages(prev => [...prev, ...orderedMessages]);
    }

    // Si la réponse est correcte, mettre à jour les compétences
    if (result.isCorrect && currentActivity?.skillsImpact) {
      updateSkills(currentActivity.skillsImpact);
    }

      // Mettre à jour les résultats du parcours pour toutes les activités
    if (result.isCorrect !== undefined) {
      setPathResults(prev => [
        ...prev,
        {
          activityId: currentActivity.id,
          isCorrect: result.isCorrect,
          answer: result.answer,
          skillsImpact: currentActivity.skillsImpact
        }
      ]);
    }
  };

  const handleQuestionAnswer = (answer) => {
    const question = questions[questionIndex];
    const isCorrect = question.options.find(opt => opt.text === answer)?.is_correct;

    // Ajouter la réponse aux messages
    setMessages(prev => [
      ...prev,
      { text: answer, isSara: false },
      {
        text: isCorrect ? 
          "Correct ! " + question.explanation.steps[0].detail :
          "Incorrect. " + question.explanation.steps[0].detail,
        isSara: true
      }
    ]);

    // Passer à la question suivante ou terminer
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
      
      // Ajouter la question suivante aux messages
      setMessages(prev => [...prev, {
        text: questions[questionIndex + 1].question,
        isSara: true,
        options: questions[questionIndex + 1].options
      }]);
    } else {
        // Mettre à jour les résultats du parcours
        setPathResults(prev => [
          ...prev,
          {
            activityId: currentActivity.id,
            isCorrect: isCorrect,
            answer: answer,
            skillsImpact: currentActivity.skillsImpact
          }
        ]);

      setMessages(prev => [...prev, {
        text: "Bravo ! Vous avez terminé toutes les questions de révision !",
        isSara: true,
        showUnderstandingButtons: true
      }]);
      setWaitingForUnderstanding(true);
      setQuestions([]);
      setCurrentQuestion(null);
    }
  };

  const handleActivitySummaryClick = (activity, result) => {
    if (!activity || !result) return;

    const activityType = {
      'multiple_choice': 'QCM',
      'true_false': 'Vrai/Faux',
      'fill_in_the_blank': 'Texte à compléter',
      'revision_sheet_video': 'Vidéo de révision',
      'revision_sheet': 'Fiches de révision',
      'open_ended': 'Question ouverte'
    }[activity.type] || 'Activité';

    const message = {
      text: `${activityType} : "${activity.question}"\n` +
            `${result.answer ? `Votre réponse : ${result.answer}\n` : ''}` +
            `${result.isCorrect ? '✅ Correct !' : '❌ Incorrect'}`,
      isSara: true
    };

    setMessages(prev => [...prev, message]);
  };

  const handleSend = (text) => {
    setMessages(prev => [...prev, { text, isSara: false }]);
    
    // Simuler une réponse de SARA
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Je traite votre message...",
        isSara: true
      }]);
    }, 1000);
  };

  const handlePathSelect = async (pathId) => {
    try {
      const path = await api.getLearningPath(pathId);
      setCurrentPath(path);
      setMessages([{
        text: `Bienvenue ! Je vous présente le parcours "${path.title}"`,
        isSara: true
      }]);
      // Réinitialiser les autres états si nécessaire
      setIsPathStarted(false);
      setPathResults([]);
      setIsPathCompleted(false);
      setCurrentActivity(null);
    } catch (error) {
      console.error('Erreur lors du chargement du parcours:', error);
    }
  };

  const handleExchangeStateChange = (expanded) => {
    setIsExchangeExpanded(expanded);
  };

  const renderMessage = (msg, index) => {
    console.log("Rendering message:", msg);
    
    if (msg.showUnderstandingButtons && waitingForUnderstanding) {
      return (
        <Box key={index}>
          <Message {...msg} />
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            mt: 2 
          }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={handleUnderstand}
            >
              Oui
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<HelpOutlineIcon />}
              onClick={handleNeedHelp}
            >
              Non, j'ai besoin d'aide
            </Button>
          </Box>
        </Box>
      );
    }

    if (msg.showSkillsRadar && currentPath) {
      return (
        <Box key={index}>
          <Message {...msg} />
          <SkillsRadar 
            path={currentPath}
            results={pathResults}
          />
        </Box>
      );
    }

    if (msg.options) {
      console.log("Rendering message with options");
      return (
        <Box key={index}>
          <Message {...msg} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            {msg.options.map((option, i) => (
              <Button
                key={i}
                variant="outlined"
                onClick={() => handleAnswer(option.text, msg)}
              >
                {option.text}
              </Button>
            ))}
          </Box>
        </Box>
      );
    }

    return <Message key={index} {...msg} />;
  };

  const renderActivityWithFeedback = () => {
    if (!currentActivity) return null;

    return (
      <Box sx={{ 
        width: '100%',
        maxWidth: '600px',
        mx: 'auto',
        p: 2
      }}>
        <ActivityRenderer
          activity={currentActivity}
          onComplete={handleActivityCompletion}
        />
      </Box>
    );
  };

  const renderDesktopLayout = () => (
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      bgcolor: 'background.default',
      pt: '4px'
    }}>
      {/* Barre de progression */}
      {currentPath && isPathStarted && (
        <ProgressBar 
          results={pathResults}
          totalActivities={currentPath.activities.length}
        />
      )}

      {/* Zone d'activité */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider'
      }}>
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: currentPath && !isPathStarted ? 'center' : 'flex-start'
        }}>
          {currentPath && !isPathStarted ? (
            <PathPresentation 
              path={currentPath} 
              onStart={handleStartPath}
            />
          ) : isPathCompleted ? (
            <PathSummary
              path={currentPath}
              results={pathResults}
              onActivityClick={handleActivitySummaryClick}
            />
          ) : (
            <>
              {currentActivity && (
                renderActivityWithFeedback()
              )}
              {!currentActivity && 
                messages.filter(m => !m.isSara).map((msg, i) => (
                  <Message key={i} {...msg} />
                ))
              }
            </>
          )}
        </Box>
        {isPathStarted && !isPathCompleted && !waitingForUnderstanding && 
          <ChatInput onSend={handleSend} />
        }
      </Box>

      {/* Zone d'échange */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.filter(m => m.isSara).map((msg, i) => renderMessage(msg, i))}
        </Box>
      </Box>
    </Box>
  );

  const renderMobileLayout = () => (
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      pt: '4px',
      pb: isExchangeExpanded ? '85%' : '15%',
      mt: '4px'
    }}>
      {/* Zone d'activité */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        p: 2,
        transition: 'padding-bottom 0.3s ease'
      }}>
        {currentPath && !isPathStarted ? (
          <PathPresentation 
            path={currentPath} 
            onStart={handleStartPath}
          />
        ) : isPathCompleted ? (
          <PathSummary
            path={currentPath}
            results={pathResults}
            onActivityClick={handleActivitySummaryClick}
          />
        ) : (
          <>
            {currentActivity && (
              renderActivityWithFeedback()
            )}
            {!currentActivity && 
              messages.filter(m => !m.isSara).map((msg, i) => (
                <Message key={i} {...msg} />
              ))
            }
          </>
        )}
      </Box>

      {/* Bloc d'échange mobile */}
      <MobileExchangeBlock 
        isActive={isExchangeActive}
        activityUpdated={activityUpdated}
        onStateChange={handleExchangeStateChange}
      >
        {messages.filter(m => m.isSara).map((msg, i) => renderMessage(msg, i))}
      </MobileExchangeBlock>
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarGPT onPathSelect={handlePathSelect} />
      {currentPath && isPathStarted && (
        <ProgressBar 
          results={pathResults}
          totalActivities={currentPath.activities.length}
        />
      )}
      {isMobile ? renderMobileLayout() : renderDesktopLayout()}
    </Box>
  );
};

export default ChatContainer; 