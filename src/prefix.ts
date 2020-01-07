import { toUrl } from './utils'
import { PREFIX } from './symbol'
import { IPrefix } from './interface'

/**
 * 设置controller请求根路径
 * @param path string
 */
export const Prefix = (path: IPrefix): ClassDecorator => {
  return target => {
    // 处理默认path
    let prefix = toUrl(path || `/${target.name}`)

    // 处理父类prefix
    const $parent = Object.getPrototypeOf(target)
    const parentPrefix: IPrefix = Reflect.get($parent, PREFIX)
    if (parentPrefix) {
      prefix = toUrl(`${parentPrefix}/${prefix}`)
    }

    // set to class
    Reflect.set(target, PREFIX, prefix)
  }
}
