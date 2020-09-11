import React, { Component } from 'react';
import Main from './Main'
import Movies from './Movies'
import Blog from './Blog'
import Admin from './admin/App'
import Login from './admin/Login'
import Life from './Life'
import Other from './Other'
import History from './History'
import Message from './Message'
import About from './About'
import Picture from './Picture'
import ReactAplayer from 'react-aplayer';
import {
  Route,        //路由
  BrowserRouter as Router, //所有的dom都包含在Router(根节点)
  Switch,       //处理无匹配路由
} from 'react-router-dom'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // example of access aplayer instance
  onInit = ap => {
    this.ap = ap;
  };

  render() {
    const props = {
      theme: '#F57F17',
      lrcType: 3,
      audio: [
        //http://www.jsfan.net:3001/search/suggest?keywords=花魁   寻找id
        //http://www.jsfan.net:3001/lyric?id=553753244 id找歌词
        {
          name: '微微',
          artist: '傅如乔',
          url: 'http://39.96.67.38:3000/upload/微微.mp3',
          cover: 'http://39.96.67.38:3000/upload/微微musicimg.jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=1433434738',
          theme: '#ebd0c2'
        },
        {
          name: '无人之岛',
          artist: '任然',
          url: 'http://39.96.67.38:3000/upload/无人之岛.mp3',
          cover: 'http://39.96.67.38:3000/upload/无人之岛img.jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=493735012',
          theme: '#ebd0c2'
      },
        {
          name: '你的答案',
          artist: '阿冗',
          url: 'http://39.96.67.38:3000/upload/你的答案.mp3',
          cover: 'http://39.96.67.38:3000/upload/你的答案阿.jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=1400256289',
          theme: '#ebd0c2'
      },
        {
          name: '权力的游戏',
          artist: 'Ramin Djawadi', //作者名
          url: 'http://39.96.67.38:3000/upload/权力的游戏.mp3',
          cover: 'https://p1.music.126.net/ME34HLKlJtYGruIxomhIOQ==/7987951976023943.jpg',
          //   lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
          theme: '#ebd0c2'
        },
        {
          name: '刚好遇见你',
          artist: '李玉刚',
          url: 'http://39.96.67.38:3000/upload/刚好遇见你.mp3',
          cover: 'http://39.96.67.38:3000/upload/刚好遇见你.jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=459159104',
          theme: '#ebd0c2'
        },
        {
          name: '花魁',
          artist: '徐良',
          url: 'http://39.96.67.38:3000/upload/花魁.mp3',
          cover: 'http://39.96.67.38:3000/upload/花魁徐良.jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=553753244',
          theme: '#ebd0c2'
        },
        {
          name: '下山',
          artist: '要不要买菜',
          url: 'http://39.96.67.38:3000/upload/下山.mp3',
          cover: 'http://39.96.67.38:3000/upload/下山(要不要买菜).jpg',
          lrc: 'http://www.jsfan.net:3001/lyric?id=1404885266',
          theme: '#ebd0c2'
      },

      ],
      fixed: true,
      autoplay:false,
      mini:true,
    };
    return (
      <div>
        {window.screen.width<770?<ReactAplayer
          {...props}
          onInit={this.onInit}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />:null}
        
        <Router>

          <Switch>
            <Route path='/' exact component={Main}></Route>
            <Route path='/movies/' exact component={Movies}></Route>
            <Route path='/life/' component={Life}></Route>
            <Route path='/blog/:id' component={Blog}></Route>
            <Route path='/admin/' component={Admin}></Route>
            <Route path='/login/' component={Login}></Route>
            <Route path='/history/' component={History}></Route>
            <Route path='/message/' component={Message}></Route>
            <Route path='/about/' component={About}></Route>
            <Route path='/picture/' component={Picture}></Route>
            <Route component={Other}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
