<template>
    <div>
        <p style="margin-bottom:10px; text-align:center">今日票房排名</p>
        <Table border :columns="columns1" :data="data1"></Table>
        <LineChart :xAxisData = xAxisData :series=series :title=title></LineChart> 
    </div>
</template>
<script>
import LineChart from '../../components/lineChart'
import {
    post
} from '../../tool/ajax.js'
export default {
    name:"realTime",
    components:{LineChart},
    data () {
        return {
            columns1: [
                {
                    title: '电影名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '当日排片',
                    key: 'shipFormation',
                    align: 'center'
                },
                {
                    title: '当日人次',
                    key: 'personTime',
                    align: 'center'
                },
                {
                    title: '当日预售票房',
                    key: 'advanceSale',
                    align: 'center'
                },
                {
                    title: '实时累积票房',
                    key: 'cumulative',
                    align: 'center'
                },
            ],
            data1: [],
            title:'国内历史票房前五(单位亿)',
            xAxisData:[],
            series:[{
                name: '票房',
                type: 'bar',
                data: []
            }]
        }
    },
    methods:{
        async getInfo(){
            const {data} = await post("reptile/getInfo")    
            this.data1 = data.data[0].realTimeData
            const historyData = data.data[0].historyData            
            historyData.map((item)=>{
                this.xAxisData.push(item.name)
                this.series[0].data.push(parseFloat(item.value))
            })
        },        
    },
    mounted(){
        this.getInfo()
    }
}
</script>
<style lang="less" scoped>

</style>

