<template>
    <div>
        <div class="title">
            {{title}}
        </div>
        <div class="movieList">
            <div class="each" v-for="(item,index) in movieList" :key="index" @click="toDetail(item.id)">
                <img :src='item.url' alt="">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"movieList",
    props:{
        title:{
            type:String,
            required:true,
        },
        movieList:{
            type:Array,
            required:false
        }
    },
    data(){
        return {
            // title:"测试"
        }
    },
    methods:{
        toDetail(id){
            this.$router.push(`/MovieDetail/:${id}`)
        }
    }
}
</script>
<style scoped lang="less">
    .title{
        padding: 0 30px;
        height: 48px;
        line-height: 48px;
        font-size: 24px;
        border-left: 10px solid rgb(26,196,248)
    }
    .movieList{
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        .each{
            margin-right: 25px;
            p{
                text-align: center;
                font-size: 18px;
            }
        }
    }
</style>


