<template>
    <div>
        <p>子组件</p>
        <p>{{data}}</p>
        <p>姓名:{{info.name}}</p>
        <button @click="changeName">改变姓名</button>
    </div>
</template>
<script>
export default {
    name:'child',
    props:["info"],
    data (){
        return {
            data:1,
        }
    },
    methods:{
        changeData(){
            this.data += 1
        },
        changeName(){
            this.$parent.changgeName()
        }
    }
}
</script>
