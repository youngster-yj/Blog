import React, { Component } from 'react';
import '../style/components/advert.css'
import gif from '../images/advert.gif'
import { Tag,message } from 'antd'


class Advert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather:false
        }
    }
    componentWillMount() {
        fetch('https://free-api.heweather.net/s6/weather/now?key=8c85b2943d284e40993f2b6b5be567c3&location='+window.cheng.cip, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    weather:data.HeWeather6[0]
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });      
    }

    render() {
        return (
            <div className='ad-div comm-box cssniceright' style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{padding:'0rem 1rem'}}>
                        <div style={{ fontSize: '1rem',textAlign:'left',margin:'1rem 0rem .5rem',paddingBottom:'.5rem',
                                     paddingLeft:'.3rem',borderBottom:'1px solid #e7e7e7'}}>访客信息~</div>

                        {
                          this.state.weather?  
                          <div>
                            <span style={{color:'rgb(148, 206, 111)',fontSize:'1.2rem'}}>{this.state.weather.now.fl}°C<span style={{fontSize:'.8rem'}}>-{this.state.weather.now.cond_txt}</span></span> 
                            <span style={{padding:'0rem .7rem'}}>{this.state.weather.basic.parent_city}</span> 
                            <span style={{fontSize:'.85rem'}}>{this.state.weather.now.wind_dir}</span>
                            
                          </div>:null
                        }          
                        <div style={{textAlign:'left',marginTop:'1rem'}}><span style={{fontFamily:'华文行楷',fontSize:'1rem',color:'deeppink'}}>你的ip:</span> <span style={{ color: 'rgb(0, 216, 255)',fontSize:'.8rem'}}>{window.cheng.cip}</span></div>
                        <div style={{textAlign:'left'}}><span style={{fontFamily:'华文行楷',fontSize:'1rem',color:'deeppink'}}>你的地址:</span> <span style={{ color: 'rgb(0, 216, 255)',fontSize:'.8rem'}}>{window.cheng.cname}</span></div>
                        <div style={{textAlign:'left'}}><span style={{fontFamily:'华文行楷',fontSize:'1rem',color:'deeppink'}}>访问时间:</span> <span style={{ color: 'rgb(0, 216, 255)',fontSize:'.6rem'}}>{window.time.year}年{window.time.month}月{window.time.date}日  {window.time.hours}:{window.time.minutes}</span></div>
                        <div style={{textAlign:'left'}}><span style={{fontFamily:'华文行楷',fontSize:'1rem',color:'deeppink'}}>操作系统:</span> <span style={{ color: 'rgb(0, 216, 255)',fontSize:'.8rem'}}>{window.device}</span></div>
                        <div style={{textAlign:'left'}}><span style={{fontFamily:'华文行楷',fontSize:'1rem',color:'deeppink'}}>基于内核:</span> <span style={{ color: 'rgb(0, 216, 255)',fontSize:'.8rem'}}>{window.liulanqi.type}<span style={{fontSize:'.6rem'}}>({window.liulanqi.version})</span> </span></div>
    
                    </div>

                </div>
                <div>
                    <img src={gif} width='100%' alt="" />
                </div>
            </div>
        );
    }
}


export default Advert