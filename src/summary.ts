import { SUMMARY } from './symbol'
import { ISummary, ISummaryMap } from './interface'

export function Summary(summary: ISummary) {
  return function (target: any, key: string) {
    // get class summary map
    const summaryMap: ISummaryMap = Reflect.get(target.constructor, SUMMARY) || new Map()
    summaryMap.set(key, summary)
    // bind to class
    Reflect.set(target.constructor, SUMMARY, summaryMap)
  }
}
