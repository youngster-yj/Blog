import React, { Component } from 'react';
import { Upload, Icon, message, Row, Col, Tooltip, Modal } from 'antd';
import servicePath from '../config/apiUrl'
const { Dragger } = Upload;


class Uploads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            movies: [],
            music: []
        }
    }
    getimgandmovies() {
        fetch(servicePath.getAll, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    images: data.images,
                    movies: data.movies,
                    music: data.music
                })
            })
            .catch((error) => {
                message.error('movies+images服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    componentWillMount() {
        this.getimgandmovies()
    }

    render() {
        const images = this.state.images
        const movies = this.state.movies
        const music = this.state.music

        const change = this
        const props = {
            name: 'file',
            multiple: true,
            action: servicePath.upload,
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file);
                    console.log(info.file.response);
                    if(info.file.response.status=="uploading"){
                        message.warning("图片名重复,请检查后再次上传！")
                        return
                    }
                    console.log(info.fileList)
                }
                if (status === 'done') {
                    message.success(`${info.file.name} 文件上传成功.`);
                    change.getimgandmovies()
                } else if (status === 'error') {
                    message.error(`${info.file.name} 文件上传失败.`);
                }
            },
        };
        return (
            <div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="cloud-upload" />
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
                    <p className="ant-upload-hint">
                        支持单个或批量上传。且可拖拽文件上传！
                </p>
                </Dragger>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderRight: 'dashed 1px gray' }}>
                        <div style={{ textAlign: 'center' }}>
                            视频
                    </div>
                        {
                            movies.map((item, index) => (
                                <div key={index} style={{ paddingRight: 10 }}>
                                    <video src={item} controls={true} width='100%' style={{}}></video>
                                    <p style={{ textAlign: 'center' }}>{item}</p></div>
                            ))
                        }
                        <Col span={24} style={{paddingTop:'1rem'}}><p style={{ textAlign: 'center' }}>音乐</p></Col>
                        {
                            music.map((item, index) => (
                                <Col span={24} key={index}>
                                    <div style={{ paddingRight: 10 }}>
                                        <audio src={item} controls={true} style={{margin:'0 auto',display:'block'}}>
                                            您的浏览器不支持 audio 标签。
                                    </audio>
                                        <p style={{ textAlign: 'center' }}>{item}</p></div>
                                </Col>
                            ))
                        }
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                        <div style={{ textAlign: 'center' }}>
                            图片
                    </div>
                        {
                            images.map((item, index) => (
                                <Col span={8} key={index}>
                                    <div style={{ float: 'left', paddingLeft: 10 }}>

                                        <Tooltip placement="top" title={<span>{item}</span>}>
                                            <img src={item} alt="" width='100%' />
                                        </Tooltip>
                                    </div>
                                </Col>
                            ))
                        }
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Uploads;


