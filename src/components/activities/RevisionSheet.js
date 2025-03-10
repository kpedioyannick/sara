import React from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Divider
} from '@mui/material';

const RevisionSheet = ({ content }) => {
  const renderSection = (item, index) => {
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
    </Paper>
  );
};

export default RevisionSheet; 