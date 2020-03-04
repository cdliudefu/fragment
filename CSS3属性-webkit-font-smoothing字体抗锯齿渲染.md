# [CSS3属性-webkit-font-smoothing字体抗锯齿渲染](https://www.cnblogs.com/moqiutao/p/5291881.html)



对字体进行抗锯齿渲染可以使字体看起来会更清晰舒服。在图标字体成为一种趋势的今天，抗锯齿渲染使用也越来越多。

font-smoothing是非标准的CSS定义。它被列入标准规范的草案中，后由于某些原因从web标准中被移除了。

但是，我们可以用以下两种定义进行抗锯齿渲染

```
-webkit-font-smoothing: antialiased; /*chrome、safari*/

-moz-osx-font-smoothing: grayscale;/*firefox*/
```

**（1）Webkit在自己的引擎中支持了这一效果。**

-webkit-font-smoothing它有三个属性值：

- **none：**对低像素的文本比较好
- **subpixel-antialiased**：默认值
- **antialiased**：抗锯齿很好 

例子：

```
body{
   -webkit-font-smoothing: antialiased;
}
```

这个属性可以使页面上的字体抗锯齿,使用后字体看起来会更清晰。加上之后就顿时感觉页面小清晰了。

**（2）Gecko也推出了自己的抗锯齿效果的非标定义。**

-moz-osx-font-smoothing: inherit | grayscale;这个属性也是更清晰的作用。

例子：

```
.icon {
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}
```

**（3）Ionic框架在样式中多加了一条font-smoothing: antialiased;**

这是坐等font-smoothing标准化，有备无患么。
