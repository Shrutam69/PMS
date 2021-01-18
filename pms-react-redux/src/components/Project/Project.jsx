import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Table } from 'antd';
import {
  ButtonGroup,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { tableHeadersProject, tableHeaders } from '../../utils/data';
import * as actions from '../../actions/project';
import { UserAddOutlined } from '@ant-design/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import '../Employee/employee.css';
import Search from '@material-ui/icons/Search';
import Popup from '../Shared/Popup';
import ProjectForm from './ProjectForm';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { useToasts } from 'react-toast-notifications';

const Project = (props) => {
  const { addToast } = useToasts();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const inputChange = true;
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.projectReducer.list);

  const getProjectList = () => {
    dispatch(actions.fetchAll());
  };

  useEffect(() => {
    getProjectList();
  }, [projectState]);
  useEffect(() => {
    let dataAfterFilter = inputChange
      ? projectState.filter((x) =>
          x.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : '';
    setSearchResult(dataAfterFilter);
  }, [searchInput]);
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
        <Button
          onClick={() => {
            setOpenPopup(true);
            // openInPopup(project);
          }}
        >
          <EditIcon color="primary" />
        </Button>
        <Button
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
        >
          <DeleteIcon color="secondary" />
        </Button>
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
        title="Project Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProjectForm
          recordForEdit={recordForEdit}
          openPopup={openPopup}
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

export default Project;
