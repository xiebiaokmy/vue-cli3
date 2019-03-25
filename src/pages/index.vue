<template>
    <Layout style="height: 100%">
        <Header>Header</Header>
        <Layout>
            <Sider>   
                <vuescroll :ops="ops"> 
                    <Menu :theme="theme2" :active-name="activeName" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                电影管理
                            </template>
                            <MenuItem name="hot" to="/Hot">正在热映</MenuItem>
                            <MenuItem name="ComingSoon" to="/ComingSoon">即将上映</MenuItem>
                            <MenuItem name="History" to="/History">历史好剧</MenuItem>                            
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people" />
                                影院管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                统计分析
                            </template>
                            <MenuGroup title="电影">
                                <MenuItem name="RealTime" to="/RealTime">实时数据</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="影视人">
                                <MenuItem name="3-4">票房TOP10</MenuItem>
                                <MenuItem name="3-5">好评TOP10</MenuItem>
                            </MenuGroup>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                后台管理
                            </template>
                            <MenuItem name="MovieAdmin" to="/MovieAdmin">电影管理</MenuItem>                            
                        </Submenu>
                    </Menu>
                </vuescroll>          
            </Sider>
            <Content style="background:#FFF;margin-left:20px;margin-right:20px;">
                <vuescroll :ops="ops"> 
                    <router-view/>
                </vuescroll>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
export default {
    name:'index',
    components:{
        vuescroll
    },
    data(){
        return {
            theme2 :"dark",
            activeName:"hot",
            ops: {
                vuescroll: {},
                scrollPanel: {
                    // scrollingY:false
                    scrollingX: false,
                },
                rail: {
                    // background: '#01a99a',
                },
                bar: {
                    background: '#CCC'
                },
                scrollingX:false
            }
        }
    },
    methods:{
        
    },
    mounted(){
        this.activeName = this.$route.name        
    }
}
</script>
<style lang="less" scoped>
    .ivu-layout{
        background: #fff !important;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
   .ivu-layout-header{
       background: #FFF;
   }
</style>

