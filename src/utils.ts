import { convert as NTConvert } from '@yeongjet/joi-to-json-schema'
import { isSchema } from '@hapi/joi'

/**
 * 合并数组，且去重
 * @param args any
 */
export const toArray = (...args: any[]): any[] => {
  const values = args.filter(_ => (_ !== null && _!== undefined))
  return [...new Set([].concat(...values))]
}

/**
 * deep pick
 */
export const pick = (path: string, target: any) => {
  try {
    path.split('.').forEach(_ => target = target[_])
    return target
  } catch (e) {
    return undefined
  }
}

/**
 * 路径转换成 '/xxx/xxx' 格式
 * @param path string
 */
export const toUrl = (path: string) => {
  return `/${path}`.replace(/\/{2,}/g, '/').replace(/(.+)(\/)$/, '$1')
}

/**
 * 校验转换
 * @param validates object
 */
export const convert = (validates: any = {}) => {
  ['query', 'body', 'params', 'headers'].forEach(type => {
    if (isSchema(validates[type])) {
      validates[type] = NTConvert(validates[type])
    }
  })
  return validates
}
