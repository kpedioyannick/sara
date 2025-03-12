import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Stack 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VirtualKeyboard from '../VirtualKeyboard';

const FillInTheBlankActivity = ({ content, onComplete }) => {
  const [userAnswers, setUserAnswers] = useState(Array(content.answers.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRefs = useRef([]);

  const handleAnswerChange = (index, value) => {
    if (isSubmitted) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleKeyPress = (button) => {
    if (activeInputIndex === null || isSubmitted) return;
    
    const currentAnswer = userAnswers[activeInputIndex] || '';
    
    if (button === '{bksp}') {
      handleAnswerChange(activeInputIndex, currentAnswer.slice(0, -1));
    } else {
      handleAnswerChange(activeInputIndex, currentAnswer + button);
    }
    
    inputRefs.current[activeInputIndex]?.focus();
  };

  const toggleKeyboard = () => {
    setIsKeyboardOpen(!isKeyboardOpen);
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
    setIsKeyboardOpen(false);
    onComplete?.(result);
  };

  const renderInput = (index) => {
    const isCorrect = isSubmitted && 
      userAnswers[index].toLowerCase().trim() === content.answers[index].toLowerCase().trim();
    
    return (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <TextField
          inputRef={el => inputRefs.current[index] = el}
          size="small"
          value={userAnswers[index] || ''}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
          disabled={isSubmitted}
          error={isSubmitted && !isCorrect}
          sx={{ 
            width: '150px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              border: '2px solid',
              borderColor: isSubmitted ? (
                isCorrect ? '#059669' : '#ef4444'
              ) : '#e8e8e8',
              bgcolor: isSubmitted ? (
                isCorrect ? 'rgba(5, 150, 105, 0.08)' : 'rgba(239, 68, 68, 0.08)'
              ) : '#fff',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: !isSubmitted && '#059669',
                bgcolor: !isSubmitted && 'rgba(5, 150, 105, 0.04)'
              },
              '&.Mui-focused': {
                borderColor: '#059669',
                boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)'
              },
              '& input': {
                color: isSubmitted ? (
                  isCorrect ? '#059669' : '#ef4444'
                ) : '#2d2d2d',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '8px 12px'
              }
            }
          }}
          onFocus={() => setActiveInputIndex(index)}
        />
        {isSubmitted && (
          isCorrect ? 
            <CheckCircleIcon sx={{ color: '#059669' }} /> : 
            <>
              <CancelIcon sx={{ color: '#ef4444' }} />
              <Typography sx={{ 
                color: '#059669',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                ({content.answers[index]})
              </Typography>
            </>
        )}
      </Stack>
    );
  };

  return (
    <Box sx={{ 
      width: '100%',
      pb: 20, 
      position: 'relative',
      animation: 'fadeIn 0.3s ease-out',
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
      }
    }}>
      <Stack spacing={3}>
        {content.text.map((textPart, index) => (
          <Box 
            key={index}
            sx={{
              p: 2,
              borderRadius: '12px',
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid #e8e8e8'
            }}
          >
            <Typography 
              variant="body1" 
              gutterBottom
              sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#2d2d2d',
                fontWeight: 500
              }}
            >
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
          tabIndex={-1}
          sx={{
            mt: 2,
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
      </Stack>
      
      <VirtualKeyboard 
        onKeyPress={handleKeyPress}
        activeInput={activeInputIndex}
        isOpen={isKeyboardOpen}
        onToggle={toggleKeyboard}
      />
    </Box>
  );
};

export default FillInTheBlankActivity; 