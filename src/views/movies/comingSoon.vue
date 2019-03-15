<template>
    <div>
        <MovieList :title=title :movieList = commingSoonList></MovieList>
    </div>
</template>
<script>
import MovieList from '../../components/movieList'
import {
    mapMutations,
    mapActions,
    mapState
} from 'vuex'
export default {
    name:"comingSoon",
    components:{
        MovieList
    },
    data(){
        return {
            title:"即将到来",
            list:[
                {
                    id:"003",
                    name:"阿丽塔：战斗天使",
                    url:"https://p0.meituan.net/movie/fc4dd6cd0c6f7db566a128cc05c475355664427.jpg@160w_220h_1e_1c"
                },
                {
                    id:"004",
                    name:"绿皮书",
                    url:"https://p1.meituan.net/movie/c9b280de01549fcb71913edec05880585769972.jpg@160w_220h_1e_1c"
                }
            ]
        }
    },
    computed:{
        ...mapState("movies",["commingSoonList"])
    },
    methods:{
        ...mapActions("movies",["getCommingSoonList"])
    },
    mounted(){
        this.getCommingSoonList()
    }
}
</script>
