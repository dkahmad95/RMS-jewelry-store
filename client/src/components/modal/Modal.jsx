import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '90%', // Ensure it doesn't exceed the viewport width
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px', // Rounded corners
  textAlign: 'center', // Center align content
};
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 8px', // Add some spacing between buttons
  padding: '8px 16px', // Increase padding for a larger clickable area
  backgroundColor: '#007bff', // Change button background color
  color: 'white', // Change text color
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s', // Add a smooth transition for hover effect
};

const yesButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#dc3545', // Custom style for "Yes" button
};

const noButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#007bff', // Custom style for "No" button
};

export function BasicModal({ open, setOpen, handleClick , Title, Body}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         <b>{Title && Title}</b> 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <b>{Body && Body}</b>
          </Typography>

          <button style={yesButtonStyle}
            onClick={() => {
              handleClick();
              setOpen(false);
            }}
          >
          Yes 
          </button>
          <button style={noButtonStyle}
            onClick={() => {
              
              setOpen(false);
            }}
          >
            No
          </button>
        </Box>
      </Modal>
    </div>
  );
}
