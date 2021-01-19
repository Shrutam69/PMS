import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Employee from '../Employee/Employee';
import Dashboard from '../Shared/Dashboard';
import Project from '../Project/Project';
import { HomeOutlined, ProjectOutlined, TeamOutlined } from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';
import PMS_logo from '../../assets/images/pms_new_logo.png';

const { Header, Content, Footer, Sider } = Layout;
const Navingation = () => {
  return (
    <div>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              className="mt-5 pt-2"
            >
              <br></br>
              <Menu.Item
                key="1"
                className="mt-2"
                icon={<HomeOutlined style={{ fontSize: '20px' }} />}
              >
                Dashboard
                <NavLink to="/" />
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<TeamOutlined style={{ fontSize: '20px' }} />}
              >
                <span>Employee</span>
                <NavLink to="/employee" />
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<ProjectOutlined style={{ fontSize: '20px' }} />}
              >
                <span>Project</span>
                <NavLink to="/project" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-background d-flex justify-content-between"
              style={{ padding: 0, color: 'white' }}
            >
              <NavLink to="/">
                <h4 className="text-light">
                  {/* PMS */}
                  <img style={{ height: '46px' }} src={PMS_logo} />
                  {/* <hr className="text-light bg-light p-0 m-1" /> */}
                  <div
                    style={{ fontSize: '9px', backgroundColor: 'white' }}
                    className="text-dark py-1"
                  >
                    Project Management System
                  </div>
                </h4>
              </NavLink>
              <div className="text-light mr-4 ">
                <div className="d-flex">
                  <div className="m-2 pt-1">
                    <Avatar sizes="sm">S</Avatar>
                  </div>
                  <div className="mb-1">Shrutam</div>
                </div>
              </div>
            </Header>

            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#f4f5fd',
                minHeight: 280,
              }}
            >
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/employee" component={Employee} />
              <Route path="/project" component={Project} />
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
};

export default Navingation;
