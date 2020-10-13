/**
 * Storage封装
 */
const  STORAGE_KEY = 'mall';
export default{
  newPromise(){

    return new Promise(function (resolve) {
      let panDuan = false;
      setTimeout(() => {
        console.log('settimeout执行！')
        panDuan = true;
      }, 10000);
        // 一些比较耗时异步操作
      if(panDuan) {
        resolve();
      } else {
        console.log('newPromise',panDuan)
      }
    });

    // Promise.reject('出错了');


    // const p = new Promise((resolve, reject) => reject('出错了'))
    // p.then(null, function (s) {
    //   console.log(s)
    // });
  },

  
  // 存储值
  setItem(key,value,module_name){
    if (module_name){
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    }else{
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 获取某一个模块下面的属性。user下面的userName
  getItem(key,module_name){
    if (module_name){
      let val = this.getItem(module_name);
      if(val) return val[key];
    }
    return this.getStorage()[key];
  },
  getStorage(){
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, module_name){
    let val = this.getStorage();
    if (module_name){
      if (!val[module_name]) {
        return;
      }
      delete val[module_name][key];
    }else{
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}