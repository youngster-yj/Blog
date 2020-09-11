<h1 class='hcenter'>Youngster_yj'Blog详解</h1>
<h3 class='hcenter'>项目使用</h3>

#### 项目拉取：
    cd 项目根目录
    npm i //安装依赖包
    npm start //启用
#### 博客PC端与移动端部分页面展示
<img src='http://www.jsfan.net:3000/upload/myblogindex.png' width= 700px >
<img src='http://www.jsfan.net:3000/upload/rnblog22.jpg' height= 500px >

#### src目录下前台主体详解：
    App.js //前台路由页面
    Blog.js //详情页面
    index.js (下面为index内容,转入到App.js,无太大意义)
---
         import React from 'react';
         import ReactDOM from 'react-dom';
         import App from './App'; 
         ReactDOM.render(<App />, 
         document.getElementById('root'));
----
     Life.js //生活分享页面
     Main.js //首页
     Movies.js //实战页面

     ps:
         1.config文件夹内为域名请求Api
         2.images文件夹内为本地资源
         3.style文件夹内为前台样式
#### 实际样式
<img src='http://39.96.67.38:3000/upload/3O`GC(}GULM2I~Z56[BY}RT.png' height= 200px >

-----
<br/>


#### src目录下前台组件详解：
    -components // 组件文件夹
         Advert.js //广告组件
         Author.js //作者介绍组件
         Comment.js //详情页评论人组件
         Drawer.js //响应式抽屉组件
         Footer.js //页面底部组件
         Header.js //页面导航条组件
         Pinglun.js //详情页评论组件
         Skills.js //作者技能介绍组件
#### 实际样式
<img src='http://39.96.67.38:3000/upload/$C@G``1QL6B28$ZL5C@]D2M.png' height= 200px >


----
<br/>

#### src目录下后台文件详解：
    -admin //后台文件夹
         -style //后台样式文件夹
         AddArticle.js //文章增添管理页面
         App.js //后台路由页面
         ArticleList.js //文章列表管理页面
         ChangeArticle.js //文章修改管理页面
         Comment.js //评论管理页面
         Index.js //后台主页
         Login.js //登录页面
         SaveArticle.js //文章暂储管理页面
         Upload.js //文件上传管理页面
#### 实际样式
<img src='http://39.96.67.38:3000/upload/]RGAPR]3$H7PL414UV~W9`4.png' height= 200px>
            
<br/>
<h3 class='hcenter'>后台功能介绍</h3>
<br/>

#### 1.资源上传页面

<img src='http://39.96.67.38:3000/upload/0AGW9~1@C5_}}5]V)R8JFGU.png' width='100%' >


#### (1).支持文件上传(点击上传或拖拽上传)
#### (2).拥有上传进度
#### (3).上传成功后同时分类返回视频、音乐、图片(GIF)外链
#### (4).支持遍历服务器文件并返回符合要求文件的外链
<br/>

#### 2.文章管理页面
<img src='http://39.96.67.38:3000/upload/NHVK`M9PFF8FC$SK@2LLE@8.png' width='100%' >

------
<img src='http://39.96.67.38:3000/upload/T5MNQO53GS_C97$73ER{8MV.png' width='100%' >

#### (1).支持添加文章
#### (2).支持修改(删除)文章
#### (3).支持暂存文章
#### (4).支持预期发布
#### (5).可查看文章浏览量(为真实不做修改功能)
<br/>

#### 3.留言管理页面
<img src='http://39.96.67.38:3000/upload/)FR5XD3@O$3{(0@8[OR7N@W.png' width='100%' >

#### (1).可控所有留言
#### (2).一二级评论分离显示
#### (3).可显评论所有信息(为真实不做修改功能)

---
<h4 class='hcenter'>- -本Blog前后端将陆续开源至本人GitHub且持续优化更新,如想参考本博客源码可留言索要或催促- -</h4>
<h6 class='hcenter'>Thanks to JSPang AntdUI</h4>






