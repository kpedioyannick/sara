import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const ProgressBar = ({ results, totalActivities }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      width: '100%',
      height: '4px',
      bgcolor: 'grey.200',
      position: 'fixed',
      top: isMobile ? 0 : 0, // 56px est la hauteur par défaut de AppBar en mobile
      left: 0,
      zIndex: 1100,
      display: 'flex'
    }}>
      {Array.from({ length: totalActivities }).map((_, index) => {
        const result = results[index];
        return (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: '100%',
              bgcolor: result 
                ? result.isCorrect 
                  ? 'success.main'
                  : 'error.main'
                : 'grey.300',
              borderRight: index < totalActivities - 1 ? '1px solid white' : 'none',
              transition: 'background-color 0.3s ease'
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressBar; 