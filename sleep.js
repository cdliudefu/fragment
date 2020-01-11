//第一种：通过promise
const sleep = time=>{
 return new Promise(resolve=>setTimeout(resolve,time))
}
//sleep(1000).then(()=>{})

//第二种：通过生成器相结合
function* sleep(time){
 yield new Promise((resolve,reject)=>{
    setTimeout(resolve,time)
 })
}
//sleep(1000).next().value.then(()=>{console.log('====sleep')})

//第三种：通过async/await
async function sleep(time){
 let p = await new Promise(resolve=>setTimeout(resolve,time))
 return p;
}
//sleep(1000).then(()=>{console.log('====sleep')})

//第四种：通过es5实现
function sleep(callback,time){
  if(typeof callback==='function'){
    setTimeout(callback,time)
  }
}
// sleep(()=>{console.log('====sleep')},2000)
