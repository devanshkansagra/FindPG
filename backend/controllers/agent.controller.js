import Agent from "../model/agent.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAuthTokens } from "../utils/generateAuthTokens.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await agent.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Unauthorized");
    }
    const { accessToken, refreshToken } = await generateAuthTokens(agent);
    const options = {
      httpOnly: false,
      secure: false,
      path: "/",
      expiresIn: 1000 * 60 * 60 * 24,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .cookie("role", "agent", options)
      .send(
        new ApiResponse({
          statusCode: 200,
          message: "Agent Login Successful",
        })
      );
  } catch (error) {
    res.status(error.statusCode).send(new ApiError(error.statusCode, error.message));
  }
}

export async function signup(req, res) {
  const { role, name, email, phone, password } = req.body;

  if (phone.length != 10) {
    throw new ApiError(400, "Invalid Phone Length")
  }
  const tel = Number.parseInt(phone);
  try {
    const newAgent = await Agent.create({
      role,
      name,
      email,
      phone: tel,
      password,
    });
    const { accessToken, refreshToken } = await generateAuthTokens(newAgent);
    const response = await newAgent.save();

    const options = {
      httpOnly: false,
      secure: false,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none"
    };

    if (response) {
      res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .cookie("role", "agent", options)
        .send(
          new ApiResponse({ statusCode: 201, message: "New Agent Created" })
        );
    }
  } catch (error) {
    res.status(error.statusCode).send(new ApiError(error.statusCode, error.message));
  }
}
export async function profile(req, res) {}
