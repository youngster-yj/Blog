let ipUrl = 'https://www.jsfan.net/'
const ipUrlCookie = 'https://www.jsfan.net:2998/'
//http://localhost:3000/
//https://www.jsfan.net/
//https://www.jsfan.net:2998/
let servicePath = {
    //前台
    getArticleList : ipUrl+'getArticleList',//首页接口(已用)
    getArticleByName : ipUrl+'getArticleByName',//详细页接口(已用)
    getTypeInfo : ipUrl+'getTypeInfo',//文章类别接口
    getListById : ipUrl+'getListById',//根据类别ID获取文章列表
    uploadpinglun : ipUrl+'uploadpinglun',//上传评论(已用)
    getpinglunbytitle : ipUrl+'getpinglunbytitle',//根据文章标题获取评论(已用)
    savepinglunin : ipUrl+'savepinglunin',//上传前台评论里的评论(已用)
    getpinglunbyid : ipUrl+'getpinglunbyid',//获取前台评论里的评论(已用)
    clickpraise : ipUrl+'clickpraise', //前台点赞(一级评论已用)
    clickpraisetwo : ipUrl+'clickpraisetwo', //前台点赞(二级评论已用)
    //后台
    //checkLogin : ipUrl+'checkLogin',//检查用户名和密码(已用)=>已启用3003端口session
        //session登录加密
        checkMaster : ipUrlCookie + 'checkMaster',//检查是否存在这样的cookie
        checkLogin : ipUrlCookie + 'checkLogin',//设置cookie
        //session登录加密
    adminTypeInfo : ipUrl+'adminTypeInfo',//获得文章类别信息
    upload : ipUrl+'upload', //文件上传(已用)
    getAll : ipUrl+'moviesandimg', //获取服务器已存取的movies和images(已用)
    uploadBlog : ipUrl+'uploadblog', //发布博客(已用)
    changeBlogList : ipUrl+'changeBlogList', //文章列表(已用)
    deleteBlog : ipUrl+'deleteBlog', //发布文章删除(已用)
    changeBlog : ipUrl+'changeBlog', //根据文章名修改文章(已用)
    saveBlog : ipUrl+'saveBlog', //暂存文章(已用)
    changeSaveList : ipUrl+'changeSaveList', //暂存文章列表(已用)
    deleteSaveBlog : ipUrl+'deleteSaveBlog', //删除暂存文章(已用)
    getSaveByName : ipUrl+'getSaveByName', //暂存页根据文章名修改文章(已用)
    uploadsaveBlog : ipUrl+'uploadsaveBlog', //暂存文章更新存储(已用)
    getpinglun : ipUrl+'getpinglun', //后台评论拉取(第一层)(已用)
    delpinglun : ipUrl+'delpinglun', //后台评论删除(第一层)(已用)
    getpinglunTwo : ipUrl+'getpinglunTwo', //后台评论拉取(第二层)(已用)
    delpinglunTwo : ipUrl+'delpinglunTwo', //后台评论删除(第二层)(已用)
    //---后续扩展
    topBlog : ipUrl+'topBlog', //后台置顶功能(已用)
    cancletopBlog : ipUrl + 'cancletopBlog', //后台取消置顶功能(已用)
    notEnter : ipUrl+ 'notEnter', //后台控制游客不可进入文章详情页(已用)
    allowEnter : ipUrl + 'allowEnter', //后台控制游客可进入文章详情页(已用)
    //---后续扩展
    //---友链控制
    saveFriendLink : ipUrl +'saveFriendLink', //前台友链存储
    getPassFriendLink : ipUrl + 'getPassFriendLink', //获取通过审核的友链
    deletFriendLink : ipUrl + 'deletFriendLink', //删除友链
    agreeFriendLink : ipUrl + 'agreeFriendLink', //同意成为友链 
    isClickLink : ipUrl + 'isClickLink', //是否可点击跳转
    topLink : ipUrl + 'topLink', //友链置顶
    cancletopLink : ipUrl + 'cancletopLink', //取消友链置顶
    updataFriendLink : ipUrl + 'updataFriendLink', //更新友链
    //---友链控制
    //---互动页
    wechatpinglun : ipUrl + 'wechatpinglun', //互动页评论存储(第一层)(已用)
    getwechatpinglun : ipUrl + 'getwechatpinglun', //互动页评论存储(第一层)(已用)
    wechatpinglunTwo : ipUrl + 'wechatpingluntwo', //互动页评论存储(第二层)(已用)
    wechatclickpraise : ipUrl + 'wechatclickpraise', //互动页点赞(一级评论已用)
    wechatclickpraisetwo : ipUrl + 'wechatclickpraisetwo', //互动页点赞(二级评论已用)
    delwechat : ipUrl+'delwechat', //删除评论(已用)
    //---互动页
    //---记录页
    getallpinglun : ipUrl+'getallpinglun', //获取所有评论(文章评论一二级与互动评论)
    //---记录页
    //---首页点赞
    getmainlove : ipUrl + 'getmainlove', //获取点赞数量
    savemainlove : ipUrl + 'savemainlove', //修改点赞
    //---首页点赞
        //---长链接转短链接
        urlchange : ipUrl + 'longtoshortlink',
        //---长链接转短链接
            //---qq登录
    loginqq : ipUrl + 'getlogqqinfo',
    getalllogqqinfo : ipUrl + 'getalllogqqinfo',//获取所有登录者信息
    dellogqqinfo : ipUrl + 'dellogqqinfo',//删除登录者信息(避免重复)
    //---qq登录
    //---ReactNative---
    getmainmovies : ipUrl + 'getmainmovies',//获取RN首页视频
    gettopmovies : ipUrl + 'gettopmovies',//获取RN上方视频
    getbottommovies : ipUrl + 'getbottommovies',//获取RN下方视频
    addrnmovie : ipUrl + 'addrnmovie',//存储视频
    delrnmovie : ipUrl + 'delrnmovie',//删除视频
    uprnmovie : ipUrl + 'uprnmovie',//更新视频
    getrnuri : ipUrl + 'getrnuri',//获取所有需审核视频
    passmovie : ipUrl + 'passmovie',//审核视频通过
    nopassmovie : ipUrl + 'nopassmovie',//视频审核不通过
    getrnpinglun : ipUrl + 'getrnpinglun',//获取评论
    delrnpinglun : ipUrl + 'delrnpinglun',//删除评论
    //---ReactNative---
}

export default servicePath