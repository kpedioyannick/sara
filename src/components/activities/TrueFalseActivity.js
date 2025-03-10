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
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
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
            bgcolor: isSubmitted ? (
              content.correct_answer === true ? 'success.main' :
              selectedAnswer === true ? 'error.main' :
              'primary.main'
            ) : 'primary.main',
            '&:hover': {
              bgcolor: isSubmitted ? (
                content.correct_answer === true ? 'success.dark' :
                selectedAnswer === true ? 'error.dark' :
                'primary.dark'
              ) : 'primary.dark'
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
            bgcolor: isSubmitted ? (
              content.correct_answer === false ? 'success.main' :
              selectedAnswer === false ? 'error.main' :
              'primary.main'
            ) : 'primary.main',
            '&:hover': {
              bgcolor: isSubmitted ? (
                content.correct_answer === false ? 'success.dark' :
                selectedAnswer === false ? 'error.dark' :
                'primary.dark'
              ) : 'primary.dark'
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