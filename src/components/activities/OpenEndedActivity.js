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
    <Box sx={{ width: '100%', pb: 20, position: 'relative' }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#2d2d2d',
          mb: 3
        }}
      >
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
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid',
            borderColor: isSubmitted ? '#059669' : '#e8e8e8',
            bgcolor: isSubmitted ? 'rgba(5, 150, 105, 0.04)' : '#fff',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: !isSubmitted && '#059669',
              bgcolor: !isSubmitted && 'rgba(5, 150, 105, 0.04)'
            },
            '&.Mui-focused': {
              borderColor: '#059669',
              boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)'
            }
          }
        }}
      />

      {isSubmitted && result && (
        <Paper 
          sx={{ 
            p: 2,
            mb: 2,
            borderRadius: '12px',
            border: '1px solid #e8e8e8',
            boxShadow: 'none',
            bgcolor: 'rgba(0, 0, 0, 0.02)'
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#059669',
                  mb: 1
                }}
              >
                <CheckCircleIcon fontSize="small" sx={{ color: '#059669' }} />
                Éléments corrects trouvés :
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                {result.matchedKeywords.map((keyword, index) => (
                  <Chip 
                    key={index}
                    label={keyword}
                    size="small"
                    sx={{
                      height: '24px',
                      fontSize: '0.85rem',
                      bgcolor: 'rgba(5, 150, 105, 0.08)',
                      color: '#059669',
                      border: '1px solid #059669',
                      '& .MuiChip-icon': {
                        fontSize: '16px',
                        color: '#059669'
                      }
                    }}
                    icon={<CheckCircleIcon />}
                  />
                ))}
              </Stack>
            </Box>

            {result.missingKeywords.length > 0 && (
              <Box>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#f59e0b',
                    mb: 1
                  }}
                >
                  <LightbulbIcon fontSize="small" sx={{ color: '#f59e0b' }} />
                  Éléments à ajouter :
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                  {result.missingKeywords.map((keyword, index) => (
                    <Chip 
                      key={index}
                      label={keyword}
                      size="small"
                      sx={{
                        height: '24px',
                        fontSize: '0.85rem',
                        bgcolor: 'rgba(245, 158, 11, 0.08)',
                        color: '#f59e0b',
                        border: '1px solid #f59e0b',
                        '& .MuiChip-icon': {
                          fontSize: '16px',
                          color: '#f59e0b'
                        }
                      }}
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
        sx={{
          minWidth: 120,
          width: 'auto',
          alignSelf: 'flex-start',
          bgcolor: '#059669',
          px: 3,
          py: 1,
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
          '&:hover': {
            bgcolor: '#047857'
          },
          '&.Mui-disabled': {
            bgcolor: '#e8e8e8',
            color: '#666'
          }
        }}
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