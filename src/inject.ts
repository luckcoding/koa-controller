import { BaseContext } from 'koa'
import { IRequest } from './interface'

type handle = (request: IRequest) => (ctx: BaseContext, ...args: any) => any

export let __handle: handle = undefined

export const InjectHandle = (handle: handle) => {
  __handle = handle
}
