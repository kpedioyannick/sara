export const users = [
  {
    id: 'user1',
    email: 'test@example.com',
    name: 'John Doe',
    myPaths: [
      {
        pathId: 'path1',
        progress: 50,
        startedAt: '2024-03-10T10:00:00Z',
        lastAccessedAt: '2024-03-15T15:30:00Z',
        completedActivities: ['act1'],
        results: [
          {
            activityId: 'act1',
            isCorrect: true,
            answer: '4',
            timestamp: '2024-03-15T15:30:00Z'
          }
        ]
      },
      {
        pathId: 'path2',
        progress: 25,
        startedAt: '2024-03-12T14:00:00Z',
        lastAccessedAt: '2024-03-14T16:20:00Z',
        completedActivities: [],
        results: []
      }
    ]
  }
];

export const userSessions = {
  'token123': 'user1'
}; 