<template>
    <div class="regbg">
        <div class="regBox">
            <p class="loginTitle">注册</p>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
               <FormItem label="账号" prop="username">
                    <Input type="text" v-model="formCustom.username" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="密码" prop="passwd" >
                    <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck" placeholder="请确认您的密码"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input type="email" v-model="formCustom.email" number placeholder="请输入邮箱"></Input>
                </FormItem>
                <Button type="primary" @click="toLogin" style="margin-right:20px;">登陆</Button>
                <Button type="primary" @click="handleSubmit('formCustom')" >注册</Button>
            </Form>
        </div>
    </div>    
</template>
<script>
export default {
    name:"register",
    data(){
        const validateUsername = (rule, value, callback) => {
           if (value === '') {
                callback(new Error('请输入账号'));
            } else {
            let reg = /^1[34578]\d{9}$/
            if (!reg.test(this.formCustom.username)) {
                // 对第二个密码框单独验证                    
                callback(new Error('请输入正确的手机号码'));
                console.log(1111)
            }else{
                // this.$refs.formCustom.validateField('username');
            }
            callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                // let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D\da-zA-Z_-]+$/;
                if(value.length<6||value.length>16){
                    callback(new Error('密码长度为6到16位'));
                }else{
                    // this.$refs.formCustom.validateField('passwdCheck');
                }
                
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请确认密码'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次密码输入不一致'));
            } else {
                callback();
            }
        };
        const validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else {
                callback();
            }
        };
        return {
            formCustom: {
                username: '',
                passwd: '',
                passwdCheck:"",
                email:""
            },
            ruleCustom: {
                username: [
                    { validator: validateUsername,required: true, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass,required: true, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, required: true,trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, required: true,trigger: 'blur' }
                ]
            }
        }         
    },
    methods:{
        toLogin(){
            this.$router.push("/Login")
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$post("user/checkUser",{
                        username:this.formCustom.username,                        
                    }).then((data)=>{
                        if(data.code == 200){
                            this.registerUser()
                        }
                    })                    
                } 
            })
        },
        registerUser(){
            this.$post("user/register",{
                username:this.formCustom.username,
                password:this.formCustom.passwd,
                email:this.formCustom.email
            }).then((data)=>{
                if(data.code == 200){
                    this.$Message.success('注册成功');
                    setTimeout(()=>{
                        this.$router.push("/Login")
                    },1000)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .regbg{
        position: fixed;
        width: 100%;
        height: 100%;
        background: linear-gradient(#10EBF2,#2CB566); /* 标准的语法 */
        text-align: center;
        .regBox{
            width: 600px;
            padding: 40px 100px;
            background: #FFF;
            border-radius: 10px;
            margin: 200px auto 0;
        }
        p{
            font-size: 24px;
            margin-bottom: 20px;
        }
    }
</style>
