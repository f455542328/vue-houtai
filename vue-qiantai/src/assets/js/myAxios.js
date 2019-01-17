import Axios from 'axios'
var myaxios = {}
myaxios.install = function (vue) {
  const instance = Axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  vue.prototype.$http = instance;
}

//导出该对象
export default myaxios;