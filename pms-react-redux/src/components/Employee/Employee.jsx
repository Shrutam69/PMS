import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import {
  ButtonGroup,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { tableHeaders } from '../../utils/data';
import * as actions from '../../actions/employee';
import { UserAddOutlined } from '@ant-design/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './employee.css';
import Search from '@material-ui/icons/Search';
import Popup from '../Shared/Popup';
import EmployeeForm from './EmployeeForm';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { useToasts } from 'react-toast-notifications';

const Employee = () => {
  const { addToast } = useToasts();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const employeeState = useSelector((state) => state.employeeReducer.list);
  const dispatch = useDispatch();
  const getEmployeeList = () => {
    const list = dispatch(actions.fetchAll());
  };

  useEffect(() => {
    getEmployeeList();
  }, [employeeState]);
  const [searchResult, setSearchResult] = useState([...employeeState]);
  useEffect(() => {
    setSearchResult([...employeeState]);
  }, []);
  useEffect(() => {
    let dataAfterFilter = searchInput
      ? employeeState.filter((x) =>
          x.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : employeeState;
    setSearchResult(dataAfterFilter);
  }, [searchInput, employeeState]);
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const onDelete = (id) => {
    debugger;
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
        <Button
          onClick={() => {
            console.log(employee);
            setOpenPopup(true);
            // setRecordForEdit(employee);
          }}
        >
          <EditIcon color="primary" />
        </Button>
        <Button
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
        >
          <DeleteIcon color="secondary" />
        </Button>
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
                label="Search"
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
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          // openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Employee;
