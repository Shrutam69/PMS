import React from 'react';
import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              dateFormat="MM/dd/yyyy"
              isClearable
              // minDate={value}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;
