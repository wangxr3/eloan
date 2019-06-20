import {ajax} from './config'
import apiURL from './apiUl'

/**
 * 个人信息查询
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function getPersonBaseInfo (params) {
  return ajax(apiURL.userInfo.getPersonBaseInfo, params).then(res => {
    console.log(res)
    return Promise.resolve(res)
  })
}
