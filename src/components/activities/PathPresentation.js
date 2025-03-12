import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PathPresentation = ({ path, onStart }) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        width: '100%',
        p: 3,
        borderRadius: '16px',
        bgcolor: '#fff'
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#2d2d2d',
          fontSize: '1.3rem',
          fontWeight: 700,
          mb: 2
        }}
      >
        {path.title}
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          mb: 3,
          color: '#666',
          fontSize: '1rem',
          lineHeight: 1.6
        }}
      >
        {path.description}
      </Typography>

      <Box 
        sx={{ 
          mb: 3,
          p: 2,
          borderRadius: '12px',
          bgcolor: 'rgba(5, 150, 105, 0.04)',
          border: '1px solid #059669'
        }}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600,
            color: '#059669',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          {path.activities.length} activité{path.activities.length > 1 ? 's' : ''}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={onStart}
        sx={{ 
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
          }
        }}
      >
        Commencer le parcours
      </Button>
    </Paper>
  );
};

export default PathPresentation; 