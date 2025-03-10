import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const RevisionSheetVideo = ({ content }) => {
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
    </Paper>
  );
};

export default RevisionSheetVideo; 