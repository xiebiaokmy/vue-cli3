<template>
<div class="root">
    <div class="questionType">
        <p>基本题型</p>
        <p>单选题</p>
        <p>多选选题</p>
        <p>问答题</p>
    </div>

    <div class="box" contenteditable="true">

    </div>
    <div class="questions">
        <SlickList :lockToContainerEdges="true" axis="y" lockAxis="y" :useDragHandle="true"  class="dragBox" v-model="items" @input="getChangeLists">
            <SlickItem v-for="(item, index) in items" class="dragItem" :index="index" :key="index">
                <!-- <div v-handle class="questionTitle handle">
                   <span class="icon">{{index+1}}</span>                   
                </div> 
                <div class="questionTitleInput" contenteditable="true">
                       
                </div> -->
                <div class="questionTitle">
                    <span class="icon">{{index+1}}</span>
                    <div class="questionTitleInput">
                        <EditDiv ref="EditDiv" v-model="item.title" :type="item.type">

                        </EditDiv>
                    </div>
                    
                    <span class="operation">
                        <b v-handle class="dargInco">
                            <img src="../../assets/drag.png" alt="">
                        </b>
                        <b class="delete">
                            <img src="../../assets/delete.png" alt="">
                        </b>
                    </span>
                </div>
                <!-- <SlickList :lockToContainerEdges="true" :useDragHandle="true"  class="list" lockAxis="y" v-model="item.itemArr">                    
                    <SlickItem class="list-item" v-for="(subitem, index) in item.itemArr" :index="index" :key="index">
                        <div v-handle class="icon handle">
                            <img src="../../assets/dragIcon.png" alt="">
                        </div>
                        <div class="sbuQuestions">
                            <span class="typeIcon " v-if="item.type == 'radio'">
                                <img src="../../assets/minus-circle.png" alt="">
                            </span>
                            <span class="typeIcon" v-if="item.type == 'checkbox'">
                                <img src="../../assets/border.png" alt="">
                            </span>
                            <div class="sbuQuestionsInput" contenteditable="true">
                            </div>
                        </div>
                    </SlickItem>
                </SlickList> -->
            </SlickItem>
        </SlickList>
    </div>
    <div>
        {{test}}
    </div>
</div>
  
</template>
 <style type="text/scss" lang="less">
    .box{
        outline: 1px solid red;
        height: 50px;
        width: 100px;
    }
    .root{
        display: flex;
        margin-top: 30px;    
    }
    .questionType{
        outline: 1px solid red;
        width: 20%;
        border: 1px solid #CCC;
        margin-right: 20px;
        p{
            width: 80%;
            margin: 0 auto;
            height: 36px;
            line-height: 36px;
            text-align: center;
            margin-bottom: 5px;
            border: 1px solid #CCC;
            border-radius: 4px;
            cursor: pointer;
        }
    }
    .questions{
        outline: 1px solid #CCC;
    }
    .dragBox{
        width: 600px;        
    }
    .dragItem{
        .questionTitle{
            display: flex
        }        
    }
    .questionTitleInput{
        width: 400px;
    }
    .stylizedHelper {
    background: blue;
    color: #fff
    }

    .SortableItem {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    box-sizing: border-box;
    user-select: none;
    color: #333;
    font-weight: 400;
    }
    .stylizedHelper {
    background: blue;
    color: #fff
    }
</style>
<script>
import { SlickList, SlickItem ,HandleDirective } from 'vue-slicksort'
import EditDiv from '../../components/editDiv'
import Bus from '../../tool/bus.js'
export default {
  name: 'Example',
  components: {
    SlickItem,
    SlickList,
    EditDiv
  },
  directives: { handle: HandleDirective },
  data () {
    return {
      flag: true,
      items: [
        {
          name: 'title1',
          type:"radio",
          title:"单选题",
          itemArr: [{
              value:"",
          }, {
              value:"",
          }, {
              value:"",
          }]
        },
        {
          name: 'title2',
          type:"checkbox",
          title:"多选题",
          itemArr: [{
              value:"",
          }, {
              value:"",
          }, {
              value:"",
          }]
        },
        {
          name: 'title3',
          type:"qaa",
          title:"问答题",
          itemArr: [{
              value:"",
          }, {
              value:"",
          }, {
              value:"",
          }]
        }
      ],
      currentType:"",
      currentValue:"",
      test:"测试消息哈哈哈"
    }
  },
  methods: {
    getChangeList (val) {
      console.log(val, 'val')
    },
    getChangeLists (vals) {
      console.log(vals, 'vals')
    },    
    changeTitle(){
        console.log("hahah")
        
    },    
  },  
}
</script>



