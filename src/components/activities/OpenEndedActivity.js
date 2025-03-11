import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import VirtualKeyboard from '../VirtualKeyboard';

const OpenEndedActivity = ({ content, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const checkAnswer = (userAnswer) => {
    const keywords = content.answer.toLowerCase().split(' ');
    const userWords = userAnswer.toLowerCase().split(' ');
    const matchedKeywords = keywords.filter(keyword => 
      userWords.some(word => word.includes(keyword))
    );
    
    const score = matchedKeywords.length / keywords.length;
    return {
      isCorrect: score >= 0.6,
      score,
      matchedKeywords,
      missingKeywords: keywords.filter(keyword => 
        !userWords.some(word => word.includes(keyword))
      )
    };
  };

  const handleKeyPress = (button) => {
    if (isSubmitted) return;
    
    if (button === '{bksp}') {
      setAnswer(prev => prev.slice(0, -1));
    } else {
      setAnswer(prev => prev + button);
    }
    
    inputRef.current?.focus();
    setIsInputFocused(true);
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;

    const answerResult = checkAnswer(answer);
    setResult(answerResult);

    const messages = [
      {
        text: answerResult.isCorrect ? 
          "Très bonne réponse ! Vous avez bien saisi les concepts clés." : 
          "Votre réponse contient quelques éléments corrects mais peut être améliorée.",
        isSara: true
      }
    ];

    if (content.explanation) {
      content.explanation.steps.forEach(step => {
        messages.push({
          text: step.detail,
          isSara: true,
          type: 'explanation'
        });
      });
    }

    const finalResult = {
      type: 'open_ended',
      answer,
      ...answerResult,
      messages
    };

    setIsSubmitted(true);
    setIsKeyboardOpen(false); // Fermer le clavier à la validation
    onComplete?.(finalResult);
  };

  const toggleKeyboard = () => {
    setIsKeyboardOpen(!isKeyboardOpen);
  };

  return (
    <Box sx={{ p: 3, pb: 20, position: 'relative' }}>
      <Typography variant="h6" gutterBottom>
        {content.question}
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={answer}
        onChange={(e) => !isSubmitted && setAnswer(e.target.value)}
        disabled={isSubmitted}
        placeholder="Écrivez votre réponse ici..."
        inputRef={inputRef}
        onFocus={() => setIsInputFocused(true)}
        sx={{ 
          mt: 2,
          mb: 3,
          bgcolor: isSubmitted ? 'background.paper' : 'transparent'
        }}
      />

      {isSubmitted && result && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="success" />
                Éléments corrects trouvés :
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {result.matchedKeywords.map((keyword, index) => (
                  <Chip 
                    key={index}
                    label={keyword}
                    color="success"
                    size="small"
                    icon={<CheckCircleIcon />}
                  />
                ))}
              </Stack>
            </Box>

            {result.missingKeywords.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightbulbIcon color="warning" />
                  Éléments à ajouter :
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {result.missingKeywords.map((keyword, index) => (
                    <Chip 
                      key={index}
                      label={keyword}
                      color="warning"
                      size="small"
                      icon={<AutoFixHighIcon />}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      )}

      <Button 
        variant="contained"
        onClick={handleSubmit}
        disabled={!answer.trim() || isSubmitted}
        tabIndex={-1}
      >
        Valider
      </Button>

      <VirtualKeyboard 
        onKeyPress={handleKeyPress}
        activeInput={isInputFocused}
        isOpen={isKeyboardOpen}
        onToggle={toggleKeyboard}
      />
    </Box>
  );
};

export default OpenEndedActivity; 