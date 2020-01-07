export interface IPath {
  tag: string
  route: string
  method: string
  summary?: string
  query?: any[]
  body?: any[]
  params?: any[]
  headers?: any[]
  response?: any
}

export interface IDocs {
  title: string
  version: string
  description?: string
  host?: string
  paths?: IPath[]
  copyright?: string
}

export const DEFAULT_API: IPath = {
  tag: '$$default',
  route: '',
  method: 'get',
}

export const DEFAULT_DOCS: IDocs = {
  title: '@koa-stools/controller',
  version: 'v1.0.0',
  description: 'router and parameters handle (by hotchcms)',
  host: 'http://127.0.0.1:3030',
  copyright: 'Copyright © 2020-2020 Hotchcms',
}

