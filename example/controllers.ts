import { BaseContext } from 'koa'
import Joi from '@hapi/joi'
import jsonwebtoken from 'jsonwebtoken'
import { isUser } from './middleware'
import { Summary, Tag, request, Middle, check } from '../src'

@Tag('用户')
export class UserController {
  @request.put('/login')
  @check.body(Joi.object({
    account: Joi.string().required().description('账号'),
  }))
  @Summary('登陆')
  async login (ctx: BaseContext) {
    const { account } = ctx.payload()
    ctx.body = jsonwebtoken.sign({ account }, 'secret', { expiresIn: 24 * 60 * 60 * 30 })
  }

  @request.get('/current')
  @Summary('获取当前用户信息')
  @Middle([ isUser ])
  async current (ctx: BaseContext) {
    ctx.body = ctx.user
  }

  @request.get('/user')
  @Summary('用户列表')
  async list (ctx: BaseContext) {
    ctx.body = []
  }

  @request.post('/user')
  @check.body(Joi.object({
    name: Joi.string().optional().description('名称'),
    lock: Joi.boolean().default(false).description('锁定'),
    tag: Joi.array().optional().description('标签'),
    gender: Joi.string().valid('woman', 'man').description('性别'),
  }))
  @Summary('创建用户')
  async create (ctx: BaseContext) {
    ctx.body = ctx.payload()
  }

  @request.put('/user/:id')
  @check.params(Joi.object({
    id: Joi.number().required().description('ID'),
  }))
  @check.body(Joi.object({
    name: Joi.string().optional().description('名称'),
    lock: Joi.boolean().default(false).description('锁定'),
    tag: Joi.array().optional().description('标签'),
    gender: Joi.string().valid('woman', 'man').description('性别'),
  }))
  @Summary('更新用户')
  async update (ctx: BaseContext) {
    ctx.body = ctx.payload()
  }
}

@Tag('文章')
export class ArticleController {
  @request.get('/article')
  @Summary('文章列表')
  async list (ctx: BaseContext) {
    ctx.body = []
  }
}
