<template>
  <div id="business-detail">
    <headers></headers>
    <div class="business-detail">
      <h1>
        <span class="title">企业详情</span>
        <el-button @click="refresh()">刷新</el-button>
      </h1>
      <el-row class="business-detail-main">
        <el-col class="business-detail-status">
          <span>当前企业已被禁用</span>
        </el-col>
        <el-col class="business-detail-left" :span="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-col v-for="item in businessInfo">
            <b>{{item.key}}：</b>
            <span>{{item.value}}</span>
          </el-col>
          <el-col>
            <b>企业Logo：</b>
            <div class="businessImg">
              <img :src="businessImg" alt="">
            </div>
          </el-col>
          <el-col v-for="item in businessInfo1">
            <b>{{item.key}}：</b>
            <span>{{item.value}}</span>
          </el-col>
        </el-col>
        <el-col class="business-detail-right" :span="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-row :gutter="20">
            <el-col :span="8" :lg="8" :md="8" :sm="8" :xs="24" v-for="item in businessDetailInfo">
              <div :class="item.style">
                <b>{{item.value}}</b>
                <span>{{item.key}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :lg="8" :md="8" :sm="8" :xs="24" v-for="item in businessDetailInfo1">
              <div :class="item.style">
                <b>{{item.value}}</b>
                <span>{{item.key}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :lg="8" :md="8" :sm="8" :xs="24" v-for="item in businessDetailInfo2">
              <div :class="item.style">
                <b>{{item.value}}</b>
                <span>{{item.key}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import headers from '@/components/header.vue'
  export default {
    name: 'businessDetail',
    data (){
      return {
        loader: true,
        businessImg: '',
        businessInfo: [
          {
            key: '企业类型',
            value: ''
          },
          {
            key: '企业名称',
            value: ''
          }
        ],
        businessInfo1: [
          {
            key: '服务热线',
            value: ''
          },
          {
            key: '联系人',
            value: ''
          },
          {
            key: '联系人微信',
            value: ''
          },
          {
            key: '联系人QQ',
            value: ''
          },
          {
            key: '企业地址',
            value: ''
          },
          {
            key: '注册时间',
            value: ''
          },
          {
            key: '是否认证',
            value: ''
          },
          {
            key: '企业保证金',
            value: ''
          }
        ],
        businessDetailInfo: [
          {
            key: '上线Iot设备数',
            value: '2345',
            style: 'orangeBox'
          },
          {
            key: '订单总数',
            value: '3562',
            style: 'blueBox'
          },
          {
            key: '注册会员数',
            value: '5648',
            style: 'redBox'
          }
        ],
        businessDetailInfo1: [
          {
            key: '已发布产品',
            value: '345',
            style: 'greenBox'
          },
          {
            key: '已发布租赁产品',
            value: '24',
            style: 'yellowBox'
          },
          {
            key: '已发布服务项目',
            value: '5',
            style: 'pinkBox'
          }
        ],
        businessDetailInfo2: [
          {
            key: '已发送短信',
            value: '5698',
            style: 'purpleBox'
          },
          {
            key: '认证服务商',
            value: '6',
            style: 'grayBox'
          },
          {
            key: '总交易金额',
            value: '¥ 5,648.00',
            style: 'blackBox'
          }
        ]
      }
    },
    components: { headers },
    created(){
      this.fetchData()
      this.loading()
    },
    methods: {
      fetchData(){
        const that = this
        that.$http.get(`${that.$apihost}/admin/shops/${that.$route.params.id}`)
          .then((res) => {
            that.businessInfo[0].value = res.shopType
            that.businessInfo[1].value = res.name
            that.businessImg = res.logoImagePath
            that.businessInfo1[0].value = res.hotline
            if(res.contactName === null && res.contactMobile !== null){
              that.businessInfo1[1].value = res.contactMobile
            }else if(res.contactName !== null && res.contactMobile === null){
              that.businessInfo1[1].value = res.contactName
            }else if(res.contactName === null && res.contactMobile === null){
              that.businessInfo1[1].value = '(未知)'
            }else{
              that.businessInfo1[1].value = `${res.contactName}(${res.contactMobile})`
            }
            that.businessInfo1[2].value = res.contactWechat
            that.businessInfo1[3].value = res.contactQq
            if(res.province === null || res.city === null || res.area === null || res.address === null){
              that.businessInfo1[4].value = '(未知)'
            }else{
              that.businessInfo1[4].value = `${res.province}${res.city}${res.area}${res.address}`
            }
            that.businessInfo1[5].value = that.$moment(res.createdAt).format('YYYY-MM-DD hh:mm:ss')
            switch (res.serviceDeposit){
              case 0:
                that.businessInfo1[6].value = '否'
                break
              case 1:
                that.businessInfo1[6].value = '是'
                break
              // no default
            }
            that.businessInfo1[7].value = res.serviceDeposit
            that.businessInfo.forEach((value,index,array) => {
              if(value.value === null || value.value === ''){
                value.value = '(未知)'
              }
            })
            that.businessInfo1.forEach((value,index,array) => {
              if(value.value === null || value.value === ''){
                value.value = '(未知)'
              }
            })
          })
      },
      refresh(){
          window.location.reload()
      },
      loading(){
          setTimeout(() => {
              this.loader = false
          },1000)
      }
    }
  }
</script>
