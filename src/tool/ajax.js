import axios from 'axios'
import qs from 'qs'
import ErrorCode from './error'//封装code错误时对应的提示
import router from '../router' //这里的router 请找你对应的router
import {
    Message
} from 'iview';
const service = axios.create({
  baseURL: "http://localhost:3000/", // 封装请求地址的前缀
  timeout: 5000 // 超时时间
}) 
service.interceptors.request.use(config => {
    /**
     * 请求之前判断token是否存在或者过期，如果过期直接跳转到登陆页面，再次获取token，在这里你还可以做其他判断
     * **/   
    // if(router.currentRoute.fullPath != "/Register"){
    //   if(!sessionStorage.getItem("isLogin")) {
    //       router.push('/Login')
    //   }
    // }
    
    if (config.method === "post") {
      // 序列化,若是能直接接受json 格式,可以不用 qs 来序列化的
      config.data = qs.stringify(config.data);
    }    
    return config
  }, error => {
    loadinginstace.close()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
}) 
service.interceptors.response.use(function (response) {    
    if(response.data.code != 200){ //这里约定后台返回code为200时为正确的请求响应    
      // Message.error({  
      //   message: `${ErrorCode[response.data.code]}`//这里code不是200的时候显示自己封装的错误code提示
      // })     
      Message.error(`${ErrorCode[response.data.code]}`); 
      return {}
    }else{
      return response.data
    }
  }, function (error) {
        // 对响应错误做点什么
    return Promise.reject(error);
});
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
      let parms = {
        token:sessionStorage.getItem("token")||"25252525"
      }
      service.post(url,Object.assign(parms,data))//可以把你项目的必传项又不会发生改变的例如token 封装再这里就不用每次写token了
        .then(response => {
          resolve(response);
        }, err => {
          reject(err)
        })
        .catch(res => {
          console.log("超时处理",res)
        })
    })
  }