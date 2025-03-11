import React from 'react';
import MultipleChoiceActivity from './MultipleChoiceActivity';
import TrueFalseActivity from './TrueFalseActivity';
import FillInTheBlankActivity from './FillInTheBlankActivity';
import OpenEndedActivity from './OpenEndedActivity';
import RevisionSheet from './RevisionSheet';
import RevisionSheetVideo from './RevisionSheetVideo';

const ActivityRenderer = ({ activity, onComplete }) => {
  if (!activity) return null;

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
    default:
      return <div>Type d'activité non supporté: {activity.type}</div>;
  }
};

export default ActivityRenderer; 