/**
 * Created by lyc on 2017/4/11.
 */
// 本地过滤筛选功能
export function listCreates(obj,ob,list){
    var self = this
    obj = self.ob
    if (obj) {
      return self.list.filter(function (item) {
        return Object.keys(item).some(function (key) {
          return String(item[key]).toLowerCase().indexOf(obj) > -1
        })
      })
    }
    return self.list
  }

