import Koa from 'koa'

declare module 'koa' {
  export interface BaseContext {
    user: any,
  }
}

export const isUser = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const { user } = ctx.state

  if (!user) {
    ctx.body = 'TOKEN_FAIL'
  } else {
    await next()
  }
}
