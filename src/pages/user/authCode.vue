<!--<template>-->
  <!--<div id="authCode">-->
    <!--<el-button type="success" :disabled="disabled || time > 0">{{ text }}</el-button>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--let flag = false-->
  <!--export default {-->
      <!--name: 'authCode',-->
    <!--data () {-->
      <!--return {-->
        <!--time : '获取验证码',-->
      <!--}-->
    <!--},-->
    <!--props : {-->
      <!--start : {-->
        <!--type : Boolean-->
      <!--}-->
    <!--},-->
    <!--watch : {-->
      <!--start (value,oldvalue) {-->
        <!--if(value == true){-->
          <!--this.countDown()-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--countDown () {-->
        <!--this.time = 60;-->
        <!--let time = setInterval(()=>{-->
          <!--this.time &#45;&#45;-->
          <!--if(this.time == 0){-->
            <!--this.$emit('countDown')-->
            <!--this.time = '获取验证码'-->
            <!--flag = true-->
            <!--clearInterval(time)-->
          <!--}-->
        <!--},100)-->
      <!--}-->
    <!--},-->
    <!--filters : {-->
      <!--change (value) {-->
        <!--if(!value) return ""-->
        <!--if(!isNaN(value)){-->
          <!--if(flag == true){-->
            <!--return `重新发送${value}S`-->
          <!--}-->
          <!--return value+'S'-->
        <!--}else{-->
          <!--return value-->
        <!--}-->
      <!--}-->
    <!--}-->

  <!--}-->
<!--</script>-->


<template>
  <div id="authCode">
    <el-button type="success" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</el-button>
  </div>
</template>
<script>
  export default{
    name: '#authCode',
    props: {
      second: {
        type: Number,
        default: 60
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        time: 0
      }
    },
    methods: {
      run: function () {
        this.$emit('run');
      },
      start: function () {
        this.time = this.second;
        this.timer();
      },
      stop: function () {
        this.time = 0;
        this.disabled = false;
      },
      setDisabled: function (val) {
        this.disabled = val;
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.disabled = false;
        }
      }

    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    }
  }
</script>
