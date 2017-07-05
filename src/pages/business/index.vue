<template>
  <div id="business" v-cloak>
    <headers></headers>
    <div class="business-main">
      <h1>
        <span class="title">企业管理</span>
        <el-button size="small">刷新</el-button>
        <el-button size="small" type="primary">新增</el-button>
      </h1>
      <el-form :model="businessForm" class="businessForm">
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
            <el-select placeholder="所有状态" v-model="businessForm.status" size="small">
              <el-option v-for="item in status" :value="item.value" :label="item.label"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
            <el-select placeholder="所有类型" v-model="businessForm.type" size="small">
              <el-option v-for="item in type" :value="item.value" :label="item.label"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="3" :lg="3" :md="3" :sm="8" :xs="8">
        <el-form-item>
            <el-select placeholder="所有地区" v-model="businessForm.area" size="small">
              <el-option v-for="item in area" :value="item.value" :label="item.label"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-form-item>
            <el-input placeholder="请输入企业名称" v-model="businessForm.search" class="businessSearch" size="small" @keypress.native="businessSearch()"></el-input>
            <el-button type="primary" size="small" class="businessSearchBtn" @click="businessSearch()">搜索</el-button>
        </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="businessTab" class="businessTab" @row-click="businessDetail" :row-class-name="businessTabClass">
        <el-table-column v-for="item in businessTit" :prop="item.prop" :width="item.width" :min-width="item.minWidth" :type="item.type" :label="item.label"></el-table-column>
        <!--<el-table-column prop="operate" label="操作">-->
          <!--<template scope="scope">-->
            <!--<el-button size="small">查看详情</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div class="businessPagination">
        <el-pagination :current-page="businessPage.current"
                       :size="businessPage.size"
                       :total="businessPage.total"
                       @current-change="businessCurrentChange"
                       @size-change="businessSizeChange"
                       layout="total,prev,pager,next,jumper"
                       class="businessPage" :small="small">
        </el-pagination>
        <div class="businessPageInfo" v-show="businessPageInfo">
          <span>显示第<b> {{ businessPage.firstPage }} </b>到<b> {{ businessPage.lastPage }} </b>条数据</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headers from '@/components/header.vue'
  export default{
    name: 'business',
    data(){
      return{
        loader: true,
        businessPageInfo: true,
        small: false,
        businessForm: {
          status: '',
          type: '',
          area: '',
          search: ''
        },
        businessPage: {
          current: 1,
          size: 10,
          total: 0,
          firstPage: 0,
          lastPage: 0
        },
        status: [
          {
              label: '在线',
            value: 'online'
          },
          {
            label: '离线',
            value: 'offline'
          },
          {
            label: '异常',
            value: 'error'
          },
          {
            label: '即将到期',
            value: 'soon'
          },
          {
            label: '已逾期',
            value: 'overdue'
          },
          {
            label: '所有',
            value: 'all'
          }
        ],
        type: [
          {
            label: '租赁',
            value: 'rent'
          }
        ],
        area: [
          {
            label: '广州',
            value: 'guangzhou'
          },
          {
            label: '深圳',
            value: 'shenzhen'
          }
        ],
        businessTit: [
          {
            prop: 'status',
            width: 100,
            label: '状态'
          },
          {
            prop: 'name',
            minWidth: 300,
            label: '企业名称'
          },
          {
            prop: 'contactName',
            width: '',
            label: '联系人'
          },
          {
            prop: 'address',
            minWidth: 280,
            label: '企业地址'
          },
          {
            prop: 'createdAt',
            width: '',
            label: '创建日期'
          }
        ],
        businessTab: []
      }
    },
    components: {
        headers
    },
    created(){
      this.fetchData()
      this.loading()
      this.$nextTick(() => {
        if (screen.width <= 1199) {
          this.businessPageInfo = false
          this.small = true
        }else{
          this.businessPageInfo = true
          this.small = false
        }
      })
    },
    methods: {
      fetchData(){
        let that = this
        that.$http.get(`${that.$apihost}/admin/shops`,{
          current: that.businessPage.current,
          rowCount: that.businessPage.size,
          searchPhrase: that.businessForm.search,
          'sort[createdAt]': 'desc'
        })
          .then((res) => {
            that.businessTab = res.fileList
            that.businessPage.total = res.totalElements
            that.businessTab.forEach((value,index,array) => {
                if(array[index].province === null || array[index].city === null || array[index].area === null || array[index].address === null){
                    array[index].address = '(未知)'
                }else if(array[index].province !== null || array[index].city !== null || array[index].area !== null || array[index].address !== null) {
                  array[index].address = `${ array[index].province }${ array[index].city }${ array[index].area }${ array[index].address }`
                }
              array[index].createdAt = this.$moment(array[index].createdAt).format('YYYY-MM-DD')
            })
            if (that.businessTab.length < that.businessPage.size) {
              if (that.businessTab.length === 0) {
                that.businessPage.firstPage = 0
                that.businessPage.lastPage = 0
              } else {
                that.businessPage.firstPage = that.businessPage.total - that.businessTab.length + 1
                that.businessPage.lastPage = that.businessPage.total
              }
            } else if (that.businessTab.length === that.businessPage.size) {
              that.businessPage.firstPage = that.businessPage.current * that.businessTab.length - (that.businessPage.size - 1)
              that.businessPage.lastPage = that.businessPage.current * that.businessTab.length
            }
          })
      },
      businessCurrentChange(val){
        const that = this
        that.businessPage.current = val
        that.$http.get(`${that.$apihost}/admin/shops`,{
          current: that.businessPage.current,
          rowCount: that.businessPage.size,
          searchPhrase: that.businessForm.search,
          'sort[createdAt]': 'desc'
        })
          .then((res) => {
            that.businessTab = res.fileList
            that.businessPage.total = res.totalElements
            that.businessTab.forEach((value,index,array) => {
              if(array[index].province === null || array[index].city === null || array[index].area === null || array[index].address === null){
                array[index].address = '(未知)'
              }else if(array[index].province !== null || array[index].city !== null || array[index].area !== null || array[index].address !== null) {
                array[index].address = `${ array[index].province }${ array[index].city }${ array[index].area }${ array[index].address }`
              }
              array[index].createdAt = this.$moment(array[index].createdAt).format('YYYY-MM-DD')
            })
            if (that.businessTab.length < that.businessPage.size) {
              if (that.businessTab.length === 0) {
                that.businessPage.firstPage = 0
                that.businessPage.lastPage = 0
              } else {
                that.businessPage.firstPage = that.businessPage.total - that.businessTab.length + 1
                that.businessPage.lastPage = that.businessPage.total
              }
            } else if (that.businessTab.length === that.businessPage.size) {
              that.businessPage.firstPage = that.businessPage.current * that.businessTab.length - (that.businessPage.size - 1)
              that.businessPage.lastPage = that.businessPage.current * that.businessTab.length
            }
          })
      },
      businessSizeChange(val){
        const that = this
        that.businessPage.size = val
        that.$http.get(`${ that.$apihost }/admin/shops`,{
          current: that.businessPage.current,
          rowCount: that.businessPage.size,
          searchPhrase: that.businessForm.search,
          'sort[createdAt]': 'desc'
        })
          .then((res) => {
            that.businessTab = res.fileList
            that.businessPage.total = res.totalElements
            that.businessTab.forEach((value,index,array) => {
              if(array[index].province === null || array[index].city === null || array[index].area === null || array[index].address === null){
                array[index].address = '(未知)'
              }else if(array[index].province !== null || array[index].city !== null || array[index].area !== null || array[index].address !== null) {
                array[index].address = `${ array[index].province }${ array[index].city }${ array[index].area }${ array[index].address }`
              }
              array[index].createdAt = this.$moment(array[index].createdAt).format('YYYY-MM-DD')
            })
            if (that.businessTab.length < that.businessPage.size) {
              if (that.businessTab.length === 0) {
                that.businessPage.firstPage = 0
                that.businessPage.lastPage = 0
              } else {
                that.businessPage.firstPage = that.businessPage.total - that.businessTab.length + 1
                that.businessPage.lastPage = that.businessPage.total
              }
            } else if (that.businessTab.length === that.businessPage.size) {
              that.businessPage.firstPage = that.businessPage.current * that.businessTab.length - (that.businessPage.size - 1)
              that.businessPage.lastPage = that.businessPage.current * that.businessTab.length
            }
          })
      },
      businessSearch(){
        const that = this
        that.$http.get(`${ that.$apihost }/admin/shops`,{
          current: that.businessPage.current,
          rowCount: that.businessPage.size,
          searchPhrase: that.businessForm.search,
          'sort[createdAt]': 'desc'
        })
          .then((res) => {
            that.businessTab = res.fileList
            that.businessPage.total = res.totalElements
            that.businessTab.forEach((value,index,array) => {
              if(array[index].province === null || array[index].city === null || array[index].area === null || array[index].address === null){
                array[index].address = '(未知)'
              }else if(array[index].province !== null || array[index].city !== null || array[index].area !== null || array[index].address !== null) {
                array[index].address = `${ array[index].province }${ array[index].city }${ array[index].area }${ array[index].address }`
              }
              array[index].createdAt = this.$moment(array[index].createdAt).format('YYYY-MM-DD')
            })
            if (that.businessTab.length < that.businessPage.size) {
              if (that.businessTab.length === 0) {
                that.businessPage.firstPage = 0
                that.businessPage.lastPage = 0
              } else {
                that.businessPage.firstPage = that.businessPage.total - that.businessTab.length + 1
                that.businessPage.lastPage = that.businessPage.total
              }
            } else if (that.businessTab.length === that.businessPage.size) {
              that.businessPage.firstPage = that.businessPage.current * that.businessTab.length - (that.businessPage.size - 1)
              that.businessPage.lastPage = that.businessPage.current * that.businessTab.length
            }
          })
      },
      businessDetail(row){
        this.$router.push({
          path: `/business/${row.id}`
        })
      },
      businessTabClass(row, column){
        return 'businessTabClass'
      },
      loading(){
        setTimeout(() => {
          this.loader = false
        }, 1000)
      }
    }
  }
</script>
