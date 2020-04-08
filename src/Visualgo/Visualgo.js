import React from 'react';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Layout, Menu, Breadcrumb} from 'antd';
import './Visualgo.css';
import logo from '../logo.svg';
import Canvas from '../Canvas/Canvas';
import CanvasGraph from '../Canvas/CanvasGraph';
import {selectSortAlgo} from '../Canvas/Canvas';

import ButtonGroup from 'antd/lib/button/button-group';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Visualgo extends React.Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div >
                        <img style={{ width: '85px' }} src={logo} alt="logo" />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            {/* <Icon type="pie-chart" /> */}
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            {/* <Icon type="desktop" /> */}
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    {/* <Icon type="user" /> */}
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    {/* <Icon type="team" /> */}
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            {/* <Icon type="file" /> */}
                            <span>File</span>
                        </Menu.Item>
                        <Menu.Item key="10">
                            {/* <Icon type="file" /> */}
                            <button onClick={selectSortAlgo('bubble')}>Bubble</button>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Sorting</Breadcrumb.Item>
                            {/* <Breadcrumb.Item>Bubble Sort</Breadcrumb.Item> */}
                        </Breadcrumb>
                        {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                        <CanvasGraph />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Elonn Software ©2020 Created by Yilun Sun</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Visualgo;