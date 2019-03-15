import {
    post
} from '../tool/ajax'
import {
    Message
} from 'iview';
const movies ={
    namespaced: true,
    state:{
        hotMovieList:[],
        commingSoonList:[],
        historyList:[],
        isShowAddModal:false,//是否显示新增电影弹窗
        isShowEditModal:false,//是否显示修改电影弹窗
        editForm:{},//修改电影时保存当前数据
        count:10,//总页数
        eachPage:2,//每页条数
        curPage:1,//当前页
        isShowImgModal:false,//是否显示图片操作弹窗
        formItem: {
            cName: '流浪地球',//中文名称
            eName: 'The Wandering Earth',//英文名称
            movieType: [],//电影类型
            country:"中国",//制片国家
            duration:"96",//时长
            release:"",//上映时间
            status: '1',
            synopsis:"太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新家园。然而宇宙之路危机四伏，为了拯救地球，为了人类能在漫长的2500年后抵达新的家园，流浪地球时代的年轻人挺身而出，展开争分夺秒的生死之战。",//电影简介
            director:"郭帆",//导演
            actors:"吴京，李光洁，吴孟达",//演员
        },
        movieList:[],
    },
    mutations:{
        
    },    
    actions :{
       async getHotList(context){
            const {data} = await post("/hotList")            
            context.state.hotMovieList = data
        },
        async getCommingSoonList(context){
            const {data} = await post("/commingSoonList")
            context.state.commingSoonList = data
        },
        async getHistoryList(context){
            const {data} = await post("/historyList")
            context.state.historyList = data
        },
        //后台管理
        async addmovies(context,data){
            const res = await post("movies/addMovies",data)
            if(res.code == 200){
                context.state.isShowAddModal = false
                Message.success('新增电影成功');
            }
        },
        async getMovieList(context,data){
            const res = await post("movies/list",data)
            console.log(res)
            context.state.movieList.length = 0         
            if(res.data.data.length){
                res.data.data.map((item)=>{
                    item.actors = item.actors.join("")
                    item.director = item.director.join("")
                })
            }   
            context.state.movieList = res.data.data
            context.state.count = res.data.count
        },
        async editMovies(context,data){
            const res  = await post("movies/edit",data)
            console.log(res)
            if(res.code == 200){
                Message.success('修改电影成功');
                context.state.isShowEditModal = false
                // getMovieList()
                console.log(this)
                let queryData = {
                    curPage:context.state.curPage,
                    eachPage:context.state.eachPage, 
                    queryTerms:{
                        fuzzySearchValue:"",
                        fuzzyStatusValue:""
                    }           
                }
                this.dispatch("movies/getMovieList",queryData)
            }
        }
    }
}
export default movies