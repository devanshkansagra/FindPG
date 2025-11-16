import Notification from '../model/notification.model.js';

export async function create(payload) {
  return Notification.create({
    recipientId: payload.recipientId,
    actorId: payload.actorId,
    message: payload.message,
    data: payload.data,
    read: payload.read,
    delivered: payload.delivered,
    createdAt: payload.createdAt,
  });
}

export async function getUserNotifications(userId) {
  return await Notification.find({ recipientId: userId, read: false }).sort({ createdAt: -1 });
}

export async function markAsRead(id, userId) {
  return await Notification.updateOne({ _id: id, recipientId: userId }, { $set: { read: true } });
}

export async function markAsDelivered(id) {
  return await Notification.updateOne({ _id: id }, { $set: { delivered: true } });
}
