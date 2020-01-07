import { toArray } from './utils'
import { METHOD_DESC, CLASS_DESC } from './symbol'
import { IDesc, IDescMap } from './interface'

/**
 * 描述(类/方法)
 * @param desc string[]
 */
export const Description = (desc: IDesc) => {
  return (target: Object | Function, key?: string) => {
    if (key) {
      // get class desc map
      const descMap: IDescMap = Reflect.get(target.constructor, METHOD_DESC) || new Map()
      // get current desc and set in map
      descMap.set(key, desc)
      // method tag bind to class
      Reflect.set(target.constructor, METHOD_DESC, descMap)
    } else {
      // class tag bind to class
      Reflect.set(target, CLASS_DESC, toArray(desc))
    }
  }
}
