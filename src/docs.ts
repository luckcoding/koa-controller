export interface IPath {
  tag: string[]
  route: string
  method: string
  summary?: string
  request?: {
    type: string
    schema: {}
  }[]
  response?: any
}

export interface IDocs {
  title: string
  version: string
  description?: string
  host?: string
  paths?: IPath[]
  copyright?: string
  basePath?: string
}

export const DEFAULT_API: IPath = {
  tag: [],
  route: '',
  method: 'get',
}

export const DEFAULT_DOCS: IDocs = {
  title: '@koa-stools/controller',
  version: 'v1.0.0',
  description: 'router and parameters handle (by hotchcms)',
  host: 'http://127.0.0.1:3030',
  copyright: 'Copyright © 2020-2020 Hotchcms',
  basePath: '/docs',
}

