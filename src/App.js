import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import ChatContainer from './components/chat/ChatContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatContainer />
    </ThemeProvider>
  );
}

export default App;
