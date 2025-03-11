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
    <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
      <Box sx={{ width: '100%', position: 'relative', pb: '56.25%' }}>
        <video
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px'
          }}
        >
          <source src={content.video} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleComplete}
        >
          J'ai terminé de regarder la vidéo
        </Button>
      </Box>
    </Paper>
  );
};

export default RevisionSheetVideo; 