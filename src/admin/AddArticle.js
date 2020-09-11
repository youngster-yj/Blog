import React, { Component } from 'react';
import marked from 'marked'
import './style/page/addarticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import moment from 'moment';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import servicePath from '../config/apiUrl'
const { Option } = Select
const { TextArea } = Input

const renderer = new marked.Renderer()
marked.setOptions({
    renderer: renderer,
    gfm: true,//启动类似Github样式的Markdown,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false,//原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true,//支持Github形式的表格，必须打开gfm选项
    breaks: true,//支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,//优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: true,
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    }
})

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleId: 0,// 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
            oldarticleTitle:'',//以前的标题(保存后在数据库依照此标题修改)
            articleTitle: '',//文章标题
            articleContent: '',//markdown的编辑内容
            markdownContent: '预览内容',//html内容
            introducemd: '',//简介的markdown内容
            introducehtml: '等待编辑',//简介的html内容
            showDate: '',//发布日期
            updateDate: '',//修改日志的日期(未使用)
            typeInfo: [],// 文章类别信息(未使用)
            selectedType: '',//选择的文章类别
            sourceType:'',//文章来源

            disabled:false,//修改文章后按钮不可点击
            titledisabled:false,//标题改变控制按钮不可点击
           
        }
    }
    changeContent(e) {
        this.setState({
            articleContent: e
        })
        let html = marked(e) //let html=marked(mdcontent) 的方式转换md 内容为html 并进行渲染
        this.setState({
            markdownContent: html
        })
    }
    changeIntroduce(e) {
        this.setState({
            introducemd: e
        })
        let html = marked(e)
        this.setState({
            introducehtml: html
        })
    }
    condition() {
        if (!this.state.articleTitle) {
            message.warning('文章标题不能为空')
            return false
        }
        else if (!this.state.selectedType) {
            message.warning('必须选择文章类型')
            return false
        }
        else if (!this.state.articleContent) {
            message.warning('文章内容不能为空')
            return false
        }
        else if (!this.state.introducemd) {
            message.warning('文章简介不能为空')
            return false
        }
        else if (!this.state.showDate) {
            message.warning('发布日期不能为空')
            return false
        }
        else if (!this.state.sourceType) {
            message.warning('文章来源不能为空')
            return false
        }
        return true
    }
    saveArticle() {
        if (this.condition()) {
            // message.success('暂存检验通过')
            let articleTitle = this.state.articleTitle //文章标题
                let articleContent = this.state.articleContent //markdown的编辑内容
                articleContent = articleContent.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                articleContent = articleContent.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                articleContent = articleContent.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let introducemd = this.state.introducemd //简介的markdown内容
                introducemd = introducemd.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                introducemd = introducemd.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                introducemd = introducemd.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let showDate = this.state.showDate //发布日期
                let selectedType = this.state.selectedType //选择的文章类别
                let sourceType = this.state.sourceType //选择文章来源
                console.log(articleContent,introducemd)
                fetch(servicePath.saveBlog, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'articleTitle=' + articleTitle + '&articleContent=' + articleContent + '&introducemd=' + introducemd +'&showDate=' + showDate +'&selectedType=' + selectedType +'&sourceType=' + sourceType 
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data)
                        if (data == '存储成功') {
                            message.success('存储成功')
                        }
                        else{
                            message.error('存储失败')
                        }
        
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                        setTimeout(() => {
                            this.setState({ isLoading: false })
                        }, 500)
                    });
        }


    }
    postArticle() {
        if (this.condition()) {
            // message.success('存储检验通过')
            if(!this.state.articleId){
                // message.success('新的存储')
                let articleTitle = this.state.articleTitle //文章标题
                let articleContent = this.state.articleContent //markdown的编辑内容
                articleContent = articleContent.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                articleContent = articleContent.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                articleContent = articleContent.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let introducemd = this.state.introducemd //简介的markdown内容
                introducemd = introducemd.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                introducemd = introducemd.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                introducemd = introducemd.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let showDate = this.state.showDate //发布日期
                let selectedType = this.state.selectedType //选择的文章类别
                let sourceType = this.state.sourceType //选择文章来源
                // console.log(introducemd,articleContent)
                fetch(servicePath.uploadBlog, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'articleTitle=' + articleTitle + '&articleContent=' + articleContent + '&introducemd=' + introducemd +'&showDate=' + showDate +'&selectedType=' + selectedType +'&sourceType=' + sourceType 
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data == '发布成功') {
                            message.success('发布成功')
                        }
                        else{
                            message.error('发布失败')
                        }
        
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                        setTimeout(() => {
                            this.setState({ isLoading: false })
                        }, 500)
                    });
            }
            else{
                // message.success('修改文章')
                let articleTitle = this.state.articleTitle //文章标题
                let articleContent = this.state.articleContent //markdown的编辑内容
                articleContent = articleContent.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                articleContent = articleContent.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                articleContent = articleContent.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let introducemd = this.state.introducemd //简介的markdown内容
                introducemd = introducemd.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
                introducemd = introducemd.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
                introducemd = introducemd.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失
                let showDate = this.state.showDate //发布日期
                let selectedType = this.state.selectedType //选择的文章类别
                let oldarticleTitle = this.state.oldarticleTitle //修改标题凭证
                let sourceType = this.state.sourceType //选择文章来源

                fetch(servicePath.changeBlog, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'oldarticleTitle=' + oldarticleTitle + '&articleTitle=' + articleTitle + '&articleContent=' + articleContent + '&introducemd=' + introducemd +'&showDate=' + showDate +'&selectedType=' + selectedType +'&sourceType=' + sourceType 
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data)
                        if (data == '修改成功') {
                            message.success('修改成功')
                            if(this.state.titledisabled){
                                this.setState({
                                disabled:true
                                })
                            }
                            
                        }
                        else{
                            message.error('修改失败')
                        }
        
                    })
                    .catch((error) => {
                        message.error('服务器端炸裂' + error)
                        setTimeout(() => {
                            this.setState({ isLoading: false })
                        }, 500)
                    });
            }
        }
    }

    componentWillMount() {//页面一加载获取域名参数
        // console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            this.setState({
                articleId: 1
            })
            this.getArticleById(this.props.match.params.id)
        }
    }
    getArticleById(id) {//接受从修改按钮发过来得值 查询数据库并填充页面      
        //数据请求 填充页面
        fetch(servicePath.getArticleByName+'?articleTitle='+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if(data!='文章标题更新,请返回主页重新进入'){
                  this.setState({
                  articleTitle:data[0].articleTitle,
                  oldarticleTitle:data[0].articleTitle,//保存修改凭证
                  articleContent:data[0].articleContent,
                  introducemd:data[0].introducemd,
                  showDate:data[0].showDate,
                  selectedType:data[0].selectedType,
                  sourceType:data[0].sourceType
                },()=>{
                    this.changeContent(data[0].articleContent)
                    this.changeIntroduce(data[0].introducemd)
                })

                }
                else{
                   message.warning('服务端返回数据为空') 
                }               
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }

    render() {
        return (
            <div>
                <Row gutter={5}>
                    <Col span={18}>
                        <Row gutter={10}>
                            <Col span={16}>
                                <Input placeholder='博客标题' value={this.state.articleTitle}
                                    onChange={(e) => { this.setState({ articleTitle: e.target.value,titledisabled:true }) }} size='large' />
                            </Col>

                            <Col span={4}>
                                <Select value={this.state.selectedType==undefined||this.state.selectedType.length==0?'请选择类型':this.state.selectedType} size='large' onChange={(e) => { this.setState({ selectedType: e }) }}>
                                    <Option value='博客分享'>博客分享</Option>
                                    <Option value='实战分享'>实战分享</Option>
                                    <Option value='生活分享'>生活分享</Option>
                                </Select>
                            </Col>

                            <Col span={4}>
                                <Select value={this.state.sourceType==undefined||this.state.sourceType.length==0?'请选择来源':this.state.sourceType} size='large' onChange={(e) => { this.setState({ sourceType: e }) }}>
                                    <Option value='博主原创'>博主原创</Option>
                                    <Option value='学习笔记'>学习笔记</Option>
                                    <Option value='当前计划'>当前计划</Option>
                                    <Option value='美文转载'>美文转载</Option>
                                    <Option value='秃头日记'>秃头日记</Option>
                                    <Option value='智慧抄袭'>智慧抄袭</Option>
                                    <Option value='未知来源'>未知来源</Option>
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={10}>
                            <Col span={12}>
                                <TextArea
                                    value={this.state.articleContent}
                                    className='markdown-content'
                                    rows={35}
                                    placeholder='文章内容'
                                    onChange={(e) => { this.changeContent(e.target.value) }} />
                            </Col>
                            <Col span={12}>
                                <div className='show-html' dangerouslySetInnerHTML={{ __html: this.state.markdownContent }}></div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Col span={12}>
                                    <Button size='large' onClick={() => this.saveArticle()}>暂存文章</Button>
                                </Col>
                                <Col span={12}>
                                    <Button type='primary' size='large' onClick={() => this.postArticle()} disabled={this.state.disabled}>{this.state.articleId ? '确认修改' : '发布文章'}</Button>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <br />
                                <TextArea rows={4} placeholder='文章简介' onChange={(e) => { this.changeIntroduce(e.target.value) }} value={this.state.introducemd} autoSize={{ minRows: 2, maxRows: 8 }}></TextArea>
                                <br /><br />
                                <div className='introduce-html' dangerouslySetInnerHTML={{ __html: this.state.introducehtml }}></div>
                            </Col>
                            <Col span={12}>
                                <div className='date-select'>
                                    <DatePicker value={this.state.showDate==undefined||this.state.showDate.length==0?null:moment(this.state.showDate)} placeholder='发布日期' size='large' onChange={(date, dateString) => { this.setState({ showDate: dateString }) }} />
                                </div>
                            </Col>


                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
//  c为横R为竖
export default AddArticle;