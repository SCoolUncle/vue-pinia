// https://www.npmjs.com/package/cookies-ts
import Cookies from 'cookies-ts'
import config from '/@/config'


const TOKEN_KEY = 'access-token'
const cookies = new Cookies()


export const setToken = (token) => {
     cookies.set(TOKEN_KEY,token,{
         expires:config.cookieExpires
     })
}

export const getToken = () => {
    return cookies.get(TOKEN_KEY)
}

export const removeToken  = () => {
    cookies.remove(TOKEN_KEY)
}