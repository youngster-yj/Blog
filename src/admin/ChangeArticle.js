import React, { Component } from 'react';
import {List ,Row ,Col ,message ,Button, Modal } from 'antd'
import servicePath from '../config/apiUrl'
const {confirm} = Modal
class ChangeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            urldata:[],
        }
    }
    componentWillMount(){
        //请求文章列表
        fetch(servicePath.changeBlogList, {
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
            });
    }
    canceltopArticle(data){//取消置顶
        let setthis= this
        confirm({
            title:'确定要取消置顶这篇博客文章吗？',
            content:'如果你点击OK按钮，文章将在前台页面取消置顶',
            onOk(){
              fetch(servicePath.cancletopBlog, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                 },
                 body: 'articleTitle=' + data
             })
                 .then(res => res.json())
                 .then((data) => {
                    //  console.log(data)
                     setthis.setState({
                        urldata:data.reverse()
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
    topArticle(data){ //置顶按钮
    let setthis= this
      confirm({
        title:'确定要置顶这篇博客文章吗？',
        content:'如果你点击OK按钮，文章将在前台页面置顶',
        onOk(){
          fetch(servicePath.topBlog, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
             },
             body: 'articleTitle=' + data
         })
             .then(res => res.json())
             .then((data) => {
                //  console.log(data)
                 setthis.setState({
                    urldata:data.reverse()
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
    cancleEnter(data){ //文章设置为不可访问
    let setthis= this
    confirm({
        title:'设置此篇博客文章为不可访问状态？',
        content:'如果你点击OK按钮，文章将在前台页面禁止被游客访问',
        onOk(){
          fetch(servicePath.notEnter, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
             },
             body: 'articleTitle=' + data
         })
             .then(res => res.json())
             .then((data) => {
                 console.log(data)
                 setthis.setState({
                    urldata:data.reverse()
                })
             })
             .catch((error) => {
                 message.error('服务器端炸裂' + error)
             });
        },
        onCancel(){
           message.success('取消操作，程序不做权限处理')
        }
    })
    }
    enter(data){ //文章设置为可访问状态
    let setthis= this
        confirm({
            title:'设置此篇博客文章为可访问状态？',
            content:'如果你点击OK按钮，文章将在前台页面允许被游客访问',
            onOk(){
              fetch(servicePath.allowEnter, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                 },
                 body: 'articleTitle=' + data
             })
                 .then(res => res.json())
                 .then((data) => {
                     console.log(data)
                     setthis.setState({
                        urldata:data.reverse()
                    })
                 })
                 .catch((error) => {
                     message.error('服务器端炸裂' + error)
                 });
            },
            onCancel(){
               message.success('取消操作，程序不做权限处理')
            }
        })
    }
    delArticle(data){ //删除按钮
       let setthis= this
       confirm({
           title:'确定要删除这篇博客文章吗？',
           content:'如果你点击OK按钮，文章将从数据库删除，无法恢复',
           onOk(){
            //  alert(data,'并调用数据库删除')//调用数据库删除
             fetch(servicePath.deleteBlog, {
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
                        urldata:data
                    })
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
    updataArticle(data){//更改文章
      this.props.history.push('/admin/addarticle/'+data)
    }
    render() { 
        return ( <div>
            <List header={
                <Row className='list-div'>
                    <Col span={7}>
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
                    <Col span={6}>
                        <b>操作</b>
                    </Col>
                </Row>
            } bordered dataSource={this.state.urldata}
            renderItem={(item)=>{
                return(
                <List.Item>
                    <Row className='list-div' style={{width:'100%'}}>
                    <Col span={7}>
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
                        {item.fire}
                    </Col>
                    <Col span={6}>
                        <Button type='primary' onClick={()=>{this.updataArticle(item.articleTitle)}}>修改</Button>
                        <Button onClick={()=>{this.delArticle(item.articleTitle)}}>删除</Button>
                        {
                            item.topblog?
                            <Button onClick={()=>{this.canceltopArticle(item.articleTitle)}} type="danger">已置顶</Button>:
                            <Button onClick={()=>{this.topArticle(item.articleTitle)}} type="dashed">未置顶</Button>
                        }
                        {
                            item.isenter||item.isenter==undefined?
                            <Button onClick={()=>{this.cancleEnter(item.articleTitle)}} type="dashed">可访问</Button>:
                            <Button onClick={()=>{this.enter(item.articleTitle)}} type="danger">不可访问</Button>
                        }
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