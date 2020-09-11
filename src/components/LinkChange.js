import React, { Component } from 'react';
import { Divider,message,Input,Button,Typography } from 'antd'
import '../style/components/about.css'
import servicePath from '../config/apiUrl'
import store from '../store/index' //redux使用
import QRCode from 'qrcode.react'//二维码
const { Paragraph } = Typography;
class LinkChange extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            def:store.getState().defstyle,
            inputurl:'', 
            urldata:'',
        }
        store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    enterLoading = () => {
        this.setState({ loading: true });
        
        let inputurl = this.state.inputurl //简介的markdown内容
        inputurl = inputurl.replace(/%/g, "%25") //防止乱码(乱码导致原因为字符串中出现了%)
        inputurl = inputurl.replace(/&/g, "地址符BUG") //&此字符上传过程丢失
        inputurl = inputurl.replace(/[+]/g, "加号符BUG") //+此字符上传过程丢失

        fetch(servicePath.urlchange, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'longurl=' + inputurl
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if(data=='无效的Url'){
                    message.warning('无效的Url')
                    this.setState({loading: false })
                }
                else{
                    this.setState({ loading: false ,urldata:data});
                }
               
            })
            .catch((error) => {
                message.error('Comment服务器端炸裂' + error)
            });
      };
    getValue(e){
        this.setState({
            inputurl:e.target.value
        })
      console.log(e.target.value)
    }
    render() { 
        return ( 
            <div className='comm-box ad-div cssniceright' style={{backgroundColor:'rgba(255, 255, 255, 0.4)'}}>
                <div className='debug'>
                    <h1 style={this.state.def?{background: 'rgba(255, 154, 154, .5)',padding:'.4rem 0px',margin:0,fontSize:'1rem'}:{background:'rgba(255, 246, 181, .5)',padding:'.4rem 0px',margin:0,fontSize:'1rem'}}>短网址生成器</h1>
                </div>
                <Input value={this.state.inputurl} placeholder="请输入长链接地址,例如:http://xxx.xx.com.xx/xxxxx" allowClear onChange={(e)=>{this.getValue(e)}}/>
                <div style={{textAlign:'center',marginTop:'.3rem'}}>
                    <Button style={this.state.def?{background: 'rgba(255, 154, 154, .5)',borderColor:'rgba(255, 154, 154, .5)',color: '#737373'}:{background:'rgba(255, 246, 181, .5)',borderColor:'rgba(255, 246, 181, .5)',color: '#737373'}} type="primary" loading={this.state.loading} 
                    onClick={this.enterLoading} size='small'>
                    转换
                    </Button>
                </div>
                {
                   typeof(this.state.urldata)=="object"?
                  <div style={{textAlign:'center'}}>
                     <Divider>短网址</Divider>
                     <Paragraph copyable={{ text: this.state.urldata.shortUrl }}>
                         <a href={this.state.urldata.shortUrl} target="_blank" rel="noopener noreferrer" style={{position:'relative',top:'-.5rem',fontSize:'.7rem'}}>{this.state.urldata.shortUrl}</a>
                     </Paragraph>
                     <Divider>二维码</Divider>
                     <QRCode style={{width:'100%',height:'100%',padding:'.5rem 2rem 2rem'}} value={this.state.urldata.shortUrl}/>
                  </div> :
                
                                <div style={{textAlign:'center'}}>
                <Divider>测试用例</Divider>
                <div style={{color:'#999',paddingBottom:'1rem',fontSize:'.7rem'}}>https://www.baidu.com/</div>
                <Paragraph copyable={{ text: 'jsfan.net:3000/8UF-oVbfi' }}>
                         <a href='jsfan.net:3000/8UF-oVbfi' target="_blank" rel="noopener noreferrer" style={{position:'relative',top:'-.5rem',fontSize:'.7rem'}}>jsfan.net:3000/8UF-oVbfi</a>
                     </Paragraph>
                     <QRCode style={{width:'100%',height:'100%',padding:'.5rem 2rem 1rem'}} value='jsfan.net:3000/8UF-oVbfi'/>
                     <div style={this.state.def?{color: 'rgb(255, 154, 154)'}:{color: '#1890ff'}}>功能简介:</div>
                     <div style={{fontSize:'.8rem'}}>
                     <div>1.长链接转为短链接</div>
                     <div>2.生成链接长期有效</div>
                     <div>3.插入博主个人介绍</div>
                     <div>4.新页面插入播放器</div>
                     </div>
                </div>   
                }
            </div>
         );
    }
}
 
export default LinkChange;