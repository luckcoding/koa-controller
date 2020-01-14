# @koa-lite/controller

## install

`$ yarn add @koa-lite/controller`

## use

```js
// controller.ts
import { Prefix, Tag, Get, Summary, Query } from '@koa-lite/controller'
@Prefix('/ucenter')
export default class User {
  @Tag('User')
  @Get('/user') // or request.get('/user'), request('get', '/user')
  @Summary('User list')
  @Query(Joi.object({
    name: Joi.string().required().description('name'),
  })) // check.query()
  async sms(ctx: BaseContext) {
    ctx.body = {}
  }
}

// router.ts
import { Controller } from '@koa-lite/controller'
import User from './controller.ts'
const router = new Controller({
  prefix: '/v1',
  docs: {
    title: '接口文档 - 客户端',
    version: 'v1',
    description: '业务接口文档 - by Hotchcms',
  }})
  .controllers([ User ])
  .get('/', ctx => { ctx.body = 'API V1' })

// app.ts
app.use(router.routes())
```

## api

* `Prefix()`
* `request.get()`
* `request.post()`
* `request.put()`
* `request.delete()`
* `check.body`
* `check.query`
* `check.params`
* `check.headers`
* `Middle([])`
* `Summary()`
* `Tag()`