import React, { Component } from 'react';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, Input, message } from 'antd';
import servicePath from '../config/apiUrl'
import '../style/components/comment.css'
const { TextArea } = Input;
class Comments extends React.Component {
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
        loading: false,
        visible: false,
        data: '',
        incommentname: '',
        incommentcontent: '',
        condition:0,
        emailinput:''
    };

    like = () => {
        if (this.state.condition == 0) {
            let a = parseInt(this.state.likes) + 1
            this.setState({
                likes: a,
                // dislikes: 0,
                action: 'liked',
                condition:1
            }, () => {
                this.likesordislikes()
            });
            
        }

    };

    dislike = () => {
        if (this.state.condition == 0) {
            let b = parseInt(this.state.dislikes) + 1
            this.setState({
                // likes: 0,
                dislikes: b,
                action: 'disliked',
                condition:1
            }, () => {
                this.likesordislikes()
            });
        }

    };
    likesordislikes() {
        let praise = this.state.likes
        let nopraise = this.state.dislikes
        let _id = this.state.data._id
        if (this.state.data.id) {
            console.log('二级评论')
            fetch(servicePath.wechatclickpraisetwo + '?praise=' + praise + '&nopraise=' + nopraise + '&id=' + _id, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(res => res.json())
                .then((data) => {
                    if (data == '更改完成') {
                        message.success('感谢您宝贵的意见')
                    }
                })
                .catch((error) => {
                    message.error('movies+images服务器端炸裂' + error)
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
                });
        }
        else {
            fetch(servicePath.wechatclickpraise + '?praise=' + praise + '&nopraise=' + nopraise + '&id=' + _id, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(res => res.json())
                .then((data) => {
                    if (data == '更改完成') {
                        message.success('感谢您宝贵的意见')
                    }
                })
                .catch((error) => {
                    message.error('movies+images服务器端炸裂' + error)
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
                });
        }

    }
    showModal = () => {
        this.setState({
            visible: true,
        });

    };
    handleOk = () => {
        if(this.state.incommentname.length==0){
            return message.warning('笔名不可为空')
         }
         if(!this.isEmail(this.state.emailinput)){
            return message.warning('请输入正确的邮箱格式')
         }
         if(this.state.incommentcontent.length==0){
             return message.warning('内容不可为空')
         }
         else{
             this.postdata()
         }
    };
    postdata(){
        let _id
        let at = []
        if(this.props.nopinglun==true){ //当前为2级评论的回复(俗称n级评论)
            _id = this.props.id
            at = this.state.data.commentname
        }
        else{
            _id = this.state.data._id
        }


        // let _id = this.state.data._id
        let address = window.cheng.cname
        let device = window.device
        let info = window.liulanqi.type + '(' + window.liulanqi.version + ')'
        let incommentname = this.state.incommentname
        let commentimg = this.state.emailinput
        let incommentcontent = this.state.incommentcontent
        if (incommentname.length == 0 || incommentcontent.length == 0) return message.warning('请将笔名与内容输入完整')
        this.setState({ loading: true });
        localStorage.setItem("userInfoName",incommentname)
        localStorage.setItem("userInfoImg",commentimg)
        fetch(servicePath.wechatpinglunTwo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: '_id=' + _id + '&address=' + address + '&device=' + device + '&info=' + info +'&incommentname=' + incommentname + '&commentimg=' + commentimg + '&incommentcontent=' + incommentcontent + '&at=' + at
        })
            .then(res => res.json())
            .then((data) => {

                if (data == '评论成功') {
                    message.success('评论成功')
                    this.setState({ loading: false, visible: false, incommentcontent: '' })
                    this.props.onclick()
                }
                else {
                    message.error('评论失败')
                }

            })
            .catch((error) => {
                message.error('Comment服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    componentWillMount() {
        var data = this.props.pinglundata

        let name = localStorage.getItem("userInfoName")
        let qqimg = localStorage.getItem("userInfoImg")

        this.setState({
            data: data,
            likes: data.praise,
            dislikes: data.nopraise,
            incommentname:name,
            emailinput:qqimg
        })
    }
    isEmail(str){
        var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (re.test(str) != true) {
        return false;
      }else{
        return true;
      }
    }
    getimgurl(data){
        //设备及系统
        let re1 = /Windows/g  
        let re4 = /Mac/g  
        let re5 = /国产/g  
        //浏览器
        let re2 = /Chrome/g  
        let re3 = /Safari/g  
        let re6 = /Firefox/g  
        let re7 = /IE/g  
        let re8 = /Opera/g  
        if(re1.test(data)){
            return 'http://39.96.67.38:3000/upload/win-6.png'
        }
        if(re2.test(data)){
            return 'http://39.96.67.38:3000/upload/chrome.png'
        }
        if(re4.test(data)){
            return 'http://39.96.67.38:3000/upload/iphone.png'
        }
        if(re5.test(data)){
            return 'http://39.96.67.38:3000/upload/android.png'
        }
        if(re3.test(data)){
            return 'http://39.96.67.38:3000/upload/safari.png'
        }
        if(re6.test(data)){
            return 'http://39.96.67.38:3000/upload/firefox.png'
        }
        if(re7.test(data)){
            return 'http://39.96.67.38:3000/upload/iepng.png'
        }
        if(re8.test(data)){
            return 'http://39.96.67.38:3000/upload/opera-2.png'
        }
        return 
    }
    render() {
        const { likes, dislikes, action } = this.state;
        const { visible, loading } = this.state;
        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="赞同">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'} 
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
                <Tooltip title="无趣">
                    <Icon
                        type="dislike"
                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                        onClick={this.dislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>,
            <span key="comment-basic-address">
            <img src={this.getimgurl(this.state.data.device)} alt="" style={{height:'.75rem',position:'relative',top:'.3rem',paddingRight:'.1rem'}}/>
            {this.state.data.device}
        </span>,
        <span key="comment-basic-address">
            <img src={this.getimgurl(this.state.data.info)}  alt="" style={{height:'.9rem',position:'relative',top:'.2rem',paddingRight:'.1rem'}}/>
            {this.state.data.info=='null(undefined)'?null:this.state.data.info}</span>,
        // this.props.nopinglun ? null :
            <span key="comment-basic-reply-to" onClick={this.showModal} style={{color:'#1890ff'}}>回复</span>,
        ];

        return (
            <Comment
                actions={actions}
                author={<a style={this.state.data.commentname=='cyj博主cyj'?{color:'red',fontWeight:'700'}:{color:'deeppink'}}>{this.state.data.commentname=='cyj博主cyj'?'博主':this.state.data.commentname}</a>}
                avatar={
                    <Avatar
                    src={this.state.data.commentname!='cyj博主cyj'?
                        this.state.data.commentimg?"http://q4.qlogo.cn/g?b=qq&nk="+this.state.data.commentimg+"&s=3":"http://39.96.67.38:3000/upload/卡哇伊number1.png"
                    :
                    "http://q4.qlogo.cn/g?b=qq&nk=907985037@qq.com&s=3"
                    }
                    alt="Han Solo"
                />
                }
                content={
                    <p>
                       {this.state.data.at&&this.state.data.at.length!=0?<span style={this.state.data.at=='cyj博主cyj'?{color:'cornflowerblue'}:{color:'#99ce00'}}>@{this.state.data.at=='cyj博主cyj'?'博主':this.state.data.at}</span> :null}<span dangerouslySetInnerHTML={{__html:this.state.data.commentcontent}}></span>
                    </p>
                }
                datetime={
                    <div>
                    <Tooltip title={this.state.data.time}>
                        {/* <span>{moment().fromNow()}</span> */}
                        <span>{this.state.data.time}</span>
                    </Tooltip>
                    <span style={{paddingLeft:'.5rem'}}>{this.state.data.address}</span>
                    {
                        this.state.data.iscallback=='true'?
                        <span style={{paddingLeft:'.5rem'}}>
                           <Tooltip title='此留言已开启邮件通知'><Icon type="check-circle" style={{color:'yellowgreen'}}/></Tooltip>
                        </span>:null
                    }
                    </div>
                }
            >{this.props.children}
                <Modal
                    visible={visible}
                    title="追评"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交评论
                        </Button>,
                    ]}
                >

                    <Input value={this.state.incommentname} placeholder="输入您的笔名" style={{ marginBottom: '.5rem' }} 
                           onChange={(e) => { this.setState({ incommentname: e.target.value }) }} suffix={this.state.incommentname=='cyj博主cyj'?<Icon type="safety" style={{ color: 'green' }}/>:null}/>
                   
                   <div style={{position:'relative'}}>
                                <Input value={this.state.emailinput} placeholder="请输入邮箱"  style={{ marginBottom: '.5rem',width:'88%' }} onChange={(e) => { this.setState({ emailinput: e.target.value }) }}/>
                            <span style={{position:'absolute',right:0}}>
                                <Avatar src={this.isEmail(this.state.emailinput)?"http://q4.qlogo.cn/g?b=qq&nk="+this.state.emailinput+"&s=3":""} />
                            </span>
                            </div>
                    
                    <TextArea value={this.state.incommentcontent} rows={4} placeholder="输入您的留言" onChange={(e) => { this.setState({ incommentcontent: e.target.value }) }} />


                </Modal>
            </Comment>

        );
    }
}

export default Comments