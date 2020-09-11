import React, { Component } from 'react';
import '../style/components/myinfo.css'
import Zmage from 'react-zmage' 
import store from '../store/index' //redux使用
import { Divider } from 'antd'
class MyLnfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            def:store.getState().defstyle,
        }
        store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({
          def:store.getState().defstyle,
          drawer:store.getState().drawerstyle,
        })
      }
    render() {
        return (
            <div className='ad-div comm-box cssniceright hoverlove' style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: '.5rem' }}>
                {/* <Divider style={this.state.def?{textAlign:'center',fontFamily:'SimSun',fontSize:'.9rem',color:'deeppink',fontWeight:'800'}:null}>寻觅伯乐</Divider>  */}
                <div className='allproject-hover' style={{ position: 'relative' }} onClick={() => Zmage.browsing({ src:'https://www.jsfan.net/upload/简历new.png' })}>
                    <a>
                        <img className='allproject-img-info' src="https://www.jsfan.net/upload/简历new.png" alt="" style={{ width: '100%' }} />
                        <div style={{ height: '50%', width: '100%', position: 'absolute', textAlign: 'center', zIndex: 1, top: '45%' }}>
                            <span className='allproject-span-info' style={this.state.def?{textShadow:'0 0 6px rgb(241, 131, 181)'}:{textShadow:'0 0 6px #000'}}>个人简历</span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default MyLnfo;
