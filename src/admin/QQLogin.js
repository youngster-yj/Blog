import React, { Component } from 'react';
import { List, Row, Col, message, Button, Modal } from 'antd'
import servicePath from '../config/apiUrl'
const {confirm} = Modal
class QQLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInfo: []
        }
    }
    componentWillMount() {
        fetch(servicePath.getalllogqqinfo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    loginInfo: data
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    click(_id){
        const that = this
        confirm({
            title:'博主操作温馨提示:',
            content:'是否删除或退出此条登录信息？',
            onOk(){
                fetch(servicePath.dellogqqinfo, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: '_id=' + _id 
                })
                    .then(res => res.json())
                    .then((data) => {
                        that.setState({
                            loginInfo: data
                        })
                    })
                    .catch((error) => {
                        message.error('Comment服务器端炸裂' + error)
                    });
            },
            onCancel(){
               message.success('取消操作')
            }
            })  
    }
    render() {
        return (
            <div style={{overflow:'hidden'}}>
                {
                    
                    this.state.loginInfo.map((item,key) => (
                        <div style={{ textAlign: 'center',float:'left',minWidth:'8rem',minHeight:'7rem',marginBottom:'1rem',padding:'1rem' }} key={key} onClick={()=>{this.click(item._id)}}>
                            <img style={{ borderRadius: '1rem', height: '2rem' }} src={item.qqimg} alt="" />
                            <div style={{ fontSize: '.7rem', fontWeight: '700', marginTop: '.2rem' }}>{item.qqname}</div>
                            <div style={{ fontSize: '.7rem', marginTop: '.2rem' }}>{item.qqlocal}-{item.city}</div>
                            <div style={{ fontSize: '.7rem', marginTop: '.2rem' }}>{item.qqsex}-{2020 - item.year}岁</div>                      

                            <div style={{ fontSize: '.45rem', marginTop: '.2rem' }}>最近访问本站时间:{item.time?item.time:'未做记录'}</div>  

                            <div style={{ fontSize: '.45rem', marginTop: '.2rem' }}>访问本站次数:{item.count?item.count:1}</div>  

                        </div>
                    )
                    )

                }
            </div>
        )
    }
}

export default QQLogin;