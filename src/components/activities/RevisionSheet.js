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
    if (item.type === "question") return null; // Ne pas afficher la section questions

    switch (item.type) {
      case 'section':
        return (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body1">
              {item.content}
            </Typography>
          </Box>
        );

      case 'subsection':
        return (
          <Box key={index} sx={{ mb: 2, ml: 2 }}>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body1">
              {item.content}
            </Typography>
          </Box>
        );

      case 'example':
        return (
          <Box key={index} sx={{ mb: 2, ml: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body1">
              {item.content}
            </Typography>
          </Box>
        );

      case 'remark':
        return (
          <Box key={index} sx={{ mb: 2, ml: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body1">
              {item.content}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
      {content.map((item, index) => renderSection(item, index))}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleComplete}
        >
          Terminer la révision
        </Button>
      </Box>
    </Paper>
  );
};

export default RevisionSheet; 