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
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
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
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>{option.text}</Typography>
                  {isSubmitted && (
                    option.is_correct ? (
                      <CheckCircleIcon sx={{ color: 'success.main' }} />
                    ) : (
                      option.text === selectedAnswer && (
                        <CancelIcon sx={{ color: 'error.main' }} />
                      )
                    )
                  )}
                </Box>
              }
              disabled={isSubmitted}
              sx={{
                p: 1,
                borderRadius: 1,
                ...(isSubmitted && {
                  bgcolor: option.is_correct ? 'success.light' : 
                          (option.text === selectedAnswer ? 'error.light' : 'transparent'),
                  color: option.is_correct ? 'success.main' : 
                         (option.text === selectedAnswer ? 'error.main' : 'text.primary')
                })
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitted}
        sx={{ mt: 2 }}
      >
        Valider
      </Button>
    </Box>
  );
};

export default MultipleChoiceActivity; 