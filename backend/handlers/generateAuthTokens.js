export async function generateAuthTokens(user) {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const id_token = user.generateIdToken();

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  user.id_token = id_token;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken, id_token };
}
