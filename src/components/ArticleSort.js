import React, { Component } from 'react';
import { Spin, message, Badge,Typography } from 'antd';
import { Link } from 'react-router-dom'
import servicePath from '../config/apiUrl'
import '../style/components/articlesort.css'
const { Paragraph } = Typography;
class ArticleSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        }
    }
    componentWillMount(){
        fetch(servicePath.changeBlogList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                //排序数组对象中的数值
                var compare = function (obj1, obj2) {
                    var val1 = obj1.fire;
                    var val2 = obj2.fire;
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }            
                } 
                // console.log(data.sort(compare)) 构造排序规则
                // console.log(data.sort(compare).reverse())
                this.setState({
                    data:data.sort(compare).reverse().slice(0,10),
                    isLoading: false,
                })
                
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    Routerdata(data) {
        this.props.history.push('/blog/' + data)
      }
    render() {
        return (
            <div className='ad-div comm-box' style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
                <div className='nav-title' style={{marginBottom:'.5rem',color: 'deeppink',fontWeight: '800'}}>hot 文章</div>
                <Spin tip='加载中...' spinning={this.state.isLoading}>
                    <div style={{minHeight:'5rem'}}>
                   {this.state.data.map((item,index)=>(
                       <div key={index} style={{marginBottom:'.7rem'}} className='cssnice'>
                            
                           <Paragraph ellipsis>
                               {
                                   
                                   index==0?<div style={{textOverflow:'ellipsis'}}>
                                   <Badge
                                   count={index+1}
                                   style={{marginTop:'-.25rem', boxShadow: '0 0 0 1px #d9d9d9 inset'}}
                                   /><Link to={'/blog/'+item.articleTitle}><span style={{paddingLeft:'.3rem'}} className='spanborder'>{item.articleTitle}</span></Link></div>:null
                               }
                               {
                                   index==1?<div style={{textOverflow:'ellipsis'}}>
                                   <Badge
                                   count={index+1}
                                   style={{backgroundColor: 'orange', boxShadow: '0 0 0 1px #d9d9d9 inset' ,marginTop:'-.25rem'}}
                                   /><Link to={'/blog/'+item.articleTitle}><span style={{paddingLeft:'.3rem'}} className='spanborder'>{item.articleTitle}</span></Link></div>:null
                               }
                               {
                                   index==2?<div style={{textOverflow:'ellipsis'}}>
                                   <Badge
                                   count={index+1}
                                   style={{backgroundColor: '#52c41a' , boxShadow: '0 0 0 1px #d9d9d9 inset',marginTop:'-.25rem'}}
                                   /><Link to={'/blog/'+item.articleTitle}><span style={{paddingLeft:'.3rem'}} className='spanborder'>{item.articleTitle}</span></Link></div>:null
                               }
                               {
                                   index>2?<div style={{textOverflow:'ellipsis'}}>
                                   <Badge
                                   count={index+1}
                                   style={{backgroundColor: '#fff',color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' ,marginTop:'-.25rem'}}
                                   /><Link to={'/blog/'+item.articleTitle}><span style={{paddingLeft:'.3rem'}} className='spanborder'>{item.articleTitle}</span></Link></div>:null
                               }
                               {/* <Badge
                               count={index+1}
                               style={{backgroundColor: '#fff',color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' ,marginTop:'-.25rem'}}
                               /><Link to={'/blog/'+item.articleTitle}><span style={{paddingLeft:'.3rem'}}>{item.articleTitle}</span></Link> */}
                            </Paragraph>
                            
                       </div>
                   ))}
                   </div>
                </Spin>
            </div>
        );
    }
}

export default ArticleSort;