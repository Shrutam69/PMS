import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Shared/FormikControl';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import './employee.css';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../actions/employee';
import * as skillsactions from '../../actions/skills';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';

const EmployeeForm = (props) => {
  debugger;
  const { addToast } = useToasts();
  const { recordForEdit, setOpenPopup } = props;
  const skillsState = useSelector((state) => state.skillsReducer.list);
  const getSkillsList = () => {
    dispatch(skillsactions.fetchAll());
  };

  useEffect(() => {
    getSkillsList();
  }, []);

  const skilllist = skillsState.map((data, index) => {
    return { value: data.id, label: data.name };
  });
  const dispatch = useDispatch();
  // let newStartDate = recordForEdit
  //   ? moment(recordForEdit.startDate).format('DD/MM/YYYY')
  //   : new Date();
  // let newReleaseDate = recordForEdit
  //   ? moment(recordForEdit.releaseDate).format('DD/MM/YYYY')
  //   : new Date();
  const initialFieldValues = {
    id: recordForEdit ? recordForEdit.id : 0,
    name: recordForEdit ? recordForEdit.name : '',
    code: recordForEdit ? recordForEdit.code : '',
    // startDate: recordForEdit ? new Date(newStartDate) : new Date(),
    startDate: recordForEdit
      ? new Date(Date.parse(recordForEdit.startDate))
      : new Date(),
    releaseDate: recordForEdit
      ? new Date(Date.parse(recordForEdit.releaseDate))
      : new Date(),
    SelectedSkillList: [],
  };
  const [values, setValues] = useState(initialFieldValues);

  //Validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('This field is required')
      .min(3, 'Mininum 3 characters allowed')
      .max(15, 'Maximum 15 characters allowed'),
    code: Yup.string().trim().required('This field is required'),
  });

  const handleInputChange = (e) => {
    debugger;
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSelect = (data) => {
    let newdata = data?.map((test) => {
      return test.value;
    });
    setValues({
      ...values,
      SelectedSkillList: newdata,
    });
  };
  const onRemove = (data) => {
    setValues({
      ...values,
      SelectedSkillList: data,
    });
  };
  //Submit Event
  const onSubmit = (values) => {
    if (recordForEdit == null) {
      dispatch(
        actions.create(
          values,
          addToast('Employee Added Successfully', { appearance: 'success' })
        )
      );
      setOpenPopup(false);
    } else {
      dispatch(
        actions.update(
          recordForEdit.id,
          values,
          addToast('Employee Updated Successfully', { appearance: 'success' })
        )
      );
      setOpenPopup(false);
    }
  };

  return (
    <div>
      <div className="p-2">
        <div>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ errors, touched, values }) => {
              return (
                <Form autoComplete="off" noValidate>
                  <div className="row">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <FormikControl
                        control="input"
                        type="text"
                        name="name"
                        className={
                          errors.name && touched.name ? 'err-field' : 'field'
                        }
                        onKeyDown={(e) =>
                          e.keyCode > 48 && e.keyCode < 57 && e.preventDefault()
                        }
                        value={values?.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>
                        Code<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <FormikControl
                        control="input"
                        type="text"
                        name="code"
                        className={
                          errors.code && touched.code ? 'err-field' : 'field'
                        }
                        value={values?.code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>Skills</label>
                    </div>
                    <div className="col-sm-9">
                      <Select
                        isMulti
                        name="SelectedSkillList"
                        options={skilllist}
                        className="basic-multi-select"
                        // className={
                        //   errors.code && touched.code
                        //     ? 'err-field basic-multi-select'
                        //     : 'field basic-multi-select'
                        // }
                        // isOptionSelected={
                        //   options.value === values?.SelectedSkillList.skillId
                        // }
                        classNamePrefix="select"
                        // onSelect={onSelect}
                        onRemove={onRemove}
                        onChange={onSelect}
                        // value={values?.SelectedSkillList}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>Start Date</label>
                    </div>
                    <div className="col-sm-9">
                      <FormikControl
                        control="date"
                        name="startDate"
                        className={
                          errors.startDate && touched.startDate
                            ? 'err-field'
                            : 'field'
                        }
                        value={values?.startDate}
                        minDate={recordForEdit ? '' : new Date()}
                        // onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>Release Date</label>
                    </div>
                    <div className="col-sm-9">
                      <FormikControl
                        control="date"
                        name="releaseDate"
                        className={
                          errors.releaseDate && touched.releaseDate
                            ? 'err-field'
                            : 'field'
                        }
                        value={values?.releaseDate}
                        minDate={recordForEdit ? values?.startDate : new Date()}
                        // onChange={(date) => setReleaseDate(date)}
                      />
                    </div>
                  </div>

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
                        // setRecordForEdit(null);
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
  );
};

export default EmployeeForm;
