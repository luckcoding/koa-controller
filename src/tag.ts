import { METHOD_TAG, CLASS_TAG } from './symbol'
import { ITag, ITagMap } from './interface'

/**
 * 标签(类/方法)
 * @param name string[]
 */
export const Tag = (tag: ITag) => {
  return (target: Object | Function, key?: string) => {
    if (key) {
      // get method tag map from class
      const tagMap: ITagMap = Reflect.get(target.constructor, METHOD_TAG) || new Map()
      // get current tag and set in map
      tagMap.set(key, tag)
      // method tag bind to class
      Reflect.set(target.constructor, METHOD_TAG, tagMap)
    } else {
      // class tag bind to class
      Reflect.set(target, CLASS_TAG, tag)
    }
  }
}
