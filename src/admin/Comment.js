import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal } from 'antd'
import servicePath from '../config/apiUrl'
const { confirm } = Modal
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
            urldatat:[]
        }
    }
    componentWillMount() {

        fetch(servicePath.getpinglun, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    urldata: data.reverse()
                })
                this.getTwoComment()
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    delArticle(id) { //删除按钮
        let setthis = this
        confirm({
            title: '确定要删除这条评论吗？',
            content: '如果你点击OK按钮，评论将从数据库删除，无法恢复',
            onOk() {
                //  alert(data,'并调用数据库删除')//调用数据库删除
                fetch(servicePath.delpinglun, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data)
                        setthis.setState({
                            urldata: data.reverse()
                        })
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                        setTimeout(() => {
                            this.setState({ isLoading: false })
                        }, 500)
                    });
            },
            onCancel() {
                message.success('取消操作，程序不做处理')
            }
        })
    }
    //-------------------------------分割--------------------------------
    getTwoComment(){
        fetch(servicePath.getpinglunTwo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    urldatat: data.reverse()
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    delArticleT(id) { //删除按钮(二级评论)
        let setthis = this
        confirm({
            title: '确定要删除这条评论吗？',
            content: '如果你点击OK按钮，评论将从数据库删除，无法恢复',
            onOk() {
                //  alert(data,'并调用数据库删除')//调用数据库删除
                fetch(servicePath.delpinglunTwo, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data)
                        setthis.setState({
                            urldatat: data.reverse()
                        })
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                        setTimeout(() => {
                            this.setState({ isLoading: false })
                        }, 500)
                    });
            },
            onCancel() {
                message.success('取消操作，程序不做处理')
            }
        })
    }
    render() {
        return (<div>
            <List header={
                <Row className='list-div'>
                    <Col span={4} style={{ paddingRight: '1rem' }}>
                        <b>文章标题</b>
                    </Col>
                    <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论(时间-昵称)</b>
                    </Col>
                    <Col span={14} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论内容(一级评论)</b>
                    </Col>
                    <Col span={2} style={{ paddingLeft: '1rem' }}>
                        <b>操作</b>
                    </Col>
                </Row>
            } bordered dataSource={this.state.urldata}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Row className='list-div' style={{ width: '100%' }}>
                                <Col span={4} style={{ paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.articleTitle}
                                </Col>
                                <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.time}
                                    <br />
                                    {item.commentname=='cyj博主cyj'?<span style={{color:'red'}}>博主</span>:item.commentname}
                                </Col>

                                <Col span={14} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.commentcontent}
                                </Col>
                                <Col span={2} style={{ paddingLeft: '1rem' }}>
                                    <Button onClick={() => { this.delArticle(item._id) }}>删除</Button>
                                </Col>
                            </Row>
                        </List.Item>
                    )

                }}
            />
            <List header={
                <Row className='list-div'>
                    <Col span={4} style={{ paddingRight: '1rem' }}>
                        <b>文章标题</b>
                    </Col>
                    <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论(时间-昵称)</b>
                    </Col>
                    <Col span={14} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论内容(二级评论)</b>
                    </Col>
                    <Col span={2} style={{ paddingLeft: '1rem' }}>
                        <b>操作</b>
                    </Col>
                </Row>
            } bordered dataSource={this.state.urldatat} style={{marginTop:'2rem'}}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Row className='list-div' style={{ width: '100%' }}>
                                <Col span={4} style={{ paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.articleTitle}
                                </Col>
                                <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.time}
                                    <br />
                                    {item.commentname=='cyj博主cyj'?<span style={{color:'red'}}>博主</span>:item.commentname}
                                </Col>

                                <Col span={14} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.commentcontent}
                                </Col>
                                <Col span={2} style={{ paddingLeft: '1rem' }}>
                                    <Button onClick={() => { this.delArticleT(item._id) }}>删除</Button>
                                </Col>
                            </Row>
                        </List.Item>
                    )

                }}
            />

        </div>);
    }
}

export default Comment;