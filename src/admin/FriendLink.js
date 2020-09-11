import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal, Divider,Input, Tooltip, Icon } from 'antd'
import servicePath from '../config/apiUrl'
const { confirm } = Modal
class FriendLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
            visible:false,
            updata:{},//缓存修改数据
        }
    }
    componentWillMount() {
        fetch(servicePath.getPassFriendLink, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    urldata: data
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    agree(id) {
        let thiss = this
        confirm({
            title: '确定要通过这个友链吗？',
            content: '如果你点击OK按钮，友链将在前台页面显示，且发送QQ邮件通知链主',
            onOk() {
                fetch(servicePath.agreeFriendLink, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                        thiss.setState({
                            urldata: data,
                        });
                        message.success('邮箱已通知')
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                    });
            },
            onCancel() {
                message.success('取消操作，程序不做处理')
            }
        })


    }
    delete(id) {
        let thiss = this
        confirm({
            title: '确定要删除这个友链吗？',
            content: '如果你点击OK按钮，友链将在此页面删除，且无法在前台页面显示',
            onOk() {
                fetch(servicePath.deletFriendLink, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data)
                        thiss.setState({
                            urldata: data,
                        });
                        message.success('友链已删除')
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                    });
            },
            onCancel() {
                message.success('取消操作，程序不做处理')
            }
        })


    }
    disclick(id, isclick) {
        let thiss = this
        if (isclick == undefined || isclick == true) {
            isclick = false
            confirm({
                title: '确定要设置此外链为不可点击状态吗？',
                content: '如果你点击OK按钮，外链将在前台页面不可跳转',
                onOk() {
                    thiss.isClick(id, isclick)
                },
                onCancel() {
                    message.success('取消操作，程序不做处理')
                }
            })
        }
        else {
            isclick = true
            confirm({
                title: '确定要设置此外链为可点击状态吗？',
                content: '如果你点击OK按钮，外链将在前台页面允许跳转',
                onOk() {
                    thiss.isClick(id, isclick)
                },
                onCancel() {
                    message.success('取消操作，程序不做处理')
                }
            })
        }

    }
    isClick(id,isclick) {
        fetch(servicePath.isClickLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + id + '&isclick=' + isclick
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    urldata: data,
                });

            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    canceltoplink(data){//取消置顶
        let setthis= this
        confirm({
            title:'确定要取消置顶这个友链吗？',
            content:'如果你点击OK按钮，友链将在前台页面取消置顶',
            onOk(){
              fetch(servicePath.cancletopLink, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                 },
                 body: 'id=' + data
             })
                 .then(res => res.json())
                 .then((data) => {
                    //  console.log(data)
                     setthis.setState({
                        urldata:data
                    })
                 })
                 .catch((error) => {
                     message.error('服务器端炸裂' + error)
                 });
            },
            onCancel(){
               message.success('取消操作，程序不做取消置顶处理')
            }
        })
    }
    toplink(data){ //置顶按钮
        let setthis= this
          confirm({
            title:'确定要置顶这个友链吗？',
            content:'如果你点击OK按钮，友链将在前台页面置顶',
            onOk(){
              fetch(servicePath.topLink, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                 },
                 body: 'id=' + data
             })
                 .then(res => res.json())
                 .then((data) => {
                     setthis.setState({
                        urldata:data
                    })
                 })
                 .catch((error) => {
                     message.error('服务器端炸裂' + error)
                 });
            },
            onCancel(){
               message.success('取消操作，程序不做置顶处理')
            }
        })
        }
        showModal = (data) => {
            this.setState({
                visible: true,
                updata:data
            });
        };
        handleCancel = e => {
            this.setState({
                visible: false,
            });
        };
        handleOk = e => {
            let id = this.state.updata._id
            let webname = this.state.updata.webname
            let weburl = this.state.updata.weburl
            let qqemail = this.state.updata.qqemail
            let webinfo = this.state.updata.webinfo
            let webimgurl = this.state.updata.webimgurl
            if(webname.length!=0&&weburl.length!=0&&qqemail.length!=0){
                fetch(servicePath.updataFriendLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'id=' + id + '&webname=' + webname + '&weburl=' + weburl + '&qqemail=' + qqemail + '&webinfo=' + webinfo + '&webimgurl=' + webimgurl 
            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data)
                    if (data) {
                        console.log(data)
                        message.success('修改成功')
                        this.setState({
                           urldata:data,
                           visible: false,
                        });
                    }
                    else{
                        message.error('存储失败')
                        this.setState({
                            visible: false,
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
    render() {
        return (
            <div>
                <Divider orientation="left">未处理申请</Divider>
                <List header={
                    <Row className='list-div' style={{ textAlign: 'center' }}>
                        <Col span={3} style={{ paddingRight: '1rem' }}>
                            <b>网站名称</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>网址</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>介绍</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>头像url</b>
                        </Col>
                        <Col span={5} style={{ paddingLeft: '1rem' }}>
                            <b>操作</b>
                        </Col>
                    </Row>
                } bordered dataSource={this.state.urldata}
                    renderItem={(item) => {
                        return (
                            <div>
                                {item.agree == false || item.agree == undefined ?
                                    <List.Item>
                                        <Row className='list-div' style={{ width: '100%', textAlign: 'center' }}>
                                            <Col span={3} style={{ paddingRight: '1rem' }}>
                                                {item.webname}
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {item.qqemail}
                                            </Col>

                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <a target="_blank" rel="noopener noreferrer" href={item.weburl}>{item.weburl}</a>
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {item.webinfo}
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <a target="_blank" rel="noopener noreferrer" href={item.weburl}>{item.webimgurl}</a>
                                            </Col>
                                            <Col span={5} style={{ paddingLeft: '1rem' }}>
                                                <Button onClick={() => { this.agree(item._id) }} type="primary">同意</Button>
                                                <Button onClick={() => { this.delete(item._id) }}>拒绝</Button>
                                            </Col>
                                        </Row>
                                    </List.Item> : null}
                            </div>
                        )

                    }}
                />
                <Divider orientation="left">现有外链</Divider>
                <List header={
                    <Row className='list-div' style={{ textAlign: 'center' }}>
                        <Col span={3} style={{ paddingRight: '1rem' }}>
                            <b>网站名称</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>网址</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>介绍</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>头像url</b>
                        </Col>
                        <Col span={5} style={{ paddingLeft: '1rem' }}>
                            <b>操作</b>
                        </Col>
                    </Row>
                } bordered dataSource={this.state.urldata}
                    renderItem={(item) => {
                        return (
                            <div>
                                {
                                    item.agree == true ? <List.Item>
                                        <Row className='list-div' style={{ width: '100%', textAlign: 'center' }}>
                                            <Col span={3} style={{ paddingRight: '1rem' }}>
                                                {item.webname}
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {item.qqemail}
                                            </Col>

                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <a target="_blank" rel="noopener noreferrer" href={item.weburl}>{item.weburl}</a>
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {item.webinfo}
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <a target="_blank" rel="noopener noreferrer" href={item.weburl}>{item.webimgurl}</a> 
                                            </Col>
                                            <Col span={5} style={{ paddingLeft: '1rem' }}>
                                                <Button onClick={() => { this.disclick(item._id, item.isclick) }} type={item.isclick || item.isclick == undefined ? 'dashed' : 'danger'}>{item.isclick || item.isclick == undefined ? '未禁止' : '已禁止'}</Button>
                                                <Button onClick={() => { this.delete(item._id) }}>移除外链</Button>
                                            {
                                                item.toplink?
                                                <Button onClick={()=>{this.canceltoplink(item._id)}} type="danger">已置顶</Button>:
                                                <Button onClick={()=>{this.toplink(item._id)}} type="dashed">未置顶</Button>
                                            }
                                            <Button type='primary' onClick={()=>{this.showModal(item)}}>修改</Button>
                                            </Col>
                                        </Row>
                                    </List.Item> : null
                                }

                            </div>

                        )

                    }}
                />
                    <Modal
                        title="修改友链"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="立即修改"
                        cancelText="取消"
                        maskClosable={false}
                        centered={true}
                        destroyOnClose={true}
                    >
                        <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.webname = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.webname}
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
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.qqemail = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.qqemail}
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
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.weburl = e.target.value
                                this.setState({updata:save})
                            }}
                            defaultValue={this.state.updata.weburl}
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
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.webinfo = e.target.value
                                this.setState({updata:save})
                            }}
                            defaultValue={this.state.updata.webinfo}
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
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.webimgurl = e.target.value
                                this.setState({updata:save})
                            }}
                            defaultValue={this.state.updata.webimgurl}
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

                    </Modal>
            </div>
        );
    }
}

export default FriendLink;