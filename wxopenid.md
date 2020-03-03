微信中的APP、公众号、小程序的openid及unionid介绍
微信中的APP、公众号、小程序的openid及unionid介绍
1、unionid
如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。

2、openid
     同一个应用（App、公众号、小程序）的同一个用户有唯一的openid，

     openid是微信通过  appid+secret+微信号 生成的，是不变的，保证开发者能够通过此openId辨认出同个用户，相当于数据库表的user表的id

     微信官方文档之获取用户OPENID机制：

     https://wiki.open.qq.com/wiki/mobile/%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7OpenID

3、微信中的用户微信标识：微信号

4、微信昵称不唯一

 

备注：

微信官方文档之union机制：

https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html

 UnionID 机制说明

如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。

UnionID获取途径
绑定了开发者帐号的小程序，可以通过以下途径获取 UnionID。

调用接口 wx.getUserInfo，从解密数据中获取 UnionID。注意本接口需要用户授权，请开发者妥善处理用户拒绝授权后的情况。

如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。开发者可以直接通过 wx.login + code2Session 获取到该用户 UnionID，无须用户再次授权。

如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。开发者也可以直接通过 wx.login + code2Session 获取到该用户 UnionID ，无须用户再次授权。

用户在小程序（暂不支持小游戏）中支付完成后，开发者可以直接通过getPaidUnionId接口获取该用户的 UnionID，无需用户授权。注意：本接口仅在用户支付完成后的5分钟内有效，请开发者妥善处理。

小程序端调用云函数时，如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号，可在云函数中通过 cloud.getWXContext 获取 UnionID。

小程序端调用云函数时，如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用，也可在云函数中通过 cloud.getWXContext 获取 UnionID。
https://www.cnblogs.com/micua/p/wechat-weapp-essential.html
