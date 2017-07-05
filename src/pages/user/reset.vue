<template>
  <div id="userReset">
    <el-menu class="el-menu-top" mode="horizontal">
      <div class="left_head">
        <div class="head_img1">
          <img src="./../../assets/images/login_img.jpg">
          <span>小哈伙伴</span>
        </div>
      </div>
    </el-menu>
    <div class="resetMain">
      <el-col>
        <h1 class="resetTit">重置密码</h1>
      </el-col>
      <div class="resetForm">
        <el-form :model="reset" :rules="myRule" ref="reset" label-width="500px">
          <el-form-item label="手机号码" prop="mobile" class="resetPwd">
            <el-input v-model="reset.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="auth" class="resetPwd">
            <el-input v-model.number="reset.auth" placeholder="请输入验证码" class="auth"></el-input>
            <el-button :disabled="disabled" type="success" class="authBtn" @click="send" ref="btn" :second="60">{{text}}</el-button>
          </el-form-item>
          <el-form-item label="登录密码" prop="pass" class="resetPwd">
            <el-input type="password" v-model="reset.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="saveBtn">
            <el-button type="success" @click="resetSave('reset')" size="lg">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import './../../assets/scss/components/reset.scss'
  export default {
    name: 'userReset',
//    props: {
//        second: {
//            type: Number,
//          default: 60
//        },
//      disabled: {
//            type: Boolean,
//        default: false
//      }
//    },
    data () {
      let mobileRule = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入手机号码'))
        }
        setTimeout(() => {
          if(!/^1(3|4|5|7|8)\d{9}$/.test(value)){
            callback(new Error('手机号码格式不正确'))
          }else{
            this.disabled = false
            callback()
          }
        },500)
      }
      let authRule = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入验证码'))
        }
        setTimeout(() => {
          if(!Number.isInteger(value)){
            callback(new Error('必须输入数字'))
          }else{
            callback()
          }
        },500)
      }
      let passRule = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        time: 0,
        disabled: true,
        reset: {
          mobile: '',
          auth: '',
          pass: ''
        },
        myRule: {
          mobile: [
            { required: true,validator: mobileRule,trigger: 'blur' }
          ],
          auth: [
            { required: true,validator: authRule,trigger: 'blur' }
          ],
          pass: [
            { required: true,validator: passRule,trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      run(){
        this.time = this.second
        this.timer()
      },
      timer(){
        if(this.time > 0){
          this.time--
        }
        setTimeout(this.timer,1000)
      },
      send(){
        this.disabled = true
        setTimeout(this.sent,2000)
      },
      sent(){
//          let btn1 = this.$refs.btn
//        let self = this
        this.$refs.btn.run()
//        console.log(self.$refs.reset.className)
        this.disabled = false
      },
      saveSuccess(){
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      },
      resetSave(reset){
//        let self = this
        this.$refs[reset].validate(function(valid) {
          if(valid){
            this.saveSuccess()
            setTimeout(function(){
              this.$router.push({
                path: '/login'
              })
            },3000)
          }else{
            return false
          }
        })
      }
    },
    computed: {
      text(){
        return this.time > 0 ? this.time + 's后重新获取':'获取验证码'
      }
    }
  }
</script>
