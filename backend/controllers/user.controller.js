import User from '../model/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateAuthTokens } from '../utils/generateAuthTokens.js';

export async function login(req, res) {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Unauthorized');
    }
    if (user.role !== role) {
      throw new ApiError(404, 'User not found');
    }
    const { accessToken, refreshToken, id_token } = await generateAuthTokens(user);
    const options = {
      httpOnly: false,
      secure: false,
      path: '/',
      maxAge: 1000 * 60 * 60,
    };
    res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('id_token', id_token, options)
      .cookie('refreshToken', refreshToken, {
        httpOnly: false,
        secure: false,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .cookie('role', role, options)
      .send(
        new ApiResponse({
          statusCode: 200,
          message: 'User Login Successful',
        })
      );
  } catch (error) {
    res.status(error.statusCode).send(new ApiError(error.statusCode, error.message));
  }
}

export async function signup(req, res) {
  const { role, name, email, phone, password } = req.body;

  if (phone.length != 10) {
    throw new ApiError(400, 'Invalid Phone Length');
  }
  const tel = Number.parseInt(phone);
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new ApiError(409, 'User already exists');
    }
    const newUser = await User.create({
      role,
      name,
      email,
      phone: tel,
      password,
    });
    const { accessToken, refreshToken, id_token } = await generateAuthTokens(newUser);
    const response = await newUser.save();

    const options = {
      httpOnly: false,
      secure: false,
      path: '/',
      expiresIn: 1000 * 60 * 60,
    };

    if (response) {
      res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('id_token', id_token, options)
        .cookie('refreshToken', refreshToken, {
          httpOnly: false,
          secure: false,
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .cookie('role', role, options)
        .send(new ApiResponse({ statusCode: 201, message: 'New User Created' }));
    }
  } catch (error) {
    const statusCode = error.statusCode;
    const message = error.message;
    res.status(statusCode).send(new ApiError(statusCode, message));
  }
}
export async function logout(req, res) {
  try {
    await res
      .status(200)
      .clearCookie('accessToken', {
        httpOnly: false,
        secure: false,
        path: '/',
      })
      .clearCookie('refreshToken', {
        httpOnly: false,
        secure: false,
        path: '/',
      })
      .clearCookie('role', {
        httpOnly: false,
        secure: false,
        path: '/',
      })
      .send(new ApiResponse({ statusCode: 200, message: 'Logout Successful' }));
  } catch (error) {
    console.log(error);
  }
}
export async function profile(req, res) {}
