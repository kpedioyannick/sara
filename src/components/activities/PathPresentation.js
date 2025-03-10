import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PathPresentation = ({ path, onStart }) => {
  return (
    <Paper 
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        maxWidth: '600px',
        width: '100%'
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
        {path.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {path.description}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {path.activities.length} activité{path.activities.length > 1 ? 's' : ''}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={onStart}
        fullWidth
        size="large"
        sx={{ 
          mt: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        Commencer le parcours
      </Button>
    </Paper>
  );
};

export default PathPresentation; 