import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Stack 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const FillInTheBlankActivity = ({ content, onComplete }) => {
  const [userAnswers, setUserAnswers] = useState(Array(content.answers.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (index, value) => {
    if (isSubmitted) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.some(answer => !answer)) return;

    const results = userAnswers.map((answer, index) => ({
      userAnswer: answer.toLowerCase().trim(),
      correctAnswer: content.answers[index].toLowerCase().trim(),
      isCorrect: answer.toLowerCase().trim() === content.answers[index].toLowerCase().trim()
    }));

    const isAllCorrect = results.every(result => result.isCorrect);

    const messages = [
      {
        text: isAllCorrect ? 
          "Bravo ! Toutes vos réponses sont correctes !" : 
          "Certaines réponses ne sont pas correctes.",
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

    const result = {
      type: 'fill_in_the_blank',
      answers: userAnswers,
      isCorrect: isAllCorrect,
      messages
    };

    setIsSubmitted(true);
    onComplete?.(result);
  };

  const renderInput = (index) => {
    const isCorrect = isSubmitted && 
      userAnswers[index].toLowerCase().trim() === content.answers[index].toLowerCase().trim();
    
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          value={userAnswers[index]}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
          disabled={isSubmitted}
          error={isSubmitted && !isCorrect}
          sx={{ 
            width: '150px',
            '& .MuiOutlinedInput-root': {
              bgcolor: isSubmitted ? (
                isCorrect ? 'success.light' : 'error.light'
              ) : 'background.paper'
            }
          }}
        />
        {isSubmitted && (
          isCorrect ? 
            <CheckCircleIcon color="success" /> : 
            <>
              <CancelIcon color="error" />
              <Typography color="success.main">
                ({content.answers[index]})
              </Typography>
            </>
        )}
      </Stack>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        {content.text.map((textPart, index) => (
          <Box key={index}>
            <Typography variant="body1" gutterBottom>
              {textPart.split('_____')[0]}
              {renderInput(index)}
              {textPart.split('_____')[1]}
            </Typography>
          </Box>
        ))}

        <Button 
          variant="contained"
          onClick={handleSubmit}
          disabled={userAnswers.some(answer => !answer) || isSubmitted}
        >
          Valider
        </Button>
      </Stack>
    </Box>
  );
};

export default FillInTheBlankActivity; 