export const WebSocketRoutes = {
  TOPIC: "/topic",
  QUEUE: "/queue",
  QUEUE_INTERVIEWS: (interviewId: string) => `/queue/interviews/${interviewId}`,
  QUEUE_ERRORS: "/queue/errors"
};
