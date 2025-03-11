import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Collapse,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PathSummary = ({ path, results, onActivityClick }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (activityId) => {
    setExpandedItem(currentId => currentId === activityId ? null : activityId);
  };

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
      case 'revision_sheet':
        return 'Fiche de révision';
      case 'revision_sheet_video':
        return 'Vidéo de révision';
      default:
        return 'Activité';
    }
  };

  const renderExplanation = (explanation) => {
    console.log('Explanation:', explanation);

    if (!explanation?.steps || explanation.steps.length === 0) return null;

    return (
      <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        {explanation.steps.map((step, i) => (
          <Box key={i}>
            <Typography variant="body2" color="info.dark">
              Explication : {step.detail}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderActivityDetails = (activity, result) => {
    switch (activity.type) {

      case 'multiple_choice':
      case 'true_false':
      case 'fill_in_the_blank':
      case 'open_ended':
        console.log('activity', activity);
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Question : {activity.content.question ?? activity.content.text} 
            </Typography>
            {renderExplanation(activity.content.explanation)}
          </>
        );

      case 'revision_sheet':
        const content = activity.content || [];
        const questions = Array.isArray(content) ? content.find(item => item.type === 'question')?.questions || [] : [];
        
        return (
          <>
            {Array.isArray(content) && content.map((section, i) => {
              if (section.type === 'question') return null;
              return (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.content}
                  </Typography>
                </Box>
              );
            })}
            
            {questions.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Questions :
                </Typography>
                {questions.map((q, i) => (
                  <Box key={i} sx={{ mb: 2, ml: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Question {i + 1}: {q.question}
                    </Typography>
                    {q.options?.map((opt, j) => (
                      <Typography 
                        key={j} 
                        variant="body2"
                        sx={{ 
                          ml: 2,
                          color: opt.is_correct ? 'success.main' : 'text.primary'
                        }}
                      >
                        • {opt.text} {opt.is_correct && '✓'}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            )}
          </>
        );

      default:
        return (
          <Typography variant="body2" color="text.secondary">
            {activity.question || 'Pas de détails disponibles'}
          </Typography>
        );
    }
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
          const isExpanded = expandedItem === activity.id;

          return (
            <React.Fragment key={activity.id}>
              <ListItem 
                disablePadding
                sx={{ mb: 1, flexDirection: 'column', alignItems: 'stretch' }}
              >
                <ListItemButton 
                  onClick={() => toggleExpand(activity.id)}
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
                            color: result ? (result.isCorrect ? 'success.main' : 'error.main') : 'text.primary',
                            flex: 1
                          }}
                        >
                          {getActivityTypeLabel(activity.type)} {index + 1}
                        </Typography>
                        {result && (
                          result.isCorrect ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )
                        )}
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    }
                  />
                </ListItemButton>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mt: 1 }}>
                    {renderActivityDetails(activity, result)}
                  </Box>
                </Collapse>
              </ListItem>
              {index < path.activities.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default PathSummary; 