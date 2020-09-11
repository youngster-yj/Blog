import React, { Component } from 'react';
import Header from './components/Header'
import Author from './components/Author'
import Footer from './components/Footer'
import AllProject from './components/AllProject'
import './style/components/about.css'
import { Row, Col, List, Timeline, Icon, Affix, BackTop, message, Spin, Tag, Input } from 'antd'
import store from './store/index' //redux使用

class About extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            def:store.getState().defstyle
         }
         store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    componentWillMount(){
        window.scrollTo(0, 0);  

        document.addEventListener('visibilitychange',function(){
            var isHidden = document.hidden;
            if(isHidden){
            document.title = '404!!!页面丢失(￣▽￣)"';
            
            } else {
            document.title = '嘤嘤嘤，你回来了啊(ಥ _ ಥ)';
              setTimeout(()=>{
                document.title = '关于页 | Youngster_yj的个人博客'
              },3000)
            }
            }
            );

        document.title = '关于页 | Youngster_yj的个人博客'
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
      }
    render() { 
        return ( 
            <div>                
               <Header />
           
               <BackTop>
                   <div className="ant-back-top-inner" ><Icon type="rocket" /></div>
               </BackTop>

               <Row className='comm-main' type='flex' justify='center'  style={{paddingTop:'2.7rem',overflow:'hidden'}}>
                    <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} style={{ padding:0,backgroundColor: 'rgba(255,255,255,.4)' }}>
                    {/* <Spin tip='加载中...' spinning={this.state.isLoading}> */}
                        <div style={{position:'relative'}} className='hover-img'>
                            <img className='img-one' src={"https://www.jsfan.net/some/lifeimg/life%20("+parseInt(Math.random()*74)+").jpg"} alt=""/>
                            <div className='img-about' style={this.state.def?{color: 'deeppink'}:{color:'rgba(255, 246, 181,1)'}}>关于</div>
                        </div>
                        <div className='debug'>
                         <h1 style={this.state.def?{background: 'rgba(255, 154, 154, .5)'}:{background:'rgba(255, 246, 181, .5)'}}>关于本站</h1>        
                         <p>博主其实并不勤快，但由于疫情影响，漫长的在家时间迫使博主需要做点东西来充实下自己</p>
                         <p>因此这个博客的诞生也实属幸运。。。</p>
                         <p>本站域名为“jsfan”，js代表着博主唯一入门的语言(ps:TS，Dart博主并未随心所欲使用)，fan代表迷和爱好者的意思</p>
                         <p>博主希望此博客能为博主积累技术，也能结识更多的各方面爱好者</p>
                         <p>当您看到此处时，博主很开心又多了一位博主成长历程的见证者</p>
                         <p>本网站于2020年3月份左右上线，主要用于记录与分享个人学习心得。</p>

                         <h1 style={this.state.def?{background: 'rgba(255, 154, 154, .5)'}:{background:'rgba(255, 246, 181, .5)'}}>关于博主</h1> 
                         <p>大三学生党</p> 
                         <p>22年单身汪<img src="https://www.jsfan.net/emoji/b_emoticon_120.png" alt="" style={{width:' 2.3rem'}}></img></p>
                         <p>持续与LOL、守望、GTA5虚度光阴</p>
                         <p>博主计划在找到工作前，持续优化此博客</p>
                         <p>同时作为一个三本院校的学生，表示对工作很担忧</p> 
                         <p>爱听歌，是网易云音乐的忠实追求者，因此用Vue模拟了网易云播放器</p>
                         <p>因为疫情的原因，博主近期正在驾校学习，闲暇下来的时间偶尔会抽空盯着博客发呆，并且博主为了怕知晓你们的留言不及时，因此所有留言及评论开启了邮箱通知博主，所以不用担心博客会荒废哦</p>

                         <h1 style={this.state.def?{background: 'rgba(255, 154, 154, .5)'}:{background:'rgba(255, 246, 181, .5)'}}>网站结构</h1>
                         <p>域名于阿里云购买</p>
                         <p>前台页面：React + Antd + Redux</p>
                         <p>服务器端：Node + Mongodb</p>
                         <p>服务器由阿里云提供支持，十分感谢阿里云的云翼计划！</p>
                         <p>主站和子站的云存储主体由自己书写且传入自己的服务器存储，部分资源接入阿里OSS与七牛云对象存储</p>
                         <p>本站前后端均为个人书写，个人水平有限，大佬路过还请多多批评指正。</p>

                         <h1 style={this.state.def?{background: 'rgba(255, 154, 154, .5)'}:{background:'rgba(255, 246, 181, .5)'}}>特别说明</h1>
                         <p>本站所有内容仅代表个人观点，和任何组织或个人无关。</p>
                         <p>本站内容仅供学习交流，请勿用于任何形式商业行为。</p>
                         <p>本站如无意中侵犯了某些组织或个人的知识产权，请速告之，本站定及时处理。</p>
                        </div>
                    {/* </Spin> */}

                    </Col>
                    <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author gotoadmin={this.props.history}/>
                    <AllProject/>
                    </Col>
                </Row>
                <Footer />
            </div>
         );
    }
}
 
export default About;