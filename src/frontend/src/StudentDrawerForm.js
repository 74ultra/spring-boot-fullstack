import React, { useState } from 'react'
import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from 'antd'
import { addNewStudent } from './client'
import { successNotification, errorNotification } from './Notification';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StudentDrawerForm = ({ showDrawer, setShowDrawer, fetchStudents }) => {

    const onCLose = () => setShowDrawer(false)
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false)

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student)
            .then(res => {
                console.log('Student added: ', res)
                onCLose()
                successNotification('Student successfully added', `${student.name} was added to the system`)
                fetchStudents()
                form.resetFields()
            })
            .catch(err => {
                console.log(err)
                err.response.json().then(res => {
                    errorNotification("There was an problem adding the student", `${res.message} - ${res.status}: ${res.error}`, 'bottomLeft')
                })
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2))
    }

    return (
        <Drawer
            title="Create new student"
            width={720}
            onClose={onCLose}
            visible={showDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCLose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                </div>
            }
        >
            <Form layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                form={form}
                hideRequiredMark>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter student name' }]}
                        >
                            <Input placeholder="Please enter student name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter student email' }]}
                        >
                            <Input placeholder="Please enter student email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please select a gender' }]}
                        >
                            <Select placeholder="Please select a gender">
                                <Option value="MALE">MALE</Option>
                                <Option value="FEMALE">FEMALE</Option>
                                <Option value="OTHER">OTHER</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Row>
                        {submitting && <Spin indicator={antIcon} />}
                    </Row>
                </Row>
            </Form>
        </Drawer>
    )
}

export default StudentDrawerForm
