import React, { Component } from 'react';
import '../style/components/easylike.css'
import servicePath from '../config/apiUrl'
import { Icon,message } from 'antd'
import CountUp from 'react-countup'
import store from '../store/index' //redux使用
class EasyLike extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isclick:false,
            alllove:0, //获取所有点赞数量

            def:store.getState().defstyle
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    componentWillMount(){
            fetch(servicePath.getmainlove, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    alllove:data[0].mainlove
                })
            })
            .catch((error) => {
                    message.error('服务器端炸裂' + error)
            });
    }
    postlike(){
        if(!this.state.isclick){
            fetch(servicePath.savemainlove, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'addlove='+true
            })
            .then(res => res.json())
            .then((data) => {
               if(data){
                   this.setState({
                    alllove:parseInt(this.state.alllove)+1
                   })
               }
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });

          this.setState({
             isclick:true
          })
        }
        
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
      }
    render() { 
        return ( 
            <div className='ad-div comm-box cssniceright hoverlove' style={{ backgroundColor: 'rgba(255,255,255,0.4)',padding:'1rem' }}>
                <div style={
                    this.state.def?
                    {textAlign:'center',color:'deeppink',cursor:'pointer',margin:'1rem 0 0',fontSize:'1rem',fontWeight:'700',fontFamily:'SimSun'}:
                    {textAlign:'center',color:'black',cursor:'pointer',margin:'1rem 0 0',fontSize:'1rem',fontWeight:'700',fontFamily:'SimSun'}
                }
                 onClick={()=>this.postlike()}>
                    {this.state.isclick? <span>蟹蟹亲，么么哒~</span>: <span>点一颗小心心吧~</span>}
                    {
                        this.state.isclick? 
                        <img src="https://www.jsfan.net/emoji/b_emoticon_160.png" alt="" style={{width:'2rem'}}></img>
                        :<img style={{width:'2rem'}} src="https://www.jsfan.net/emoji/emoticon_008.png"></img>
                    }
                </div>
                <div style={{textAlign:'center',cursor:'pointer'}} onClick={()=>this.postlike()}>
                    {
                        this.state.isclick?
                        <Icon type="heart" theme="filled" style={{ fontSize: '2.2rem', color: 'deeppink' }}/>:
                        <Icon type="heart" className='heart-one'/>
                    }
                <span style={this.state.def?{color:'deeppink',fontSize:'2.3rem',paddingLeft:'.5rem'}:{color:'#1890ff',fontSize:'2.3rem',paddingLeft:'.5rem'}}>
                <CountUp start={0} end={this.state.alllove} duration={2} style={{padding:'0px'}}/></span>
                </div>
            </div>
         );
    }
}
 
export default EasyLike;