import React, { Component } from 'react';
import '../style/components/footer.css'
import { Tag,message } from 'antd'
// const Footer = ()=>(
//     <div className='footer-div'>
//         <div>本系统由React+Node+Antd Design联合驱动</div>
//         <div><a href="http://www.beian.miit.gov.cn/">蜀ICP备20005076号</a></div>
//         <div>Yougster_yj</div>
//     </div>
// )

// export default Footer

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: null,
            day: 0,
            hour: 0,
            min: 0,
            afterMin: 0,
         }
    }
    componentWillMount(){
        
        var date1 = new Date('2020/02/24 18:00')
        var s1 = date1.getTime()

        this.state.time = setInterval(() => {
            var s2 = Date.now()
            var total = (s2 - s1) / 1000
            var day = parseInt(total / (24 * 60 * 60))//计算整数天数
            var afterDay = total - day * 24 * 60 * 60//取得算出天数后剩余的秒数
            var hour = parseInt(afterDay / (60 * 60))//计算整数小时数
            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60//取得算出小时数后剩余的秒数
            var min = parseInt(afterHour / 60)//计算整数分
            var afterMin = parseInt(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60)//取得算出分后剩余的秒数

            this.setState({
                day: day,
                hour: hour,
                min: min,
                afterMin: afterMin
            })
        }, 1000)
        
    }
    componentWillUnmount() {
        if (this.state.time != null) { //对定时器进行销毁
            clearInterval(this.state.time);
        }
    }
    render() { 
        var day = this.state.day
        var hour = this.state.hour
        var min = this.state.min
        var afterMin = this.state.afterMin
        return ( 
            <div className='footer-div'>
            <div>本系统由React+Node+Antd Design联合驱动</div>
            <div>
                <Tag color="#f50" style={{margin:'0 .3rem'}}><a target="_blank" rel="noopener noreferrer" href="https://tongji.baidu.com/web/10000192192/homepage/index">百度统计</a></Tag>
                <a target="_blank" rel="noopener noreferrer" href="http://www.beian.miit.gov.cn/">蜀ICP备20005076号</a>
                <Tag color="#2db7f5" style={{margin:'0 .3rem'}}><a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com/?utm_content=se_1000301881">阿里云</a></Tag>
            </div>
            <div>本站已苟且偷生 <span style={{color:'hotpink',fontSize:'.7rem'}}>{day + '天' + hour + '小时' + min + '分钟' + afterMin + '秒'}</span></div>
            <div>Youngster_yj</div>
            </div>
         );
    }
}
 
export default Footer;