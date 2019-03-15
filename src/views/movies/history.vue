<template>
    <div>
        <MovieList :title=title :movieList = historyList></MovieList>
    </div>
</template>
<script>
import MovieList from '../../components/movieList'
import{
    mapMutations,
    mapActions,
    mapState
} from 'vuex'
export default {
    name:"historyList",
    components:{MovieList},
    data(){
        return{
            title:"历史好剧"
        }
    },
    computed:{
        ...mapState("movies",["historyList"])
    },
    methods:{
        ...mapActions("movies",["getHistoryList"])
    },
    mounted(){
        this.getHistoryList()
    }    
}
</script>
<style>

</style>

