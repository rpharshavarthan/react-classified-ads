const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUser: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    chatRoomId: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    sender: String,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "chatmessages",
  }
);

chatMessageSchema.statics.PostMessageInChatRoom = async function (
  chatRoomId,
  message,
  sender
) {
  try {
    const newMessage = await this.create({
      chatRoomId,
      message,
      sender,
      readByRecipients: { readByUser: sender },
    });
    const aggregate = await this.aggregate([
      // get post where _id = post._id
      { $match: { _id: newMessage._id } },
      // do a join on another table called users, and
      // get me a user whose _id = sender
      {
        $lookup: {
          from: "users",
          let: { sender: "$sender" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$sender"] } } },
            { $project: { _id: 1, name: 1} },
          ],
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      // do a join on another table called chatrooms, and
      // get me a chatroom whose _id = chatRoomId
      {
        $lookup: {
          from: "chatrooms",
          localField: "chatRoomId",
          foreignField: "_id",
          as: "chatRoomInfo",
        },
      },
      { $unwind: "$chatRoomInfo" },
      { $unwind: "$chatRoomInfo.members" },
      //   // do a join on another table called users, and
      //   // get me a user whose _id = userIds
      {
        $lookup: {
          from: "users",
          let: { memberInfo: "$chatRoomInfo.members" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$memberInfo"] } } },
            { $project: { _id: 1, name: 1} },
          ],
          as: "chatRoomInfo.userProfile",
        },
      },
      { $unwind: "$chatRoomInfo.userProfile" },
      // group data
      {
        $group: {
          _id: "$_id", //message id
          chatRoomId: { $last: "$chatRoomInfo._id" },
          message: { $last: "$message" },
          type: { $last: "$type" },
          sender: { $last: "$sender" },
          readByRecipients: { $last: "$readByRecipients" },
          chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
          createdAt: { $last: "$createdAt" },
          updatedAt: { $last: "$updatedAt" },
        },
      },
    ]);
    return aggregate;
  } catch (error) {
    throw error;
  }
};

chatMessageSchema.statics.getConversationByRoomId = async function (
  chatRoomId,
  options = {}
) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },
      // do a join on another table called users, and
      // get me a user whose _id = sender
      {
        $lookup: {
          from: "users",
          let: { sender: "$sender" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$sender"] } } },
            { $project: { _id: 1, name: 1 } },
          ],
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
};
const ChatMessages = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessages;
