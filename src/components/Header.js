import React, { Component } from 'react';
import '../style/components/header.css'
import { Affix,Drawer, Row, Col, Menu, Icon, message,Modal,Tooltip } from 'antd'

import {
    Link,         //<a> Link to
    Route,        //路由
    BrowserRouter as Router, //所有的dom都包含在Router(根节点)
    Switch,       //处理无匹配路由
    Redirect,     //重定向
    Prompt        //弹窗
} from 'react-router-dom'
import DrawerComponents from './Drawer'
import store from '../store/index' //redux使用

var toPlay = false //更改进入页面播放状态
var toDark = false //更改进入页面黑暗主题
var isOpen = true //进入则弹窗

const {confirm} = Modal

//xs<576px sm≥576px md≥768px lg≥992px xl≥1200px xxl≥1600px
//antd是24栅格化布局 给它24意味着占满
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, placement: 'left', isopen:false,def:store.getState().defstyle,
            isdark:true,
        }
        store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    showDrawer() {
        this.setState({
            visible: true, 
        })
        const action ={ //redux 抽屉横推
            type:'changedrawerstyle',
            value:true
        }
        store.dispatch(action) 
    }
    onClose() {
        this.setState({
            visible: false,
        })
        const action ={ //redux 抽屉横推
            type:'changedrawerstyle',
            value:false
        }
        store.dispatch(action) 
    }
    music(){
        confirm({
            title:'博主温馨提示:',
            content:'建议手机端进入,电脑端未完全匹配,是否准备就绪？',
            onOk(){
                window.location.href= 'http://www.jsfan.net:3002/#/'
                // props.push('http://www.jsfan.net:3002/#/')
            },
            onCancel(){
               message.success('感谢包容')
            }
        })
    }
    qqlogin(){
        confirm({
            title:'博主温馨提示:',
            content:'QQ登陆后，所有文章皆可浏览，是否登录？',
            onOk(){
                window.location.href= 'https://www.jsfan.net/qq_login'
                // props.push('http://www.jsfan.net:3002/#/')
            },
            onCancel(){
               message.success('取消登录')
            }
        })
    }
    wechat(){
        confirm({
            title:'博主温馨提示:',
            content:<div><img src="https://www.jsfan.net/upload/socket.png" alt="图片获取失败" style={{width:"100%"}}/>
            <p>本聊天室为实时聊天，需与被聊天者同时在线，支持群聊与私聊，且可传输5M以下图片、音乐、视频、文字，如大小超越将有断链风险,是否进入Jsfan聊天室？</p></div>,
            onOk(){
                window.open("http://www.jsfan.net:3002/chat")
            },
            onCancel(){
               message.success('感谢包容')
            }
        })
    }
    rnmovie(){
        confirm({
            title:'博主温馨提示:',
            content:'此APP为安卓应用,需手机安装,是否准备就绪？',
            onOk(){
                window.location.href= 'https://www.jsfan.net/rnapk/ReactNative.apk'
            },
            onCancel(){
               message.success('感谢包容')
            }
        })  
    }
    componentWillMount(){
        if(localStorage.musicplay=='false'){
            toPlay = false
        }
        
        //黑暗控制
        if(toDark){
            let cry = document.getElementsByTagName('html')[0]
            console.log(cry)
            cry.style.filter='gray'
            cry.style.filter='grayscale(100%)'
           }
           if(!isOpen){//控制弹窗只打开一次
             this.setState({
                 isdark:false
           })
        }
        console.log(this.getCookie('qqname'))
    }
    getCookie(cookie_name) {
        var allcookies = document.cookie;
		//索引长度，开始索引的位置
        var cookie_pos = allcookies.indexOf(cookie_name);

        // 如果找到了索引，就代表cookie存在,否则不存在
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可
            //计算取cookie值得开始索引，加的1为“=”
            cookie_pos = cookie_pos + cookie_name.length + 1; 
            //计算取cookie值得结束索引
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            
            if (cookie_end == -1) {
                cookie_end = allcookies.length;

            }
            //得到想要的cookie的值
            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
        }
        else{
            var value = '未找到'
        }
        return value;
    }
    handleOk = () => {
        let audio = document.getElementById('audio')
        audio.src='https://www.jsfan.net/upload/悲伤纯音乐.mp3'    
        if(document.title!='互动页 | Youngster_yj的个人博客'){
            audio.play()
        }
        this.setState({
            isdark: false,
        });
        toDark = true//开启哀悼
        isOpen = false//不再显示弹窗
        let cry = document.getElementsByTagName('html')[0]
        cry.style.filter='gray'
        cry.style.filter='grayscale(100%)'
      };
    handleCancel = () => {
        this.setState({
            isdark: false,
        });
        toDark = false//关闭哀悼
        isOpen = false//不再显示弹窗
    };

    playmusic(){ 
        let audio = document.getElementById('audio')
        if(toPlay==true){
            localStorage.musicplay=false
            audio.pause()
            toPlay=false
        }
        else{
            localStorage.musicplay=true
            audio.play()
            toPlay=true
        }
    }
    componentDidMount(){
        let audio = document.getElementById('audio')

        // console.log(window.screen.width/2)
if(toDark){
    audio.src='https://www.jsfan.net/upload/悲伤纯音乐.mp3'
}
else{
    if(document.title=='首页 | Youngster_yj的个人博客'){
        audio.src='https://www.jsfan.net/upload/Fade.mp3'
    }
            if(document.title=='生活页 | Youngster_yj的个人博客'){
                audio.src='https://www.jsfan.net/upload/%E8%B7%A8%E8%B6%8A%E5%8D%83%E5%B1%B1.mp3'
            }
            if(document.title=='关于页 | Youngster_yj的个人博客'){
                audio.src='https://www.jsfan.net/upload/江上清风游.mp3'
            }     
            if(document.title=='记录页 | Youngster_yj的个人博客'){
                audio.src='https://www.jsfan.net/upload/Frontier.mp3'
            }
            if(document.title=='图库页 | Youngster_yj的个人博客'){
                audio.src='https://www.jsfan.net/upload/Frontier.mp3'
            }
}   

            
        if(toPlay&&window.screen.width>=770&&document.title!='互动页 | Youngster_yj的个人博客'){
            audio.play()
        }
        if(window.screen.width>=770){//document.title!='生活页 | Youngster_yj的个人博客'&&
            audio.addEventListener('play', this.playMusicO(), false)
        }
        

        // 滚动条监听导航滑动消失与出现
        var scrollheight = 0
        window.onscroll= function(){
            //变量t是滚动条滚动时，距离顶部的距离
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            var scrollup = document.getElementById('scrolldisplay');
            //当滚动到距离顶部200px时，返回顶部的锚点显示
            
            if(t>=200){
                if(t-scrollheight<0){
                scrollup.style.marginTop='0'
                scrollheight = t
                }
                else{
                scrollup.style.marginTop='-3.2rem'
                scrollheight = t 
                }
            }else{          //恢复正常
                scrollup.style.marginTop='0'
                scrollheight = t
            }
        }
    }

    playMusicO(){
        var yj = document.getElementById("yj"); //文字
        let audio = document.getElementById('audio')
        let context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)(); //实例化AudioContext对象
        if (!context) {
            alert("您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试，另外本人强烈建议使用谷歌浏览器！")
        }
        var src = context.createMediaElementSource(audio); //获取声源

        var analyser = context.createAnalyser();//要从你的音频源获取数据，你需要一个 Analyser 节点，它可以用 AudioContext.createAnalyser() 方法创建

        src.connect(analyser); //把这个节点连接到你的声源
        analyser.connect(context.destination);

        analyser.fftSize = 32; //将在一个特定的频率域里使用快速傅立叶变换(Fast Fourier Transform (FFT) )来捕获音频数据，这取决于你给 AnalyserNode.fftSize 属性赋的值（如果没有赋值，默认值为2048）。

        var bufferLength = analyser.frequencyBinCount;//比如我们正在处理一个128尺寸的FFT。我们返回 AnalyserNode.frequencyBinCount 值，它是FFT的一半。

        var dataArray = new Uint8Array(bufferLength);//然后调用Uint8Array()，把frequencyBinCount作为它的长度参数 —— 这代表我们将对这个尺寸的FFT收集多少数据点。

        function renderFrame() {
            requestAnimationFrame(renderFrame); //请求动画帧 requestAnimationFrame：优势：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数

            analyser.getByteFrequencyData(dataArray);//将当前频率数据复制到传入的Uint8Array（无符号字节数组）中
                
                    // if(parseFloat(dataArray[10]/100)==0){
                    if(toPlay==false){
                        yj.setAttribute('style', '-webkit-transform: scale(1, 1);transform: scale(1, 1);-moz-transform: scale(1, 1);');
                    }
                    else{
                    let height = parseFloat(dataArray[10]/100*.3+0.4) 
                      yj.setAttribute('style', 'transform:scale(1,2);: scale('+height+', '+height+');-webkit-transform: scale('+height+', '+height+');-moz-transform: scale('+height+', '+height+');');  
                    }
                
        }

        renderFrame(); //调用
    }
    
