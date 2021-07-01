const ChatRooms = require("../models/chat.room.model");
const Users = require("../models/user.model");
const ChatMessages = require("../models/chat.messages.model");
const makeValidation = require("@withvoid/make-validation");

const chatController = {
  createChatRoom: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          users: {
            type: types.array,
            options: { unique: true, empty: false, stringOnly: true },
          },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });
      const { users } = req.body;
      const { id: roomAdmin } = req.user;
      console.log(roomAdmin);
      const members = [...users, roomAdmin];
      const chatRoom = await ChatRooms.findOne({
        members: {
          $size: members.length,
          $all: [...members],
        },
      });
      if (chatRoom) {
        return res.status(200).json({
          success: true,
          chatRoom: {
            isNewRoom: false,
            message: "retrieving old chat room",
            chatRoomId: chatRoom._id,
          },
        });
      }
      const newChatRoom = new ChatRooms({
        members,
        roomAdmin,
      });
      await newChatRoom.save();
      return res.status(200).json({
        success: true,
        chatRoom: {
          isNewRoom: true,
          message: "creating a new chatroom",
          chatRoomId: newChatRoom._id,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          message: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = req.body.message;
      const currentLoggedUser = req.user.id;
      const post = await ChatMessages.PostMessageInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );
      // global.io.sockets.in(roomId).emit("new message", { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getRoomsByUserId: async (req, res) => {
    try {
      const currentLoggedUser = req.user.id;
      const rooms = await ChatRooms.getChatRoomsByUserId(currentLoggedUser);
      return res.status(200).json({
        success: true,
        rooms,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getMessagesByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRooms.findOne({ _id: roomId });
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }
      const members = await Users.find({ _id: { $in: room.members } }).select({
        name: 1,
      });
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessages.getConversationByRoomId(
        roomId,
        options
      );
      return res.status(200).json({
        success: true,
        conversation,
        members,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRooms.findOne({ _id: req.params.roomId });
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room with this id found",
        });
      }
      const loggedInUser = req.user.id;
      const result = await ChatMessages.updateMany(
        {
          chatRoomId: roomId,
          "readByRecipients.readByUser": { $ne: loggedInUser },
        },
        {
          $addToSet: {
            readByRecipients: { readByUser: loggedInUser },
          },
        },
        {
          multi: true,
        }
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = chatController;
