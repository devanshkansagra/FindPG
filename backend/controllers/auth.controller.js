import User from '../model/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
export async function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new ApiError(401, 'No refresh token found, please login again');
    } else {
      const verifyToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);      

      if (verifyToken) {
        const { _id, email } = verifyToken;
        const newAccessToken = jwt.sign(
          {
            _id,
            email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );

        const updateUser = await User.updateOne(
          { email },
          { $set: { accessToken: newAccessToken } }
        );
        if (updateUser) {
          const options = {
            httpOnly: false,
            secure: false,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24,
          };
          res
            .status(200)
            .cookie('accessToken', newAccessToken, options)
            .send(new ApiResponse({ statusCode: 200, message: 'Access Token updated' }));
        }
      }
    }
  } catch (error) {
    res.status(Number.parseInt(error.statusCode)).send({ message: error.message });
  }
}
