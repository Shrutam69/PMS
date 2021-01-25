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
import { tableHeaders } from '../../utils/data';
import * as actions from '../../actions/employee';
import * as projectActions from '../../actions/project';
import { UserAddOutlined } from '@ant-design/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './employee.css';
import Search from '@material-ui/icons/Search';
import Popup from '../Shared/Popup';
import EmployeeForm from './EmployeeForm';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { useToasts } from 'react-toast-notifications';
import * as skillsactions from '../../actions/skills';
import AssignProjectToEmployee from './AssignProjectToEmployee';
import ViewListIcon from '@material-ui/icons/ViewList';

const Employee = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [assignPopup, setassignPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const getProjectList = () => {
    dispatch(projectActions.fetchAll());
  };
  useEffect(() => {
    getProjectList();
  }, []);
  const projectState = useSelector((state) => state.projectReducer.list);
  const getSkillsList = () => {
    dispatch(skillsactions.fetchAll());
  };
  useEffect(() => {
    getSkillsList();
  }, []);
  const skillsState = useSelector((state) => state.skillsReducer.list);
  const getEmployeeList = () => {
    dispatch(actions.fetchAll());
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  const employeeState = useSelector((state) => state.employeeReducer.list);
  const [searchResult, setSearchResult] = useState([...employeeState]);
  useEffect(() => {
    let dataAfterFilter = searchInput
      ? employeeState.filter(
          (x) =>
            x.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.code.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.startDate.toLowerCase().includes(searchInput.toLowerCase()) ||
            x.releaseDate.toLowerCase().includes(searchInput.toLowerCase())
        )
      : employeeState;
    for (let i = 0; i < dataAfterFilter.length; i++) {
      dataAfterFilter[i].startDate = new Date(
        dataAfterFilter[i].startDate
      ).toLocaleDateString();
      dataAfterFilter[i].releaseDate = new Date(
        dataAfterFilter[i].releaseDate
      ).toLocaleDateString();
    }
    setSearchResult(dataAfterFilter);
  }, [searchInput, employeeState]);
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
    getEmployeeList();
    setSearchResult(employeeState);
  };
  const actionColumn = {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    render: (employee) => (
      <ButtonGroup variant="text">
        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            onClick={() => {
              setassignPopup(false);
              openInPopup(employee);
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
                  title: 'Are you sure to delete employee?',
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    onDelete(employee.id);
                  },
                });
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assign Projects">
          <IconButton aria-label="viewProjects">
            <ViewListIcon
              color="default"
              onClick={() => {
                setassignPopup(true);
                openInPopup(employee);
              }}
            />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    ),
  };
  const columns = [...tableHeaders, actionColumn];
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
              Add Employee
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
        title={assignPopup ? 'Assign Project' : 'Employee Form'}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {assignPopup ? (
          <div>
            <AssignProjectToEmployee
              recordForEdit={recordForEdit}
              setOpenPopup={setOpenPopup}
              skillsState={skillsState}
              projectState={projectState}
            />
          </div>
        ) : (
          <div>
            <EmployeeForm
              recordForEdit={recordForEdit}
              setOpenPopup={setOpenPopup}
              skillsState={skillsState}
              getEmployeeList={getEmployeeList}
            />
          </div>
        )}
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Employee;
