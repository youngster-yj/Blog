import React,{Component} from 'react'
import { Row, Col, Icon, Breadcrumb, Affix, BackTop, message, Spin,Tooltip } from 'antd'
import CountUp from 'react-countup';
import QRCode from 'qrcode.react'//二维码
import Header from './components/Header'//头部导航栏组件
import Author from './components/Author'
import Advert from './components/Advert'
import Footer from './components/Footer'
import Comment from './components/Comment'
import Pinglun from './components/Pinglun'
import './style/page/blog.css'
import servicePath from './config/apiUrl'
import store from './store/index' //redux使用

import marked from 'marked'
import hljs  from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import BlogBar from './BlogBar' //引入博客页导航
const tocify = new BlogBar() //使用


class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       urldata:{articleContent:'正在加载...'},
       pinglundata:[],
       pinglunindata:[],
       isLoading: true,

       def:store.getState().defstyle
     }
     store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
  }
  storeChange(){//引用redux中的值修改当前state
    this.setState({def:store.getState().defstyle})
  }
  componentWillMount(){
    const renderer = new marked.Renderer()
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
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

    document.addEventListener('visibilitychange',function(){
      var isHidden = document.hidden;
      if(isHidden){
      document.title = '404!!!页面丢失(￣▽￣)"';
      
      } else {
      document.title = '嘤嘤嘤，你回来了啊(ಥ _ ಥ)';
        setTimeout(()=>{
          document.title = '博客详情页 | Youngster_程的个人博客'
        },3000)
      }
      }
      );

    // document.title = '博客详情页 | Youngster_程的个人博客'
    var urldata = this.props.match.params.id
    // console.log(this.props.match.params.id)
        if (urldata) {
          fetch(servicePath.getArticleByName+'?articleTitle='+urldata, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if(data=='文章标题更新,请返回主页重新进入'){
                  message.warning('文章出现更新,请返回主页重新进入')
                }
                else{
                  this._isAllow(data)
                }
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });

            // this.changeComment()
        }
  }
  _isAllow(datas){//cookie查询是否可进入
    fetch(servicePath.checkMaster, {
    credentials: 'include',//带上cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
    .then(res => res.json())
    .then((data) => {
        // console.log(data)
        if(data){//cookie版本
          this.setState({
            urldata:datas[0],
            isLoading: false
          })
          this.changeComment()
        }
        else if(datas[0].isenter==false&&sessionStorage.getItem("user_token") != 'letgoall'){
          message.warning('你没有权限访问此篇文章呢!')
          this.props.history.goBack()
        }
        else{
          this.setState({
            urldata:datas[0],
            isLoading: false
          })
          this.changeComment()
        }
    })
    .catch((error) => {
        message.error('movies+images服务器端炸裂' + error)
    });
}
  changeComment(){ //子元素调用请求评论
    let title = this.props.match.params.id
    fetch(servicePath.getpinglunbytitle+'?articleTitle='+title, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
  })
      .then(res => res.json())
      .then((data) => {
          // console.log(data)
          if(data.length!=0){
              this.setState({
                pinglundata:data
              })
              this.changeCommentin()
          }
          else{
             message.success('本篇没有留言呢...留下脚印吧') 
          }               
      })
      .catch((error) => {
          message.error('Blog页服务器端炸裂' + error)
          setTimeout(() => {
              this.setState({ isLoading: false })
          }, 500)
      });
  }
  changeCommentin(){//子元素调用请求评论中的评论
    // console.log('id:'+this.state.pinglundata[0]._id)
    // console.log('length'+this.state.pinglundata.length)
    var length = this.state.pinglundata.length
    var b = []
    for(let i=0;i<length;i++){
      b.push(this.state.pinglundata[i]._id)
    }
    // console.log(b)

    if(this.state.pinglundata.length!=0){
      fetch(servicePath.getpinglunbyid+'?id='+b, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
  })
      .then(res => res.json())
      .then((data) => {
          // console.log(data)
          if(data.length!=0){
              this.setState({
                pinglunindata:data
              })
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
  toBack(){
    this.props.history.goBack()
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() { 
    const urlhtml=marked(this.state.urldata.articleContent)
    const data = this.state.urldata

    var pinglundata = this.state.pinglundata
    var pinglunindata = this.state.pinglunindata
    return ( 
<div>

    <BackTop>
      <div className="ant-back-top-inner" ><Icon type="rocket"  style={this.state.def?{color:'lightpink'}:null}/></div>
    </BackTop>
  

        <Header/>
   
      <Row className='comm-main' type='flex' justify='center' style={{paddingTop:'3.2rem'}}>
      
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} style={{backgroundColor:'rgba(255,255,255,0.3)'}}>
        <Spin tip='加载中...' spinning={this.state.isLoading}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a onClick={()=>{this.toBack()}}>首页</a></Breadcrumb.Item>
                {/* <Breadcrumb.Item><a href='/'>视频列表</a></Breadcrumb.Item> */}
                <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className='detailed-title' style={this.state.def?{color:'deeppink'}:null}>
                {data.articleTitle}
            </div>
              <div className='list-icon center'>
                <span><Icon type='calendar' />{data.showDate}</span>
                <span><Icon type='folder' />{data.selectedType}</span>
                <span><Icon type='fire' /><CountUp start={1} end={data.fire?data.fire:1} duration={2} style={{padding:'0px'}}/></span>
              </div>

              <div className='detailed-content' dangerouslySetInnerHTML={{ __html: urlhtml }}></div>
               
            </div>
          </div>
          <div className='share' style={{textAlign:'center'}}>
          <a className='share-hover1' href={"http://service.weibo.com/share/share.php?appkey=&title="+data.articleTitle+"&url=https://www.jsfan.net/blog/"+data.articleTitle+"&searchPic=false&style=simple"} target="_blank">
          <Icon className='share-hover1-in' type="weibo-circle" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#ff763b',borderRadius:'1rem',border:'1px solid #ff763b',marginRight:'1rem'}}/></a>
         
          <a className='share-hover2' href={"http://connect.qq.com/widget/shareqq/index.html?url=https://www.jsfan.net/blog/"+data.articleTitle+"&title="+data.articleTitle} target="_blank">
          <Icon className='share-hover2-in' type="qq" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#56b6e7',borderRadius:'1rem',border:'1px solid #56b6e7',marginRight:'1rem'}} /></a>
         
          <Tooltip overlayClassName='clear-bug' placement="topLeft" title={
            <div>
            <p className='wechat-head'>微信扫一扫：分享</p>
            <div style={{width: '6rem',margin: '10px auto'}}>
            <QRCode style={{width:'100%',height:'100%'}} value={'https://www.jsfan.net/blog/'+data.articleTitle}/>
              {/* <img style={{width:'100%'}} src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.jsfan.net/blog/'+data.articleTitle}></img> */}
              </div>
            <div style={{color:'black',textAlign:'center',fontSize:'.7rem',padding:'0 .5rem'}}><p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈</p></div>
        </div>
          } arrowPointAtCenter>
          <Icon className='share-hover3' type="wechat" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#7bc549',borderRadius:'1rem',border:'1px solid #7bc549',marginRight:'1rem'}} />
          </Tooltip>

          <a className='share-hover4' href={"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+data.articleTitle+"&url=https://www.jsfan.net/blog/"+data.articleTitle+" &pics=false"} target="_blank">
          <i className="icon iconfont icon-QQkongjian" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#FDBE3D',borderRadius:'1rem',border:'1px solid #FDBE3D',marginRight:'1rem'}} ></i></a>

          <a className='share-hover5' href={"https://twitter.com/intent/tweet?text="+data.articleTitle+"&url=https://www.jsfan.net/blog/"+data.articleTitle} target="_blank">
          <Icon className='share-hover5-in' type="twitter" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#55acee',borderRadius:'1rem',border:'1px solid #55acee',marginRight:'1rem'}} /></a>
         
          <a className='share-hover6' href={"http://www.facebook.com/sharer.php?u=https://www.jsfan.net/blog/"+data.articleTitle+"&t="+data.articleTitle} target="_blank">
          <Icon className='share-hover6-in' type="facebook" style={{transition: 'background 0.6s ease-out 0s',fontSize:'1.2rem',padding:'.3rem',color:'#44619D',borderRadius:'1rem',border:'1px solid #44619D',marginRight:'1rem'}}/>
          </a>
         
          </div>
          {/* <Comment>
            <Comment nopinglun={true}/>
            <Comment nopinglun={true}/>
          </Comment> */}
          {
            pinglundata.length?
              pinglundata.map((item,index)=>(
                <Comment key={index} pinglundata={item}  onclick={()=>{this.changeComment()}}>
                  {
                    pinglunindata.length?pinglunindata.map((itemin,indexin)=>(
                      item._id==itemin.id?<Comment nopinglun={true} key={indexin} pinglundata={itemin} onclick={()=>{this.changeComment()}}/>:null
                    )):null
                  }
                </Comment>
              ))
            :null
          }
          <Pinglun topdata={this.props.match.params.id} onclick={()=>{this.changeComment()}}/>
          </Spin>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author  gotoadmin={this.props.history}/>
          <Advert/>
          <Affix offsetTop={50}>
            <div className='detailed-nav comm-box cssniceright'  style={{backgroundColor:'rgba(255,255,255,0.6)'}}>
            <div className='nav-title'>文章目录</div>
              <div className='maintoc'>
                {tocify && tocify.render()}
              </div>
              {/* <div className='nomore'>- 文章标题过小(则不显示) -</div> */}
            </div>
          </Affix>
        </Col>

      </Row>
      <Footer />
    </div>
     );
  }
}
 

export default Blog
