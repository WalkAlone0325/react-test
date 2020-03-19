import login from './login'
import myserver from '../request/getrequest'

myserver.parseRouter('login', login)

export default myserver