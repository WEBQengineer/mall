const formValidation = {
  mobile: (value) => {
    const reg = /^[1-9]\d{10}$/
    return new Promise((resolve,reject)=>{
      if(!reg.test(value)) {
        reject('请输入正确的手机号!!!')
      } else {
        resolve();
      }
    })
  },
  province: (checkedItem) =>{
    return new Promise((resolve,reject)=>{
      if(!checkedItem.receiverProvince) {
        reject('请输入省份')
      } else {
        resolve();
      }
    })
  },
  city: (checkedItem) =>{
    return new Promise((resolve,reject)=>{
      if(!checkedItem.receiverCity) {
        console.log('sdafsadfasdfasdf')
        reject('请输入市')
      } else {
        resolve();
      }
    })
  },
  district: (checkedItem) =>{
    return new Promise((resolve,reject)=>{
      if(!checkedItem.receiverDistrict) {
        reject('请输入区')
      } else {
        resolve();
      }
    })
  },
  address: (checkedItem) =>{
    return new Promise((resolve,reject)=>{
      if(!checkedItem.receiverAddress) {
        reject('请输入详细地址')
      } else {
        resolve();
      }
    })
  }
}

export default formValidation