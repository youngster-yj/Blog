import React, { Component } from 'react';
import {Icon,Spin, List, Avatar, message } from 'antd';
import '../style/components/commentSort.css'
import servicePath from '../config/apiUrl'
import { Link } from 'react-router-dom'
let scrollInterval = '';
let scrollBugTime = '';//清除一次性定时器
class CommentSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Ant Design Title 1',
                    description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
                }
            ],
            listMarginTop: "0",
            animate: false,
            isLoading: true,
        }
    }
    componentWillMount() {
        fetch(servicePath.getallpinglun, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    data: data,
                    isLoading: false,
                })
            })
            .catch((error) => {
                message.error('服务器端炸裂' + error)
            });
    }
    componentDidMount() {
        this.startScrollUp() 
    }
    scrollUp = e => {
        this.state.data.push(this.state.data[0]);
        try {

            let height = document.getElementById("scrollList").getElementsByTagName("li")[0].scrollHeight + 1;
            this.setState({
                animate: true,
                listMarginTop: "-" + height + "px",
            });
            scrollBugTime =  setTimeout(() => {
                this.state.data.shift();
                this.setState({
                    animate: false,
                    listMarginTop: "0",
                });
                this.forceUpdate();
            }, 2000)

        } catch (error) {
            return
        }

    }

    scrollDown = e => {
        let ulNode = document.getElementById("scrollList").getElementsByTagName("ul")[0];
        ulNode.firstChild.classList.remove("opacityAnimation");
        this.setState({
            animate: true,
            listMarginTop: ulNode.lastChild.scrollHeight + "px"
        });
        scrollBugTime =  setTimeout(() => {
            this.state.data.unshift(this.state.data[this.state.data.length - 1]);
            ulNode.firstChild.classList.add("opacityAnimation");
            this.state.data.pop();
            this.setState({
                animate: false,
                listMarginTop: "0",
            });
            this.forceUpdate();
        }, 1000)
    }

    startScrollUp = e => {
        this.endScroll();
        this.scrollUp();
        scrollInterval = setInterval(this.scrollUp, 3000);
    }

    startScrollDown = e => {
        this.endScroll();
        this.scrollDown();
        scrollInterval = setInterval(this.scrollDown, 3000);
    }

    endScroll = e => {
        clearInterval(scrollInterval);
    }
    componentWillUnmount(){ //处理BUG
        clearInterval(scrollInterval);
        clearInterval(scrollBugTime);
        this.setState = (state,callback)=>{
            return;
          };
    }
    render() {
        return (
            <div style={{ marginLeft: '.5rem', marginTop: '.5rem', backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid #eee', borderRadius: '.3rem' }}>
                {/* <div className="buttonContainer">
              <Button type="primary" onClick={this.startScrollUp}>向上滚动</Button>
              <Button type="primary" onClick={this.startScrollDown}>向下滚动</Button>
              <Button type="danger"  onClick={this.endScroll}>停止滚动</Button>
            </div> */}
                <div className='nav-title' style={{ marginBottom: '.5rem', color: 'deeppink', fontWeight: '800' }}>hot 评论</div>
                <Spin tip='加载中...' spinning={this.state.isLoading}>
                    <div className="listContainer" onMouseEnter={() => { this.endScroll() }} onMouseLeave={() => { this.startScrollUp() }}>
                        <List
                            itemLayout="horizontal"
                            id="scrollList"
                            style={{ marginTop: this.state.listMarginTop }}
                            className={this.state.animate ? "animate" : ''}
                            dataSource={this.state.data}
                            renderItem={(item,index) => (
                                <List.Item
                                    key={index}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.commentimg ? "http://q4.qlogo.cn/g?b=qq&nk=" + item.commentimg + "&s=3" : "http://39.96.67.38:3000/upload/卡哇伊number1.png"} />}
                                        title={
                                            <span>
                                      <Link to={item.articleTitle?'/blog/'+item.articleTitle:'/message'} style={{fontSize:'.75rem'}} className='hovercolor'>{item.commentname == 'cyj博主cyj' ? '博主' : item.commentname}</Link>
                                                   <span style={{color:'deeppink',fontSize:'.75rem'}}>
                                                    <Icon
                                                    style={{paddingLeft:'1rem'}}
                                                    type="like"
                                                    theme={'outlined'}
                                                    />  {item.praise}</span>
                                            </span>
                                        }
                                        description={<span style={{fontSize:'.9rem'}} dangerouslySetInnerHTML={{__html:item.commentcontent}}></span> }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Spin>
            </div>
        );
    }
}

export default CommentSort;