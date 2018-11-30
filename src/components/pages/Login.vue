<template>
    <div>
        <van-nav-bar
            title="用户登录"
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
            <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">马上登录</van-button>
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
                    url:url.loginUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                }).then(res=>{
                    if(res.data.code==200 && res.data.message){
                        new Promise((resolve,reject)=>{
                            localStorage.userInfo = {userName:this.userName};
                            setTimeout(()=>{
                                resolve()
                            },500)
                        }).then(()=>{
                            this.$toast.success('登录成功');
                            this.$router.push('/')
                        }).catch(err=>{
                            this.$toast.fail('登录状态保存失败')

                        })

                    }else{
                        this.$toast.fail('登录失败')
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
                    this.usernameErrorMsg='用户名不能小于5位';
                    isok=false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg='密码不能小于6位';
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
        created(){
            if(localStorage.userInfo){
                this.$toast.success("您已经登录");
                this.$router.push('/')
            }
        }

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