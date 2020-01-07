import { MIDDLE } from './symbol'
import { toArray } from './utils'
import { IMiddles } from './interface'

/**
 * 路由中间件(类/方法)
 * @param middleware Middleware
 */
export function Middle(middlewares: IMiddles) {
  return (target: Object | Function, key?: string) => {
    if (key) {
      // get method`s middles
      const middles = toArray(middlewares, Reflect.get(target, key))
      // bind to method (request will get all of them)
      Reflect.set(target, key, middles)
    } else {
      // get from class
      const middles: IMiddles = Reflect.get(target, MIDDLE) || []
      middles.push(...middlewares)
      // bind to class
      Reflect.set(target, MIDDLE, middles)
    }
  }
}
