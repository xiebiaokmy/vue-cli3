<template>
    <div class="lineChart" :style="{ height: height + 'px'}" style="width:100%" :id="this.id"></div>
</template>
<script>  
  // 引入柱状图
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
export default {
    name:"lineChart",
    props:{
        title:{
            type:String,
            default:"柱状图"
        },
        height: {
            type: Number,
            default: 400
        },
        color:{
            type: Array,
            default: function () {
            return ['#41b883', '#1d8ce0', '#324057', '#2aab84', '#1568a6', '#2f4053']
            }
        },
        legend:{            
            type:Object,
        },
        bgColor: {
            type: String,
            default: '#fff'
        },
        // 横坐标数据
        xAxisData: {
            type: Array,
            // required: true,
            default: function () {
            return ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            }
        },
        // 纵坐标数据
        series: {
            type: Array,
            // required: true,
            default: function () {
            return [{
                name: '销量',
                type: 'pie',
                data: [5, 20, 36, 10, 10, 20]
            }]
            }
        }
    },
    data(){
        return{
            chart: null
        }
    },
    computed:{
        id(){
            return "l"+parseInt(Math.random() * 1000000)
        },
        legendData: function () {
            let legendData = []
            this.series.forEach(function (elem) {
            legendData.push(elem.name)
            })
            return legendData
        },        
    },
    methods:{
        draw(){
            // if (this.chart) {
            //     this.chart.dispose()
            // }
            this.chart = this.$echarts.init(document.getElementById(this.id))
            this.chart.setOption({
                title:{
                    text:this.title,
                    textStyle:{
                        align:"center",
                        fontSize :36
                    },
                    left:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:this.color,
                legend: {
                    icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none    
                    orient: 'vertical',
                    x: 'left',                
                    data:this.legendData,
                },
                grid:{//图表位置显示
                    left:"5%",
                    right:"5%",
                },
                xAxis: {
                    data: this.xAxisData
                },
                yAxis: {},
                series: this.series
            })
            window.addEventListener("resize", this.chart.resize);
        }
    },
    mounted: function () {
        setTimeout(()=>{
            this.draw()
        },0)
    },
    watch:{
        series: {
    　　　　 handler(newValue, oldValue) {
                this.draw()
    　　　　},
    　　　　deep: true
    　　},        
    }
}
</script>

