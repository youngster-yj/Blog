import React, { Component } from 'react';
import { Input, Button, message, Icon } from 'antd';
import servicePath from '../config/apiUrl'
const { TextArea } = Input;
class Pinglun extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:'',
            TextArea:''
         }
    }
    enterIconLoading = () => {
        let topdata = this.props.topdata
        let commentname = this.state.input
        let commentcontent = this.state.TextArea
        if(commentname.length===0||commentcontent.length===0) return message.warning('请将笔名与内容输入完整')
        this.setState({ iconLoading: true });
        fetch(servicePath.uploadpinglun, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'title='+ topdata + '&commentname=' + commentname + '&commentcontent=' + commentcontent 
        })
            .then(res => res.json())
            .then((data) => {
                if (data == '评论成功') {
                    message.success('评论成功')
                    this.props.onclick()
                    this.setState({ iconLoading: false,input:'',TextArea:'' });
                }
                else{
                    message.error('评论失败')
                }

            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            });
    };
    render() { 
        return ( 
            <div style={{ marginTop: '.3rem', marginLeft: '1rem', marginRight: '1rem' }}>
                    <Input value={this.state.input} placeholder="输入您的笔名" style={{ marginBottom: '.5rem' }} 
                           onChange={(e)=>{this.setState({input:e.target.value})}} suffix={this.state.input=='cyj博主cyj'?<Icon type="safety" style={{ color: 'green' }}/>:null}/>
                    <TextArea value={this.state.TextArea} rows={4} placeholder="输入您的留言"  onChange={(e)=>{this.setState({TextArea:e.target.value})}}/>  

                    <Button
                        style={{ margin: '1rem auto', display: 'block' }}
                        type="primary"
                        icon="edit"
                        loading={this.state.iconLoading}
                        onClick={this.enterIconLoading}
                    >
                        提交评论
                </Button>


                </div>
         );
    }
}
 
export default Pinglun;