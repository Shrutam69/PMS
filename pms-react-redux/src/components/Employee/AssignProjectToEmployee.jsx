import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import * as assignProjectActions from '../../actions/assignProject';
import { useToasts } from 'react-toast-notifications';
import './employee.css';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Select from 'react-select';
import { Form, Formik } from 'formik';

const AssignProjectToEmployee = (props) => {
  const { recordForEdit, setOpenPopup, projectState } = props;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([...projectState]);
  const [searchInput, setSearchInput] = useState('');
  const initialFieldValues = {
    employeeId: recordForEdit ? recordForEdit.id : 0,
    SelectedProjectList: recordForEdit
      ? recordForEdit.tblAssignProject?.map((data) => {
          const record = projectState.filter((x) => x.id == data.projectId);
          return {
            value: data.projectId,
            label: record[0]?.name,
          };
        })
      : [],
  };
  const [values, setValues] = useState(initialFieldValues);
  useEffect(() => {
    var result = recordForEdit
      ? recordForEdit.tblAssignProject
        ? recordForEdit.tblAssignProject.map((data) => {
            return data.projectId;
          })
        : recordForEdit.SelectedProjectList.map((data) => {
            return data;
          })
      : [];
    setValues({
      ...values,
      SelectedProjectList: result,
    });
  }, [recordForEdit]);
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
    </>
  );
};

export default AssignProjectToEmployee;
