import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal, Divider,Input, Tooltip, Icon } from 'antd'
import servicePath from '../../config/apiUrl'
import Zmage from 'react-zmage'   
const { confirm } = Modal
class MainMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata: [],
            visible:false,
            addvisible:false,
            updata:{},//缓存修改数据
        }
    }
    componentWillMount() {
        fetch(servicePath.getmainmovies, {
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
    handleOk(){ //修改
        let id = this.state.updata._id
        let name = this.state.updata.name
        let thumb = this.state.updata.thumb
        let movie = this.state.updata.movie
        if(name.length!=0&&thumb.length!=0&&movie.length!=0){
            fetch(servicePath.uprnmovie, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'type=main' + '&id=' + id + '&name=' + name + '&thumb=' + thumb + '&movie=' + movie 
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    message.success('添加成功')
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
    }
    addhandleOk(){ //添加
        let name = this.state.updata.name
        let thumb = this.state.updata.thumb
        let movie = this.state.updata.movie
        if(name.length!=0&&thumb.length!=0&&movie.length!=0){
            fetch(servicePath.addrnmovie, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'type=main' + '&name=' + name + '&thumb=' + thumb + '&movie=' + movie 
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    message.success('添加成功')
                    this.setState({
                       urldata:data,
                       addvisible: false,
                    });
                }
                else{
                    message.error('存储失败')
                    this.setState({
                        addvisible: false,
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
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    addhandleCancel = e => {
        this.setState({
            addvisible: false,
        });
    };
    showModal = (data) => {
        this.setState({
            visible: true,
            updata:data
        });
    };
    showAddModal(){
        this.setState({
            addvisible: true,
            updata:{name:'',thumb:'',movie:''},//缓存修改数据
        });
    }
    delrnmovie(item){ //删除视频
        let setthis= this
        confirm({
            title:'确定要删除这个视频吗？',
            content:'如果你点击OK按钮，视频将在APP端删除',
            onOk(){
                fetch(servicePath.delrnmovie, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body:'type=main' + '&id='+item._id 
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
               message.success('取消操作，程序不做置顶处理')
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
                            <a onClick={()=>{this.showAddModal()}} style={{color:'deeppink'}}>添加视频</a>
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
                                            <Button type='primary' onClick={()=>{this.showModal(item)}}>修改</Button>
                                            </Col>
                                        </Row>
                                    </List.Item> 
                                
                            </div>

                        )

                    }}
                />
                                    <Modal
                        title="修改RN视频信息"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel}
                        okText="立即修改"
                        cancelText="取消"
                        maskClosable={false}
                        centered={true}
                        destroyOnClose={true}
                        maskStyle={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}
                    >
                        <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.name = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.name}
                            style={{marginBottom: '1rem'}}
                            placeholder="视频名称(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="视频名称必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.thumb = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.thumb}
                            style={{marginBottom: '1rem'}}
                            placeholder="图片链接(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="图片链接必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.movie = e.target.value
                                this.setState({updata:save})
                            }}
                            defaultValue={this.state.updata.movie}
                            style={{marginBottom: '1rem'}}
                            placeholder="视频链接(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="视频链接必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                    </Modal>

                    <Modal
                        title="添加RN视频信息"
                        visible={this.state.addvisible}
                        onOk={()=>this.addhandleOk()}
                        onCancel={this.addhandleCancel}
                        okText="立即添加"
                        cancelText="取消"
                        maskClosable={false}
                        centered={true}
                        destroyOnClose={true}
                        maskStyle={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}
                    >
                        <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.name = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.name}
                            style={{marginBottom: '1rem'}}
                            placeholder="视频名称(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="视频名称必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.thumb = e.target.value
                                this.setState({updata:save})
                            }
                            }
                            defaultValue={this.state.updata.thumb}
                            style={{marginBottom: '1rem'}}
                            placeholder="图片链接(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="图片链接必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                         <Input
                            onChange={(e)=>{
                                let save = this.state.updata
                                save.movie = e.target.value
                                this.setState({updata:save})
                            }}
                            defaultValue={this.state.updata.movie}
                            style={{marginBottom: '1rem'}}
                            placeholder="视频链接(必填)"
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="视频链接必须填写">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                    </Modal>
            </div>
        );
    }
}

export default MainMovies;