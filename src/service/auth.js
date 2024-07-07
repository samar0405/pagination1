import http from "./config";
const auth = {
  sign_in: (data) => http.post("/auth/login", data),
  sign_up: (data) => http.post("/auth/register", data),
  forgot_password: (data) => http.post("/auth/forgot-password", data),
  verify_forgot_password: (data) =>
    http.post("/auth/verify-forgot-password", data),
  verify: (data) => http.post("/auth/verify", data),
};
export default auth;
