export const WebSocketRoutes = {
  TOPIC: "/topic",
  QUEUE: "/user/queue",
  QUEUE_ERRORS: "/user/queue/errors",

  QUEUE_INTERVIEWS: (interviewId: number) => `/user/queue/interviews/${interviewId}`,
  APP_MESSAGES: (interviewId: number) => `/app/messages/interview/${interviewId}`
};
