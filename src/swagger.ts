export interface ISwagger {
  swagger: string
  info: {
    description?: string
    version: string
    title: string
    termsOfService?: string
    concat?: {
      email: string
    }
    license?: {
      name: string
      url: string
    }
  }
  host?: string
  basePath?: string
  tags?: {
    name: string
    description?: string
    externalDocs?: {
      description: string
      url: string
    }
  }[]
  schemes: string[]
  paths: {}
  securityDefinitions: {}
  definitions: {}
  externalDocs?: {
    description: string
    url: string
  }
}

export interface IPath {
  tags: string[]
  summary: string
  description: string
  operationId: string
  consumes: string[]
  produces: string[]
  parameters?: any[]
  responses: any
  security: any[]
}
