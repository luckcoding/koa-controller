import assert from 'assert'
import { Middleware, Context } from 'koa'
import { isSchema, Schema } from '@hapi/joi'
import { CHECK } from './symbol'
import { IType, ICheck, ICheckMap } from './interface'
import { toArray, CheckError } from './utils'

declare module 'koa' {
  export interface BaseContext {
    '$payload': {
      [type in IType]?: any
    },
    'payload': () => any
  }
}

export const Body = (schema: Schema) => _connect(schema, 'body')
export const Query = (schema: Schema) => _connect(schema, 'query')
export const Params = (schema: Schema) => _connect(schema, 'params')
export const Headers = (schema: Schema) => _connect(schema, 'headers')

function check (type: IType, schema: Schema) {
  return _connect(schema, type)
}
check.body = Body
check.query = Query
check.params = Params
check.headers = Headers

export { check }

function _connect(schema: Schema, type: IType) {
  return _decorator(_validate(schema, type), schema, type)
}

/**
 * 校验中间件
 * @param schema Schema
 * @param path string
 */
function _validate(schema: Schema, type: IType) {
  assert(isSchema(schema), 'Not Joi Schema')
  return async function(ctx: Context, next: Function) {
    const input = type === 'params' ? ctx.params : ctx.request[type]
    const { error, value } = schema.validate(input)
    if (error) {
      throw new CheckError(error)
    }
    ctx.$payload = { ...ctx.$payload, [type]: value }
    ctx.payload = () => {
      return Object.assign.apply(null, Object.keys(ctx.$payload).map(key => ctx.$payload[key]))
    }
    await next()
  }
}

/**
 * 中间件装饰器
 * @param middleware Middleware
 */
function _decorator(middleware: Middleware, schema: Schema, type: IType) {
  return (target: Object, key: string, descriptor: PropertyDescriptor) => {
    // 路由执行函数+中间件整合，并绑定至方法
    const values = toArray(middleware, Reflect.get(target, key))
    Reflect.set(target, key, values)

    // get check map from class
    const checkMap: ICheckMap = Reflect.get(target.constructor, CHECK) || new Map()
    // get current check data
    let current: ICheck = checkMap.get(key) || {}
    // set check data
    current[type] = schema
    // set to check map
    checkMap.set(key, current)
    // bind to class
    Reflect.set(target.constructor, CHECK, checkMap)

    return descriptor
  }
}
