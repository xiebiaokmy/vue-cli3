<template>
    <div>
        <MovieList :title="title" :movieList = hotMovieList></MovieList>    
        
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
                movieId:"5c87542f9492d119fcfff30b",
                urlName:"cover",                
            }                                 
        }
    },
    computed:{
      ...mapState("movies",["hotMovieList"])
    },
    methods:{
        // ...mapMutations("movies",["getInfo"]),  
        ...mapActions("movies",["getHotList"]),  
         
    },
    mounted(){
       this.getHotList()
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