componentWillUnmount() {
    window.onscroll = ''

    this.setState = (state, callback) => {
      return;
    };
  }
   
    render() {
        return (
            // <Affix offsetTop={0}> 
                
            <div className='header' id='scrolldisplay' style={this.state.def?{backgroundColor:'rgba(241,131,181,.7)'}:null}>
                    <audio id="audio"  
                           src="https://www.jsfan.net/upload/黑人抬棺.mp3"
                           loop crossOrigin="anonymous"></audio> 
                <Row type='flex' justify='center'>
                    <Col xs={4} sm={4} md={0} lg={0} xl={0}> 
                          <Icon style={window.screen.width<576?this.state.def?{color:'black'}:null:null} className='smallheader-menu' type="menu-unfold" onClick={this.showDrawer.bind(this)} />  
                        <Drawer
                            // title="Basic Drawer"
                            placement="left"
                            closable={true}
                            onClose={this.onClose.bind(this)}
                            visible={this.state.visible}
                            
                        >
                            <DrawerComponents />
                        </Drawer>
                    </Col>
                    <Col xs={16} sm={16} md={0} lg={0} xl={0}>
                    <span onClick={()=>{window.open('about:blank').location.href = 'http://www.jsfan.net/login'}} className='header-logo' style={{textAlign:'center',display:'block',fontSize:'1.1rem',color:'#fff',fontWeight:700}}>Youngster_yj's  Blog</span>
                    </Col>
                    <Col xs={0} sm={0} md={9} lg={15} xl={9}>
                    <Tooltip placement="bottom" title={<span>背景音乐控制(PS:字体缩放跟随音乐)</span>}>
                        <span className='header-logo' onClick={()=>this.playmusic()} id='yj'>Youngster_yj</span>
                    </Tooltip>
                        
                        <span className='header-txt' style={this.state.def?{color:'rgba(0, 0, 0, 0.65)'}:null}>热爱前端开发，每天GET一个新知识</span>
                    </Col>

                    <Col className='memu-div' xs={4} sm={4} md={14} lg={8} xl={9}>
                        <Menu mode='horizontal' theme={this.state.def?'light':'dark'}  style={this.state.def?{backgroundColor:'rgba(241, 131, 181,0)'}:{backgroundColor:'rgba(40,54,70,0)'}} 
                        overflowedIndicator={this.state.isopen?<Icon type="caret-up" theme="filled" />:<Icon type="caret-down"/>} onOpenChange={()=>this.setState({isopen:!this.state.isopen})}>

                            <Menu.Item key="home">
                                <Link to='/'>
                                    <Icon type='home'/>
                                    首页
                                    
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="video">
                                <Link to='/movies'>
                                    <Icon type='edit' />
                                    实战
                                </Link>

                            </Menu.Item>
                            <Menu.Item key="life">
                                <Link to='/life'> 
                                 <Icon type='smile' />
                                    生活
                                    </Link>
                            </Menu.Item>

                            <Menu.Item key="history" >
                                <Link to='/history'> 
                                 <Icon type="file-add" />
                                    记录</Link>
                            </Menu.Item>
                            
                            <Menu.Item key="message" >
                                <Link to='/message'> 
                                 <Icon type="wechat" />
                                    互动</Link>
                            </Menu.Item>

                            <Menu.Item key="blog"  >
                                <Link to='/about'>  <Icon type='solution' />
                                    关于</Link> 
                            </Menu.Item>
                            {/* <Menu.Item key="blog"  >
                                <Link to='/login'>  <Icon type='bar-chart' />
                                    博客后台</Link> 
                            </Menu.Item> */}
                            <Menu.Item key="mymusic"  >
                                <a onClick={()=>this.music()}>
                                <Icon type="customer-service" theme="filled" />
                                    Vue网易云项目</a>
                            </Menu.Item>
                            <Menu.Item key="myrn"  >
                                <a onClick={()=>this.rnmovie()}>
                                <Icon type="android" />
                                    React Native</a>
                            </Menu.Item>
                            <Menu.Item key="myweb"  >
                                <a onClick={()=>this.wechat()}>
                                    <Icon type='message' />
                                    Jsfan聊天室</a>
                            </Menu.Item>
                            <Menu.Item key="qqlogin"  >
                                <a onClick={()=>this.qqlogin()}>
                                    <Icon type='qq' />
                                    QQ登陆</a>
                            </Menu.Item>

                            <Menu.Item key="picture" >
                                <Link to='/picture'> 
                                 <Icon type="instagram" />
                                    图库</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>

                </Row>

                <Modal
              title="哀悼🕯"
              visible={this.state.isdark}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText='略过'
              okText='哀悼'
              centered={true}
             >
              <p>2020-5-29 <span style={{paddingLeft:'.5rem'}}>8:12</span> </p>
              <p>博主最重要的人离开人世...</p>
             </Modal>
            </div>
            // </Affix>
            
        );
    }
}




export default Header