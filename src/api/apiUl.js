import { global } from 'api/config'

const { interfaceRoot, imgRoot, marketAddress } = global

/**
 * 接口地址集合
 */
const apiURL = {
  login: {
    login: `${interfaceRoot}loan/login.do`, // 登录接口
    logout: `${interfaceRoot}loan/logout.do` // 登出接口
  },
  common: {
    getParameters: `${interfaceRoot}loan/common/getParameters.do` // 多参数查询接口---商户贷/现金贷
  },
  userInfo: {
    getPersonBaseInfo: `${interfaceRoot}loan/userInfo/getPersonBaseInfo.do` // 用户信息查询
  },
  refund: {
    getLoanApplys: `${interfaceRoot}loan/plan/getLoanApplys.do`, // 获取账单列表
    getLoanApplyDetail: `${interfaceRoot}loan/plan/getLoanApplyDetail.do` // 获取账单详情
  },
  market: {
    advert: `${marketAddress}market/v1/advert` // 广告位
  },
  imgurl: `${imgRoot}`
}
export default apiURL
