import { useState, useEffect } from 'react'
import { getAllStudents } from "./client";
import {
    Layout,
    Button,
    Menu,
    Breadcrumb,
    Table, Spin, Empty,
    Tag
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined
} from '@ant-design/icons';

import StudentDrawerForm from './StudentDrawerForm'
import AddButton from "./AddButton.js"
import TheAvatar from './TheAvatar';
import ActionButtons from './ActionButtons';

import './App.css';
import { errorNotification } from './Notification';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name} />
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    }
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })
            .catch(err => {
                err.response.json().then(res => {
                    console.log(res)
                    errorNotification("Couldn't get students. Try again, sucker.", `${res.message} - ${res.status}: ${res.error}`)
                })
            }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }
        if (students.length <= 0) {
            return <>
                <Empty />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 0' }}>
                    <AddButton showDrawer={showDrawer} setShowDrawer={setShowDrawer} numStudents={students.length} />
                </div>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
            </>;
        }
        return (
            <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Table
                    dataSource={students}
                    columns={
                        [
                            ...columns,
                            {
                                title: 'Actions',
                                dataIndex: 'actions',
                                key: 'actions',
                                render: (text, student) => (
                                    <>
                                        <ActionButtons name={student.name} id={student.id} fetchStudents={fetchStudents} />
                                    </>
                                )
                            }
                        ]
                    }
                    bordered
                    title={() => <AddButton showDrawer={showDrawer} setShowDrawer={setShowDrawer} numStudents={students.length} />}
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 500 }}
                />
            </>
        );
    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
            onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>By Amigoscode</Footer>
        </Layout>
    </Layout>
}

export default App;