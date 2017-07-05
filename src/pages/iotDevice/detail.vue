<template>
  <div id="iotDeviceDetail" v-cloak>
    <headers></headers>
    <div class="iotDeviceDetail">
      <h1>
        <span class="title">Iot设备详情</span>
        <el-button size="small">刷新</el-button>
      </h1>
      <el-row class="iotDeviceDetailMain">
        <el-col class="iotDeviceDetailMainTop">
          <el-col :span="11" :lg="11" :md="11" :sm="11" :xs="24" class="iotDeviceDetailMainLeft">
            <el-row class="iotDeviceInfo" :gutter="1">
              <el-col class="iotDeviceImg" :span="6" :lg="6" :md="6" :sm="6" :xs="24">
                <div class="iotDeviceImgMain">
                  <div class="iotDeviceImgZz"></div>
                  <img src="./../../assets/images/login_img.jpg" alt="">
                  <i class="iconfont icon-nowifi"></i>
                  <b>设备已离线</b>
                  <span class="pcTime">最后在线：2017-05-22 11:11:11</span>
                </div>
              </el-col>
              <el-col class="iotDeviceImfoDetail" :span="15"  :lg="15" :md="15" :sm="15" :xs="24">
                <el-col v-for="item in iotDeviceInfoDetail"><b>{{item.name}}:</b><span>{{item.value}}</span></el-col>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="13" :lg="13" :md="13" :sm="13" :xs="24" class="iotDeviceDetailMainRight">
            <el-row :gutter="20">
              <el-col :span="8" :lg="8" :md="8" :sm="8" :xs="24"
                      v-for="item in iotDeviceDetailInfo">
                <div :class="item.style">
                  <h4>{{item.value}}</h4>
                  <span>{{item.title}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" :lg="8" :md="8" :sm="8" :xs="24"
                      v-for="item in iotDeviceDetailInfo1">
                <div :class="item.style">
                  <h4>{{item.value}}</h4>
                  <span>{{item.title}}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
        <el-col class="iotDeviceDetailMainBottom">
          <el-tabs type="border-card" v-model="detailInfo">
            <el-tab-pane v-for="item in iotDeviceDetailTab"
                         :label="item.label"
                         :name="item.name">
            </el-tab-pane>
          </el-tabs>
          <!--详细信息-->
          <transition name="bounce" :enter-active-class="bounceEnterClass">
            <el-row v-if="detailInfo === '详细信息'" class="tabRow">
              <el-col :span="12" :lg="12" :md="12" :sm="12" :xs="24" id="filterDetail">
                <h2><span>滤芯详情:总共<b> 5 </b>根滤芯 其中<b> 1 </b>根需要更换</span></h2>
                <el-row class="filterDetailMain">
                  <el-col v-for="(item,index) in filterDetail"
                          :span="22" :lg="22" :md="22" :sm="22" :xs="24">
                    <i>{{index + 1}}</i>
                    <span>{{item.name}}</span>
                    <el-progress :percentage="item.percentage"
                                 :stroke-width="20"
                                 :status="item.status"
                                 :text-inside="textInside">
                    </el-progress>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" :lg="12" :md="12" :sm="12" :xs="24" id="deviceLog">
                <h2><span>设备日志</span></h2>
                <el-row>
                  <el-col v-for="item in deviceLogData">
                    <b>设备状态：{{item.name}}</b>
                    <span>{{item.time}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </transition>
          <!--服务记录-->
          <transition name="bounce" :enter-active-class="bounceEnterClass">
            <el-row v-show="detailInfo === '服务记录'" class="tabRow">
              <el-col id="serviceRecord">
                <el-table :data="serviceRecordData" class="record" :row-class-name="serviceRecordClass">
                  <el-table-column v-for="item in serviceRecordTab"
                                   :prop="item.prop"
                                   :label="item.label"
                                   :width="item.width">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </transition>
          <!--充值记录-->
          <transition name="bounce" :enter-active-class="bounceEnterClass">
          <el-row v-show="detailInfo === '充值记录'" class="tabRow">
            <el-col id="rechargeRecord">
              <el-table :data="rechargeRecordData" class="record" :row-class-name="rechargeRecordClass">
                <el-table-column v-for="item in rechargeRecordTab"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :width="item.width">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          </transition>
          <!--数据报表-->
          <transition name="bounce" :enter-active-class="bounceEnterClass">
            <el-row v-show="detailInfo === '数据报表'" class="tabRow">
              <el-col :span="11" :lg="11" :md="11" :sm="11" :xs="24" id="waterStatistics">
                <h2>
                  <span>用水统计</span>
                  <el-radio-group v-model="waterStatisticsBtns" class="waterStatisticsBtn" size="small">
                    <el-radio-button v-for="item in waterStatisticsBtn"
                                     :label="item.label">
                    </el-radio-button>
                  </el-radio-group>
                  <el-date-picker type="date"
                                  v-model="waterStatisticsDate"
                                  placeholder="请选择日期">
                  </el-date-picker>
                </h2>
                <el-col id="waterTable"
                        auto-resize
                        style="height: 46vh;">
                </el-col>
              </el-col>
              <el-col :offset="1"
                      :span="12"
                      :lg="12" :md="12" :sm="12" :xs="24"
                      id="waterRecord">
                <h2><span>净水记录</span></h2>
                <el-row>
                  <el-col v-for="item in waterRecordData">
                    <span>净水量{{item.water}}升，用水时长{{item.timeDifference}}秒</span>
                    <b>{{item.time}}</b>
                  </el-col>
                  <el-col id="pageArray">
                    <el-pagination :current-page="pageArray.current"
                                   :size="pageArray.size"
                                   :total="pageArray.total"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   layout="total,prev,pager,next"
                                   :small="small">
                    </el-pagination>
                    <b class="pagToggle">显示第<strong> 1 </strong>到<strong> 10 </strong>条数据</b>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import headers from '@/components/header.vue'
  export default{
    name: 'iotDeviceDetail',
    data (){
      return {
        loader: true,
        loaders: false,
        detailInfo: '详细信息',
        textInside: true,
        waterStatisticsBtns: '周',
        waterStatisticsDate: '',
        small: true,
        tabIndex: [],
        bounceEnterClass: 'animated bounceInUp',
        pageArray: {
          current: 1,
          size: 10,
          total: 100
        },
        iotDeviceInfoDetail: [
          {
            name: '产品名称',
            value: 'JBR-UF-Q3'
          },
          {
            name: '设备型号',
            value: '2017050401'
          },
          {
            name: '设备编号',
            value: '09W2D1XLKW6E(9F9F9FBEBCAB)'
          },
          {
            name: '客户姓名',
            value: '老陈醋'
          },
          {
            name: '安装地址',
            value: '广东省广州市海珠区琶洲273号'
          },
          {
            name: '起租日期',
            value: '2017-05-12'
          },
          {
            name: '到期日期',
            value: '2018-05-11'
          },
          {
            name: '上线时间',
            value: '2015-05-11 11:11:11'
          }
        ],
        iotDeviceDetailInfo: [
          {
            title: '总用水量',
            value: '200L',
            style: 'green-box'
          },
          {
            title: '日均用水量',
            value: '10L',
            style: 'blue-box'
          },
          {
            title: 'TDS值',
            value: '4／169',
            style: 'red-box'
          }
        ],
        iotDeviceDetailInfo1: [
          {
            title: '总在线时长',
            value: '241天10小时',
            style: 'oranage-box'
          }
//          {
//            title: '',
//            value: '',
//            style: 'purple-box'
//          },
//          {
//            title: '',
//            value: '',
//            style: 'olivine-box'
//          }
        ],
        iotDeviceDetailTab: [
          {
            label: '详细信息',
            name: '详细信息'
          },
          {
            label: '服务记录',
            name: '服务记录'
          },
          {
            label: '充值记录',
            name: '充值记录'
          },
          {
            label: '数据报表',
            name: '数据报表'
          }
        ],
        filterDetail: [
          {
              name: 'PP棉',
            percentage: 100,
            status: ''
          },
          {
            name: '颗粒碳',
            percentage: 80,
            status: ''
          },
          {
            name: '烧结炭',
            percentage: 90,
            status: ''
          },
          {
            name: 'RO反渗透膜',
            percentage: 50,
            status: ''
          },
          {
            name: '颗粒碳',
            percentage: 75,
            status: ''
          }
        ],
        deviceLogData: [
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          },
          {
            name: '在线',
            time: '2017-06-01'
          }
        ],
        serviceRecordTab: [
          {
            prop: 'status',
            label: '进度状态',
            width: 150
          },
          {
            prop: 'type',
            label: '服务类型',
            width: ''
          },
          {
            prop: 'num',
            label: '服务单号',
            width: ''
          },
          {
            prop: 'servicer',
            label: '服务商',
            width: ''
          },
          {
            prop: 'name',
            label: '客户姓名',
            width: ''
          },
          {
            prop: 'bookTime',
            label: '预约时间',
            width: ''
          },
          {
            prop: 'created',
            label: '创建时间',
            width: ''
          }
        ],
        serviceRecordData: [
          {
            status: '待分派',
            type: '支出',
            num: 'aga5243453450',
            servicer: '加贝尔',
            name: '加贝尔',
            bookTime: '2017-05-31',
            created: '2017-05-31'
          }
        ],
        rechargeRecordTab: [
          {
            prop: 'num',
            label: '充值单号',
            width: ''
          },
          {
            prop: 'type',
            label: '充值套餐',
            width: ''
          },
          {
            prop: 'money',
            label: '充值金额(元)',
            width: ''
          },
          {
            prop: 'endTime',
            label: '租赁到期日期',
            width: ''
          },
          {
            prop: 'created',
            label: '充值时间',
            width: ''
          }
        ],
        rechargeRecordData: [
          {
            num: 'RO20170509000132',
            type: '半年卡',
            money: 5000,
            endTime: '2017-08-30',
            created: '2017-05-09 15:40:21'
          }
        ],
        waterStatisticsBtn: [
          {
              label: '周'
          },
          {
              label: '月'
          },
          {
              label: '年'
          }
        ],
        waterRecordData: [
          {
            water: 500,
            timeDifference: 33,
            time: '2017-05-31'
          },
          {
            water: 65,
            timeDifference: 4.3,
            time: '2017-05-31'
          },
          {
            water: 500,
            timeDifference: 33,
            time: '2017-05-31'
          },
          {
            water: 65,
            timeDifference: 4.3,
            time: '2017-05-31'
          },
          {
            water: 500,
            timeDifference: 33,
            time: '2017-05-31'
          },
          {
            water: 65,
            timeDifference: 4.3,
            time: '2017-05-31'
          },
          {
            water: 500,
            timeDifference: 33,
            time: '2017-05-31'
          },
          {
            water: 65,
            timeDifference: 4.3,
            time: '2017-05-31'
          },
          {
            water: 500,
            timeDifference: 33,
            time: '2017-05-31'
          },
          {
            water: 65,
            timeDifference: 4.3,
            time: '2017-05-31'
          }
        ]
      }
    },
    components: { headers },
    mounted(){
      this.loading()
      this.$nextTick(() => {
          if(screen.width <= 1200){
            this.tableTit('serviceRecord',this.serviceRecordTab)
            this.tableTit('rechargeRecord',this.rechargeRecordTab)
          }else{
              return false
          }
      })
    },
    beforeUpdate(){
        this.$nextTick(() => {
          this.waterTable()
        })
    },
//    transitions: {
//      bounce: {
//        enterClass: 'bounceInRight',
//        leaveClass: 'bounceOutLeft'
//      }
//    },
    methods: {
      waterTable(){
        let waterTable = this.echarts.init(document.getElementById('waterTable'))
        waterTable.setOption({
          title: '',
          tooltip: {},
          xAxis: {
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {},
          series: [
            {
              name: '净水TDS值',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20,30]
            },
            {
              name: '净水量(ml)',
              type: 'bar',
              data: [15, 20, 36, 10, 10, 200,30]
            },
            {
              name: '出水TDS值',
              type: 'line',
              data: [5, 55, 80, 5, 33, 48,68]
            },
            {
              name: '出水量(ml)',
              type: 'bar',
              data: [30, 50, 36, 10, 10, 20,30]
            }
          ]
        })
        window.onresize = waterTable.resize
      },
      handleSizeChange(val){
        let self = this
        self.pageArray.size = val
        console.log(self.pageArray.size)
      },
      handleCurrentChange(val){
        let self = this
        self.pageArray.current = val
        console.log(self.pageArray.current)
      },
      loading(){
        setTimeout(() => {
          this.loader = false
        },1000)
      },
      tableTit(className,title){
        let body = document.getElementsByClassName(className)[0]
        let cell = body.getElementsByClassName('cell')
        for(let j = 0;j<cell.length;j++){
          cell[j].innerHTML += '<div class="cellTit">' + title[j].label + '</div>'
        }
      },
      rechargeRecordClass(row){
          return 'rechargeRecord'
      },
      serviceRecordClass(row){
          return 'serviceRecord'
      }
//      getTab(tab,event){
//          this.tabIndex[0] = tab.index
//      }
    },
//    watch: {
//      detailInfo(newVal,oldVal){
////        if(newVal > oldVal){
////          this.bounceEnterClass = 'animated bounceInRight'
////          this.bounceLeaveClass = 'animated bounceOutLeft'
////        }else if(newVal < oldVal){
////          this.bounceEnterClass = 'animated bounceInLeft'
////          this.bounceLeaveClass = 'animated bounceOutRight'
////        }
//        console.log(oldVal,newVal)
//      }
//    }
  }
</script>
