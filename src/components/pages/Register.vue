<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        ></van-nav-bar>
        <van-field
                v-model="username"
                label="用户名"
                placeholder="请输入用户名"
                required
                clearable
                :error-message='usernameErrorMsg'
        >
        </van-field>
        <van-field
                v-model="password"
                label="密码"
                placeholder="请输入密码"
                required
                clearable
                :error-message="passwordErrorMsg"
        >
        </van-field>
        <div class="register-button">
            <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">马上注册</van-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '../../serviceAPI.config';
    export default {
        name: 'Register',
        data(){
            return{
                username: '',
                password: '',
                openLoading:false,
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            axiosRegisterUser(){
                this.openLoading=true;
                axios({
                    url:url.regionUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                }).then(res=>{
                    if(res.data.code==200){
                        this.$toast.success('注册成功')
                    }else{
                        this.$toast.fail('注册失败')
                    }
                    this.openLoading=false;
                }).catch(err=>{
                    this.$toast.fail('注册失败');
                    this.openLoading=false;
                })
            },
            checkform(){
                let  isok=true;
                if(this.username.length<5){
                    this.usernameErrorMsg='用户名不能小于5位'
                    isok=false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg='密码不能小于6位'
                    isok=false
                }else{
                    this.passwordErrorMsg=''
                }
                return isok;
            },
            registerAction(){
                this.checkform() &&  this.axiosRegisterUser()
            }
        },

    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }

</style>