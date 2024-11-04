import messageController from '/controllers/message.controller';

export const POST = (req, res) => messageController.saveMessage(req, res);
// export const GET = (req, res) => messageController.getMessages(req, res);