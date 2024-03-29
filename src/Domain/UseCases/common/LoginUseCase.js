import LoginRespository from "../../../Data/Repositories/common/LoginRepository.js";

async function LoginUseCase(loginState) {
  const result = await LoginRespository(loginState);

  sessionStorage.setItem(
    "token",
    JSON.stringify({
      expiry: result.expiry,
      last_use_to_expire: result.last_use_to_expire,
      token: result.token,
    })
  );
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      user_id: result.user_id,
      username: result.username,
      first_name: result.first_name,
      last_name: result.last_name,
      role: result.role,
    })
  );

  return result;
}

export default LoginUseCase;
