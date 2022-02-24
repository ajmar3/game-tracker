var jwt = require('jsonwebtoken');

export const checkLoggedIn = async (request: any) => {
  try{
    const authCookieWithTitle = request.headers.cookie
    const authCookie = authCookieWithTitle.split("=")[1]
    const payload = jwt.verify(authCookie, "test_secret")
    return {
      userId: payload.userId,
      email: payload.email,
      firstname: payload.firstname,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin
    }
  } catch {
    return null
  }

}