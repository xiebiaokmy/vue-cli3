<template>
    <div class="edit-div"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="blur"
         @input="changeText">
         <div>
             haha
         </div>
    </div>
</template>
<script type="text/ecmascript-6">
import Bus from '../tool/bus.js'
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: ''//radio单选，checkbox多选，qaa问答
            },
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false,
                // value:this.value
            }
        },
        watch: {
            'value'(){
                if (!this.isLocked || !this.innerText) {  
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                // console.log('11111111')
                // console.log("in",this.$el.innerHTML)
                // this.$emit('input', this.$el.innerHTML);
            },
            blur(){
                this.isLocked = false
                if(!this.$el.innerHTML){
                    if(this.type == "radio"){
                        this.$el.innerText = "单选题"
                        this.innerText = "单选题"                       
                    }else if(this.type == "checkbox"){
                        this.$el.innerText = "多选题"
                        this.innerText = "多选题"
                    }else if(this.type == "qaa"){
                        this.$el.innerText = "问答题"
                        this.innerText = "问答题"
                    }                    
                }  
                console.log(this.innerText)
                this.$emit('input', this.$el.innerText);     
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/scss">
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        border: 1px solid rgb(14,96,224);

        &[contenteditable=true]{
            user-modify: read-write-plaintext-only;
            &:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
    }
</style>