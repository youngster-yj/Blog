import React, { Component,useState,useEffect } from 'react';
import { Avatar, Divider, Tooltip, Icon } from 'antd'
import '../style/components/author.css'
import Authorimg from '../images/author.jpg'
import Authorqq from '../images/qq.jpg'
import Authorwechat from '../images/wechat.png'
import Zmage from 'react-zmage'   
import store from '../store/index' //redux使用

var saveimg = 'http://39.96.67.38:3000/upload/卡哇伊number1.png' //页面切换后展现图片凭证
var deg = 0
const authorimgurl = 'http://39.96.67.38:3000/upload/卡哇伊number1.png'//默认头像地址(便于更改)

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tencnet:false,
            wechat:false,
            defurl:saveimg,

            def:store.getState().defstyle
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }

    componentDidMount(){
        var str = "一个菜鸟,啥也不会"
        var i = 0;
        var divTyping = document.getElementById('zz')
        function reduce(){
            if(i>0){
                divTyping.innerHTML = str.slice(0,i--);
                setTimeout(()=>{reduce()},300)
            }
            else{
                i=1
                divTyping.innerHTML = '_'
                setTimeout(()=>{typing()},300)
            }
        }
        function typing(){
            if(i<=str.length){

                divTyping.innerHTML = str.slice(0,i++)+'_';
                setTimeout(()=>{typing()},300)
            }else{
                i=str.length
                setTimeout(()=>{reduce()},1000)
            }
        }
        typing();
    }
    changeimg(){
        let img =document.getElementById('img')
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
   
    render() { 
        return ( 
            <div className='author-div comm-box cssniceright'  style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
            
            <div><Avatar size={100} src={this.state.defurl} className='mylight' onMouseEnter={()=>{this.changeimg()}} onClick={()=>{this.props.gotoadmin.push('/login')}} id='img'/></div>  
            <div className='myname' style={this.state.def?{color:'hotpink'}:{color:'rgba(0, 0, 0, 0.65)'}}>Youngster_yj</div>
            <div className='author-introduction' style={{ color: 'rgb(0,216,255)' }}>软件工程</div>
            <div className='author-introduction myname1' style={{ color: 'rgb(0,216,255)' }}>2017-2021级学生</div>
            <div className='author-introduction position'>
            <Icon type="environment"/> 四川-达州<br/>
            前端: React + Antd Design<br/>
            后端: Node + Mongodb<br/>
            <Icon type="mail" /> 907985037@qq.com<br/>
            <span id='zz' style={this.state.def?{color:'deeppink',fontWeight:'bold'}:{color:'#1890ff',fontWeight:'bold'}}></span> 
           <Divider style={this.state.def?{color:'hotpink'}:null}>社交账号</Divider> 
                <Tooltip placement="top" title={<span>https://github.com/youngster-yj</span>}>  
                <a href="https://github.com/youngster-yj" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginLeft:'.5rem',marginRight:'.5rem'}}>
                <Avatar size={28} icon='github' style={this.state.def?{color:'#fff',backgroundColor:'hotpink'}:{backgroundColor:'#999'}}>
                </Avatar>    
                </a>
                </Tooltip> 

                <Avatar size={28} icon='qq' style={this.state.tencent?{color:'rgb(77,173,219)',backgroundColor:'#fff'}:this.state.def?{color:'#fff',backgroundColor:'hotpink'}:null} className='account' 
                onMouseEnter={() => this.setState({tencent:true})} onMouseLeave={() => this.setState({tencent:false})} 
                onClick={() => Zmage.browsing({ src:'http://39.96.67.38:3000/upload/qrcode_1581592204285.jpg' })}></Avatar>

                <Avatar size={28} icon='wechat' style={this.state.wechat?{color:'#fff',backgroundColor:'green'}:this.state.def?{color:'#fff',backgroundColor:'hotpink'}:null} className='account' 
                onMouseEnter={() => this.setState({wechat:true})} onMouseLeave={() => this.setState({wechat:false})}
                onClick={() => Zmage.browsing({ src:'http://39.96.67.38:3000/upload/wechat.png' })}></Avatar>

                {
                    this.state.tencent ? <div className='tencent'>  
                        <div>
                        <img src={Authorqq} style={{width:100}} alt="图片加载失败"/>
                        </div> 
                    </div> : null  
                }
                {
                    this.state.wechat ? <div className='wechat'>     
                    <div>   
                    <img src={Authorwechat} style={{width:100}} alt="图片加载失败"/> 
                    <div style={{color:'black',height:30,fontWeight:'bold'}}><span>Yougster_降头师</span></div>
                    </div> 
                </div>   : null
                }
            </div>

           
        </div>
         );
    }
}
 
export default Author;