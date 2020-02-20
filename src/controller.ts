import Router, { IRouterOptions } from 'koa-router'
import { BaseContext } from 'koa'
import { toUrl, convert } from './utils'
import template from './template'
import { REQUEST, CHECK, METHOD_TAG, CLASS_TAG, SUMMARY, PREFIX, MIDDLE } from './symbol'
import { IRequest, ISummaryMap, ITagMap, ITag, ICheckMap, IPrefix, IRequestMap, IMiddles, ISummary, ICheck } from './interface'
import { IDocs, DEFAULT_DOCS, IPath } from './docs'
import { __handle } from './inject'

export interface opts extends IRouterOptions {
  docs?: IDocs
}

export class Controller {
  public docs: IDocs
  public router: Router
  private prefix: string
  constructor(opts: opts) {
    this.router = new Router(opts);
    this.prefix = opts.prefix || '/'
    this.docs = { ...DEFAULT_DOCS, ...opts.docs }
    // render docs
    this.router.get(this.docs.basePath, async (ctx: BaseContext) => {
      ctx.type = 'text/html;charset=utf-8'
      ctx.body = await template(this.docs)
    })
  }

  private parse (ctrl: Function) {
    const requestMap: IRequestMap = Reflect.get(ctrl, REQUEST) || new Map()
    const checkMap: ICheckMap = Reflect.get(ctrl, CHECK) || new Map()
    const methodTagMap: ITagMap = Reflect.get(ctrl, METHOD_TAG) || new Map()
    const summaryMap: ISummaryMap = Reflect.get(ctrl, SUMMARY) || new Map()

    const classTag: ITag = Reflect.get(ctrl, CLASS_TAG)
    const prefix: IPrefix = Reflect.get(ctrl, PREFIX) || '/'
    const middles: IMiddles = Reflect.get(ctrl, MIDDLE) || []

    const { paths = [] } = this.docs

    const names = [...requestMap.keys()]

    names.forEach((name: string) => {
      // get request config
      const request: IRequest = requestMap.get(name)
      const { path, method, fn, middlewares } = request
      // merge all the middles
      const chain = middles.concat(middlewares)
      // merge to koa-router chain
      // handle the route path (is Router instence, so without the this.prefix)
      const url = toUrl(prefix + path)
      // set router
      const newFn = typeof __handle === 'function' ? __handle(request) : fn
      this.router[method](url, ...chain, newFn)

      /**
       * set api docs
       */
      // get tag
      const tag: ITag = methodTagMap.get(name) || classTag || ''
      // handle route with the this.prefix
      const route = toUrl(this.prefix + url)
      // get summary
      const summary: ISummary = summaryMap.get(name) || ''
      // get check data
      const check: ICheck = checkMap.get(name)
      paths.push({
        tag,
        route,
        method,
        summary,
        request: convert(check),
      } as IPath)
    })

    this.docs.paths = paths
  }

  controllers(ctrls: Function[]): Router {
    ctrls.forEach(this.parse.bind(this))
    return this.router
  }
}
