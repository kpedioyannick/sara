import React, { useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const MultipleChoiceActivity = ({ content, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const selectedOption = content.options.find(opt => opt.text === selectedAnswer);
    const isCorrect = selectedOption?.is_correct || false;
    
    // Préparer les messages pour le bloc d'échange
    const messages = [
      {
        text: isCorrect ? "Bravo ! C'est la bonne réponse !" : "Ce n'est pas la bonne réponse.",
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
      const correctAnswer = content.options.find(opt => opt.is_correct);
      messages.push({
        text: `La bonne réponse était : ${correctAnswer.text}`,
        isSara: true,
        type: 'correction'
      });
    }

    const result = {
      type: 'multiple_choice',
      answer: selectedAnswer,
      isCorrect,
      messages // Inclure les messages dans le résultat
    };
    
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

      <FormControl component="fieldset" sx={{ width: '100%', my: 2 }}>
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
        >
          {content.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.text}
              control={
                <Radio 
                  sx={{
                    color: '#e8e8e8',
                    '&.Mui-checked': {
                      color: '#059669',
                    }
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    {option.text}
                  </Typography>
                  {isSubmitted && (
                    option.is_correct ? (
                      <CheckCircleIcon sx={{ color: '#059669' }} />
                    ) : (
                      option.text === selectedAnswer && (
                        <CancelIcon sx={{ color: '#ef4444' }} />
                      )
                    )
                  )}
                </Box>
              }
              disabled={isSubmitted}
              sx={{
                width: '100%',
                m: 0,
                mb: 1.5,
                p: 1.5,
                borderRadius: '12px',
                border: '2px solid',
                borderColor: isSubmitted ? 
                  (option.is_correct ? '#059669' : 
                   option.text === selectedAnswer ? '#ef4444' : '#e8e8e8') 
                  : '#e8e8e8',
                bgcolor: isSubmitted ?
                  (option.is_correct ? 'rgba(5, 150, 105, 0.04)' :
                   option.text === selectedAnswer ? 'rgba(239, 68, 68, 0.04)' : '#fff')
                  : '#fff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: !isSubmitted && 'rgba(5, 150, 105, 0.04)',
                  borderColor: !isSubmitted && '#059669'
                }
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitted}
        sx={{
          mt: 3,
          bgcolor: '#059669',
          px: 4,
          py: 1.5,
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
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
    </Box>
  );
};

export default MultipleChoiceActivity; 