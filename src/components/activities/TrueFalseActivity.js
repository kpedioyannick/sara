import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Stack 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const TrueFalseActivity = ({ content, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (isTrue) => {
    if (isSubmitted) return;
    
    const isCorrect = isTrue === content.correct_answer;
    
    // Préparer les messages pour le bloc d'échange
    const messages = [
      {
        text: isCorrect ? 
          "Excellent ! C'est la bonne réponse !" : 
          "Ce n'est pas la bonne réponse.",
        isSara: true
      }
    ];

    // Ajouter l'explication
    if (content.explanation) {
      content.explanation.steps.forEach(step => {
        messages.push({
          text: step.detail,
          isSara: true,
          type: 'explanation'
        });
      });
    }

    // Ajouter la correction si réponse incorrecte
    if (!isCorrect) {
      messages.push({
        text: `La bonne réponse était : ${content.correct_answer ? 'Vrai' : 'Faux'}`,
        isSara: true,
        type: 'correction'
      });
    }

    const result = {
      type: 'true_false',
      answer: isTrue,
      isCorrect,
      messages
    };

    setSelectedAnswer(isTrue);
    setIsSubmitted(true);
    onComplete?.(result);
  };

  return (
    <Box sx={{ width: '100%' }}>
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

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mt: 3, justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          onClick={() => handleAnswer(true)}
          disabled={isSubmitted}
          startIcon={<ThumbUpIcon />}
          endIcon={isSubmitted && (
            content.correct_answer === true ? 
              <CheckCircleIcon /> : 
              selectedAnswer === true ? 
                <CancelIcon /> : 
                null
          )}
          sx={{
            minWidth: 120,
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            border: '2px solid',
            borderColor: isSubmitted ? (
              content.correct_answer === true ? '#059669' :
              selectedAnswer === true ? '#ef4444' :
              'transparent'
            ) : 'transparent',
            bgcolor: isSubmitted ? (
              content.correct_answer === true ? 'rgba(5, 150, 105, 0.08)' :
              selectedAnswer === true ? 'rgba(239, 68, 68, 0.08)' :
              'rgba(0, 0, 0, 0.04)'
            ) : '#059669',
            color: isSubmitted ? (
              content.correct_answer === true ? '#059669' :
              selectedAnswer === true ? '#ef4444' :
              '#666'
            ) : '#fff',
            boxShadow: !isSubmitted && '0 4px 12px rgba(5, 150, 105, 0.25)',
            opacity: isSubmitted && !content.correct_answer && selectedAnswer !== true ? 0.6 : 1,
            '&:hover': {
              bgcolor: !isSubmitted && '#047857'
            },
            '&.Mui-disabled': {
              bgcolor: isSubmitted ? (
                content.correct_answer === true ? 'rgba(5, 150, 105, 0.08)' :
                selectedAnswer === true ? 'rgba(239, 68, 68, 0.08)' :
                'rgba(0, 0, 0, 0.04)'
              ) : '#e8e8e8',
              color: isSubmitted ? (
                content.correct_answer === true ? '#059669' :
                selectedAnswer === true ? '#ef4444' :
                '#666'
              ) : '#666',
              borderColor: isSubmitted ? (
                content.correct_answer === true ? '#059669' :
                selectedAnswer === true ? '#ef4444' :
                'transparent'
              ) : 'transparent'
            }
          }}
        >
          Vrai
        </Button>
        
        <Button
          variant="contained"
          onClick={() => handleAnswer(false)}
          disabled={isSubmitted}
          startIcon={<ThumbDownIcon />}
          endIcon={isSubmitted && (
            content.correct_answer === false ? 
              <CheckCircleIcon /> : 
              selectedAnswer === false ? 
                <CancelIcon /> : 
                null
          )}
          sx={{
            minWidth: 120,
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            border: '2px solid',
            borderColor: isSubmitted ? (
              content.correct_answer === false ? '#059669' :
              selectedAnswer === false ? '#ef4444' :
              'transparent'
            ) : 'transparent',
            bgcolor: isSubmitted ? (
              content.correct_answer === false ? 'rgba(5, 150, 105, 0.08)' :
              selectedAnswer === false ? 'rgba(239, 68, 68, 0.08)' :
              'rgba(0, 0, 0, 0.04)'
            ) : '#059669',
            color: isSubmitted ? (
              content.correct_answer === false ? '#059669' :
              selectedAnswer === false ? '#ef4444' :
              '#666'
            ) : '#fff',
            boxShadow: !isSubmitted && '0 4px 12px rgba(5, 150, 105, 0.25)',
            opacity: isSubmitted && !content.correct_answer && selectedAnswer !== false ? 0.6 : 1,
            '&:hover': {
              bgcolor: !isSubmitted && '#047857'
            },
            '&.Mui-disabled': {
              bgcolor: isSubmitted ? (
                content.correct_answer === false ? 'rgba(5, 150, 105, 0.08)' :
                selectedAnswer === false ? 'rgba(239, 68, 68, 0.08)' :
                'rgba(0, 0, 0, 0.04)'
              ) : '#e8e8e8',
              color: isSubmitted ? (
                content.correct_answer === false ? '#059669' :
                selectedAnswer === false ? '#ef4444' :
                '#666'
              ) : '#666',
              borderColor: isSubmitted ? (
                content.correct_answer === false ? '#059669' :
                selectedAnswer === false ? '#ef4444' :
                'transparent'
              ) : 'transparent'
            }
          }}
        >
          Faux
        </Button>
      </Stack>
    </Box>
  );
};

export default TrueFalseActivity; 