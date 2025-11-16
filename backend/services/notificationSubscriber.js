import { subscriber } from '../config/redis.js';
import { create, markAsDelivered } from './notificationService.js';
export async function initSubscriber(io) {
  subscriber.psubscribe('notifications:user:*');
  subscriber.on('pmessage', async (_, channel, message) => {
    const payload = JSON.parse(message);

    const saved = create(payload);

    io.to(`user:${payload.recipientId}`).emit('notification', {
      id: saved._id,
      ...payload,
      createdAt: saved.createdAt,
    });

    await markAsDelivered(saved._id);
  });
}
