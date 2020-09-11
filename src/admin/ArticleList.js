import React, { Component } from 'react';
import {List ,Row ,Col ,message ,Button, Modal } from 'antd'
import servicePath from '../config/apiUrl'
const {confirm} = Modal
class ChangeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            urldata:[]
        }
    }
    componentWillMount(){
        //请求文章列表
        fetch(servicePath.changeSaveList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    urldata:data.reverse()
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    delArticle(data){ //删除按钮
       let setthis= this
       confirm({
           title:'确定要删除这篇博客文章吗？',
           content:'如果你点击OK按钮，文章将从数据库删除，无法恢复',
           onOk(){
            //  alert(data,'并调用数据库删除')//调用数据库删除
             fetch(servicePath.deleteSaveBlog, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'articleTitle=' + data
            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data)
                    setthis.setState({
                        urldata:data.reverse()
                    })
                })
                .catch((error) => {
                    message.error('服务器端炸裂' + error)
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
                });
           },
           onCancel(){
              message.success('取消操作，程序不做处理')
           }
       })
    }
    updataArticle(data){//更改文章
      this.props.history.push('/admin/savearticle/'+data)
    }
    render() { 
        return ( <div>
            <List header={
                <Row className='list-div'>
                    <Col span={8}>
                        <b>标题</b>
                    </Col>
                    <Col span={3}>
                        <b>类别</b>
                    </Col>
                    <Col span={3}>
                        <b>来源</b>
                    </Col>
                    <Col span={3}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={2}>
                        <b>浏览量</b>
                    </Col>
                    <Col span={5}>
                        <b>操作</b>
                    </Col>
                </Row>
            } bordered dataSource={this.state.urldata}
            renderItem={(item)=>{
                return(
                <List.Item>
                    <Row className='list-div' style={{width:'100%'}}>
                    <Col span={8}>
                        {item.articleTitle}
                    </Col>
                    <Col span={3}>
                        {item.selectedType}
                    </Col>
                    <Col span={3}>
                        {item.sourceType}
                    </Col>
                    <Col span={3}>
                        {item.showDate}
                    </Col>
                    <Col span={2}>
                        暂未开放
                    </Col>
                    <Col span={5}>
                        <Button type='primary' onClick={()=>{this.updataArticle(item.articleTitle)}}>修改</Button>
                        <Button onClick={()=>{this.delArticle(item.articleTitle)}}>删除</Button>
                    </Col>
                </Row>
                </List.Item>
                )
                
            }}
            />

           
        </div> );
    }
}
 
export default ChangeArticle;