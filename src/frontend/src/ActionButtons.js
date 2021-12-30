import React from 'react'
import { deleteStudent, getAllStudents } from './client'
import { successNotification, errorNotification } from './Notification';
import { Popconfirm, Button, Radio } from 'antd'

const ActionButtons = ({ name, id, fetchStudents }) => {

    const text = `Are you sure you want to delete ${name}?`

    const handleConfirm = () => {
        deleteStudent(id)
            .then(() => {
                fetchStudents()
                successNotification('Student successfully deleted', `${name} was removed from the system`)
            })
            .catch(err => {
                errorNotification(`There was a problem deleting ${name}`, err)
            })
    }

    return (
        <>

            <Radio.Group>
                <Popconfirm title={text} onConfirm={handleConfirm} okText="Yes" cancelText="No">
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>


        </>
    )
}

export default ActionButtons
