import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal } from 'antd'
import servicePath from '../config/apiUrl'
const { confirm } = Modal
class Wechat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
            urldatat:[]
        }
    }
    componentWillMount() {

        fetch(servicePath.getwechatpinglun, {
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
                fetch(servicePath.delwechat, {
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
                            urldata: data
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
                <Row className='list-div' style={{textAlign:'center'}}>
                     <Col span={2} style={{ paddingRight: '1rem' }}>
                        <b>昵称</b>
                    </Col>
                    <Col span={3} style={{ paddingRight: '1rem' }}>
                        <b>发布者所在地</b>
                    </Col>
                    <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>时间</b>
                    </Col>
                    <Col span={1} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>TWO</b>
                    </Col>
                    <Col span={12} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论内容(一级评论)</b>
                    </Col>
                    <Col span={2} style={{ paddingLeft: '1rem' }}>
                        <b>操作</b>
                    </Col>
                </Row>
            } bordered dataSource={this.state.urldata.reverse()}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Row className='list-div' style={{ width: '100%',textAlign:'center' }}>
                                <Col span={2} style={{ paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                {item.commentname=='cyj博主cyj'?<span style={{color:'red'}}>博主</span>:item.commentname}
                                </Col>
                                <Col span={3} style={{ paddingLeft: '1rem',paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.address}
                                </Col>
                                <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.time}
                                    <br/>
                                    <span style={{fontSize:'.75rem',color:'coral'}}>{item.commentimg}</span>
                                </Col>
                                <Col span={1} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.id?'√':'×'}
                                </Col>
                                <Col span={12} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
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
        </div>);
    }
}

export default Wechat;