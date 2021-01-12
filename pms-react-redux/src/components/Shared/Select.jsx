import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control1">
      {/* <div>
        <label htmlFor={name}>{label}</label>
      </div> */}
      <Field as="select" id="name" name={name} {...rest}>
        <option value={0}>Select</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.value}>
              {option.type}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
}

export default select;
