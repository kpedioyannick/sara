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
      text: "Je vais vous donner plus de détails pour vous aider à comprendre...",
      isSara: true
    }]);

    try {
      const explanation = await api.getDetailedExplanation(currentActivity.id);
      
      // Ajouter les explications détaillées dans plusieurs messages
      setMessages(prev => [
        ...prev,
        {
          text: `📚 Concept : ${explanation.concept}`,
          isSara: true
        },
        {
          text: explanation.detailedExplanation,
          isSara: true
        },
        {
          text: "Voici quelques exemples :",
          isSara: true
        },
        {
          text: explanation.examples.join('\n'),
          isSara: true
        },
        {
          text: explanation.visualAid,
          isSara: true
        },
        {
          text: "Est-ce que cette explication vous aide à mieux comprendre ?",
          isSara: true,
          showUnderstandingButtons: true
        }
      ]);
      
      setWaitingForUnderstanding(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des explications:', error);
      setMessages(prev => [...prev, {
        text: "Désolé, je n'ai pas pu récupérer les explications détaillées.",
        isSara: true
      }]);
    }
  };

  const updateSkills = (skillsImpact) => {
    // Version simple de mise à jour des compétences
    console.log('Mise à jour des compétences:', skillsImpact);
    // Vous pourrez implémenter la logique complète plus tard
  };

  const handleActivityCompletion = (result) => {
    setCurrentResult(result);
    setLastAnswer(result.answer);

    // Mettre à jour les résultats du parcours avec l'ID de l'activité
    setPathResults(prev => [
      ...prev,
      {
        activityId: currentActivity.id,
        isCorrect: result.isCorrect,
        answer: result.answer,
        skillsImpact: currentActivity.skillsImpact
      }
    ]);

    // Organiser les messages dans le bon ordre
    const orderedMessages = [];

    // 1. Message de résultat (correct/incorrect)
    if (result.messages && result.messages.length > 0) {
      orderedMessages.push({
        ...result.messages[0],
        activityId: currentActivity.id  // Ajouter l'ID de l'activité au message
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
    if (!result.isCorrect) {
      const understandingMessage = {
        text: "Avez-vous compris pourquoi ce n'était pas la bonne réponse ?",
        isSara: true,
        showUnderstandingButtons: true
      };
      orderedMessages.push(understandingMessage);
      setWaitingForUnderstanding(true);
    }

    // Mettre à jour les messages
    setMessages(prev => [...prev, ...orderedMessages]);

    // Si la réponse est correcte, mettre à jour les compétences et passer à la suite
    if (result.isCorrect && currentActivity?.skillsImpact) {
      updateSkills(currentActivity.skillsImpact);
      proceedToNextActivity();
    }
  };

  const handleActivitySummaryClick = (activity, result) => {
    if (!activity || !result) return;

    const activityType = {
      'multiple_choice': 'QCM',
      'true_false': 'Vrai/Faux',
      'fill_in_the_blank': 'À compléter',
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