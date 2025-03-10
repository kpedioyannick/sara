import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PathSummary = ({ path, results, onActivityClick }) => {
  const getActivityTypeLabel = (type) => {
    switch(type) {
      case 'multiple_choice':
        return 'QCM';
      case 'true_false':
        return 'Vrai/Faux';
      case 'fill_in_the_blank':
        return 'À compléter';
      case 'open_ended':
        return 'Question ouverte';
      default:
        return 'Activité';
    }
  };

  const formatAnswer = (result, activity) => {
    if (!result || result.answer === undefined) return 'Pas encore répondu';
    return `Votre réponse : ${result.answer}`;
  };

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
        Résumé du parcours : {path.title}
      </Typography>

      <List sx={{ width: '100%' }}>
        {path.activities.map((activity, index) => {
          const result = results.find(r => r.activityId === activity.id);
          const isCorrect = result?.isCorrect;

          return (
            <ListItem 
              key={activity.id}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton 
                onClick={() => onActivityClick(activity, result)}
                sx={{
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          color: result ? (isCorrect ? 'success.main' : 'error.main') : 'text.primary',
                          flex: 1
                        }}
                      >
                        {getActivityTypeLabel(activity.type)} {index + 1}: {activity.question}
                      </Typography>
                      {result && (
                        isCorrect ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )
                      )}
                    </Box>
                  }
                  secondary={formatAnswer(result, activity)}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default PathSummary; 