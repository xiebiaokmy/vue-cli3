<template>
    <div class="pieChart" :style="{height:height+'px'}" :id="this.id" style=width:100%></div>
</template>
<script>
  // 引入饼状图
  require('echarts/lib/chart/pie')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
export default {
    name:"pieChart",
    props:{
        title:{
            type:String,
            default:"饼状图"
        },
        height: {
            type: Number,
            default: 400
        },
        data:{
            type:Array,
            default:function(){
                return [
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        },
        tooltipName:{
            type:String,
            default:"统计图"
        },        
        color:{
            type:Array,
            default:function(){
                return ['#41b883', '#1d8ce0', '#324057', '#2aab84', '#1568a6', '#2f4053']
            }
        },               
    },
    data(){
        return{
            chart:null
        }
    },
    computed:{
        id:function(){
            return  "p"+parseInt(Math.random() * 1000000)
        },
        legendData:function(){
            let data = []
            this.series.data.forEach(element => {
                data.push(element.name)
            });
            return data
        },
        series:function(){           
            return {
                name:this.tooltipName,
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:this.data
            }
        },
    },
    methods:{
        draw(){
            // if (this.chart) {
            //     this.chart.dispose()
            // }
            this.chart = this.$echarts.init(document.getElementById(this.id))
            this.chart.setOption({
                    title : {
                        text: this.title,
                        x:'center'
                    },
                    color:this.color,
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend:{
                        orient: 'vertical',
                        x: 'left',
                        data:this.legendData
                    },
                    series:this.series
            })
            window.addEventListener("resize", this.chart.resize);
        }
    },
    mounted(){
        setTimeout(()=>{
            this.draw()
        })
    },
    watch:{
        data: {
    　　　　 handler(newValue, oldValue) {
                this.draw()
    　　　　},
    　　　　deep: true
    　　},        
    }
}
</script>
