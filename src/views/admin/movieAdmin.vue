<template>
    <div>
        <Input v-model="fuzzySearchValue" placeholder="请输入电影名称搜索" style="width: 300px" /> 
        <Select v-model="fuzzyStatusValue" style="width:200px;margin:0 30px;" >
            <Option v-for="item in movieStatusForFuzzy" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>        
        <Button type="primary" style="margin-right:30px;" @click="searchMovieList">搜索</Button>     
        <Button type="primary" @click="showAddMoviesModal">新增电影</Button>     
        <div style="margin-top:20px;">
            <Table border :columns="columns12" :data="movieList" style="width:100%">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="showEidtMoviesModal(row,index)">编辑</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="isShowImgModal = true">添加/修改图片</Button>
                    <Button type="warning" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div style="margin-top:10px;text-align:center">
                <Page :total=count :page-size-opts=pageSize :page-size=eachPage  @on-page-size-change="sizeChange" @on-change="curPageChange" show-sizer />
            </div>
        </div>  
        <Modal v-model="isShowAddModal" width="600">
            <p slot="header" style="color:#f60;text-align:center">
                <span>新增电影</span>
            </p>
            <div class="addMovie">
                <Form :model="formItem" :label-width="80">
                    <FormItem label="中文名字">
                        <Input v-model="formItem.cName" placeholder="请输入电影中文名"></Input>
                    </FormItem>
                    <FormItem label="英文名字">
                        <Input v-model="formItem.eName" placeholder="请输入电影的英文名"></Input>
                    </FormItem>
                    <FormItem label="电影类型">
                        <Select v-model="formItem.movieType" multiple>
                            <Option v-for="item in movieType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <div class="doubleRow">
                        <FormItem label="制片国家" style="width:50%">
                            <Input v-model="formItem.country" placeholder="请输入电影的制片国家"></Input>
                        </FormItem>
                        <FormItem label="电影时长" style="width:50%">
                            <Input v-model="formItem.duration" placeholder="请输入电影时长(分钟)"></Input>
                        </FormItem>                                   
                    </div>     
                    <FormItem label="导演">
                        <Input v-model="formItem.director" placeholder="请输入导演名称(多个以逗号隔开)"></Input>
                    </FormItem>    
                    <FormItem label="演员">
                        <Input v-model="formItem.actors" placeholder="请输入演员名称(多个以逗号隔开)"></Input>
                    </FormItem>                       
                    <FormItem label="上映时间">
                        <DatePicker type="datetime" @on-change="getRelease" :value="formItem.release" format="yyyy-MM-dd HH:mm" placeholder="请选择上线时间"></DatePicker>
                    </FormItem>
                    <FormItem label="目前状态">
                        <RadioGroup v-model="formItem.status">
                            <Radio label="1">热映</Radio>
                            <Radio label="2">可观看</Radio>
                            <Radio label="3">即将上映</Radio>
                            <Radio label="4">下映</Radio>
                        </RadioGroup>
                    </FormItem>                                                           
                    <FormItem label="电影简介">
                        <Input v-model="formItem.synopsis" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入电影简介"></Input>
                    </FormItem>                    
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long  @click="addMovie(formItem)">确认添加</Button>
            </div>
        </Modal>
        <Modal v-model="isShowEditModal" width="600">
            <p slot="header" style="color:#f60;text-align:center">
                <span>修改电影</span>
            </p>
            <div class="addMovie">
                <Form :model="editForm" :label-width="80">
                    <FormItem label="中文名字">
                        <Input v-model="editForm.cName" placeholder="请输入电影中文名"></Input>
                    </FormItem>
                    <FormItem label="英文名字">
                        <Input v-model="editForm.eName" placeholder="请输入电影的英文名"></Input>
                    </FormItem>
                    <FormItem label="电影类型">
                        <Select v-model="editForm.movieType" multiple>
                            <Option v-for="item in movieType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <div class="doubleRow">
                        <FormItem label="制片国家" style="width:50%">
                            <Input v-model="editForm.country" placeholder="请输入电影的制片国家"></Input>
                        </FormItem>
                        <FormItem label="电影时长" style="width:50%">
                            <Input v-model="editForm.duration" placeholder="请输入电影时长(分钟)"></Input>
                        </FormItem>                                   
                    </div>     
                    <FormItem label="导演">
                        <Input v-model="editForm.director" placeholder="请输入导演名称(多个以逗号隔开)"></Input>
                    </FormItem>    
                    <FormItem label="演员">
                        <Input v-model="editForm.actors" placeholder="请输入演员名称(多个以逗号隔开)"></Input>
                    </FormItem>                       
                    <FormItem label="上映时间">
                        <DatePicker type="datetime" @on-change="getRelease" :value="editForm.release" format="yyyy-MM-dd HH:mm" placeholder="请选择上线时间"></DatePicker>
                    </FormItem>
                    <FormItem label="目前状态">
                        <RadioGroup v-model="editForm.status">
                            <Radio label="1">热映</Radio>
                            <Radio label="2">可观看</Radio>
                            <Radio label="3">即将上映</Radio>
                            <Radio label="4">下映</Radio>
                        </RadioGroup>
                    </FormItem>                                                           
                    <FormItem label="电影简介">
                        <Input v-model="editForm.synopsis" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入电影简介"></Input>
                    </FormItem>                    
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long  @click="editMovie({edit_id,editForm})">确认修改</Button>
            </div>
        </Modal>
        <Modal v-model="isShowImgModal" width="800">
            <p slot="header" style="color:#f60;text-align:center">
                <span>图片操作</span>
            </p>
            <p class="title">封面</p>
            <div class="each">
                <div class="eachImgBox">                    
                    <img src="../../assets/liulangdiqiu.jpg" alt="">
                    <div class="eachImgShow">
                        <div class="imgBtn">
                            <Button type="info"  style="margin-right:20px">修改</Button>
                            <Button type="error" >删除</Button>
                        </div>                        
                    </div>
                </div>
            </div>
            <p class="title">导演</p>
            <div class="each">
                <div>
                    <div>
                        <img src="../../assets/liulangdiqiu.jpg" alt="">
                        <div></div>
                    </div>
                </div>
            </div>
            <p class="title">演员</p>
            <div class="each">                
                <div>
                    <img src="../../assets/liulangdiqiu.jpg" alt="">
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long >确认</Button>
            </div>
        </Modal>    
    </div>
