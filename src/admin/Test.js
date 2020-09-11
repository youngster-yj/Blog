import React, { Component } from 'react';
import Zmage from 'react-zmage'   
import './style/page/test.css' 
class Test extends Component { 
    constructor(props) {
        super(props);
        this.state = {  }
    }
    test(){
        let a = document.getElementById('comments_edit')
        console.log(a.innerHTML)
    }
    render() { 
        return ( 
            <div>
                <a onClick={() => Zmage.browsing({ src:'http://localhost:3000/upload/qrcode_1581592204285.jpg' })}>任意元素</a>
            <Zmage src="http://39.96.67.38:3000/upload/卡哇伊number1.png" alt="最简单的使用方式"
            set={[{
                src: "http://localhost:3000/upload/qrcode_1581592204285.jpg",
                alt: "First image description"
            },{
                src: "http://39.96.67.38:3000/upload/卡哇伊number1.png",
                alt: "Second image description"
            }]} defaultPage={1}
            ></Zmage>
            <a href="tencent://message/?uin=1971478498&Site=Sambow&Menu=yes">调用QQ打开聊天框</a>

            <div suppressContentEditableWarning onKeyUp={()=>{this.test()}} id="comments_edit" placeholder="送人玫瑰，手留余香" contentEditable="true" 
            onmouseup="comments_edit_mouseup();" onmouseout="comments_edit_mouseout();">
                <img className="smilies" style={{width:'2rem'}} src="https://wnag.com.cn/wp-content/themes/H-Siren/OwO/images/emoticon_002.png"/>
            </div>

            </div>
        )
    }
}
 
export default Test;