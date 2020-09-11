import { Result, Button } from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Other extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="对不起，您访问的页面不存在"
                extra={<Button type="primary"><Link to='/'>返回主页</Link></Button>}
            />
        );
    }
}

export default Other;