/**
 * Created by lyc on 2017/6/19.
 */
export default {
  /**
   * 解析浏览器URL上的参数
   * @param key 参数名称s
   */
  parseUrlParam: function (key) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
    const r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return r[2]
    }
    return ""
  }
}
