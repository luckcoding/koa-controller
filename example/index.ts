
// import 'reflect-metadata'
import Koa from 'koa'
import http from 'http'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import koaJwt from 'koa-jwt'
import router from './router'

const app = new Koa()
const port = 3031

// 跨域
app.use(cors())

// 请求解析
app.use(koaBody())

// jwt
app.use(koaJwt({
  secret: 'secret',
  passthrough: true
}).unless({
  path: [/^\/docs-/]
}))

app.use(router)

// 404
app.use(ctx => {
  ctx.status = 404
  ctx.body = '请求的API地址不正确或者不存在'
})

// 监听错误
app.on('error', (err, ctx) => {
  console.error('服务错误: ', err, ctx)
})

/**
 * 创建服务
 */
const server = http.createServer(app.callback());

server.on('error', (error) => {
  console.error('启动失败: ', error)
})

server.on('listening', () => {
  console.info(`服务启动, 端口: ${port}`)
})

if (!module.parent) {
  server.listen(port)
}
