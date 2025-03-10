import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Message = ({ text, isSara, showRestartButton, onRestart }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSara ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          p: 2,
          bgcolor: isSara ? 'primary.light' : 'secondary.light',
          borderRadius: 2,
          color: 'text.primary'
        }}
      >
        <Typography variant="body1">{text}</Typography>
        {showRestartButton && (
          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={onRestart}
            sx={{ mt: 2 }}
          >
            Recommencer le parcours
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Message;