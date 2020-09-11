import React from 'react';
import ReactAplayer from 'react-aplayer';
import { Avatar, Row, Col, List, Icon, Affix, BackTop, message, Spin, Tag, Input, Button ,Switch} from 'antd'
import Author from './components/Author'
import Footer from './components/Footer'
import Header from './components/Header'
import servicePath from './config/apiUrl'
import Comment from './components/CommentMes'
import FriendsLink from './components/FriendsLink'
import Emoji from './components/Emoji'
import './style/page/message.css'

const { TextArea } = Input;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            emailinput: '',
            TextArea: '',
            pinglundata: [],

            iscallback:false, //是否同意邮件返回
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
                document.title = '互动页 | Youngster_yj的个人博客'
              },3000)
            }
            }
            );

        document.title = '互动页 | Youngster_yj的个人博客'
        this.getpinglun()

        let name = localStorage.getItem("userInfoName")
        let qqimg = localStorage.getItem("userInfoImg")
        this.setState({
            input:name,
            emailinput:qqimg
        })
    }
    componentDidMount() {
        if(window.screen.width >= 770){
          this.ap.play()  
        }
        
    }
    componentWillUnmount() {
        if(window.screen.width >= 770){
          this.ap.pause()  
        }
        
    }
    getpinglun() {
        fetch(servicePath.getwechatpinglun, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                if (data.length != 0) {
                    this.setState({
                        pinglundata: data,
                    })
                }
                else {
                    message.success('本篇没有留言呢...留下脚印吧')
                }
            })
            .catch((error) => {
                message.error('Message页服务器端炸裂' + error)
            });
    }
    // event binding example
    onPlay = () => {
        // console.log('on play');
    };

    onPause = () => {
        // console.log('on pause');
    };

    // example of access aplayer instance
    onInit = ap => {
        this.ap = ap;
    };
    isEmail(str) {
        var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (re.test(str) != true) {
            return false;
        } else {
            return true;
        }
    }
    enterIconLoading = () => {
        if (this.state.input.length == 0) {
            return message.warning('笔名不可为空')
        }
        if (!this.isEmail(this.state.emailinput)) {
            return message.warning('请输入正确的邮箱格式')
        }
        if (this.state.TextArea.length == 0) {
            return message.warning('内容不可为空')
        }
        else {
            this.postdata()
        }
    };
    postdata() {
        let address = window.cheng.cname
        let device = window.device
        let info = window.liulanqi.type + '(' + window.liulanqi.version + ')'
        let commentname = this.state.input
        let commentimg = this.state.emailinput
        let commentcontent = this.state.TextArea
        let iscallback = this.state.iscallback //是否开启邮箱通知
        this.setState({ iconLoading: true });

        localStorage.setItem("userInfoName",commentname)
        localStorage.setItem("userInfoImg",commentimg)

        fetch(servicePath.wechatpinglun, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'address=' + address + '&device=' + device + '&info=' + info + '&commentname=' + commentname + '&commentcontent=' + commentcontent + '&commentimg=' + commentimg+ '&iscallback=' + iscallback
        })
            .then(res => res.json())
            .then((data) => {
                if (data == '评论成功') {
                    message.success('评论成功')
                    this.setState({ iconLoading: false, TextArea: '' });

                    let a = document.getElementById('comments_edit')
                    a.innerHTML = ''

                    this.getpinglun()
                }
                else {
                    message.error('评论失败')
                }

            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ iconLoading: false })
                }, 500)
            });
    }
    callbackinfo(){
          this.setState({
            iscallback:!this.state.iscallback
          },()=>{
            this.state.iscallback?message.success('已开启邮箱提醒'):message.warning('已关闭邮箱提醒')
          })
    }
    getTextArea(){
        let a = document.getElementById('comments_edit')
        // console.log(a.innerHTML)   
        this.setState({ TextArea: a.innerHTML })

    }
    addEmoji(data){
       let a = document.getElementById('comments_edit')
       a.innerHTML = a.innerHTML + '<img className="smilies" style="width:2rem" src="'+data+'"/>'
       this.setState({ TextArea: a.innerHTML })
    }
    changePos(data){
        let a = document.getElementsByClassName('input-div')[0]
        if(data){
            a.style.transform = 'scale(.75) translate(-2px,-37px)'
            a.style.opacity = 1
        }
        else{
            a.style.transform = ''
            a.style.opacity = 0
        }
        
    }
    render() {
        const props = {
            theme: '#F57F17',
            lrcType: 3,
            audio: [
                //http://www.jsfan.net:3001/search/suggest?keywords=花魁   寻找id
                //http://www.jsfan.net:3001/lyric?id=553753244 id找歌词
                {
                    name: '微微',
                    artist: '傅如乔',
                    url: 'https://www.jsfan.net/upload/微微.mp3',
                    cover: 'https://www.jsfan.net/upload/微微musicimg.jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=1433434738',
                    theme: '#ebd0c2'
                },
                {
                    name: '无人之岛',
                    artist: '任然',
                    url: 'https://www.jsfan.net/upload/无人之岛.mp3',
                    cover: 'https://www.jsfan.net/upload/无人之岛img.jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=493735012',
                    theme: '#ebd0c2'
                },
                {
                    name: '你的答案',
                    artist: '阿冗',
                    url: 'https://www.jsfan.net/upload/你的答案.mp3',
                    cover: 'https://www.jsfan.net/upload/你的答案阿.jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=1400256289',
                    theme: '#ebd0c2'
                },
                {
                    name: '花魁', 
                    artist: '徐良',
                    url: 'https://www.jsfan.net/upload/花魁.mp3',
                    cover: 'https://www.jsfan.net/upload/花魁徐良.jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=553753244',
                    theme: '#ebd0c2'
                },
                {
                    name: '权力的游戏',
                    artist: 'Ramin Djawadi', //作者名
                    url: 'https://www.jsfan.net/upload/权力的游戏.mp3',
                    cover: 'https://p1.music.126.net/ME34HLKlJtYGruIxomhIOQ==/7987951976023943.jpg',
                      lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
                    theme: '#ebd0c2'
                },
                {
                    name: '刚好遇见你',
                    artist: '李玉刚',
                    url: 'https://www.jsfan.net/upload/刚好遇见你.mp3',
                    cover: 'https://www.jsfan.net/upload/刚好遇见你.jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=459159104',
                    theme: '#ebd0c2'
                },
                {
                    name: '下山',
                    artist: '要不要买菜',
                    url: 'https://www.jsfan.net/upload/下山.mp3',
                    cover: 'https://www.jsfan.net/upload/下山(要不要买菜).jpg',
                    lrc: 'http://www.jsfan.net:3001/lyric?id=1404885266',
                    theme: '#ebd0c2'
                },
            ],
        };
        var pinglundata = this.state.pinglundata.filter((item) => { return !item.id })
        var pinglunindata = (this.state.pinglundata.filter((item) => { return item.id })).reverse()
        return (
            <div>
               
                    <Header />
              
                <BackTop>
                    <div className="ant-back-top-inner" ><Icon type="rocket" /></div>
                </BackTop>


                <Row className='comm-main' type='flex' justify='center' style={{paddingTop:'3.2rem',overflow:'hidden'}}>
                    <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14} style={{ backgroundColor: 'rgba(255,255,255,.4)' }}>
                        {
                            window.screen.width >= 770 ?
                                <div className='cssnice'>
                                    <ReactAplayer
                                        {...props}
                                        onInit={this.onInit}
                                        onPlay={this.onPlay}
                                        onPause={this.onPause}
                                    />
                                </div> : null
                        }

                        {/* example of access aplayer instance API */}
                        {/* <button onClick={() => this.ap.toggle()}>toggle</button>
                        <button onClick={() => this.ap.pause()}>暂停</button>
                        <button onClick={() => this.ap.play()}>开始</button> */}

                        <div style={{ marginTop: '.3rem', marginLeft: '1rem', marginRight: '1rem' }} className='cssnice'>
                            <div style={{ margin: '1rem 0', color: 'deeppink' }}>随便对站长吐槽点什么吧...
                                 <span style={{float:'right',fontSize:'.65rem'}}>QQ邮箱提醒   
                                      <Switch
                                         style={{marginLeft:'.3rem'}}
                                         checkedChildren={<Icon type="check" />}
                                         unCheckedChildren={<Icon type="close" />}
                                         defaultChecked={this.state.callbackinfo}
                                         onChange={this.callbackinfo.bind(this)}/>
                                 </span>
                            </div>
                            <Input value={this.state.input} placeholder="输入您的笔名" style={{ marginBottom: '.5rem' }}
                                onChange={(e) => { this.setState({ input: e.target.value }) }} suffix={this.state.input == 'cyj博主cyj' ? <Icon type="safety" style={{ color: 'green' }} /> : null} />
                            <div style={{ position: 'relative' }}>
                                <Input value={this.state.emailinput} placeholder="请输入邮箱" style={{ marginBottom: '.5rem', width: '88%' }} onChange={(e) => { this.setState({ emailinput: e.target.value }) }} />
                                <span style={{ position: 'absolute', right: 0 }}>
                                    <Avatar style={{}} src={this.isEmail(this.state.emailinput) ? "https://q4.qlogo.cn/g?b=qq&nk=" + this.state.emailinput + "&s=3" : ""} />
                                </span>
                            </div>


                            {/* <TextArea value={this.state.TextArea} rows={4} placeholder="输入您的留言" onChange={(e) => { this.setState({ TextArea: e.target.value }) }} /> */}

                        <div style={{position:'relative'}}>
                        <div suppressContentEditableWarning onKeyUp={()=>{this.getTextArea()}} id="comments_edit" placeholder="吾之所爱，往后余生..." contentEditable="true" 
                        onFocus={()=>{this.changePos(true)}} onBlur={()=>{this.changePos(false)}}>
                            
                        </div>
                        <div className='input-div'>吾之所爱，往后余生...</div>
                        </div>
                        
                        <Row>
                            <Col span={6}>
                    
                            </Col>
                            <Col span={12}>
                             <Button
                                style={{ margin: '1rem auto', display: 'block' }}
                                type="primary"
                                icon="edit"
                                loading={this.state.iconLoading}
                                onClick={this.enterIconLoading}
                                className='meme_btn'
                             >
                                提交评论<span className='meme_btnin' style={{paddingLeft:'.5rem'}}>✪ω✪</span>
                             </Button>
                            </Col>
                            <Col span={6}>
                               <Emoji add={(data)=>this.addEmoji(data)}/>
                            </Col>
                        </Row>



                        </div>
                        <div className='cssnice2'>
                            {
                                pinglundata.length ?
                                    pinglundata.map((item) => ( //key值重复 渲染莫名报错 请特别注意 此处耽误3个小时
                                        <Comment key={item._id} pinglundata={item} onclick={() => { this.getpinglun() }}>
                                            {
                                                pinglunindata.length ? pinglunindata.map((itemin) => ( //key值重复 渲染莫名报错 请特别注意 此处耽误3个小时
                                                    item._id == itemin.id ? <Comment nopinglun={true} id={item._id} key={itemin._id} pinglundata={itemin} onclick={() => { this.getpinglun() }} /> : null
                                                )) : null
                                            }
                                        </Comment>
                                    ))
                                    : null
                            }
                        </div>
                    </Col>
                    <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                        <Author gotoadmin={this.props.history}/>
                        <FriendsLink />
                    </Col>
                </Row>
                <Footer />
            </div>
        );
    }
}