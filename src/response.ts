import { RESPONSE } from './symbol'
import { IResponse, IResponseMap } from './interface'

export function Response(response: IResponse) {
  return function (target: any, key: string) {
    // get class resp map
    const responseMap: IResponseMap = Reflect.get(target.constructor, RESPONSE) || new Map()
    responseMap.set(key, response)
    // bind to class
    Reflect.set(target.constructor, RESPONSE, responseMap)
  }
}
