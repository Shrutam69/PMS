import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import * as assignProjectAction from '../../actions/assignProject';
import { useToasts } from 'react-toast-notifications';
import '../Employee/employee.css';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Select from 'react-select';
import { Form, Formik } from 'formik';

const AssignEmployeeToProject = (props) => {
  const { recordForEdit, setOpenPopup, employeeState } = props;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([...employeeState]);
  const [searchInput, setSearchInput] = useState('');
  const initialFieldValues = {
    projectId: recordForEdit ? recordForEdit.id : 0,
    SelectedEmployeeList: recordForEdit
      ? recordForEdit.tblAssignProject.map((data) => {
          let newId = data.employeeId;
          const record = employeeState.filter((x) => x.id == newId);
          return {
            value: data.employeeId,
            label: record[0]?.name,
          };
        })
      : [],
  };
  const [values, setValues] = useState(initialFieldValues);
  useEffect(() => {
    let dataAfterFilter = searchInput
      ? employeeState.filter((x) =>
          x.name.toLowerCase().includes(searchInput.toLowerCase())
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

  const projectList = employeeState.map((data, index) => {
    return { value: data.id, label: data.name };
  });

  const onSelect = (data) => {
    let newdata = data?.map((test) => {
      return test.value;
    });
    setValues({
      ...values,
      SelectedEmployeeList: newdata,
    });
  };
  const onRemove = (data) => {
    setValues({
      ...values,
      SelectedEmployeeList: data,
    });
  };
  //Submit Event
  const onSubmit = (values) => {
    dispatch(
      assignProjectAction.create(
        values,
        addToast('Employees assigned Successfully', { appearance: 'success' })
      )
    );
    setOpenPopup(false);
  };

  return (
    <>
      <div>
        <div className="p-2">
          <div>
            <Formik
              initialValues={values}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values }) => {
                return (
                  <Form autoComplete="off" noValidate>
                    <div className="row">
                      <div className="col-sm-2 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                        <label>Projects</label>
                      </div>
                      <div className="col-sm-10">
                        <Select
                          isMulti
                          name="SelectedEmployeeList"
                          options={projectList}
                          className="basic-multi-select"
                          defaultValue={
                            recordForEdit ? values.SelectedEmployeeList : ''
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
    </>
  );
};

export default AssignEmployeeToProject;
