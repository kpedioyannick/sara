import React from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Button
} from '@mui/material';

const RevisionSheet = ({ content, onComplete }) => {
  const handleComplete = () => {
    console.log("handleComplete");
    // Extraire les questions de la section de type "question"
    const questionSection = content.find(item => item.type === "question");
    const questions = questionSection?.questions || [];
    
    onComplete?.({
      type: 'revision_sheet',
      isComplete: true,
      questions: questions,
      messages: [{
        text: "Maintenant, vérifions votre compréhension avec quelques questions.",
        isSara: true,
        startQuestions: true, // Flag pour démarrer les questions
        questions: questions
      }]
    });
  };

  const renderSection = (item, index) => {
    if (item.type === "question") return null;

    switch (item.type) {
      case 'section':
        return (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#059669',
                mb: 2
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#2d2d2d'
              }}
            >
              {item.content}
            </Typography>
          </Box>
        );

      case 'subsection':
        return (
          <Box key={index} sx={{ mb: 3, ml: 3 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2d2d2d',
                mb: 1.5
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#2d2d2d'
              }}
            >
              {item.content}
            </Typography>
          </Box>
        );

      case 'example':
        return (
          <Box 
            key={index} 
            sx={{ 
              mb: 3, 
              ml: 3, 
              p: 2.5, 
              bgcolor: 'rgba(5, 150, 105, 0.04)',
              border: '1px solid #059669',
              borderRadius: '12px'
            }}
          >
            <Typography 
              variant="subtitle1" 
              gutterBottom
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#059669',
                mb: 1
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#2d2d2d'
              }}
            >
              {item.content}
            </Typography>
          </Box>
        );

      case 'remark':
        return (
          <Box 
            key={index} 
            sx={{ 
              mb: 3, 
              ml: 3, 
              p: 2.5, 
              bgcolor: 'rgba(245, 158, 11, 0.04)',
              border: '1px solid #f59e0b',
              borderRadius: '12px'
            }}
          >
            <Typography 
              variant="subtitle1" 
              gutterBottom
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f59e0b',
                mb: 1
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#2d2d2d'
              }}
            >
              {item.content}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper 
      sx={{ 
        width: '100%',
        p: 1,
        borderRadius: '16px',
        boxShadow: 'none',
        bgcolor: '#fff'
      }}
    >
      {content.map((item, index) => renderSection(item, index))}
      <Box sx={{ 
        mt: 3,
        display: 'flex', 
        justifyContent: 'flex-start'
      }}>
        <Button 
          variant="contained" 
          onClick={handleComplete}
          sx={{
            minWidth: 120,
            width: 'auto',
            bgcolor: '#059669',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            '&:hover': {
              bgcolor: '#047857'
            }
          }}
        >
          Terminer la révision
        </Button>
      </Box>
    </Paper>
  );
};

export default RevisionSheet; 