import React from 'react'
import { Button, Badge, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddButton = ({ showDrawer, setShowDrawer, numStudents }) => {

    return (
        <>
            {numStudents > 0 && <Tag style={{ margin: '0 0 10px' }} color='green'>Number of students: {numStudents}</Tag>}
            <br />
            <Button type="primary" shape="round" icon={<PlusOutlined />} size="small" onClick={() => setShowDrawer(!showDrawer)}>
                Add New Student
            </Button>
            <br />

            {/* <Badge count={numStudents} className='site-badge-count-4' /> */}

        </>

    )
}

export default AddButton;