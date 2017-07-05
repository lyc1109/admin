<template>
  <div id="iotDevice">
    <headers></headers>
    <div class="iotDeviceMain">
      <h1>
        <span class="title">Iot设备管理</span>
        <el-button size="small">刷新</el-button>
      </h1>
      <el-form :model="iotDeviceForm"
               class="iotDeviceForm">
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
          <el-select v-model="iotDeviceForm.type"
                     size="small"
                     placeholder="请选择类型" @change="iotDeviceSearch()">
            <el-option v-for="item in iotDeviceType"
                       :value="item.value"
                       :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
          <el-select v-model="iotDeviceForm.business"
                     size="small"
                     placeholder="请选择企业" @change="iotDeviceSearch()">
            <el-option v-for="item in iotDeviceBusiness"
                       :value="item.value"
                       :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
          <el-select v-model="iotDeviceForm.area"
                     size="small"
                     placeholder="请选择地区" @change="iotDeviceSearch()">
            <el-option v-for="item in iotDeviceArea"
                       :value="item.value"
                       :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-form-item>
          <el-input v-model="iotDeviceForm.search"
                    size="small"
                    class="iotDeviceFormSearch"
                    placeholder="请输入设备Mac地址、设备编号" @keypress.native="iotDeviceSearch()">
          </el-input>
          <el-button size="small"
                     type="primary"
                     class="iotDeviceSearchBtn" @click="iotDeviceSearch()">搜索</el-button>
        </el-form-item>
        </el-col>
      </el-form>
      <!--pc端-->
      <el-table :data="iotDeviceData"
                @row-click="detail"
                :row-class-name="iotDeviceClass" class="iotDeviceTab">
        <el-table-column v-for="item in iotDeviceTit"
                         :prop="item.prop" :label="item.label"
                         :min-width="item.minWidth"
                         :width="item.width">
        </el-table-column>
        <!--<el-table-column prop="operate" label="操作">-->
          <!--<template scope="scope">-->
            <!--<el-button size="small" type="info">查看详情</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!--移动端-->
      <div class="iotDeviceTabMobile">
        <ul v-for="item in iotDeviceData">
          <li><b>设备类型</b><span>{{ item.deviceType }}</span></li>
          <li><b>设备产品名称</b><span>{{ item.deviceName }}</span></li>
          <li><b>设备Mac地址</b><span>{{ item.iotDeviceModel }}</span></li>
          <li><b>设备编号</b><span>{{ item.itemCode }}</span></li>
          <li><b>上线日期</b><span>{{ item.createdDate }}</span></li>
          <li><b>客户姓名</b><span>{{ item.leaseProductName }}</span></li>
          <li><b>安装地址</b><span>{{ item.address.fullAddress }}</span></li>
        </ul>
      </div>
      <div class="iotDevicePagination">
        <el-pagination :current-page.sync="iotDevicePage.current"
                       :page-size="iotDevicePage.size"
                       :total="iotDevicePage.total"
                       @current-change="iotDeviceCurrentChange"
                       @size-change="iotDeviceSizeChange"
                       layout="total,prev,pager,next,jumper" class="iotDevicePage" :small="small">
        </el-pagination>
        <div class="iotDevicePageInfo" v-show="iotPageInfo">
          <span>显示第<b> {{ iotDevicePage.firstPage }} </b>到<b> {{ iotDevicePage.lastPage }} </b>条数据</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import headers from '@/components/header.vue'
  export default{
    name: 'iotDevice',
    data(){
      return{
        loader: true,
        iotPageInfo: true,
        small: false,
        iotDeviceForm: {
          type: '',
          business: '',
          area: '',
          search: ''
        },
        iotDevicePage: {
          current: 1,
          size: 10,
          total: 0,
          firstPage: 0,
          lastPage: 0
        },
        iotDeviceType: [
          {
            label: '所有类型',
            value: ''
          },
          {
            label: '支出',
            value: 'expenses'
          }
        ],
        iotDeviceBusiness: [
          {
            label: '所有企业',
            value: ''
          },
          {
            label: '小哈',
            value: 'xohaa'
          }
        ],
        iotDeviceArea: [
          {
            label: '所有地区',
            value: ''
          },
          {
            label: '广州',
            value: '广州'
          }
        ],
        iotDeviceTit: [
          {
            prop: 'deviceType',
            label: '设备类型',
            width: 100
          },
          {
            prop: 'deviceName',
            label: '设备产品名称',
            minWidth: 150
          },
          {
            prop: 'iotDeviceModel',
            label: '设备Mac地址',
            width: 150
          },
          {
            prop: 'itemCode',
            label: '设备编号',
            width: 150
          },
          {
            prop: 'createdDate',
            label: '上线日期',
            width: 150
          },
          {
            prop: 'leaseProductName',
            label: '客户姓名',
            width: 150
          },
          {
            prop: 'address.fullAddress',
            label: '安装地址',
            minWidth: 150
          }
        ],
        iotDeviceData: []
      }
    },
    components: {
      headers
    },
    created(){
      this.fetchData()
      this.loading()
      this.$nextTick(() => {
        if (screen.width < 1199) {
          this.iotPageInfo = false
          this.small = true
        }else{
          this.iotPageInfo = true
          this.small = false
        }
      })
    },
    methods: {
      fetchData(){
        const that = this
        that.$http.get(that.$apihost + '/admin/userdevices',{
          current: that.iotDevicePage.current,
          rowCount: that.iotDevicePage.size,
          deviceType: that.iotDeviceForm.type,
          shopId: that.iotDeviceForm.business,
          province: that.iotDeviceForm.area,
          city: that.iotDeviceForm.area,
          area: that.iotDeviceForm.area,
          searchPhrase: that.iotDeviceForm.search,
          'sort[createdDate]': 'desc'
        })
          .then((res) => {
            that.iotDevicePage.total = res.totalElements
            that.iotDeviceData = res.fileList
            that.iotDeviceData.forEach((value, index, array) => {
                if(array[index].address === null){
                    array[index].address = { fullAddress: '(未知)' }
                }
              array[index].createdDate = that.$moment(array[index].createdDate).format('YYYY-MM-DD')
            })
            if (that.iotDeviceData.length < that.iotDevicePage.size) {
              if (that.iotDeviceData.length === 0) {
                that.iotDevicePage.firstPage = 0
                that.iotDevicePage.lastPage = 0
              } else {
                that.iotDevicePage.firstPage = that.iotDevicePage.total - that.iotDeviceData.length + 1
                that.iotDevicePage.lastPage = that.iotDevicePage.total
              }
            } else if (that.iotDeviceData.length === that.iotDevicePage.size) {
              that.iotDevicePage.firstPage = that.iotDevicePage.current * that.iotDeviceData.length - (that.iotDevicePage.size - 1)
              that.iotDevicePage.lastPage = that.iotDevicePage.current * that.iotDeviceData.length
            }
          })
      },
      iotDeviceClass(row,index){
            return 'iotDeviceData'
      },
      detail(row){
          this.$router.push({
            path: '/iotDevice/detail'
          })
      },
//      转到某一页
      iotDeviceCurrentChange(val){
        const that = this
        that.iotDevicePage.current = val
        that.$http.get(that.$apihost + '/admin/userdevices',{
          current: that.iotDevicePage.current,
          rowCount: that.iotDevicePage.size,
          deviceType: that.iotDeviceForm.type,
          shopId: that.iotDeviceForm.business,
          province: that.iotDeviceForm.area,
          city: that.iotDeviceForm.area,
          area: that.iotDeviceForm.area,
          searchPhrase: that.iotDeviceForm.search,
          'sort[createdDate]': 'desc'
        })
          .then((res) => {
            that.iotDevicePage.total = res.totalElements
            that.iotDeviceData = res.fileList
            that.iotDeviceData.forEach((value, index, array) => {
              if(array[index].address === null){
                array[index].address = { fullAddress: '(未知)' }
              }
              array[index].createdDate = that.$moment(array[index].createdDate).format('YYYY-MM-DD')
            })
            if (that.iotDeviceData.length < that.iotDevicePage.size) {
              if (that.iotDeviceData.length === 0) {
                that.iotDevicePage.firstPage = 0
                that.iotDevicePage.lastPage = 0
              } else {
                that.iotDevicePage.firstPage = that.iotDevicePage.total - that.iotDeviceData.length + 1
                that.iotDevicePage.lastPage = that.iotDevicePage.total
              }
            } else if (that.iotDeviceData.length === that.iotDevicePage.size) {
              that.iotDevicePage.firstPage = that.iotDevicePage.current * that.iotDeviceData.length - (that.iotDevicePage.size - 1)
              that.iotDevicePage.lastPage = that.iotDevicePage.current * that.iotDeviceData.length
            }
          })
      },
//      每一页展示多少页
      iotDeviceSizeChange(val){
        const that = this
        that.iotDevicePage.size = val
        that.$http.get(that.$apihost + '/admin/userdevices',{
          current: that.iotDevicePage.current,
          rowCount: that.iotDevicePage.size,
          deviceType: that.iotDeviceForm.type,
          shopId: that.iotDeviceForm.business,
          province: that.iotDeviceForm.area,
          city: that.iotDeviceForm.area,
          area: that.iotDeviceForm.area,
          searchPhrase: that.iotDeviceForm.search,
          'sort[createdDate]': 'desc'
        })
          .then((res) => {
            that.iotDevicePage.total = res.totalElements
            that.iotDeviceData = res.fileList
            that.iotDeviceData.forEach((value,index,array) => {
              if(array[index].address === null){
                array[index].address = { fullAddress: '(未知)' }
              }
              array[index].createdDate = that.$moment(array[index].createdDate).format('YYYY-MM-DD')
            })
            if (that.iotDeviceData.length < that.iotDevicePage.size) {
              if (that.iotDeviceData.length === 0) {
                that.iotDevicePage.firstPage = 0
                that.iotDevicePage.lastPage = 0
              } else {
                that.iotDevicePage.firstPage = that.iotDevicePage.total - that.iotDeviceData.length + 1
                that.iotDevicePage.lastPage = that.iotDevicePage.total
              }
            } else if (that.iotDeviceData.length === that.iotDevicePage.size) {
              that.iotDevicePage.firstPage = that.iotDevicePage.current * that.iotDeviceData.length - (that.iotDevicePage.size - 1)
              that.iotDevicePage.lastPage = that.iotDevicePage.current * that.iotDeviceData.length
            }
          })
      },
      iotDeviceSearch(){
        const that = this
        that.$http.get(that.$apihost + '/admin/userdevices',{
          current: that.iotDevicePage.current,
          rowCount: that.iotDevicePage.size,
          deviceType: that.iotDeviceForm.type,
          shopId: that.iotDeviceForm.business,
//          province: that.iotDeviceForm.area,
          city: that.iotDeviceForm.area,
//          area: that.iotDeviceForm.area,
          searchPhrase: that.iotDeviceForm.search,
          'sort[createdDate]': 'desc'
        })
          .then((res) => {
            that.iotDevicePage.total = res.totalElements
            that.iotDeviceData = res.fileList
            that.iotDeviceData.forEach((value,index,array) => {
              if(array[index].address === null){
                array[index].address = { fullAddress: '(未知)' }
              }
              array[index].createdDate = that.$moment(array[index].createdDate).format('YYYY-MM-DD')
            })
            if (that.iotDeviceData.length < that.iotDevicePage.size) {
              if (that.iotDeviceData.length === 0) {
                that.iotDevicePage.firstPage = 0
                that.iotDevicePage.lastPage = 0
              } else {
                that.iotDevicePage.firstPage = that.iotDevicePage.total - that.iotDeviceData.length + 1
                that.iotDevicePage.lastPage = that.iotDevicePage.total
              }
            } else if (that.iotDeviceData.length === that.iotDevicePage.size) {
              that.iotDevicePage.firstPage = that.iotDevicePage.current * that.iotDeviceData.length - (that.iotDevicePage.size - 1)
              that.iotDevicePage.lastPage = that.iotDevicePage.current * that.iotDeviceData.length
            }
          })
      },
      loading(){
        setTimeout(() => {
          this.loader = false
        },1000)
      }
    }
  }
</script>
