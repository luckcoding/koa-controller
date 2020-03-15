import { toArray } from './utils'
import { IMethod, IRequestMap, IRequest } from './interface'
import { REQUEST } from './symbol'

export const Get = (path: string) => _decorator(path, 'get')
export const Put = (path: string) => _decorator(path, 'put')
export const Delete = (path: string) => _decorator(path, 'delete')
export const Post = (path: string) => _decorator(path, 'post')

function request (method: IMethod, path: string) {
  return _decorator(path, method)
}
request.get = Get
request.put = Put
request.del = Delete
request.post = Post

export { request }

/**
 * 路由装饰器
 * @param path string
 * @param method string
 */
function _decorator(path: string, method: string) {
  return (target: Object, key: string) => {
    // 1. 获取路由map
    const requestMap: IRequestMap = Reflect.get(target.constructor, REQUEST) || new Map()
    // 2. 存储
    const middlewares = toArray(Reflect.get(target, key))
    const fn: Function = middlewares.pop()
    requestMap.set(key, { method, path, fn, middlewares } as IRequest)
    // 3. 重设
    Reflect.set(target.constructor, REQUEST, requestMap)
  }
}
