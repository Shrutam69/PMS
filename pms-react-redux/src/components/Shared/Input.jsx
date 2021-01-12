import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} onChange {...rest}></Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
}

export default Input;
