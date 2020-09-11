import React, { Component } from 'react';
import { Row, Col, List, Icon, Affix, BackTop,message, Spin, Tag,Input,Typography } from 'antd'
import CountUp from 'react-countup';
import LazyLoad from 'react-lazyload';
import Header from './components/Header'
import Author from './components/Author'
import Footer from './components/Footer'
import Link from './components/LinkChange'
import servicePath from './config/apiUrl'
import './style/page/life.css'
import store from './store/index' //redux使用

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
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
const { Search } = Input
const { Paragraph } = Typography;
class Life extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          getblog:[],
          isLoading: true,
          
          searchblog:[],
          searchValue:'',

          def:store.getState().defstyle,
          drawer:store.getState().drawerstyle,
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
      this.setState({
        def:store.getState().defstyle,
        drawer:store.getState().drawerstyle,
      })
    }
    componentWillMount(){
      // document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
      window.scrollTo(0, 0);  

      document.addEventListener('visibilitychange',function(){
        var isHidden = document.hidden;
        if(isHidden){
        document.title = '404!!!页面丢失(￣▽￣)"';
        
        } else {
        document.title = '嘤嘤嘤，你回来了啊(ಥ _ ಥ)';
          setTimeout(()=>{
            document.title = '生活页 | Youngster_yj的个人博客'
          },3000)
        }
        }
        );

      document.title = '生活页 | Youngster_yj的个人博客'
      fetch(servicePath.getArticleList+'?name=生活分享', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            data = data.reverse()

          //获取置顶文章并重新排序
          let top = data.filter((item)=>{
            return item.topblog == true 
          })
          let notop = data.filter((item)=>{
            return item.topblog != true 
          })

          //非置顶文章根据日期排序
          var compare = function (obj1, obj2) {
            var val1 = new Date(obj1.showDate);
            var val2 = new Date(obj2.showDate);
            if (val1 < val2) {
                return -1;
            } 
            else if (val1 > val2) {
                return 1;
            } 
            else {
                return 0;
            }            
          }
          notop.sort(compare).reverse()
          //非置顶文章根据日期排序

          let add = notop.reverse()
          top.map((item)=>{
             add.push(item)
          })
          let add2 = add.reverse()
          // console.log(add2) //新的排序
  
            this.setState({
              getblog:add2,
              isLoading: false,
              searchblog:add2 //缓存搜索数据
            })
        })
        .catch((error) => {
            message.error('服务器端炸裂' + error)
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        });
    }
    searchInput(data){
      this.setState({
        searchValue:data.target.value
      })
      let inputdata = data.target.value.toLocaleUpperCase() //转换大写
      if(inputdata.length>0){
        let blogdata = this.state.searchblog
        let regexp = [] //存储匹配到的数据
        blogdata.map((item)=>{
          let allInfo = item.articleTitle+item.introducemd+item.showDate
        try {
          var re = new RegExp( inputdata , 'i')//i标志表示忽略大小写
        } catch (error) { //正则错误处理
          message.warning('搜索词出错,请重新输入!')
          inputdata='\\w'
          var re = new RegExp( inputdata , 'i')
          this.setState({
            searchValue:''
          })
        }
        
        if(re.test(allInfo.toLowerCase())){ //转换小写
          regexp.push(item)
        }
        })
        // console.log(regexp)
        this.setState({
          getblog:regexp
        })
      }
      else{
        this.setState({
          getblog:this.state.searchblog
        })
      }
      
    }
    Routerdata(data) {
      this.props.history.push('/blog/' + data)
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return;
      };
    }
    render() { 
        return ( 
            <div style={this.state.drawer?{paddingLeft:'256px',overflow:'hidden',transition:'all linear .3s',position:' fixed',width:'170%'}:null}>
          
              <Header />
           
            <BackTop>
            <div className="ant-back-top-inner" ><Icon type="rocket"  style={this.state.def?{color:'lightpink'}:null}/></div>
          </BackTop>
            <Row className='comm-main' type='flex' justify='center' style={{paddingTop:'3.2rem'}}>
              <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} style={{backgroundColor:'rgba(255,255,255,.4)'}}>
              <Spin tip='加载中...' spinning={this.state.isLoading}>
              <List
            header={<Row><Col xs={12} sm={14} md={15} lg={17} xl={17}><div style={{ fontWeight: 'bold', paddingLeft: 20 ,lineHeight: '32px'}}>生活趣事 <span style={{color: 'red'}}>{this.state.getblog.length}</span> 篇</div></Col>
            <Col xs={11} sm={9} md={8} lg={6} xl={6}><Search value={this.state.searchValue} placeholder="搜索趣事内容" onChange={(e)=>{this.searchInput(e)}} /></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col></Row>}
            itemLayout='vertical'//
            dataSource={this.state.getblog}
            renderItem={(item,index) => {
              const html = marked(item.introducemd)
                return(
                  <List.Item key={index}>

<LazyLoad height={100} offset={-200}>
                   
                   <div className={index%2==0?'cssnice1':'cssnice4'}>
                     <div className='borderbac'>
                       <div className='bacimg' style={window.screen.width>=770?{height: '18rem',backgroundImage:"url('http://www.jsfan.net:3002/lifeimg/life%20("+parseInt(Math.random()*74)+").jpg')"}:{height: '10rem',backgroundImage:"url('http://www.jsfan.net:3002/lifeimg/life%20("+parseInt(Math.random()*74)+").jpg')"}}>
                         <div className='bacophover'>
                           <div className='bacimg-title'><Paragraph ellipsis style={{color:'#fff'}}><a className='label' style={{color:'#fff'}}>{item.sourceType==undefined?'生活分享':item.sourceType}</a><span style={{textShadow: '0 0 8px #fff'}}>{item.articleTitle}</span></Paragraph></div>
                           <div className='bacimg-content' style={window.screen.width>=770?{marginTop:'5rem'}:null} dangerouslySetInnerHTML={{ __html: html }}></div>
                         </div>
                       </div>

                       
                     </div>

                     <div className='botinfo'>
                       <span style={{paddingRight:'1rem'}}><Icon type='calendar'  style={{color:'lightseagreen'}}/>{item.showDate}</span>
                       <span style={{paddingRight:'1rem'}}><Icon type='twitter' style={{color:'#ff00ff'}}/>{item.sourceType==undefined?'生活分享':item.sourceType}</span>
                       {item.sourceType=='秃头日记'?null:
                       <span style={{paddingRight:'1rem'}}><Icon type='fire' style={{color:'red'}}/>{item.fire?<CountUp start={0} end={item.fire} duration={2} style={{padding:'0px'}}/>:'暂无浏览'}</span>
                       }
                       {window.screen.width>=770?
                       <span style={{paddingRight:'1rem'}}><Icon type='user'  style={{color:'lightseagreen'}}/>Youngster_yj</span>
                       :null}
                       {item.isenter||item.isenter==undefined?null: <span style={{paddingRight:'1rem'}}><Icon type='eye-invisible'  style={{color:'lightseagreen'}}/>文章加密</span>}
                       {item.sourceType!='秃头日记'?<a style={{float:'right'}} onClick={() => { this.Routerdata(item.articleTitle) }}><Icon type="arrows-alt" style={{ marginRight: 10 }} /><span>查看全文 》</span></a>:null}
                     </div>
                   </div>
                   
                    {/* <div className={window.screen.width>=770?'cssnice1':'cssnice'}>

                <div className='list-title'>
                  {
                  item.sourceType!='秃头日记'?
                  <a><span onClick={() => { this.Routerdata(item.articleTitle) }} style={this.state.def?{color:'deeppink'}:null}>{item.articleTitle}</span></a>
                  :null
                  }
                  
                </div>
                <div className='list-icon'>
                {
                  item.topblog?<span><Tag color="red" style={{margin:0}}>置顶</Tag></span>:null
                } 
              <span><Icon type='calendar'  style={{color:'lightseagreen'}}/> {item.showDate}</span>
              <span><Icon type='twitter' style={{color:'#ff00ff'}}/> {item.sourceType==undefined?'生活分享':item.sourceType}</span>
                  <span><Icon type='fire' style={{color:'red'}}/> {item.fire?<CountUp start={0} end={item.fire} duration={2} style={{padding:'0px'}}/>:'暂无浏览'}</span>
                </div>
                <div className='list-context' dangerouslySetInnerHTML={{ __html: html }}></div>
                <div className='details' style={{ textAlign: 'right', marginRight: 20, fontSize: 15, color: '#1e90ff',position: 'relative' }}>
                    {item.isenter||item.isenter==undefined?null: <Tag color="#87d068" style={{margin:0,left: '.5rem',position: 'absolute'}} onClick={()=>{message.warning('当前文章仅博主可访问')}}>文章加密</Tag>}
                    {item.sourceType!='秃头日记'?<a onClick={() => { this.Routerdata(item.articleTitle) }}><Icon type="arrows-alt" style={{ marginRight: 10 }} /><span>查看全文 》</span></a>:null}
                    
                  </div>
                  
                  </div> */}
                  </LazyLoad>

              </List.Item>
                  )
             }}
            />
              </Spin>
              </Col>
              <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author gotoadmin={this.props.history}/>
              <Link/>
              </Col>
            </Row>
            <Footer/>
          </div>
         );
    }
}
 
export default Life;