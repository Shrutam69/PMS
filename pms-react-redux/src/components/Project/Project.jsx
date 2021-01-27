import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import {
  ButtonGroup,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { tableHeadersProject } from '../../utils/data';
import * as actions from '../../actions/project';
import * as employeeActions from '../../actions/employee';
import * as skillsactions from '../../actions/skills';
import * as assignProjectActions from '../../actions/assignProject';
import { UserAddOutlined } from '@ant-design/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import Popup from '../Shared/Popup';
import ProjectForm from './ProjectForm';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { useToasts } from 'react-toast-notifications';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignEmployeeToProject from './AssignEmployeeToProject';
import '../Employee/employee.css';
import moment from 'moment';

const Project = () => {
  const { addToast } = useToasts();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [assignEmployee, setAssignEmployee] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const dispatch = useDispatch();
  const getAssignProject = () => {
    dispatch(assignProjectActions.fetchAll());
  };
  useEffect(() => {
    getAssignProject();
  }, []);
  const assignProjectState = useSelector(
    (state) => state.assignProjectReducer.list
  );
  const getEmployeeList = () => {
    dispatch(employeeActions.fetchAll());
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  const employeeState = useSelector((state) => state.employeeReducer.list);
  const getSkillsList = () => {
    dispatch(skillsactions.fetchAll());
  };
  useEffect(() => {
    getSkillsList();
  }, []);
  const skillsState = useSelector((state) => state.skillsReducer.list);
  const getProjectList = () => {
    dispatch(actions.fetchAll());
  };
  useEffect(() => {
    getProjectList();
  }, [assignProjectState]);
  const projectState = useSelector((state) => state.projectReducer.list);

  const [searchResult, setSearchResult] = useState([...projectState]);
  useEffect(() => {
    setSearchResult([...projectState]);
  }, []);
  useEffect(() => {
    let dataAfterFilter = searchInput
      ? projectState.filter(
          (x) =>
            x.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.code.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.startDate.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.endDate.toLowerCase().includes(searchInput.toLowerCase())
        )
      : projectState;
    for (let i = 0; i < dataAfterFilter.length; i++) {
      dataAfterFilter[i].startDate = new Date(
        dataAfterFilter[i].startDate
      ).toLocaleDateString();
      dataAfterFilter[i].endDate = new Date(
        dataAfterFilter[i].endDate
      ).toLocaleDateString();
    }
    setSearchResult(dataAfterFilter);
  }, [searchInput, projectState]);
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(
      actions.Delete(id, () =>
        addToast('Deleted Successfully', { appearance: 'info' })
      )
    );
  };
  const actionColumn = {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    render: (project) => (
      <ButtonGroup variant="text">
        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            onClick={() => {
              setAssignEmployee(false);
              openInPopup(project);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon
              color="secondary"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to delete project?',
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    onDelete(project.id);
                  },
                });
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assign Employees">
          <IconButton aria-label="viewEmployees">
            <ViewListIcon
              color="default"
              onClick={() => {
                setAssignEmployee(true);
                openInPopup(project);
              }}
            />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    ),
  };
  const columns = [...tableHeadersProject, actionColumn];
  return (
    <>
      <div className="row d-flex justify-content-between">
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-3 mt-2"
            style={{
              height: '56px',
              width: '100%',
              backgroundColor: '#001529',
            }}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          >
            <UserAddOutlined
              style={{
                fontSize: '22px',
              }}
            />
            <span style={{ fontSize: '15px' }} className="ml-2">
              Add Project
            </span>
          </Button>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <div style={{ width: '100%' }} className="ml-2 mt-1 ml-md-0 mt-md-0">
            <Toolbar className="mt-1 pr-3">
              <TextField
                fullWidth
                label="Search(Name,Code,StartDate,ReleaseDate)"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </Toolbar>
          </div>
        </div>
      </div>
      <div className="border">
        <Table
          columns={columns}
          dataSource={searchResult}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15'],
            showQuickJumper: true,
          }}
          className="table-responsive"
        />
      </div>

      <Popup
        title={assignEmployee ? 'Assign Employee' : 'Project Form'}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {assignEmployee ? (
          <AssignEmployeeToProject
            recordForEdit={recordForEdit}
            setOpenPopup={setOpenPopup}
            employeeState={employeeState}
          />
        ) : (
          <ProjectForm
            recordForEdit={recordForEdit}
            setOpenPopup={setOpenPopup}
            skillsState={skillsState}
          />
        )}
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Project;
