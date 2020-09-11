import React, { Component } from 'react';
import { Card, Input, Icon, Button, Spin, message, Modal } from 'antd'
import './style/page/login.css'
import servicePath from '../config/apiUrl'
const {confirm} = Modal
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoading: false
        }
    }
    componentWillMount(){
        document.title = '登录页 | Yougster_程的个人博客'
        this._isAllow(true)//首次进入
      }
    _isAllow(first){//cookie查询是否可进入
        fetch(servicePath.checkMaster, {
        credentials: 'include',//带上cookie
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => res.json())
        .then((data) => {
            if(data){//升级cookie版本
                this.setState({ isLoading: false })
                this.props.history.push('/admin')
            }
            else if(!first){//不是首次进入
                message.error('密码错误')
                this.setState({ isLoading: false })
            }
        })
        .catch((error) => {
            message.error('登录服务器端炸裂' + error)
        });  
    }  
    _checklogin() {
        this.setState({ isLoading: true })
        if (!this.state.userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
            return false
        }
        else if (!this.state.password) {
            message.error('密码不能为空')
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
            return false
        }   
        // sessionStorage.setItem("admin_token", "进入admin"); //此存储页面关闭自动删除
        // localStorage.setItem('admin_token', '进入admin') //测试进admin页面
        // this.props.history.push('/admin')
        let dataProps = {
            userName: this.state.userName,
            password: this.state.password
        }
        fetch(servicePath.checkLogin, {
            method: 'POST',
            credentials: 'include',//带上cookie
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'userName=' + dataProps.userName + '&password=' + dataProps.password
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this._isAllow()//升级cookie版本

            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    }
    _back(){
        let props = this.props.history
        confirm({
            title:'博主温馨提示:',
            content:'博主私人页面,未经允许不可进入,返回主页？',
            onOk(){
                props.push('/')
            },
            onCancel(){
               message.success('难道博主被自己墙了（·_·）?')
            }
        })
    }
    render() {
        return (
            <div className='login-div'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <Card title='Youngster_yj的博客后台系统' bordered={true} style={{ width: '22rem', margin: '0 auto',backgroundColor: 'rgba(255,255,255,.4)'}} extra={<a onClick={()=>{this._back()}}>返回</a>}>
                        <Input
                            id='userName'
                            size='large'
                            placeholder='Welcome to the boss'
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={(e) => { this.setState({ userName: e.target.value }) }}
                        />
                        <br /><br />
                        <Input.Password
                            id='password'
                            size='large'
                            placeholder='Boss, please enter your password'
                            prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            onPressEnter={this._checklogin.bind(this)}
                        />
                        <br /><br />
                        <Button type='primary' size='large' block onClick={this._checklogin.bind(this)}>博主登录</Button>
                    </Card>
                </Spin>
            </div>
        );
    }
}

export default Login;