import React, { Component } from 'react';
import Header from './components/Header'
import Author from './components/Author'
import Footer from './components/Footer'
import servicePath from './config/apiUrl'
import { Row, Col, List, Timeline, Icon, Affix, BackTop, message, Spin, Tag, Input } from 'antd'
import './style/components/history.css'
import ArticleSort from './components/ArticleSort'
import CommentSort from './components/CommentSort'

import LazyLoad from 'react-lazyload';

import ReactEcharts from 'echarts-for-react';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urldata:[],
            isLoading: true,
            radardata:[
                {text: 'Flutter', max: 5,now:1,study:1},
                {text: 'Regex', max: 5,now:1,study:2},
                {text: 'Markdown', max: 5,now:1,study:2},
                {text: 'TypeScript', max: 5,now:1,study:2},
                {text: 'Canvas', max: 5,now:0,study:1},
                {text: 'Jquery', max: 5,now:0,study:2},
                {text: 'Webpack', max: 5,now:1,study:2},
                {text: 'Node', max: 5,now:3,study:3},
                {text: 'React Native', max: 5,now:0,study:3},
                {text: 'Mongodb', max: 5,now:0,study:3},
                {text: 'React', max: 5,now:5,study:4},
                {text: 'Vue', max: 5,now:4,study:3},
                {text: '项目实战', max: 5,now:2,study:2},
            ]
        }
    }
    componentWillMount() {
        // document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
        window.scrollTo(0, 0);  
        document.addEventListener('visibilitychange',function(){
            var isHidden = document.hidden;
            if(isHidden){
            document.title = '404!!!页面丢失(￣▽￣)"';
            
            } else {
            document.title = '嘤嘤嘤，你回来了啊(ಥ _ ಥ)';
              setTimeout(()=>{
                document.title = '记录页 | Youngster_yj的个人博客'
              },3000)
            }
            }
            );
            document.title = '记录页 | Youngster_yj的个人博客'
        //请求文章列表
        fetch(servicePath.changeBlogList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    urldata: data.reverse(),
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
      getOption =()=> {
        let thiss = this
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                right: 'center',
            },
            radar: [
                {
                    indicator: (function (){
                        var res = [];
                        thiss.state.radardata.map((item)=>{
                            res.push({text: item.text, max: item.max});
                        })
                        return res;
                    })(),
                    center: ['50%', '50%'],
                    radius: 80
                },
            ],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    areaStyle: {},
                    data: [
                        {
                            value: (function(){
                                var res = [];
                                thiss.state.radardata.map((item)=>{
                                    res.push(item.now);
                                })
                                return res;
                            })(),
                            name: '文章分类雷达图'
                        },
                        {
                            value: (function(){
                                var res = [];
                                thiss.state.radardata.map((item)=>{
                                    res.push(item.study);
                                })
                                return res;
                            })(),
                            name: '知识学习雷达图'
                        },
                    ]
                },

            ]
        }
        return option;
      }


    render() {
        return (
            <div>
             
                    <Header />
      
                <BackTop>
                    <div className="ant-back-top-inner" ><Icon type="rocket" /></div>
                </BackTop>


                <Row className='comm-main' type='flex' justify='center' style={{paddingTop:'3.2rem',overflow:'hidden'}}>
                    <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} style={{ backgroundColor: 'rgba(255,255,255,.4)' }}>
                    <Spin tip='加载中...' spinning={this.state.isLoading}>
                        <Timeline mode="alternate" style={{ marginTop: '1rem' }}>
                        <Timeline.Item style={{fontWeight:'bold'}} dot={<Icon type="account-book"  style={{color:'green', fontSize: '1rem' }}/>} >
                                当前共计 <span style={{color:'red',fontWeight: 'bold'}}>{this.state.urldata.length+6}</span> 篇日志,继续加油哦!
                            </Timeline.Item>

                    {this.state.urldata.map((item,index)=>(
                        <Timeline.Item color="green" key={index} className={index%2==0?'cssnice0':'cssnice2'}>
                            {item.sourceType!='秃头日记'?
                            <span style={{color:'deeppink'}} onClick={() => { this.Routerdata(item.articleTitle) }} className='TimelineSpan'>{item.articleTitle}<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>{item.showDate}</span></span>
                            :<span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>{item.articleTitle}<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>{item.showDate}</span></span>}
                          </Timeline.Item>
                        )
                    )}

                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>Vue音乐播放器开发<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2020-3-1</span></span>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>React博客开发<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2020-2-15</span></span>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>Flutter应用初尝试<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2020-1-1</span></span>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>RN视频应用开发<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2019-10-1</span></span>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>原生小网站开发<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2019-5-16</span></span>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        <span onClick={() => { message.warning('历程记载,见证美好生活') }} className='TimelineSpan'>接触Web前端<br></br><span style={{color:'rgb(0, 216, 255)',fontWeight:'400',fontSize:'.75rem'}}>2018-7-1</span></span>
                        </Timeline.Item>
                        </Timeline>
                        </Spin>
                        {this.state.urldata.length>0?
                        <LazyLoad height={300} offset={-200}>
                        <ReactEcharts option={this.getOption()} className='cssnice'
                        opts={{renderer: 'svg'}} // 使用svg渲染
                        />

                        </LazyLoad>:null}
                    </Col>
                    <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author gotoadmin={this.props.history}/>
                        <ArticleSort/>
                        <CommentSort/>
                    </Col>
                </Row>
                <Footer />
            </div>
        );
    }
}

export default History;