import React from 'react';
import { Dialog, DialogContent, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);

  return (
    <Dialog open={openPopup} maxWidth={maxWidth} fullWidth={fullWidth}>
      <div className="pr-0 pl-3 py-3">
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: '24px' }}>
            <strong>Employee Form</strong>
          </div>
          <Button
            onClick={() => {
              setOpenPopup(false);
            }}
            style={{ outline: 'none', backgroundColor: 'white' }}
          >
            <CloseIcon
              style={{
                border: '1px solid lightgray',
                borderRadius: '50%',
                color: 'lightgray',
              }}
            />
          </Button>
        </div>
        <hr
          className="mx-1 p-0 mr-4 m-0"
          style={{ borderBottom: '4px solid #208fc8 ' }}
        />
      </div>
      <DialogContent className="px-3">{children}</DialogContent>
    </Dialog>
  );
}
