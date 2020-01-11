//定义一个集合，把所有的观察这函数放进这个集合中
const observers = new Set()

//定义观察者函数，添加订阅的观察者
const observe = fn =>observers.add(fn)

//定义观察对象，通过代理拦截监听对象的变化,然后自动通知订阅者
const observable = obj=>new Proxy(obj,{
 set(target,key,value,recevier){
  const result = Reflect.set(target,key,value,recevier)
  //通知所有的订阅者
  observers.forEach(observer=>observer())
  return result
 }
})

//demo
const person = {name:'zhangsan',age:20} // 观察者目标对象
function print(){                       // 观察者或订阅者
console.log(`${person.name}--${person.age}`)
}
//订阅目标
observable(person)
//订阅
observe(print)

person.name='lisi'
