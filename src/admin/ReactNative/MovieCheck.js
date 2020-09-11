import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal, Divider,Input, Tooltip, Icon } from 'antd'
import servicePath from '../../config/apiUrl'
import Zmage from 'react-zmage'   
const { confirm } = Modal
class MovieCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
        }
    }
    componentWillMount() {
        fetch(servicePath.getrnuri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    urldata: data
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    delrnmovie(item){
        let setthis= this
        confirm({
            title:'确定不通过这个视频吗？',
            content:'如果你点击OK按钮，视频将无法在APP端显示',
            onOk(){
                fetch(servicePath.nopassmovie, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id='+item._id 
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data) {
                            message.success('删除成功')
                            setthis.setState({
                               urldata:data,
                            });
                        }
                        else{
                            message.error('删除失败')
                        }
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                    });
            },
            onCancel(){
               message.success('取消操作，程序不做处理')
            }
        })
    }
    passmovie(item){
        let setthis= this
        confirm({
            title:'确定通过这个视频吗？',
            content:'如果你点击OK按钮，视频将在APP端显示',
            onOk(){
                fetch(servicePath.passmovie, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id='+item._id 
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data) {
                            message.success('显示成功')
                            setthis.setState({
                               urldata:data,
                            });
                        }
                        else{
                            message.error('删除失败')
                        }
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                    });
            },
            onCancel(){
               message.success('取消操作，程序不做处理')
            }
        })
    }
    render() {
        return (
            <div>
                <List header={
                    <Row className='list-div' style={{ textAlign: 'center' }}>
                        <Col span={3} style={{ paddingRight: '1rem' }}>
                            <b>视频名称</b>
                        </Col>
                        <Col span={5} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>视频首图</b>
                        </Col>
                        <Col span={7} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>视频链接</b>
                        </Col>
                        <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <b>存储时间</b>
                        </Col>

                        <Col span={5} style={{ paddingLeft: '1rem' }}>
                            <b>操作</b>
                        </Col>
                    </Row>
                } bordered dataSource={this.state.urldata}
                    renderItem={(item) => {
                        return (
                            <div>
                                
                                     <List.Item>
                                        <Row className='list-div' style={{ width: '100%', textAlign: 'center' }}>
                                            <Col span={3} style={{ paddingRight: '1rem' }}>
                                                {item.name}
                                            </Col>
                                            <Col span={5} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <img src={item.thumb} alt="" style={{width:'100%'}} onClick={() => Zmage.browsing({ src:item.thumb })}/>
                                            </Col>
                                            <Col span={7} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                <Tooltip title={item.movie} arrowPointAtCenter>
                                                <video src={item.movie} style={{width:'100%'}} controls={true}></video>
                                                </Tooltip>
                                            </Col>
                                            <Col span={4} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {item.time}
                                            </Col>
                                            <Col span={5} style={{ paddingLeft: '1rem' }}>
                                            <Button onClick={()=>this.delrnmovie(item) }>移除视频</Button>
                                            <Button type='primary' onClick={()=>{this.passmovie(item)}}>同意操作</Button>
                                            </Col>
                                        </Row>
                                    </List.Item> 
                                
                            </div>

                        )

                    }}
                />
            </div>
        );
    }
}

export default MovieCheck;