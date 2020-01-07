import { Schema } from '@hapi/joi'
import { Middleware } from 'koa'

// tag
export type ITag = string[]
export type ITagMap = Map<string, ITag>

// check
export type IType = 'body' | 'query' | 'params' | 'headers'
export type ICheck = {
  [type in IType]?: Schema
}
export type ICheckMap = Map<string, ICheck>

// request
export type IMethod = 'get' | 'put' | 'delete' | 'post'
export interface IRequest {
  method: string
  path: string
  middlewares: Middleware[]
}
export type IRequestMap = Map<string, IRequest>

// middle
export type IMiddles = Middleware[]

// prefix
export type IPrefix = string

// summary
export type ISummary = string
export type ISummaryMap = Map<string, ISummary>

// response
export interface IResponse {
  [statusCode: number]: {
    description?: string,
    schema?: any
  }
}
export type IResponseMap = Map<string, IResponse>

// description
export type IDesc = string
export type IDescMap = Map<string, IDesc>
