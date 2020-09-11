import React, { Component } from 'react';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, Input, message } from 'antd';
import moment from 'moment';
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
        condition:0
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
            fetch(servicePath.clickpraisetwo + '?praise=' + praise + '&nopraise=' + nopraise + '&id=' + _id, {
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
            fetch(servicePath.clickpraise + '?praise=' + praise + '&nopraise=' + nopraise + '&id=' + _id, {
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
        let _id = this.state.data._id
        let articleTitle = this.state.data.articleTitle
        let incommentname = this.state.incommentname
        let incommentcontent = this.state.incommentcontent
        if (incommentname.length == 0 || incommentcontent.length == 0) return message.warning('请将笔名与内容输入完整')
        this.setState({ loading: true });
        fetch(servicePath.savepinglunin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: '_id=' + _id + '&articleTitle=' + articleTitle + '&incommentname=' + incommentname + '&incommentcontent=' + incommentcontent
        })
            .then(res => res.json())
            .then((data) => {

                if (data == '评论成功') {
                    message.success('评论成功')
                    this.setState({ loading: false, visible: false, incommentname: '', incommentcontent: '' })
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
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    componentWillMount() {
        // console.log(this.props.pinglundata)
        var data = this.props.pinglundata
        this.setState({
            data: data,
            likes: data.praise,
            dislikes: data.nopraise
        })
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
            this.props.nopinglun ? null :
                <span key="comment-basic-reply-to" onClick={this.showModal}>回复</span>,
        ];

        return (
            <Comment
                actions={actions}
                author={<a style={this.state.data.commentname=='cyj博主cyj'?{color:'red',fontWeight:'700'}:null}>{this.state.data.commentname=='cyj博主cyj'?'博主':this.state.data.commentname}</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        {this.state.data.commentcontent}
                    </p>
                }
                datetime={
                    <Tooltip title={this.state.data.time}>
                        {/* <span>{moment().fromNow()}</span> */}
                        <span>{this.state.data.time}</span>
                    </Tooltip>
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
                    <TextArea value={this.state.incommentcontent} rows={4} placeholder="输入您的留言" onChange={(e) => { this.setState({ incommentcontent: e.target.value }) }} />


                </Modal>
            </Comment>

        );
    }
}

export default Comments