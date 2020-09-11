import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal,Tooltip } from 'antd'
import servicePath from '../../config/apiUrl'
import Zmage from 'react-zmage' 
const { confirm } = Modal
class RNComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
            urldatat:[]
        }
    }
    componentWillMount() {

        fetch(servicePath.getrnpinglun, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    urldata: data.reverse()
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    delArticle(id) { //删除按钮
        let setthis = this
        confirm({
            title: '确定要删除这条评论吗？',
            content: '如果你点击OK按钮，评论将从数据库删除，无法恢复',
            onOk() {
                fetch(servicePath.delrnpinglun, {
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
                        },()=>{
                            message.success('删除成功')
                        })
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
    render() {
        return (<div>
            <List header={
                <Row className='list-div' style={{textAlign:'center'}}>
                     <Col span={3} style={{ paddingRight: '1rem' }}>
                        <b>视频名</b>
                    </Col>
                    <Col span={3} style={{ paddingRight: '1rem' }}>
                        <b>发布者笔名</b>
                    </Col>
                    <Col span={3} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={3} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>发布者头像</b>
                    </Col>
                    <Col span={10} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <b>评论内容</b>
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
                                <Col span={3} style={{ paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                {item.moviename}
                                </Col>
                                <Col span={3} style={{ paddingLeft: '1rem',paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.name}
                                </Col>
                                <Col span={3} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.time}
                                </Col>
                                <Col span={3} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                <Tooltip title={item.imageurl} arrowPointAtCenter>
                                    <img src={item.imageurl} alt="" style={{width:'100%'}}  onClick={() => Zmage.browsing({ src:item.imageurl })}/>
                                </Tooltip>
                                </Col>
                                <Col span={10} style={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px dashed gray' }}>
                                    {item.content}
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

export default RNComment;