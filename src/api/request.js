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
 * 查询账单列表
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
/**
 * 查询账单详情
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function getLoanApplyDetail (params) {
  return ajax(apiURL.refund.getLoanApplyDetail, params).then(res => {
    return Promise.resolve(res)
  })
}

/**
 * 查询可还账单
 * @param token //
 * @returns {Promise.<TResult>}
 */
export function queryDeductionRepaymentPlan (params) {
  return ajax(apiURL.deduct.queryDeductionRepaymentPlan, params).then(res => {
    return Promise.resolve(res)
  })
}