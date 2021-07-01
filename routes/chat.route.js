const router = require("express").Router();
const chatController = require("../controllers/chat.controller");

router
  .get("/", chatController.getRoomsByUserId)
  .get("/:roomId", chatController.getMessagesByRoomId)
  .post("/create-room", chatController.createChatRoom)
  .post("/:roomId/message", chatController.postMessage)
  .put("/:roomId/mark-read", chatController.markConversationReadByRoomId);

module.exports = router;
