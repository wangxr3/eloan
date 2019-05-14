// noinspection JSAnnotator
import axios from 'axios'

const env = 'dev'
const debug = window.location.host !== 'wap.qianbaoyidai.com'
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

  if (debug) {
    if (env === 'dev') {
      dev = true
      host = '172.28.38.83'
    }
    protocol = 'http:'
    imgHost = '172.28.38.34/'
    // imgHost = 'dev-apis.qianbao.com/loan/v1/'
  }
  interfaceRoot = `${protocol}//${host}/`
  imgRoot = `${protocol}//${imgHost}`
  return {interfaceRoot, imgRoot, dev}
})()

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
  let param01 = {'sourceOrganizationNo': sourceOrganizationNo, 'productType': productType, 'channel': channel}
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
