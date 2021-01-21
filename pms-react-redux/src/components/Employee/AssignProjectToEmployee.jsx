import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Tooltip,
  IconButton,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from '../../actions/project';
import * as assignProjectActions from '../../actions/assignProject';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { useToasts } from 'react-toast-notifications';
import { Table } from 'antd';
import { tableHeadersAssignProject } from '../../utils/data';
import './employee.css';
import Search from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Select from 'react-select';
import { Form, Formik } from 'formik';

const AssignProjectToEmployee = (props) => {
  const { recordForEdit, setOpenPopup, projectState, skillState } = props;
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([...projectState]);
  const [searchInput, setSearchInput] = useState('');
  const initialFieldValues = {
    employeeId: recordForEdit ? recordForEdit.id : 0,
    SelectedProjectList: recordForEdit
      ? recordForEdit.tblAssignProject.map((data) => {
          let newId = data.projectId;
          const record = projectState.filter((x) => x.id == newId);
          return {
            value: data.projectId,
            label: record[0]?.name,
          };
        })
      : [],
  };

  const [values, setValues] = useState(initialFieldValues);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  useEffect(() => {
    let dataAfterFilter = searchInput
      ? projectState.filter((x) =>
          x.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : projectState;
    for (let i = 0; i < dataAfterFilter.length; i++) {
      dataAfterFilter[i].startDate = new Date(
        dataAfterFilter[i].startDate
      ).toLocaleDateString();
      dataAfterFilter[i].releaseDate = new Date(
        dataAfterFilter[i].releaseDate
      ).toLocaleDateString();
    }
    setSearchResult(dataAfterFilter);
  }, [searchInput, projectState]);

  const actionColumn = {
    title: 'Technologies',
    dataIndex: '',
    key: 'technologies',
    render: (project) => {},
    // <div>{test}</div>,

    // <ButtonGroup variant="text">
    //   <Tooltip title="Assign">
    //     <IconButton
    //       aria-label="edit"
    //       onClick={() => {
    //         // openInPopup(employee);
    //       }}
    //     >
    //       <AssignmentTurnedInIcon color="primary" />
    //     </IconButton>
    //   </Tooltip>
    //   <Tooltip title="Cancel">
    //     <IconButton aria-label="cancel">
    //       <CancelPresentationIcon
    //         color="secondary"
    //         onClick={() => {
    //           setConfirmDialog({
    //             isOpen: true,
    //             title: 'Are you sure to delete employee?',
    //             subTitle: "You can't undo this operation",
    //             onConfirm: () => {
    //               // onDelete(employee.id);
    //             },
    //           });
    //         }}
    //       />
    //     </IconButton>
    //   </Tooltip>
    // </ButtonGroup>
  };
  const columns = [...tableHeadersAssignProject, actionColumn];
  const projectList = projectState.map((data, index) => {
    return { value: data.id, label: data.name };
  });

  const onSelect = (data) => {
    let newdata = data?.map((test) => {
      return test.value;
    });
    setValues({
      ...values,
      SelectedProjectList: newdata,
    });
  };
  const onRemove = (data) => {
    setValues({
      ...values,
      SelectedProjectList: data,
    });
  };
  //Submit Event
  const onSubmit = (values) => {
    dispatch(
      assignProjectActions.create(
        values,
        addToast('Projects assigned Successfully', { appearance: 'success' })
      )
    );
    setOpenPopup(false);
  };
  return (
    <>
      {/* <div className="d-flex justify-content-end">
        <Toolbar className="p-0">
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
      </div> */}
      <div>
        <div className="p-2">
          <div>
            <Formik
              initialValues={values}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ errors, touched, values }) => {
                return (
                  <Form autoComplete="off" noValidate>
                    <div className="row">
                      <div className="col-sm-2 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                        <label>Projects</label>
                      </div>
                      <div className="col-sm-10">
                        <Select
                          isMulti
                          name="SelectedProjectList"
                          options={projectList}
                          className="basic-multi-select"
                          defaultValue={
                            recordForEdit ? values.SelectedProjectList : ''
                          }
                          classNamePrefix="select"
                          onRemove={onRemove}
                          onChange={onSelect}
                        />
                      </div>
                    </div>
                    <div></div>
                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        style={{ padding: '6px 12px' }}
                        className="btn-save"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloseIcon />}
                        className="btn-cancel ml-2"
                        style={{ padding: '6px 12px' }}
                        onClick={() => {
                          setOpenPopup(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      {/* <div className="border">
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
      </div> */}
    </>
  );
};

export default AssignProjectToEmployee;
