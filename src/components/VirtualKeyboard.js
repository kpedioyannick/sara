import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Box, Paper, IconButton } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CloseIcon from '@mui/icons-material/Close';

const VirtualKeyboard = ({ onKeyPress, activeInput, isOpen, onToggle }) => {
  const keyboardLayout = {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "A Z E R T Y U I O P",
      "Q S D F G H J K L M",
      "W X C V B N {bksp}",
    ],
  };

  const handleKeyPress = (button) => {
    if (onKeyPress) {
      onKeyPress(button);
    }
  };

  return (
    <>
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          zIndex: 1301
        }}
      >
        {isOpen ? <CloseIcon /> : <KeyboardIcon />}
      </IconButton>

      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            p: 2,
            bgcolor: 'background.paper',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Box sx={{ 
            '.simple-keyboard': {
              maxWidth: '900px',
              margin: '0 auto',
            },
            '.hg-button': {
              height: '45px',
              minWidth: '45px',
              fontSize: '1.2rem',
              borderRadius: '8px',
              background: 'white',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                background: '#f5f5f5',
              },
              '&:active': {
                background: '#e0e0e0',
              }
            }
          }}>
            <Keyboard
              layout={keyboardLayout}
              onKeyPress={handleKeyPress}
              display={{
                '{bksp}': '⌫ Effacer'
              }}
            />
          </Box>
        </Paper>
      )}
    </>
  );
};

export default VirtualKeyboard; 