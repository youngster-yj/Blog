import { Layout, Menu, Breadcrumb, Icon ,message} from 'antd';
import './style/page/app.css'
import React, { Component } from 'react';
import { Route, Router, Link } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import ChangeArticle from './ChangeArticle'
import SaveArticle from './SaveArticle'
import Upload from './Upload'
import Comment from './Comment'
import Index from './Index'
import FriendLink from './FriendLink'
import Wechat from './Wechat'
import QQLogin from './QQLogin'
import MainMovies from './ReactNative/MainMovies'
import TopMovies from './ReactNative/TopMovies'
import BottomMovies from './ReactNative/BottomMovies'
import MovieCheck from './ReactNative/MovieCheck'
import RNComment from './ReactNative/RNComment'
import servicePath from '../config/apiUrl'
import Test from './Test'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            breadcrumb:'工作台'
        }
    }
   

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    componentWillMount() {
        this._isAllow()
        // if (sessionStorage.getItem("admin_token") != '进入admin') {
        //     // message.warning('没有密码不能进私人博客哦！')
        //     this.props.history.push('/login')
        // }
        // else {
        //     document.title = '管理页 | Yougster_yj的个人博客'
        //     message.success("Welcome to cyj's blog！")
        // }
    }
    _isAllow(){//cookie查询是否可进入
        fetch(servicePath.checkMaster, {
        credentials: 'include',//带上cookie
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => res.json())
        .then((data) => {
            if(data){//cookie版本
                document.title = '管理页 | Yougster_yj的个人博客'
                message.success("Welcome to cyj's blog！")
            }
            else{
                message.warning('没有密码不能进私人博客哦！')
                this.props.history.push('/login') 
            }
        })
        .catch((error) => {
            this.props.history.push('/login') 
        });
    }
    goBack(){
        this.props.history.push('/')
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" ><div className='logo-in' onClick={()=>{this.goBack()}}>回到前台</div></div>
                    <Menu theme="dark" defaultSelectedKeys={['工作台']} mode="inline" onClick={(item)=>{this.setState({breadcrumb:item.key})}}>
                        <Menu.Item key="工作台">
                            <Link to='/admin'>
                                <Icon type="pie-chart" />
                                <span>工作台</span></Link>
                        </Menu.Item>
                        <Menu.Item key="资源管理">
                            <Link to='/admin/upload'>
                                <Icon type="desktop" />
                                <span>资源管理</span></Link>
                        </Menu.Item>
                        <SubMenu
                            key="文章管理"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>文章管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="添加文章"><Link to='/admin/addarticle'>添加文章</Link></Menu.Item>
                            <Menu.Item key="文章列表"><Link to='/admin/changeartic'>文章列表</Link></Menu.Item>
                            <Menu.Item key="暂存文章"><Link to='/admin/articlist'>暂存文章</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="其他信息"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span>其他信息</span>
                                </span>
                            }
                        >
                            <Menu.Item key="友链管理"><Link to='/admin/friendlink'>友链管理</Link></Menu.Item>
                            <Menu.Item key="QQ信息"><Link to='/admin/qqlogin'>QQ登录信息</Link></Menu.Item>
                            <Menu.Item key="Team 2"><Link to='/admin/testcode'>代码测试</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="留言管理"
                            title={
                                <span>
                                    <Icon type="file" />
                                    <span>留言管理 </span>
                                </span>
                            }
                        >
                        <Menu.Item key="文章留言"><Link to='/admin/comment'><span>文章留言</span></Link></Menu.Item>
                        <Menu.Item key="互动留言"><Link to='/admin/wechat'><span>互动留言</span></Link></Menu.Item>  
                        </SubMenu>
                        <SubMenu
                            key="RN管理"
                            title={
                                <span>
                                    <Icon type="android" />
                                    <span>RN管理</span>
                                </span>
                            }
                        >
                        <Menu.Item key="主页视频"><Link to='/admin/mainmovies'><span>主页视频</span></Link></Menu.Item>
                        <Menu.Item key="上方视频"><Link to='/admin/topmovies'><span>上方视频</span></Link></Menu.Item>  
                        <Menu.Item key="下方视频"><Link to='/admin/bottommovies'><span>下方视频</span></Link></Menu.Item>  
                        <Menu.Item key="评论管理"><Link to='/admin/rncomment'><span>评论管理</span></Link></Menu.Item> 
                        <Menu.Item key="视频审核"><Link to='/admin/moviecheck'><span>视频审核</span></Link></Menu.Item>
                        </SubMenu>
                    </Menu> 
                </Sider>
                <Layout>
                    {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><a href='/admin'>后台管理系统</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <div>
                                <Route path='/admin' exact component={Index}></Route>
                                <Route path='/admin/addarticle' exact component={AddArticle}></Route>
                                <Route path='/admin/addarticle/:id' exact component={AddArticle}></Route>
                                <Route path='/admin/savearticle/:id' exact component={SaveArticle}></Route>
                                <Route path='/admin/articlist' exact component={ArticleList}></Route>
                                <Route path='/admin/changeartic' exact component={ChangeArticle}></Route>
                                <Route path='/admin/upload' exact component={Upload}></Route>
                                <Route path='/admin/comment' exact component={Comment}></Route>
                                <Route path='/admin/wechat' exact component={Wechat}></Route>
                                <Route path='/admin/friendlink' exact component={FriendLink}></Route>
                                <Route path='/admin/qqlogin' exact component={QQLogin}></Route>
                                <Route path='/admin/testcode' exact component={Test}></Route>
                                
                                <Route path='/admin/mainmovies' exact component={MainMovies}></Route>
                                <Route path='/admin/topmovies' exact component={TopMovies}></Route>
                                <Route path='/admin/bottommovies' exact component={BottomMovies}></Route>
                                <Route path='/admin/moviecheck' exact component={MovieCheck}></Route>
                                <Route path='/admin/rncomment' exact component={RNComment}></Route>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Youngster_yj</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo