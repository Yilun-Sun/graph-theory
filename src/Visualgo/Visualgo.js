import React from 'react';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import './Visualgo.css';
import logo from '../pixelLogo.svg';
import logoPng from '../pixil-frame.png';
import Canvas from '../Canvas/Canvas';
import CanvasGraph from '../Canvas/CanvasGraph';
import { selectSortAlgo } from '../Canvas/Canvas';

import { updateNode, findMaxClique, graphExample1, graphExample2, graphExample3, graphExample4 } from '../Canvas/CanvasGraph';

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
        const textAreaStyle_1 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '400px',
            height: '120px',
            fontSize: '20px'
        };

        const textAreaStyle_2 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            width: '400px',
            height: '120px',
            fontSize: '20px'
        };

        const textStyle_1 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            color: 'white',
            fontSize: '30px'
        };

        const textStyle_2 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            fontSize: '20px'
        };

        const textStyle_3 = {
            // border: 0,
            // borderRadius: '5px',
            // backgroundColor: '#FFFFFF',
            fontSize: '15px'
        };

        const divStyle_1 = {
            float: 'right'
        };

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div >
                        <img style={{ width: '85px' }} src={logoPng} alt="logo" />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            {/* <Icon type="pie-chart" /> */}
                            <span>Branch and Bound</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            {/* <Icon type="desktop" /> */}
                            <span>Bron–Kerbosch</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    {/* <Icon type="user" /> */}
                                    <span>Node</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Add Node</Menu.Item>
                            <Menu.Item key="4">Remove Node</Menu.Item>
                            <Menu.Item key="5">Show Neighbours</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    {/* <Icon type="team" /> */}
                                    <span>Graph Examples</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6" onClick={graphExample1}>Graph Example 1</Menu.Item>
                            <Menu.Item key="7" onClick={graphExample2}>Graph Example 2</Menu.Item>
                            <Menu.Item key="8" onClick={graphExample3}>Graph Example 3</Menu.Item>
                            <Menu.Item key="9" onClick={graphExample4}>Graph Example 4</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="10" onClick={findMaxClique}>
                            {/* <Icon type="file" /> */}
                            <span>Find Max Clique</span>
                        </Menu.Item>
                        <Menu.Item key="11" onClick={updateNode}>
                            {/* <Icon type="file" /> */}
                            <span>Update Node</span>
                            {/* <button >--Bubble--</button> */}
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <div style={ textStyle_1 }>Graph Algorithms Visualization</div>
                        {/* <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu> */}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item style={ textStyle_2 }>Graph Theory - Maximum Clique</Breadcrumb.Item>
                            {/* <Breadcrumb.Item>Bubble Sort</Breadcrumb.Item> */}
                        </Breadcrumb>
                        {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                        <CanvasGraph />
                        <div style={ divStyle_1 }>
                            <div><label for="cmdTextArea" style={ textStyle_2 }>Edges: </label>
                                <br />
                                <textarea id="cmdTextArea" style={textAreaStyle_2}></textarea>
                            </div>

                            <div><label for="outputTextArea" style={ textStyle_2 }>Result Output: </label>
                                <br />
                                <textarea id='outputTextArea' style={textAreaStyle_2}></textarea>
                            </div>
                        </div>



                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Elonn Software ©2020 Created by Yilun Sun</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Visualgo;