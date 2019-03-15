<template>
    <div>
        <h1>父组件</h1>
        <child ref="child" :info = "info"></child>
        <button @click="parent">点击</button>
    </div>

</template>
<script>
import child from './child'
export default {
    name:'parent',
    components:{child},
    data (){
        return {
            info:{
                name:"张三"
            }
        }
    },
    methods:{
        parent(){
            this.$refs.child.changeData()
        },
        changgeName(){
            this.info.name = "李四"
        }
    }
}
</script>

