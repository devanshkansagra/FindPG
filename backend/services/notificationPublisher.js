import { publisher } from '../config/redis.js';

export async function publishNotification(payload) {
  const channel = `notifications:user:${payload.recipientId}`;
  await publisher.publish(channel, JSON.stringify(payload));
}
