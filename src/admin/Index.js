import React, { Component } from 'react';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
            <p style={{textAlign:'center',fontSize:'3rem',fontFamily:'KaiTi'}}>Welcome to cyj's blog</p>
            <p style={{textAlign:'center',fontSize:'2.8rem',fontFamily:'KaiTi'}}>碎发满地帽遮巅，</p>
            <p style={{textAlign:'center',fontSize:'2.8rem',fontFamily:'KaiTi'}}>坐姿斜倒臭两天。</p>
            <p style={{textAlign:'center',fontSize:'2.8rem',fontFamily:'KaiTi'}}>昔日门前笑君物，</p>
            <p style={{textAlign:'center',fontSize:'2.8rem',fontFamily:'KaiTi'}}>空留码农在人间。</p>
            </div>
         );
    }
}
 
export default Index;