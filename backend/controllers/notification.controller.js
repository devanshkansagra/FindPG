import { publisher } from '../config/redis.js';
import { ApiError } from '../handlers/ApiError.js';
import { ApiResponse } from '../handlers/ApiResponse.js';
import { getUserNotifications, markAsRead } from '../services/notificationService.js';

export async function getNotifications(req, res) {
  const { _id } = req.user;
  try {
    const userNotifications = await getUserNotifications(_id);
    res.status(200).send(
      new ApiResponse({
        statusCode: 200,
        message: 'Notifications fetched successfully',
        data: userNotifications,
      })
    );
  } catch (error) {
    res.send(new ApiError(500, error));
  }
}

export async function readNotification(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    await markAsRead(id, userId);

    res.status(200).send(
      new ApiResponse({
        statusCode: 200,
        message: 'Notification read',
      })
    );
  } catch (error) {}
}
