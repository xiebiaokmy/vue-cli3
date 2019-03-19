<template>
    <div>
        <div class="header">
            <div class="auto">
                <div class="auto-img">
                    <img :src="movies.imgs.url" alt="">
                </div>
                <div class="detail-info">
                    <p class="movie-name">
                        {{movies.cName}}
                    </p>
                    <p class="movie-type">
                        {{movies.type}}
                    </p>
                    <p class="region">
                        {{movies.country}}/{{movies.duration}}(分钟)
                    </p>
                    <p class="release">
                        {{movies.release}}{{movies.country}}上映
                    </p>
                    <div class="rate">
                        类型:{{movies.movieType}}
                    </div>
                    <div class="rate" style="margin:10px 0">
                        导演:{{movies.director}}
                    </div>
                    <div class="rate">
                        演员:{{movies.actors}}
                    </div>
                </div>
            </div>
        </div>
        <div class="eachDetail">
            <Tabs value="name1">
                <TabPane label="介绍" name="name1">
                    <div class="title">
                        介绍
                    </div>
                    <p class="introduce">
                        {{movies.synopsis}}
                    </p>                    
                </TabPane>
                <TabPane label="奖项" name="name3">                    
                    <div class="prize" v-for="(item,index) in prizeList" :key="index">
                        <div class="prizeTop">   
                            <img :src="item.prizeWinnersIcon" alt="">
                            <p>
                                {{item.prizeName}}
                            </p>
                        </div>                         
                        <div class="isPrize" v-if="item.isWinner">
                            获奖:{{item.prizeWinners}}
                        </div>
                        <div class="isPrize" v-if="!item.isWinner">
                            提名:{{item.prizeWinners}}
                        </div>
                    </div>                    
                </TabPane>
                <TabPane label="图集" name="name4">图集</TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import {
    post
} from '../../tool/ajax.js'
export default {
    name:"movieDetail",
    data(){
        return{
            movies:{
                imgs:{
                    url:""
                },
                cName:"流浪地球",
                type:"科技,冒险,动作",
                country:"中国",
                duration:"120分钟",
                release:"2019-2-1",
                showingArea:"大陆",
                valueHalf: 2.5,
            },            
            performerList:[
                {   
                    url:"https://p1.meituan.net/movie/feea9fdcf930fe52f7c2a075db90bc77195799.jpg@128w_170h_1e_1c",
                    name:"吴京",
                    play:"刘培强"
                },
                {   
                    url:"https://p0.meituan.net/movie/f3fda8ab4d27d12d029bde41ff944e0a159764.jpg@128w_170h_1e_1c",
                    name:"垃圾",
                    play:"刘启"
                },
                {   
                    url:"https://p1.meituan.net/movie/c0d6af57cd3d3afc1ae1aedc126c258d190632.jpg@128w_170h_1e_1c",
                    name:"李光洁",
                    play:"王磊"
                },
                {   
                    url:"https://p1.meituan.net/movie/13d4357722d33b46a9fa52fbe8316f9633831.jpg@128w_170h_1e_1c",
                    name:"吴孟达",
                    play:"韩子昂"
                },
            ],
            prizeList:[
                {
                    prizeName:"第47届美国导演工会奖",
                    prizeWinners:"我也不晓得啥子奖",
                    prizeWinnersIcon:"https://p1.meituan.net/movie/ce2ad37250f5a456f9ee22544691ae1610876.jpg@50w_50h_1e_1c",
                    isWinner:false,//true代表获得该奖，反之只是提名改奖项
                },
                {
                    prizeName:"第47届美国导演工会奖",
                    prizeWinners:"我真的不晓得啥子奖",
                    prizeWinnersIcon:"https://p1.meituan.net/movie/ce2ad37250f5a456f9ee22544691ae1610876.jpg@50w_50h_1e_1c",
                    isWinner:false,//true代表获得该奖，反之只是提名改奖项
                }
            ]
        }
    },
    methods:{
       async getDetail(id){
            const {data} = await post("movies/detail",{_id:id}) 
            console.log(data)           
            // context.state.hotMovieList = data.data
            this.movies = data.data[0]
            this.movies.director = data.data[0].director[0]
            this.movies.actors = data.data[0].actors[0]
        }
    },
    mounted(){
        console.log(this.$route.params)
        this. getDetail(this.$route.params.id)
    }
}
</script>
<style lang='less' scoped>
    .header{
        height: 380px;
        background: url("../../assets/banner.png") no-repeat;
        background-size: cover;
        position: relative;
        .auto{
            width: 1000px;
            margin: 0 auto;
            position: absolute;
            bottom: -20px;
            left: 50%;
            margin-left: -500px;
            display: flex;
            .auto-img{
                width: 240px;
                height: 330px;
                padding: 2px;
                background: #FFF;
                margin-right: 20px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .detail-info{
                color: #FFF;
                font-size: 16px;
                p{
                    margin-bottom: 20px;
                }
                .movie-name{
                    font-size: 32px;
                    font-weight: 600
                }
                .rate{
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .eachDetail{
        width: 1000px;
        margin: 0 auto;
        margin-top: 20px;
        .title{
            padding-left: 20px;
            border-left: 4px solid #2d8cf0;
            font-size: 20px;
        }
        .introduce{
            margin: 20px 0;
            font-size: 18px; 
            text-indent:2em;
        }
        .director{
            font-size: 20px;
        }
        .performers{
            font-size: 20px;
            .performersBox{
                display: flex;
                .eachperformer{
                    font-size: 16px;
                    width: 128px;
                    text-align: center;
                    margin-right: 20px;
                }
            }            
        }
        .prize{
            font-size: 18px;
            border-bottom: 1px dashed #CCC;
            padding: 20px 0;
            .prizeTop{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                img{
                    border-radius: 50%;
                    margin-right: 20px;
                }
            }            
        }
    }
</style>
