React 专注于 view 层，组件化则是 React 的基础，也是其核心理念之一，一个完整的应用将由一个个独立的组件拼装而成。

截至目前 React 已经更新到 v15.4.2，由于 ES6 的普及和不同业务场景的影响，我们会发现目前主要有三种创建 React 组件的写法：**1**. ES5写法React.createClass，**2**. ES6写法React.Component，**3**. 无状态的函数式写法（纯组件-SFC）。

你们最钟爱哪种写法呢？萝卜青菜各有所爱~ 每个团队都有自己的代码规范和开发模式，但书写 React 组件时 都会以提高代码阅读性、更优的组件性能、易于 bug 追踪为原则。下面我们就聊聊这三种写法的区别，以及各自所适用场景的最佳实践。

## ES5-写法 React.createClass

React.createClass不用多说，我们最早使用这个方法来构建一个组件“类”，它接受一个对象为参数，对象中必须声明一个render方法，render返回一个组件实例，下面用一个 SwitchButton 组件的例子来看看React.createClass的具体用法：

```
 1 var React = require('react');
 2 var ReactDOM = require('react-dom');
 3 
 4 var SwitchButton = React.createClass({
 5   getDefaultProp:function() {
 6     return { open: false }
 7   },
 8 
 9   getInitialState: function() {
10     return { open: this.props.open };
11   },
12 
13   handleClick: function(event) {
14     this.setState({ open: !this.state.open });
15   },
16 
17   render: function() {
18     var open = this.state.open,
19       className = open ? 'switch-button open' : 'btn-switch';
20 
21     return (
22       <label className={className} onClick={this.handleClick.bind(this)}>
23         <input type="checkbox" checked={open}/>
24       </label>
25     );
26   }
27 });
28 
29 ReactDOM.render(
30   <SwitchButton />,
31   document.getElementById('app')
32 );
```

## ES6-写法 React.Component

React 升级到 v0.13 后就支持了 ES6 的class语法，我们可以使用class App extends React.Component{...}的方式创建组件，这也是目前官方推荐创建有状态组件的方式。用 ES6 重写上面 SwitchButton 组件的例子：

```
 1 import React from 'react'
 2 import { render } from 'react-dom'
 3 
 4 class SwitchButton extends React.Component {
 5   constructor(props) {
 6     super(props)
 7     this.state = {
 8       open: this.props.open
 9     }
10     this.handleClick = this.handleClick.bind(this)
11   }
12 
13   handleClick(event) {
14     this.setState({ open: !this.state.open })
15   }
16 
17   render() {
18     let open = this.state.open,
19       className = open ? 'switch-button open' : 'btn-switch'
20 
21     return (
22       <label className={className} onClick={this.handleClick}>
23         <input type="checkbox" checked={open}/>
24       </label>
25     )
26   }
27 }
28 
29 SwitchButton.defaultProps = {
30   open: false
31 }
32 
33 render(
34   <SwitchButton />,
35   document.getElementById('app')
36 )
```

与React.createClass创建组件的不同之处：

**import**
与这里使用了 ES6 的import语句替代require()方法导入模块，其中import {render}可以直接从模块中导入变量名，这种写法更加简洁直观。

 

**初始化 state**
React 使用 ES6 的“类”继承实现时，去掉了getInitialState这个 hook 函数，state的初始化放在构造函数方法constructor中声明。

**this 绑定**
React.Component创建组件时，事件函数并不会自动绑定this，需要我们手动绑定，不然this将不会指向当前组件的实例对象。以下有三种绑定this的方法：

 

**1**. 在constructor中使用bind()进行硬绑定

```
constructor() {
  this.handleClick = this.handleClick.bind(this);
}
```

**2**. 直接在元素上使用bind()绑定

```
<label className={className} onClick={this.handleClick.bind(this)}>
```

**3**. ES6 有个很有用的语法糖：Arrow Function（箭头函数）它可以很方便的使this直接指向class SwitchButton（它的作用等同于大家熟悉的var self = this，但后者会让代码变得混乱，Arrow Function 就很好的解决了这一问题）

```
<label className={className} onClick={()=>this.handleClick()}>
```

## 无状态的函数式写法（纯组件 SFC）

React.createClass和React.Component都可以用来创建有状态的组件，而 **无状态组件** - Stateless Component 是 React 在 v0.14 之后推出的。

它的出现 是因为随着应用复杂度不断提升和组件本数量的增加，组件按各自职责被分成不同的类型，于是有一种只负责展示的纯组件出现了，它的特点是不需要管理状态state，数据直接通过props传入，这也符合 React 单向数据流的思想。

 

对于这种无状态的组件，使用函数式的方式声明，会使得代码的可读性更好，并能大大减少代码量，Arrow Function 则是函数式写法的最佳搭档：

```
1 const Todo = (props) => (
2   <li
3     onClick={props.onClick}
4     style={{textDecoration: props.complete ? "line-through" : "none"}}
5   >
6     {props.text}
7   </li>
8 )
```

上面定义的 Todo 组件，输入输出数据完全由props决定，而且不会产生任何副作用。对于props为 Object 类型时，我们还可以使用 ES6 的解构赋值：

```
1 const Todo = ({ onClick, complete, text, ...props }) => (
2   <li
3     onClick={onClick}
4     style={{textDecoration: complete ? "line-through" : "none"}}
5     {...props}
6   >
7     {props.text}
8   </li>
9 )
```

无状态组件一般会搭配高阶组件（简称：OHC）一起使用，高阶组件用来托管state，Redux 框架就是通过 store 管理数据源和所有状态，其中所有负责展示的组件都使用无状态函数式的写法。

这种模式被鼓励在大型项目中尽可能以简单的写法 来分割原本庞大的组件，而未来 React 也会面向这种无状态的组件进行一些专门的优化，比如避免无意义的检查或内存分配。所以建议大家尽可能在项目中使用无状态组件。

当然，无状态组件也不是万金油，比如它不支持"**ref**"，原因很简单，因为 React 调用它之前，组件不会被实例化，自然也就没有"ref"，（ref和findDOMNode实际上打破了父子组件之间仅通过 props 来传递状态的约定，违背了 React 的原则，需要避免）。

## 以上三种写法的比较，以及最佳实践

Facebook 官方早就声明 ES6React.Component将取代React.createClass。随着 React 不断发展，React.createClass暴露出一些问题：

- 相比React.Component可以有选择性的绑定需要的函数，React.createClass会自动绑定函数，这样会导致不必要的性能开销。
- React.createClass亲生的 **mixin**，React.Component不再支持，事实上 mixin 不够优雅直观，替代方案是使用更流行的高阶组件-**HOC**，如果你的项目还离不开 也可以使用 [react-mixin](https://github.com/brigand/react-mixin)

总的来说：无状态函数式写法 优于React.createClass，而React.createClass优于React.Component。

