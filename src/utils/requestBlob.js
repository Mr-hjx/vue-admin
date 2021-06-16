import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'
import { fGetUrl,parseTime } from '@/utils'
import { saveAs } from 'file-saver'

// create an axios instance
const service = axios.create({
  baseURL: fGetUrl(), // url = base url + request url
  timeout: 50000, // request timeout
  responseType: 'blob'
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    const { method } = config
    if (store.getters.token) {
      if (method === 'get') {
        config.params.token = store.getters.token
      } else {
        if (config.data) {
          config.data.token = store.getters.token
        } else {
          config.data = {
            token: store.getters.token
          }
        }
      }
    }
    if (method === 'get') {
      config.params = {
        ...config.params
      }
    } else {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // if (response.config.noDownload !== true) {
    //   // console.log(response.headers['content-disposition'])
    //   saveAs(response.data, (response.config.title || '') + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '.' + (response.config.accept || 'xlsx'))
    // }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
