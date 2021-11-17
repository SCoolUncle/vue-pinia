import axios from "axios";
import { getToken } from '../libs/utils'

class HttpRequest {
    consturctor(baseUrl){
        this.baseUrl = baseUrl
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-URL-PATH': location.pathname
            },
            timeout:10000
        }
        return config
    }

    setInterceptors(instance){
        instance.interceptors.request.use(config => {
            config.headers = {
                'access-token':getToken(),
            }
        },error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use(response => {
            return response
        },error => {
            return Promise.reject(error)
        })
    }
}