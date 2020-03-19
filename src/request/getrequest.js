import server from './server'
import qs from 'qs'

function myserver () {
  this.nowhandle = null
}

myserver.prototype.v = function (ob) {
  this.nowhandle = ob
  return this
}

myserver.prototype.parseRouter = function (name, urlOb) {
  const ob = this[name] = {}
  // myserver.login.loginIn()
  Object.keys(urlOb).forEach((item) => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item])
    ob[item].state = 'ready'
  })
}
myserver.prototype.sendMes = function (moduleName, name, url, config) {
  // 发送请求
  const config = config || {}
  const type = config.type || 'get'
  const data = config.data || {}
  const bindName = config.bindName || name
  const self = this
  const before = function (mes) {
    self[moduleName][name].state = 'ready'
    return mes
  }
  const defaultFn = function (mes) {
    self.nowhandle[bindName] = mes.data
  }
  const success = config.success || defaultFn
  const callback = function (res) {
    success(res, defaultFn)
  }
  const state = {
    get: function () {
      const urlqs = url + qs.stringify(data)
      server.get(urlqs).then(before).then(callback)
    },
    post: function () {
      server.post(url, data).then(before).then(callback)
    }
  }
  if (self[moduleName][name].state === 'ready') {
    self[moduleName][name].state = 'ready'
    state[type]()
  }
}

export default new myserver()

// myserver.login.loginIn()
// myserver.login.loginOut()
