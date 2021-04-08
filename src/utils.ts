import { convert as parse } from '@koa-lite/joi-schema'
import { isSchema, ValidationError } from 'joi'
import { ICheck } from './interface'


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
type IReqSchema = {
  type: string
  schema: {}
}[]
export const convert = (validates: ICheck = {}): IReqSchema => {
  let output = []
  Object.keys(validates).forEach(type => {
    if (isSchema(validates[type])) {
      output.push({ type, schema: parse(validates[type]) })
    }
  })
  return output
}

export class CheckError extends Error {
  public error: ValidationError
  constructor(error: ValidationError) {
    super()
    this.name = this.constructor.name
    this.error = error
    Error.captureStackTrace(this, CheckError)
  }
}

