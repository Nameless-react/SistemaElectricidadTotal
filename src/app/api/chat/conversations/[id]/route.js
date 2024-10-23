import conversationController from "/controllers/conversation.controller";

export const GET = (req, params) => conversationController.getConversationsByUserId(req, params);