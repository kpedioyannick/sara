import React from 'react';
import { Box, Typography } from '@mui/material';
import MultipleChoiceActivity from './MultipleChoiceActivity';
import TrueFalseActivity from './TrueFalseActivity';
import FillInTheBlankActivity from './FillInTheBlankActivity';
import OpenEndedActivity from './OpenEndedActivity';
import RevisionSheet from './RevisionSheet';
import RevisionSheetVideo from './RevisionSheetVideo';
import H5PActivity from './H5PActivity';
import PlayH5p from './PlayH5p';

const ActivityRenderer = ({ activity, onComplete }) => {
  const renderActivity = () => {
    switch (activity.type) {
      case 'multiple_choice':
        return <MultipleChoiceActivity content={activity.content} onComplete={onComplete} />;
      case 'true_false':
        return <TrueFalseActivity content={activity.content} onComplete={onComplete} />;
      case 'fill_in_the_blank':
        return <FillInTheBlankActivity content={activity.content} onComplete={onComplete} />;
      case 'open_ended':
        return <OpenEndedActivity content={activity.content} onComplete={onComplete} />;
      case 'revision_sheet':
        return <RevisionSheet content={activity.content} onComplete={onComplete} />;
      case 'revision_sheet_video':
        return <RevisionSheetVideo content={activity.content} onComplete={onComplete} />;
      case 'h5p':
        return <PlayH5p h5pJsonPath="./h5p/for-or-since" />
      default:
        return <div>Type d'activité non supporté: {activity.type}</div>;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        animation: 'slideUp 0.3s ease-out',
        '@keyframes slideUp': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          mb: 2,
          bgcolor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e8e8e8',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 2.5,
            borderBottom: '1px solid #e8e8e8',
            background: 'linear-gradient(90deg, #059669 0%, #047857 100%)',
            color: '#fff'
          }}
        >
          <Typography
            sx={{
              width: '100%',
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: 1.5,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto'
            }}
          >
            {activity.question}
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            width: '100%',
            p: 2.5,
            '& > *': {
              width: '100%',
              maxWidth: '100%'
            }
          }}
        >
          {renderActivity()}
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityRenderer; 