import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

const RevisionSheetVideo = ({ content, onComplete }) => {
  const handleComplete = () => {
    if (content.questions) {
      onComplete?.({
        type: 'revision_sheet_video',
        isComplete: true,
        questions: content.questions,
        messages: [{
          text: "Maintenant que vous avez regardé la vidéo, vérifions votre compréhension avec quelques questions.",
          isSara: true,
          startQuestions: true,
          questions: content.questions
        }]
      });
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
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          pb: '56.25%', // Ratio 16:9
          mb: 3,
          borderRadius: '12px',
          overflow: 'hidden',
          bgcolor: '#000',
          border: '1px solid #e8e8e8'
        }}
      >
        <iframe
          src={content.videoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#2d2d2d',
          mb: 2
        }}
      >
        {content.title}
      </Typography>

      <Typography 
        variant="body1"
        sx={{
          fontSize: '1rem',
          lineHeight: 1.6,
          color: '#2d2d2d',
          mb: 3
        }}
      >
        {content.description}
      </Typography>

      <Box sx={{ 
        mt: 4,
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
            borderRadius: '12px',
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

export default RevisionSheetVideo; 