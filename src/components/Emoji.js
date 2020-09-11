import React, { Component } from 'react';
import '../style/page/message.css'
import {message} from 'antd'
class Emojs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isopen: false,
        }
    }
    isShowEmoji() {
        this.setState({
            isopen: !this.state.isopen
        })
    }
    getEmoji() {
        var tools = [];
        for (let i = 1; i < 10; i++) {
            tools.push(<div key={i} onClick={()=>{this.props.add("http://www.jsfan.net:3002/emoji/b_emoticon_10"+i+".png")
            this.setState({isopen:false}) }} className='shakeimg'
            style={{ backgroundColor: '#f7f7f7', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}>
                <img src={"http://www.jsfan.net:3002/emoji/b_emoticon_10"+i+".png"} alt="" style={window.screen.width>=770?{ width: '2.3rem' }:{width: '1.8rem'}} /></div>);
        }
        for (let i = 10; i < 70; i++) {
            tools.push(<div key={'100'+i} onClick={()=>{this.props.add("http://www.jsfan.net:3002/emoji/b_emoticon_1"+i+".png")
            this.setState({isopen:false}) }} className='shakeimg' 
            style={{ backgroundColor: '#f7f7f7', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}>
                <img src={"http://www.jsfan.net:3002/emoji/b_emoticon_1"+i+".png"} alt="" style={window.screen.width>=770?{ width: '2.3rem' }:{width: '1.8rem'}} /></div>);
        }
        for (let i = 0; i < 6; i++) {
        tools.push(<div key={'200'+i} className='shakeimg' onClick={()=>{this.props.add("http://www.jsfan.net:3002/emoji/emoticon_0"+i+"s.png")
        this.setState({isopen:false}) }}
        style={{ backgroundColor: '#f7f7f7', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}>
            <img src={"http://www.jsfan.net:3002/emoji/emoticon_0"+i+"s.png"} alt="" style={window.screen.width>=770?{ width: '2.3rem' }:{width: '1.8rem'}} /></div>);
        }
        for (let i = 1; i < 10; i++) {
            tools.push(<div key={'300'+i} className='shakeimg' onClick={()=>{this.props.add("http://www.jsfan.net:3002/emoji/emoticon_00"+i+".png")
            this.setState({isopen:false}) }}
            style={{ backgroundColor: '#f7f7f7', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}>
                <img src={"http://www.jsfan.net:3002/emoji/emoticon_00"+i+".png"} alt="" style={window.screen.width>=770?{ width: '2.3rem' }:{width: '1.8rem'}} /></div>);
        }
        for (let i = 10; i < 64; i++) {
            tools.push(<div key={'300'+i} className='shakeimg' onClick={()=>{this.props.add("http://www.jsfan.net:3002/emoji/emoticon_0"+i+".png")
            this.setState({isopen:false}) }}
            style={{ backgroundColor: '#f7f7f7', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}>
                <img src={"http://www.jsfan.net:3002/emoji/emoticon_0"+i+".png"} alt="" style={window.screen.width>=770?{ width: '2.3rem' }:{width: '1.8rem'}} /></div>);
        }
        return tools;
    }
    render() {
        return (
            <div>
                <div style={this.state.isopen?{border: '1px solid deeppink',borderRadius: '1rem', color: '#888', height: '2rem', width: '4rem', textAlign: 'center', margin: '1rem auto', lineHeight: '1.7rem', cursor: 'pointer'}:
                { borderRadius: '1rem', border: '1px solid #545454', color: '#888', height: '2rem', width: '4rem', textAlign: 'center', margin: '1rem auto', lineHeight: '1.7rem', cursor: 'pointer' }}
                    className='meme_btn meme_color' onClick={() => { this.isShowEmoji() }}>
                    <span className='meme_btnin' style={this.state.isopen?{color:'deeppink',fontSize: '1.1rem'}:{ fontSize: '1.1rem' }}>OωO</span>

                </div>
                    {
                        this.state.isopen ?
                            <div style={{textAlign: 'center',  overflow:'scroll',borderRadius: '4px', width: '400%', height: '15rem', backgroundColor: '#FFF', position: 'absolute', left: '-300%', top: '-15rem', border: '1px solid#fc5eff' }} className='emojidivstyle'>
                                {
                                    this.getEmoji()
                                }
                            </div>
                            : null
                    }
            </div>
        );
    }
}

export default Emojs;