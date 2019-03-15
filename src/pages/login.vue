<template>
    <div class="loginbg">
        <div class="loginBox">
            <p class="loginTitle">登陆</p>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>                
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="login" style="margin-right:20px;">登陆</Button>
                    <Button type="primary" @click="toReg">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return {
            formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能低于6位', trigger: 'blur' }
                    ]
            }
        }
    },
    methods:{        
        login(){
            this.$post("user/login",{
                username:this.formInline.user,
                password:this.formInline.password,
            }).then((data)=>{
                console.log(data)
                if(data.code == 200){
                    sessionStorage.setItem("isLogin","true")
                    this.$router.push("/Hot");
                }
            })
        },
        toReg(){
            this.$router.push('/Register')
        }
    }
}
</script>
<style <style lang="less" scoped>
    .loginbg{
        position: fixed;
        width: 100%;
        height: 100%;
        background: linear-gradient(#10EBF2,#2CB566); /* 标准的语法 */
        text-align: center;
        .loginBox{
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
>

</style>


