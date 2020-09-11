import React, { Component } from 'react';
import store from '../store/index' //redux使用
import '../style/components/allproject.css'
import {  message,Modal } from 'antd'
const {confirm} = Modal
class AllProject extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            def:store.getState().defstyle,
            data:[
                {link:null,text:'React博客(本网站)',log:'此网站就是博客呢',img:'https://www.jsfan.net/upload/myblogindex.png'},
                {link:'http://www.jsfan.net:3002/#/',text:'Vue网易云播放器',img:'https://www.jsfan.net/upload/mymusicindex.png'},
                {link:null,text:'JS 原生Web应用',log:'博主暂未开放进入渠道',img:'https://www.jsfan.net/upload/mywebindex1.png'},
                {link:'https://www.jsfan.net/rnapk/ReactNative.apk',text:'RN 视频分享App',log:'下载',img:'https://www.jsfan.net/upload/myrnindex.png'},
                {link:null,text:'RN 同校的你App',log:'博主暂未开放下载渠道',img:'https://www.jsfan.net/upload/myrnindex1.png'},
                {link:null,text:'Flutter 商城App',log:'博主暂未开放下载渠道',img:'https://www.jsfan.net/upload/myflutterindex.png'},
                
                
                // https://www.jsfan.net/upload/jsfan博客头像.jpg
            ]
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    tolog(data,log){
       if(data==null){
          message.success(log)
       }
       else if(log=='下载'){
        confirm({
            title:'博主温馨提示:',
            content:'此APP为安卓应用,需手机安装,是否准备就绪？',
            onOk(){
                window.open(data,'_blank');
            },
            onCancel(){
               message.success('感谢包容')
            }
        })  
       }
       else{
        window.open(data,'_blank');
       }
    }
    render() { 
        return ( 
            <div className='comm-box cssniceright' style={{backgroundColor:'rgba(255, 255, 255, 0.4)',marginTop: '.5rem',paddingBottom:'2rem'}}>
                <div className='nav-title' style={this.state.def?{color:'deeppink'}:null}>项目总览</div>
               {
                   this.state.data.map((item,key)=>(
                      <div key={key} className='allproject-hover' style={{margin:'2rem 2rem 0 2rem',position:'relative'}} onClick={()=>{this.tolog(item.link,item.log)}}>
                          <a>
                               <img className='allproject-img' src={item.img} alt="" style={{width:'100%',borderRadius:'8rem',border:'1px solid #ccc',filter: 'grayscale(1)'}}/>
                               <div style={{height:'50%',width:'100%', position:'absolute',textAlign:'center',zIndex:1,top:'45%'}}>
                                   <span className='allproject-span'>{item.text}</span>
                                </div>
                          </a>
                      </div>
                   ))
               }
               <div style={this.state.def?{color:'deeppink',textAlign:'center',fontSize:'.8rem',paddingTop:'2rem'}:{textAlign:'center',fontSize:'.8rem',paddingTop:'2rem'}}>持续扩展中...</div>
            </div>
         );
    }
}
 
export default AllProject;