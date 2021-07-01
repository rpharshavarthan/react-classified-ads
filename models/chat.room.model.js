const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const chatRoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    members: Array,
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: "chatrooms",
  }
);

chatRoomSchema.statics.initiateChat = async function (
  userIds,
  type,
  chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: "retrieving an old chat room",
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }
    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: "creating a new chatroom",
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log("error on start chat method", error);
    throw error;
  }
};
chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    return this.aggregate([
      //selects the documents where the value of a field is an array
      //that contains all the specified elements
      { $match: { members: { $all: [userId] } } },
      { $unwind: "$members" },
      {
        $lookup: {
          from: "users",
          let: { memberId: "$members" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$memberId"] } } },
            { $project: { _id: 1, name: 1} },
          ],
          as: "memberInfo",
        },
      },
      { $unwind: "$memberInfo" },
      // group data
      {
        $group: {
          _id: "$_id",
          membersInfo: { $addToSet: "$memberInfo" },
          createdAt: { $last: "$createdAt" },
          updatedAt: { $last: "$updatedAt" },
        },
      },
    ]);
  } catch (error) {
    throw error;
  }
};
const ChatRooms = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRooms;
