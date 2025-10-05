import Chat from "../model/chat.model";

export const sendMessage = async function (req, res) {
  try {
    const { senderId, recieverId, content, messageStatus } = req.body;

    const participants = [senderId, recieverId].sort();
    let conversation = await Chat.findOne({
        members: participants
    })

    if(!conversation) {
        conversation = new Chat({
            members: participants,
        })

        await conversation.save();
        
    }
  } catch (error) {}
};
