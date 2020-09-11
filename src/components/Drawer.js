import React, { Component } from 'react';
import { Avatar, Divider, Tooltip, Tag, Button, Modal, Input, Icon, message } from 'antd'
import Authorimg from '../images/author.jpg'
import '../style/components/author.css'
import '../style/components/drawer.css'
import Authorqq from '../images/qq.jpg'
import Authorwechat from '../images/wechat.png'
import servicePath from '../config/apiUrl'
import Zmage from 'react-zmage'   
import store from '../store/index' //redux使用
var saveimg = 'http://39.96.67.38:3000/upload/卡哇伊number1.png' //页面切换后展现图片凭证
var deg = 0
const authorimgurl = 'http://39.96.67.38:3000/upload/卡哇伊number1.png'//默认头像地址(便于更改)

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tencent:false,
            wechat:false,

            friendsLink: [],

            visible: false,

            qqemail:'',
            weburl:'',
            webname:'',
            webinfo:'',
            webimgurl:'',

            defurl:saveimg,

            def:store.getState().defstyle
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    componentWillMount(){

        fetch(servicePath.getPassFriendLink, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(res => res.json())
        .then((data) => {
                
          //获取置顶文章并重新排序
          let top = data.filter((item)=>{
            return item.toplink == true 
          })
          let notop = data.filter((item)=>{
            return item.toplink != true 
          })
          let add = notop.reverse()
          top.map((item)=>{
             add.push(item)
          })
          let add2 = add.reverse()
          // console.log(add2) //新的排序

                this.setState({friendsLink:add2}) 
        })
        .catch((error) => {
                message.error('服务器端炸裂' + error)
        });

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        let webname = this.state.webname
        let weburl = this.state.weburl
        let qqemail = this.state.qqemail
        let webinfo = this.state.webinfo
        let webimgurl = this.state.webimgurl
        if(webname.length!=0&&weburl.length!=0&&qqemail.length!=0){
                    fetch(servicePath.saveFriendLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'webname=' + webname + '&weburl=' + weburl + '&qqemail=' + qqemail + '&webinfo=' + webinfo + '&webimgurl=' + webimgurl 
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if (data == '存储成功') {
                    message.success('提交成功,请等待')
                    this.setState({
                       visible: false,
                    });
                }
                else{
                    message.error('存储失败')
                    this.setState({
                        visible: false,
                        webname:'',
                        weburl:'',
                        qqemail:'',
                        webinfo:'',
                        webimgurl:'',
                     });
                }

            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
        }
        else{
            message.warning('必填项不可为空')
        }

    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    changeimg(){ //头像旋转
        let img =document.getElementById('imgg')
        if(this.state.defurl==authorimgurl){
            deg -= 360
           img.style.transform = 'rotate('+deg+'deg)'
            saveimg = Authorimg
           setTimeout(()=>{
            this.setState({
                defurl:Authorimg
            })
            },300)

            const action ={ //redux 旋转改色
                type:'changestyle',
                value:false
            }
            store.dispatch(action)
        }
        else{
           deg += 360
           img.style.transform = 'rotate('+deg+'deg)'
        setTimeout(()=>{
            saveimg = authorimgurl
            this.setState({
                defurl:authorimgurl
            })
        },300)
        const action ={ //redux 旋转改色
            type:'changestyle',
            value:true
        }
        store.dispatch(action)
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
      }
      componentDidMount(){
          let antstyle = document.getElementsByClassName('ant-drawer-content')[0]
          this.state.def?antstyle.style.backgroundColor="pink":antstyle.style.backgroundColor="rgb(40,54,70)"
      }
      componentDidUpdate(){
        let antstyle = document.getElementsByClassName('ant-drawer-content')[0]
        this.state.def?antstyle.style.backgroundColor="pink":antstyle.style.backgroundColor="rgb(40,54,70)"
      }
    render() { 

        return ( 
    
            <div style={{ textAlign: 'center'}}>
            <div className='author-div comm-box' style={this.state.def?{border:0,backgroundColor: 'pink',paddingBottom: 0}:{border:0,backgroundColor: 'rgb(40,54,70)',paddingBottom: 0}}>
            <div><Avatar size={100} src={this.state.defurl}  className='mylight' onClick={()=>{this.changeimg()}} id='imgg'/></div> 
            <div className='myname cssnice'>Youngster_yj</div>
            <div className='author-introduction cssnice' style={this.state.def?{color:'deeppink'}:{ color: 'rgb(0,216,255)' }}>软件工程</div>
            <div className='author-introduction myname1 cssnice' style={this.state.def?{color:'deeppink'}:{ color: 'rgb(0,216,255)' }}>2017-2021级学生</div>
            <div className='author-introduction position cssnice' style={this.state.def?{color:'#eee'}:null}>
            <Icon type="environment"/> 四川-达州<br/>
            前端: React + Antd Design<br/>
            后端: Node + Mongodb<br/>
            <Icon type="mail" /> 907985037@qq.com<br/>
            一个菜鸟,啥也不会
           <Divider style={{color:'rgba(255, 255, 255, .6)'}}>社交账号</Divider> 
                
                <Tooltip placement="top" title={<span>https://github.com/youngster-yj</span>}>  
                <a href="https://github.com/youngster-yj" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginLeft:'.5rem',marginRight:'.5rem'}}>
                <Avatar size={28} icon='github' style={this.state.def?{color:'#fff',backgroundColor:'hotpink'}:{backgroundColor:'#999'}}>
                </Avatar>    
                </a>
                </Tooltip>      
                    
                <Avatar size={28} icon='qq' style={this.state.tencent?{color:'rgb(77,173,219)',backgroundColor:'#fff'}:this.state.def?{color:'#fff',backgroundColor:'hotpink'}:null} 
                className='account' onMouseEnter={() => this.setState({tencent:true})} onMouseLeave={() => this.setState({tencent:false})}
                onClick={() => Zmage.browsing({ src:'http://39.96.67.38:3000/upload/qrcode_1581592204285.jpg' })}></Avatar>
                <Avatar size={28} icon='wechat' style={this.state.wechat?{color:'#fff',backgroundColor:'green'}:this.state.def?{color:'#fff',backgroundColor:'hotpink'}:null} className='account' 
                onMouseEnter={() => this.setState({wechat:true})} onMouseLeave={() => this.setState({wechat:false})}
                onClick={() => Zmage.browsing({ src:'http://39.96.67.38:3000/upload/wechat.png' })}></Avatar>

                {/* {
                    this.state.tencent ? <div className='tencent' style={{left:'36px',top:'10px'}}>  
                        <div>
                        <img src={Authorqq} style={{width:100}} alt="图片加载失败"/>
                        </div> 
                    </div> : null  
                }
                {
                    this.state.wechat ? <div className='wechat' style={{left:'36px',top:'10px'}}>     
                    <div>   
                    <img src={Authorwechat} style={{width:100}} alt="图片加载失败"/> 
                    <div style={{color:'black',height:30,fontWeight:'bold'}}><span>Yougster_降头师</span></div>
                    </div> 
                </div>   : null
                } */}
            </div>
 
                            <div style={{textAlign:'center',marginTop:'8px'}}>

                   <div style={this.state.def?{fontSize:'.7rem',color:'#eee'}:{fontSize:'.7rem',color:'#999'}}>
            <div style={{fontSize: '1rem'}}>访客信息</div>
        <div>欢迎来自<span style={this.state.def?{color:'deeppink'}:{color:'rgb(0, 216, 255)'}}>{window.cheng.cname}</span>的访问者</div>
        <div>您于<span  style={this.state.def?{color:'deeppink'}:{color:'rgb(0, 216, 255)'}}>{window.time.year}年{window.time.month}月{window.time.date}日  {window.time.hours}:{window.time.minutes}</span>访问</div>
        <div>ip:<span style={this.state.def?{color:'deeppink'}:{color:'rgb(0, 216, 255)'}}>{window.cheng.cip}</span>(密)</div>
        <div>使用<span style={this.state.def?{color:'deeppink'}:{color:'rgb(0, 216, 255)'}}>{window.device}</span>系统</div>
        <div>基于<span style={this.state.def?{color:'deeppink'}:{color:'rgb(0, 216, 255)',fontSize:'.55rem'}}>{window.liulanqi.type}({window.liulanqi.version})</span>内核</div>
        </div>

                </div>

            </div>

            <div className='friendsLink' style={this.state.def?{color:'deeppink'}:{fontSize: '1rem'}}>友情链接</div>
            {
                        this.state.friendsLink.map((item, index) => (
                            item.agree==true?
                            item.isclick||item.isclick==undefined?
                            <a key={index} target="_blank" rel="noopener noreferrer" href={item.weburl}><Tag color='volcano'>{item.webname}</Tag></a>
                            :<Tag key={index} color='red' onClick={()=>{message.warning('此博客作者暂未开发完毕')}}>{item.webname}</Tag>
                            :null
                        ))
                    }
                    <div><Button size="small" onClick={this.showModal} style={this.state.def?{color:'deeppink'}:null}>友链提交</Button></div>
                    
                    <Modal
                        title="申请友链"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="立即申请"
                        cancelText="取消"
                        maskClosable={false}
                        centered={true}
                    >
                        <Input
                            onChange={(e)=>this.setState({webname:e.target.value})}
                            style={{marginBottom: '1rem'}}
                            placeholder="网站名称(必填)"
                            prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="网站名称必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>this.setState({qqemail:e.target.value})}
                            style={{marginBottom: '1rem'}}
                            placeholder="QQ邮箱(必填)"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="邮箱地址必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>this.setState({weburl:e.target.value})}
                            style={{marginBottom: '1rem'}}
                            placeholder="http(s)://开始"
                            prefix={<Icon type="ie" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="网站地址必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        
                        <Input
                            onChange={(e)=>this.setState({webinfo:e.target.value})}
                            style={{marginBottom: '1rem'}}
                            placeholder="大佬的网站介绍"
                            prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="网站介绍(可选)">
                                    <Icon type="question" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <Input
                            onChange={(e)=>this.setState({webimgurl:e.target.value})}
                            style={{marginBottom: '1rem'}}
                            placeholder="网站头像地址(http(s)://开始)"
                            prefix={<Icon type="robot" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="头像地址(可选)">
                                    <Icon type="question" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <div style={{marginBottom: '1rem',textAlign: 'right',fontSize: '.7rem'}}>
                        <a target="_blank" rel="noopener noreferrer" href='http://39.96.67.38:3000/upload/jsfan博客头像.jpg'>
                            本博客头像URL</a>
                            </div>
                        <div style={{marginBottom: '1rem',textAlign: 'right',fontSize: '.7rem'}}>PS：立即申请后请等待QQ邮箱通知</div>
                    </Modal>


            </div>
         );
    }
}
 
export default Drawer;