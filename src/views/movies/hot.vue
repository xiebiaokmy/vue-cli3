<template>
    <div>
        <MovieList :title="title" :movieList = hotMovieList></MovieList>      
        <Upload            
            type="drag"
            :format="['jpg','jpeg','png']"
            :data="fromData"
            :on-format-error="handleFormatError"
            action="http://localhost:3000/imgs/upload">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
        </Upload>  
    </div>
</template>
<script>
import MovieList from '../../components/movieList'
import LineChart from '../../components/lineChart'
import PieChart from '../../components/pieChart'
import {
    mapMutations,
    mapActions,
    mapState
} from 'vuex'
export default {
    name:'hot',
    components:{MovieList},
    data(){
        return{
            title:"正在热映", 
            fromData:{
                type:1,
            }                                 
        }
    },
    computed:{
      ...mapState("movies",["hotMovieList"])
    },
    methods:{
        // ...mapMutations("movies",["getInfo"]),  
        ...mapActions("movies",["getHotList"]),   
        handleFormatError(file){
            this.$Message.error('只支持图片上传');
        }   
    },
    mounted(){
    //    this.getHotList()
    }
    
}
</script>
<style scoped lang="less">
    .chart{
        display: flex;
        justify-content: space-between;
        .haflChart{
            width: 50%;
        }
    }
</style>

