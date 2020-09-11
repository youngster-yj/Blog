import React, { Component } from 'react';
import { Row, Col, Progress } from 'antd';
import '../style/components/Skills.css'
import store from '../store/index' //redux使用
class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'HTML5', from: '#108ee9', to: '#87d068', percent: 70 },
                { name: 'CSS3', from: '#108ee9', to: '#87d068', percent: 65 },
                { name: 'JavaScript', from: '#108ee9', to: '#87d068', percent: 60 },
                { name: 'TypeScript', from: '#108ee9', to: '#87d068', percent: 45 },
                { name: 'Canvas', from: '#108ee9', to: '#87d068', percent: 30 },
                { name: 'JQuery', from: '#108ee9', to: '#87d068', percent: 50 },
                { name: 'Bootstrap', from: '#108ee9', to: '#87d068', percent: 50 },
                { name: 'Node.js', from: '#108ee9', to: '#87d068', percent: 65 },
                { name: 'Express', from: '#108ee9', to: '#87d068', percent: 65 },
                { name: 'Mongodb', from: '#108ee9', to: '#87d068', percent: 70 },
                { name: 'React.js', from: '#108ee9', to: '#87d068', percent: 70 },
                { name: 'React Hooks', from: '#108ee9', to: '#87d068', percent: 60 },
                { name: 'React Next', from: '#108ee9', to: '#87d068', percent: 60 },
                { name: 'React Native', from: '#108ee9', to: '#87d068', percent: 60 },
                { name: 'Vue.js', from: '#108ee9', to: '#87d068', percent: 60 },
                { name: 'Vue Nuxt', from: '#108ee9', to: '#87d068', percent: 40 },
                { name: 'Webpack', from: '#108ee9', to: '#87d068', percent: 55 },
                { name: 'Electron', from: '#108ee9', to: '#87d068', percent: 50 },
                { name: 'Dart', from: '#108ee9', to: '#87d068', percent: 30 },
                { name: 'Flutter', from: '#108ee9', to: '#87d068', percent: 45 },
                { name: 'Mysql', from: '#108ee9', to: '#87d068', percent: 50 },
                { name: 'Java', from: '#108ee9', to: '#87d068', percent: 20 },
        ],
        def:store.getState().defstyle
        }
        store.subscribe(this.storeChange.bind(this)) //订阅Redux的状态
    }
    storeChange(){//引用redux中的值修改当前state
        this.setState({def:store.getState().defstyle})
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
      }
    render() {
        return (
            <div className='ad-div comm-box  cssniceright' style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
                <div className='nav-title' style={this.state.def?{color:'deeppink'}:null}>博主Skills</div>
                   {
                        this.state.data.map((item,index) => (
                            <Row  key={index}>
                    
                    <Col span={8}>
                        
                             <div style={this.state.def?{color:'hotpink'}:null}>{item.name}</div>
                           
                        
                    </Col>
                    <Col span={15}>
                        
                                    <div>
                                    <Progress

                                        strokeColor={{
                                            from: item.from,
                                            to: item.to,
                                        }}
                                        percent={item.percent}
                                        status="active"
                                    /></div>
                                
                    </Col>
                </Row>
                            ))
                    }
            </div>
        );
    }
}

export default Skills;