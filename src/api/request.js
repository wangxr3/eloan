import {ajax, market} from './config'
import apiURL from './apiUl'

/**
 * 个人信息查询
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function getPersonBaseInfo (params) {
  return ajax(apiURL.userInfo.getPersonBaseInfo, params).then(res => {
    return Promise.resolve(res)
  })
}

/**
 * 个人信息查询
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function getBillList (params) {
  return ajax(apiURL.refund.getLoanApplys, params).then(res => {
    return Promise.resolve(res)
  })
}

/**
 * 广告位查询
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function advert (params) {
  return market(apiURL.market.advert, params).then(res => {
    return Promise.resolve(res)
  })
}

export function imgUrl (img) {
  return apiURL.imgurl + img
}