</template>
<script>
import{
    mapMutations,
    mapActions,
    mapState
} from "vuex"
export default {
    name:"admin-movie",
    data(){
        return{            
            movieType:[
                {
                    value: '喜剧',
                    label: '喜剧'
                },
                {
                    value: '动作',
                    label: '动作'
                },
                {
                    value: '科幻',
                    label: '科幻'
                },
                {
                    value: '武侠',
                    label: '武侠'
                },
                {
                    value: '爱情',
                    label: '爱情'
                },
                {
                    value: '伦理',
                    label: '伦理'
                },
            ],
            fuzzySearchValue:"",//模糊搜索
            fuzzyStatusValue:"",//模糊搜索电影状态的值
            movieStatusForFuzzy:[
                 {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '热映'
                },
                {
                    value: '2',
                    label: '可观看'
                },
                {
                    value: '3',
                    label: '即将上映'
                },
                {
                    value: '4',
                    label: '下映'
                }
            ],
            edit_id:"",//修改时保存当前点击的_id
            pageSize:[2,5,8,10],            
            columns12: [
                    {
                        title: '中文名',
                        key: 'cName',
                        align: 'center'
                    },
                    {
                        title: '英文名',
                        key: 'eName',
                        align: 'center'
                    },
                    {
                        title: '制片国家',
                        key: 'country',
                        align: 'center'
                    },
                    {
                        title: '时长(分钟)',
                        key: 'duration',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director',
                        align: 'center'
                    },
                    {
                        title: '演员',
                        key: 'actors',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
            
        }
    },
    computed:{
        ...mapState("movies",["isShowAddModal","isShowEditModal","formItem","editForm","movieList","count"]),
        isShowAddModal: {
            get: function() {
                return this.$store.state.movies.isShowAddModal
            },
            set: function (newValue) {
                this.$store.state.movies.isShowAddModal = newValue
            }
        },
        curPage:{
            get: function() {
                return this.$store.state.movies.curPage
            },
            set: function (newValue) {
                this.$store.state.movies.curPage = newValue
            }
        },
        eachPage: {
            get: function() {
                return this.$store.state.movies.eachPage
            },
            set: function (newValue) {
                this.$store.state.movies.eachPage = newValue
            }
        },
        isShowEditModal: {
            get: function() {
                return this.$store.state.movies.isShowEditModal
            },
            set: function (newValue) {
                this.$store.state.movies.isShowEditModal = newValue
            }
        },
        editForm: {
            get: function() {
                return this.$store.state.movies.editForm
            },
            set: function (newValue) {
                this.$store.state.movies.editForm = newValue
            }
        },
        isShowImgModal:{
            get: function() {
                return this.$store.state.movies.isShowImgModal
            },
            set: function (newValue) {
                this.$store.state.movies.isShowImgModal = newValue
            }
        },
    },
    methods:{
        ...mapActions("movies",["addmovies","getMovieList","editMovies"]),
        addMovie(data){
            this.addmovies(data)
        },
        getRelease(date){
            this.formItem.release = date
        },
        showAddMoviesModal(){
            this.isShowAddModal = true
        },
        showEidtMoviesModal(row,index){ 
            this.isShowEditModal = true          
            this.editForm = this.cloneObj(row) 
            console.log(this.editForm.movieType)
            this.editForm.movieType = this.editForm.movieType.split(",")
            this.edit_id = row._id
            console.log(row)
        },
        sizeChange(val){
            this.eachPage = val
            let queryData = {
                curPage:this.curPage,
                eachPage:this.eachPage, 
                queryTerms:{
                    fuzzySearchValue:this.fuzzySearchValue,
                    fuzzyStatusValue:this.fuzzyStatusValue
                }           
            }
            this.getMovieList(queryData)
        },
        curPageChange(val,val1){
            this.curPage = val
            let queryData = {
                curPage:this.curPage,
                eachPage:this.eachPage, 
                queryTerms:{
                    fuzzySearchValue:this.fuzzySearchValue,
                    fuzzyStatusValue:this.fuzzyStatusValue
                }           
            }
            this.getMovieList(queryData)
        },
        searchMovieList(){
            let queryData = {
                curPage:this.curPage,
                eachPage:this.eachPage, 
                queryTerms:{
                    fuzzySearchValue:this.fuzzySearchValue,
                    fuzzyStatusValue:this.fuzzyStatusValue
                }           
            }
            this.getMovieList(queryData)
        },
        editMovie(data){
            this.editMovies(data)
        },
        editImg(){

        },
        //深克隆
        cloneObj(obj){
            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if(window.JSON){
                str = JSON.stringify(obj), //序列化对象
                newobj = JSON.parse(str); //还原
            } else {//如果不支持以上方法
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
                }
            }
            return newobj;
        }
    },
    mounted(){
        let queryData = {
            curPage:this.curPage,
            eachPage:this.eachPage, 
            queryTerms:{
                fuzzySearchValue:this.fuzzySearchValue,
                fuzzyStatusValue:this.fuzzyStatusValue
            }           
        }
        this.getMovieList(queryData)
    }

}
</script>
<style lang="less" scoped>

    .addMovie{
        margin: 0 auto;
    }
    .doubleRow{
        display: flex;        
        FormItem{
            width: 50%;
        }
    }
    .table table{
        // table-layout: auto; 
        width: 100% !important;
    }
    .title{
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
    }
    .each{
        text-align: center;
        font-size: 20px;
        border-top: 1px dashed #ccc;       
        padding: 10px 0;  
    }    
    .eachImgBox{
        max-width: 160px;
        position: relative;
        margin: 0 auto;
        img{
            width: 100%;
            height: auto;
        }
        .eachImgShow{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            .imgBtn{
                width: 100%;
                position: absolute;
                bottom: 20px;
            }
        }
    }
</style>


