import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Shared/FormikControl';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import './employee.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Multiselect } from 'multiselect-react-dropdown';

const EmployeeForm = (props) => {
  const { addOrEdit, recordForEdit, openPopup, setOpenPopup } = props;
  const initialFieldValues = {
    id: 0,
    name: '',
    code: '',
    startDate: '',
    releaseDate: '',
    userType: '',
    userTypeId: [],
  };
  const plainArray = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ];
  const [values, setValues] = useState(initialFieldValues);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [siklls, setsiklls] = useState(plainArray);
  //Validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('This field is required')
      .matches()
      .min(3, 'Mininum 3 characters allowed')
      .max(15, 'Maximum 15 characters allowed'),
    code: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('This field is required'),
    userType: Yup.string().required('Please select one option'),
    startDate: Yup.string().required('This field is required'),
    releaseDate: Yup.string().required('This field is required'),
  });
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
    else {
      setValues({
        ...initialFieldValues,
      });
    }
  }, [recordForEdit]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Submit Event
  const onSubmit = (values) => {};
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
            {({ errors, touched }) => {
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
                        value={values.firstName}
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
                          errors.name && touched.name ? 'err-field' : 'field'
                        }
                        value={values.code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>
                        Start Date<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        isClearable
                        placeholderText=" select date!"
                        className="field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>
                        End Date<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        isClearable
                        placeholderText=" select date!"
                        className="field"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-3 d-flex justify-content-sm-start justify-content-md-end pt-1 pr-0">
                      <label>
                        Skills<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <Multiselect options={plainArray} isObject={false} />
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
