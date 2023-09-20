const path = require("path");
const db = require(`${path.dirname(__filename)}/../db.json`);

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  const getConversationsRoute =
    /conversations/.test(req.url) && req.method === "GET";
  if (getConversationsRoute && req.query?.senderId) {
    const userId = req.query.senderId;

    const result = db?.conversations?.filter(
      (conv) => conv.senderId == userId || conv.recipientId == userId,
    );

    res.status(200).json(result);
    return;
  }

  if (getConversationsRoute && req.query?.id) {
    const conversationId = req.query.id;

    const filteredConversations = db?.conversations?.filter(
      (conv) => conv.id === +conversationId,
    );

    const result =
      filteredConversations.length > 0 ? filteredConversations[0] : {};

    res.status(200).json(result);
    return;
  }

  next();
};
