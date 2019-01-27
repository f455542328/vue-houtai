import Axios from 'axios'
var myaxios = {}
myaxios.install = function (vue) {
  const instance = Axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  instance.interceptors.request.use(function(config){
    if(config.url !== 'login'){
        //  instance.defaults.headers.Authorization = window.localStorage.getItem('token'); 
        config.headers.Authorization = window.localStorage.getItem('token'); 

    }
    return config;
  });
  vue.prototype.$http = instance;
}

//导出该对象
export default myaxios;