import React, { Component } from 'react';
import '../style/components/friendslink.css'
import { Tag, Button, Modal, Input, Tooltip, Icon, message,Typography } from 'antd'
import servicePath from '../config/apiUrl'
import LazyLoad from 'react-lazyload';
import '../style/page/common.css'
import store from '../store/index' //redux使用
const { Paragraph } = Typography
class FeiendsLink extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            friendsLink: [],

            visible: false,

            qqemail:'',
            weburl:'',
            webname:'',
            webinfo:'',
            webimgurl:'',

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
    
componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
   
    render() { 
        return ( 
        <div className='ad-div comm-box cssniceright' style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
                <div className='friendsLink' style={this.state.def?{color:'deeppink'}:null}>友情链接</div>
                <div style={{ textAlign: 'center',paddingTop: '.2rem',paddingLeft: '.2rem', paddingRight: '.2rem'}}>

                    {
                        this.state.friendsLink.map((item, index) => (

                            item.agree==true?
                            item.isclick||item.isclick==undefined?

                            <LazyLoad height={100} offset={-100} key={index}> 
                            <a target="_blank" rel="noopener noreferrer" href={item.weburl}>
                                {/* <Tag color='#283646'>{item.webname}</Tag> */}

                                <div className='friendlinkhover cssniceright' style={{display: 'block',padding: '0 0 0 90px',position:'relative',marginBottom:'1rem',transition:'all ease .5s'}}> 
                                <img style={{position:'absolute',height:'60px',width:'60px',left: '10px',top:'50%',marginTop:'-30px',borderRadius:'50%',transition:'all ease 1s'}} src={item.webimgurl?item.webimgurl:'http://39.96.67.38:3000/upload/卡哇伊number1.png'} alt=""/>
                                <h4 style={this.state.def?{color:'hotpink',textAlign:'left',marginTop:'15px',fontWeight:'bold',paddingRight:'1rem'}:{textAlign:'left',marginTop:'15px',fontWeight:'bold',paddingRight:'1rem'}}>{item.webname}</h4>
                                <Tooltip placement="top" title={<span>{item.webinfo?item.webinfo:'暂无介绍'}</span>}>
                                <div style={{textAlign:'left',paddingRight:'1rem',fontSize:'.7rem'}}>
                                <Paragraph ellipsis={{ rows: 1, }}>
                                {item.webinfo?item.webinfo:'暂无介绍'}</Paragraph>
                                </div>
                                </Tooltip>
                                </div>

                            </a>
                            </LazyLoad>
                            :
                                      //不可点击
                                      <LazyLoad height={100} offset={-100} key={index}>
                            <div onClick={()=>{message.warning('此博客作者暂未开发完毕')}} className='friendlinkhover cssniceright' style={{display: 'block',padding: '0 0 0 90px',position:'relative',marginBottom:'1rem',transition:'all ease .5s'}}> 
                            <img style={{position:'absolute',height:'60px',width:'60px',left: '10px',top:'50%',marginTop:'-30px',borderRadius:'50%',transition:'all ease 1s'}} src={item.webimgurl?item.webimgurl:'http://39.96.67.38:3000/upload/卡哇伊number1.png'} alt=""/>
                            <h4 style={this.state.def?{color:'hotpink',textAlign:'left',marginTop:'15px',fontWeight:'bold',paddingRight:'1rem',textDecoration:'line-through'}:{textAlign:'left',marginTop:'15px',fontWeight:'bold',paddingRight:'1rem',textDecoration:'line-through',color: 'gray'}}>{item.webname}</h4>
                            <Tooltip placement="top" title={<span>{item.webinfo?item.webinfo:'暂无介绍'}</span>}>
                            <div style={{textAlign:'left',paddingRight:'1rem',fontSize:'.7rem'}}>
                            <Paragraph ellipsis={{ rows: 1, }}>
                            {item.webinfo?item.webinfo:'暂无介绍'}</Paragraph>
                            </div>
                            </Tooltip>
                            </div>
</LazyLoad>
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
                            本博客头像URL：http://39.96.67.38:3000/upload/jsfan博客头像.jpg</a>
                            </div>
                        <div style={{marginBottom: '1rem',textAlign: 'right',fontSize: '.7rem'}}>PS：立即申请后请等待QQ邮箱通知</div>

                    </Modal>
                </div>
        </div>
         );
    }
}
 
export default FeiendsLink;