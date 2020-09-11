import React, { Component } from 'react';
import Header from './components/Header'
import './style/components/picture.css'
import { Row, Col, List, Timeline, Icon, Affix, BackTop, message, Spin, Tag, Input } from 'antd'
import Zmage from 'react-zmage'   
var isload = 0
class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isLoading: true,
        }
    }
    componentWillMount() {
        isload=0
        var arr = new Array(74);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = i;
        }
        this.setState({
            data: arr
        })

        document.addEventListener('visibilitychange',function(){
            var isHidden = document.hidden;
            if(isHidden){
            document.title = '404!!!页面丢失(￣▽￣)"';
            
            } else {
            document.title = '嘤嘤嘤，你回来了啊(ಥ _ ಥ)';
              setTimeout(()=>{
                document.title = '图库页 | Youngster_yj的个人博客'
              },3000)
            }
            }
            );
        document.title = '图库页 | Youngster_yj的个人博客'
    }
    domPull() {
        var main = document.getElementById('main')
        var box = document.getElementsByClassName('box')
        var that = this
        //实现瀑布流布局
        // setTimeout(()=>{ //图片如未加载完成 则布局错误
           this.waterFull(main, box) 
        // },1000)
        

        //加载数据
        var timer1 = null
        window.addEventListener('scroll', function (e) {
            clearTimeout(timer1)
            //节流
            timer1 = setTimeout(function () {
                if (that.checkWillLoadNewBox(main, box)) {
                    //假数据模仿数据加载
                    let arr = new Array(74);//30-60数组
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = i;
                    }
                    //遍历数据
                    for (let i = 0; i < arr.length; i++) {
                        var newBox = document.createElement('div')
                        newBox.className = 'box'
                        main.appendChild(newBox)

                        var newPic = document.createElement('div')
                        newPic.className = 'pic'
                        newBox.appendChild(newPic)

                        var newImg = document.createElement('img')
                        newImg.src = "https://www.jsfan.net/some/lifeimg/life%20("+arr[i]+").jpg"
                        newImg.addEventListener('click',()=>{Zmage.browsing({ src:"https://www.jsfan.net/some/lifeimg/life%20("+arr[i]+").jpg" })})
                        newPic.appendChild(newImg)
                    }
                    //重新进行瀑布流布局
                    that.waterFull(main, box)
                }
            })
        }, 200)


        //页面尺寸发生改变重新布局
        var timer2 = null
        window.addEventListener('resize', function () {
            clearTimeout(timer2)
            //节流
            timer2 = setTimeout(function () {
                that.waterFull(main, box)
            }, 200)
        })
    }
    waterFull(parent, child) {
        //(1)父盒子居中
        //1.1 获取所有子盒子
        //1.2 获取其中一个子盒子的宽度
        try {
            var boxWidth = child[0].offsetWidth
        } catch (error) {
            return
        }
        
        //1.3 获取窗口的宽度
        // var screenW = document.body.clientWidth
        //1.3 获取col的宽度
        var coldom = document.getElementsByClassName('comm-left')[0]
        var screenW = coldom.offsetWidth
        // console.log(screenW)
        //1.4 求出列数
        var cols = parseInt(screenW / boxWidth)
        // console.log(cols)
        //1.5 父盒子居中
        parent.style.width = cols * boxWidth + 'px'
        parent.style.margin = '0 auto'

        //(2)子盒子定位
        //2.1 定义变量
        var heightArr = []
        var boxHeight = 0
        var minBoxHeight = 0
        //2.2 遍历所有盒子获取高度
        for (let i = 0; i < child.length; i++) {
            boxHeight = child[i].offsetHeight
            //2.3 判断是否为第一行
            if (i < cols) {
                heightArr.push(boxHeight)
                child[i].style = ''//(响应式布局)保证第一行没有添加样式
            }
            else { //剩余行做定位
                //2.4 取出数组中最矮盒子的高度
                let arrSort = heightArr.slice(0) //sort排序后，会影响原始数组 解决方案
                arrSort.sort(function (a, b) {
                    return a - b;
                });
                // console.log(arrSort[0]) //最小
                //console.log(arrSort[arrSort.length-1]) //最大
                minBoxHeight = arrSort[0]
                //2.5 取出最矮盒子在数组中的索引
                var minBoxIndex = this.getMinBoxIndex(heightArr, minBoxHeight)
                // console.log(minBoxIndex)
                //2.6 剩余子盒子的定位
                child[i].style.position = 'absolute'
                child[i].style.left = minBoxIndex * boxWidth + 'px'
                child[i].style.top = minBoxHeight + 'px'
            }
            //2.7 更新高度
            heightArr[minBoxIndex] += boxHeight
        }

        // console.log(heightArr, minBoxHeight)
        let arrSortmax = heightArr.slice(0) //sort排序后，会影响原始数组 解决方案
        arrSortmax.sort(function (a, b) {
            return a - b;
        });
        // console.log(arrSortmax[arrSortmax.length-1]) //最大
        coldom.style.height = arrSortmax[arrSortmax.length - 1] + 'px'
    }
    getMinBoxIndex(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i
            }
        }
    }
    checkWillLoadNewBox(parent, child) {
        //1. 获取最后的盒子
        var lastBox = child[child.length - 1]
        //2. 求最后盒子高度的一半
        try {
            var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop
        } catch (error) {
            return
        }

        //3. 求出页面高度
        var screenH = document.body.clientHeight || document.documentElement.clientHeight
        //4. 求出页面滚出浏览器高度
        var scrollTopH = document.documentElement.scrollTop
        //5. 返回结果
        return lastBoxDis <= screenH + scrollTopH
    }
    load(){
        isload += 1
        if(isload==74){

          this.setState({
              isLoading:false
          }) 
          this.domPull()

        }
    }
    render() {
        return (
            <div>
                <Header />

                <BackTop>
                    <div className="ant-back-top-inner" ><Icon type="rocket" /></div>
                </BackTop>

                <Row className='comm-main' type='flex' justify='center' style={{ paddingTop: '2.7rem', }}>
                    <Col className='comm-left' xs={24} sm={24} md={23} lg={23} xl={18} style={{ padding: 0, backgroundColor: 'rgba(255,255,255,.4)' }}>
                    <Spin tip='加载中...' spinning={this.state.isLoading}>

                        <div id='main'>
                            {
                                this.state.data.map((item, key) => (
                                    <div className='box' key={key}>
                                        <div className='pic'>
                                        <div className='suofanga' style={{overflow:'hidden'}}>
                                            <img className='divimg' src={'https://www.jsfan.net/some/lifeimg/life%20(' + item + ').jpg'} onLoad={()=>this.load()}
                                             onClick={() => Zmage.browsing({ src:'https://www.jsfan.net/some/lifeimg/life%20(' + item + ').jpg' })}/>
                                        </div>
                                        </div>
                                    </div>
                                )
                                )
                            }

                        </div>

                       </Spin>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Picture;