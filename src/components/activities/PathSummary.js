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
      <Box 
        sx={{ 
          mt: 2, 
          p: 2.5,
          borderRadius: '12px',
          bgcolor: 'rgba(5, 150, 105, 0.04)',
          border: '1px solid #059669'
        }}
      >
        {explanation.steps.map((step, i) => (
          <Box 
            key={i}
            sx={{
              '&:not(:last-child)': {
                mb: 1.5
              }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                color: '#2d2d2d',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              <span style={{ 
                color: '#059669',
                fontWeight: 600,
                flexShrink: 0
              }}>
                Explication :
              </span>
              {step.detail}
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
          mb: 3
        }}
      >
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
                sx={{ mb: 1.5, flexDirection: 'column', alignItems: 'stretch' }}
              >
                <ListItemButton 
                  onClick={() => toggleExpand(activity.id)}
                  sx={{
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: result ? 
                      (result.isCorrect ? '#059669' : '#ef4444') : 
                      '#e8e8e8',
                    bgcolor: result ?
                      (result.isCorrect ? 'rgba(5, 150, 105, 0.04)' : 'rgba(239, 68, 68, 0.04)') :
                      '#fff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: result ?
                        (result.isCorrect ? 'rgba(5, 150, 105, 0.08)' : 'rgba(239, 68, 68, 0.08)') :
                        'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            flex: 1,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            color: result ? 
                              (result.isCorrect ? '#059669' : '#ef4444') : 
                              '#2d2d2d'
                          }}
                        >
                          {getActivityTypeLabel(activity.type)} {index + 1}
                        </Typography>
                        {result && (
                          result.isCorrect ? (
                            <CheckCircleIcon sx={{ color: '#059669', fontSize: '20px' }} />
                          ) : (
                            <CancelIcon sx={{ color: '#ef4444', fontSize: '20px' }} />
                          )
                        )}
                        {isExpanded ? 
                          <ExpandLessIcon sx={{ color: '#666', fontSize: '20px' }} /> : 
                          <ExpandMoreIcon sx={{ color: '#666', fontSize: '20px' }} />
                        }
                      </Box>
                    }
                  />
                </ListItemButton>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box 
                    sx={{ 
                      p: 2.5, 
                      mt: 1.5,
                      borderRadius: '12px',
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid #e8e8e8'
                    }}
                  >
                    {renderActivityDetails(activity, result)}
                  </Box>
                </Collapse>
              </ListItem>
              {index < path.activities.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 1.5,
                    borderColor: 'rgba(0, 0, 0, 0.08)'
                  }} 
                />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default PathSummary; 