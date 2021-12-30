import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'

const TheAvatar = name => {
    const studentName = name.name
    let trim = studentName.trim()
    const split = trim.split(" ")
    if (trim.length === 0) {
        return (
            <Avatar icon={<UserOutlined />} />
        )
    } else if (split.length === 1) {
        return (
            <Avatar>{studentName.charAt(0)}</Avatar>
        )
    } else {
        return (
            // <Avatar>`${name.charAt(0)}${name.charAt(name.length - 1)}`</Avatar>
            <Avatar>{split[0].charAt(0)}{split[split.length - 1].charAt(0)}</Avatar>
        )
    }
}

export default TheAvatar
