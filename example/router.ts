import { Controller } from '../src'
import { UserController } from './controllers'

const routerV1 = new Controller({
  prefix: '/v1',
  docs: {
    securities: [{
      type: 'headers',
      key: 'Authorization',
      value: function (data) {
        var ret = (data instanceof Object) && data.ret
        return /^Bearer\s/.test(ret) ? ret : ''
      },
    }, {
      type: 'headers',
      key: 'x-device-id',
      value: '1234',
    }],
  },
})
  .controllers([
    UserController,
  ])
  .get('/', ctx => { ctx.body = 'API V1' })

export default routerV1.routes()