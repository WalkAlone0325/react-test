import axios from 'axios'

const server = axios.create({
  baseURL: 'http://loaclhost:9002/',
  timeout: 5000
})

// 请求拦截
// 响应拦截
export default server