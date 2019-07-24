// noinspection JSAnnotator
import axios from 'axios'

const env = 'dev'
const debug = window.location.host !== 'wap.qianbaoxiaodai.com'
// 返回结果成功
export const RESULT_CODE_OK = '00000000'
export const RESULT_M_CODE_OK = 200
// 公共配置信息
export const global = (() => {
  let {host, protocol} = window.location
  let interfaceRoot // 接口根路径
  let imgRoot // 图片根路径
  let dev = false // 是否是开发环境
  let imgHost = `img${Math.floor(Math.random() * 8)}.qianbao.com/`
  let marketAddress
  if (debug) {
    if (env === 'dev') {
      dev = true
      host = '172.28.38.108'
      marketAddress = `https://sit-apis.qianbao.com/`
    }
    protocol = 'http:'
    imgHost = '172.28.38.34/'
    // imgHost = 'dev-apis.qianbao.com/loan/v1/'
  }
  marketAddress = `https://sit1-apis.qianbao.com/`
  interfaceRoot = `${protocol}//${host}/`
  imgRoot = `${protocol}//${imgHost}`
  return {interfaceRoot, imgRoot, dev, marketAddress}
})()

export const advPostiongIds = {
  'index_1': '20180711000001',
  'index_2': '20180711000002',
  'index_tc': '20180711000003',
  'index_btn': '20180808245077',
  'third_login': '20180711000007',
  'active': '20180711000005',
  'active_tc': '20180711000004',
  'active_btn': '20180808245079',
  'my': '20180711000006',
  'supermarket': '20180711000009',
  'add_amount_btn': '20180808245078',
  'flow_success': '20180808245074',
  'bill_list': '20180808245073',
  'withdrawal_state': '20180808245072',
  'judai': '20181207246688',
  'shz': '20181127246494',
  'myTop': '20181127246495',
  'yewu_': '20181217247780',
  'fkReview': '20190603303310',
  'fkjd': '20190603303311'
}
export const advJump = {
  'LOAN_INDEX': 'control.html',
  'LOAN_FLOW': 'control.html',
  'BILL_LIST': 'bill_list.html',
  'VOUCHER_LIST': 'coupon.html'
}
/**
 * 调用API公共方法
 * @param url API地址
 * @param param 参数
 * @returns {Promise<AxiosResponse<any>>}
 */
export function ajax (url, param) {
  // 请求接口的共公参数
  let sourceOrganizationNo = localStorage.getItem('sourceOrganizationNo')
  let productType = localStorage.getItem('productType')
  let channel = localStorage.getItem('channel')
  if (!sourceOrganizationNo || sourceOrganizationNo === 'undefined') {
    sourceOrganizationNo = 'O20180507113389'
    localStorage.setItem('sourceOrganizationNo', sourceOrganizationNo)
  }
  if (!productType) {
    productType = '31'
    localStorage.setItem('productType', productType)
  }
  if (!channel) {
    channel = '01'
    localStorage.setItem('channel', channel)
  }
  let param01 = {'sourceOrganizationNo': sourceOrganizationNo, 'productType': productType, 'channel': channel, 'sourceProduct': '03'}
  let params = Object.assign({}, param, param01)
  localStorage.getItem('sc') && (params = Object.assign({}, param, param01, {'subOrganizationNo': localStorage.getItem('sc')}))
  localStorage.getItem('token') && (params = Object.assign({}, param, param01, {'token': localStorage.getItem('token')}))
  localStorage.getItem('accessToken') && (params = Object.assign({}, param, param01, {'accessToken': localStorage.getItem('accessToken')}))
  localStorage.getItem('u') && (params = Object.assign({}, param, param01, {'inviteCode': localStorage.getItem('u')}))
  localStorage.getItem('m') && (params = Object.assign({}, param, param01, {'merchantNo': localStorage.getItem('m')}))
  const transformRequest = [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: transformRequest,
    timeout: 120000
  })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(error => {
      console.log(error)
      let res = {resultCode: '408', resultMessage: '请求超时，请重试'}
      // 这里是返回状态码不为200时候的错误处理
      if (error && error.response) {
        res.resultCode = error.response.status
        switch (error.response.status) {
          case 400:
            res.resultMessage = '请求错误'
            break
          case 401:
            res.resultMessage = '未授权，请登录'
            break
          case 403:
            res.resultMessage = '拒绝访问'
            break
          case 404:
            res.resultMessage = `请求地址出错: ${error.response.config.url}`
            break
          case 408:
            res.resultMessage = '请求超时，请重试'
            break
          case 500:
            res.resultMessage = '服务器内部错误'
            break
          case 501:
            res.resultMessage = '服务未实现'
            break
          case 502:
            res.resultMessage = '网关错误'
            break
          case 503:
            res.resultMessage = '服务不可用'
            break
          case 504:
            res.resultMessage = '服务器超时未响应'
            break
          case 505:
            res.resultMessage = 'HTTP版本不受支持'
            break
          default:
            break
        }
      }
      return Promise.resolve(res)
    })
}
export function market (url, param) {
  // 请求接口的共公参数
  let sourceOrganizationNo = localStorage.getItem('sourceOrganizationNo')
  let productType = localStorage.getItem('productType')
  let channel = localStorage.getItem('channel')
  if (!sourceOrganizationNo || sourceOrganizationNo === 'undefined') {
    sourceOrganizationNo = 'O20180507113389'
    localStorage.setItem('sourceOrganizationNo', sourceOrganizationNo)
  }
  if (!productType) {
    productType = '31'
    localStorage.setItem('productType', productType)
  }
  if (!channel) {
    channel = '01'
    localStorage.setItem('channel', channel)
  }
  let param01 = {'sourceOrganizationNo': sourceOrganizationNo, 'productType': productType, 'channel': channel, 'sourceProduct': '03', 'appType': 'H5', 'organizationNo': sourceOrganizationNo}
  let params = Object.assign({}, param, param01)
  localStorage.getItem('token') && (params = Object.assign({}, param, param01, {'token': localStorage.getItem('token')}))
  let token = ''
  localStorage.getItem('token') && (token = localStorage.getItem('token'))
  return axios({
    url: url,
    data: params,
    method: 'post',
    transformRequest: [function (params) {
      return JSON.stringify(params)
    }],
    timeout: 130000,
    headers: {'Content-Type': 'application/json', 'X-Access-Token': token},
    async: false
  })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(error => {
      console.log(error)
      let res = {resultCode: '408', resultMessage: '请求超时，请重试'}
      // 这里是返回状态码不为200时候的错误处理
      if (error && error.response) {
        res.resultCode = error.response.status
        switch (error.response.status) {
          case 400:
            res.resultMessage = '请求错误'
            break
          case 401:
            res.resultMessage = '未授权，请登录'
            break
          case 403:
            res.resultMessage = '拒绝访问'
            break
          case 404:
            res.resultMessage = `请求地址出错: ${error.response.config.url}`
            break
          case 408:
            res.resultMessage = '请求超时，请重试'
            break
          case 500:
            res.resultMessage = '服务器内部错误'
            break
          case 501:
            res.resultMessage = '服务未实现'
            break
          case 502:
            res.resultMessage = '网关错误'
            break
          case 503:
            res.resultMessage = '服务不可用'
            break
          case 504:
            res.resultMessage = '服务器超时未响应'
            break
          case 505:
            res.resultMessage = 'HTTP版本不受支持'
            break
          default:
            break
        }
      }
      return Promise.resolve(res)
    })
}
