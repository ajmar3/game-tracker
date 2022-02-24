var jwt = require('jsonwebtoken');
import cookie from 'cookie';

export const saveAuthCookie = (token: any) => {
  document.cookie = cookie.serialize('Authorisation', token, { path: "/" })
} 

export const checkLoggedIn = async (request: any) => {
  try{
    const authCookieWithTitle = request.headers.cookie
    const cookieTitle = authCookieWithTitle.split("=")[0]
    const authCookie = authCookieWithTitle.split("=")[1]
    const payload = jwt.verify(authCookie, "test_secret")

    if(cookieTitle != "Authorisation") return null

    return {
      userId: payload.userId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin
    }
  } catch {
    return null
  }

}