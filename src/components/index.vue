<template>
  <div id="index" v-loading="" v-cloak>
    <headers></headers>
    <el-row class="index-main" :gutter="1" :class="{ fixed:isFixed }">
      <el-col :span="18" :lg="18" :md="24" :sm="24" :xs="24" class="index-left">
        <el-col class="index-left-top">
          <h2><span>Iot设备日活统计图</span></h2>
          <div id="myChart" style="width: 100%;height: 50vh;"></div>
        </el-col>
        <el-col class="index-left-bottom">
          <el-row :gutter="2">
            <el-col :span="10" :lg="10" :md="24" :sm="24" :xs="24">
              <h2><span>新增Iot设备</span></h2>
              <div id="myBarChart" style="width: 100%;height: 280px;"></div>
            </el-col>
            <el-col :offset="1" :span="11" :lg="11" :md="24" :sm="24" :xs="24" class="businessRange">
              <h2><span>企业排名</span></h2>
              <el-row class="companyRange">
                <el-col v-for="(list,index) in companyRange" class="companyLi"><i>{{index+1}}</i><span>{{list.name}}</span><b>{{list.num}}</b></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-col>
      <el-col :offset="1" :span="5" :lg="5" :md="24" :sm="24" :xs="24" class="index-right">
        <el-row justify="center">
          <el-col v-for="item in dealInfo">
            <h3>{{item.title}}</h3>
            <b>{{item.num}}</b>
            <span>{{item.percent}}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import headers from './header.vue'
  export default {
    name: 'index',
    data () {
      return {
        loader: true,
        companyRange: [
          {
            name: '小哈科技股份有限公司',
            num: 50343403
          },
          {
            name: '腾讯',
            num: 50343403
          },
          {
            name: '网易',
            num: 5034340
          },
          {
            name: '新浪',
            num: 201581
          },
          {
            name: '智联',
            num: 50343
          },
          {
            name: '加贝尔',
            num: 842
          }
        ],
        dealInfo: [
          {
            title: '总交易金额',
            num: '¥ 6,546,956.56',
            percent: '10.22%'
          },
          {
            title: '在线Iot设备',
            num: '32655',
            percent: '10.22%'
          },
          {
            title: '总服务订单数',
            num: '48655',
            percent: '10.22%'
          },
          {
            title: '注册企业数／用户数',
            num: '265 / 65789',
            percent: ''
          }
        ]
      }
    },
    components: {
      headers
    },
//    created(){
//      this.fixed()
//    },
    mounted(){
        this.$nextTick(() => {
          this.drawLine()
        })
    },
    computed: {
      ...mapState({
//        leftAnimate: (state) => state.leftAnimate,
//        rightAnimate: (state) => state.rightAnimate
        shade: (state) => state.shade,
        isFixed: (state) => state.isFixed
      })
    },
    methods: {
      drawLine(){
        // 初始化Iot设备日活
        let myLineChart = this.echarts.init(document.getElementById('myChart'))
        myLineChart.setOption({
          title: '',
          tooltip: {},
          xAxis: {
            data: ["周一","周二","周三","周四","周五","周六","周日"]
          },
          yAxis: {},
          series: [{
            name: 'Iot设备日活',
            type: 'line',
            areaStyle: {normal: {}},
            data: [5, 20, 36, 10, 10, 20,30]
          }]
        })

        // 初始化新增Iot设备
        let myBarChart = this.echarts.init(document.getElementById('myBarChart'))
        myBarChart.setOption({
          title: '',
          tooltip: {},
          xAxis: {
            data: ["周一","周二","周三","周四","周五","周六","周日"]
          },
          yAxis: {},
          series: [{
            name: '新增Iot设备',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20,30]
          }]
        })
        window.onresize = function(){
          myBarChart.resize()
          myLineChart.resize()
        }
      }
//    loading(){
//      setTimeout(() => {
//        this.loader = false
//      },1000)
//    }
    }
  }
</script>
