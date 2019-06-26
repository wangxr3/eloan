import { global } from 'api/config'

const { interfaceRoot, imgRoot } = global

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
    getPersonBaseInfo: `${interfaceRoot}loan/userInfo/getPersonBaseInfo.do`,
    userAddInfo: `${interfaceRoot}loan/easyLoan/loanCreditApply/userAddInfo.do`
  },
  imgurl: `${imgRoot}`
}
export default apiURL
