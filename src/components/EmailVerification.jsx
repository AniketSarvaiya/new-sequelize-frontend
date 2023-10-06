import { Box, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 800,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: 1,
  textAlign: "center",
  boxShadow: 24,
  p: 4,
  px: { xs: 5, sm: 2, md: 10 },
};
function EmailVerification({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ForwardToInboxIcon
          sx={{
            fontSize: 250,
            bgcolor: "#66bb6a",
            padding: 5,
            borderRadius: 50,
            color: "#e3f2fd",
          }}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2" pt={2}>
          Verification Email Sent To Your Email
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          please verify your email first and login
        </Typography>
      </Box>
    </Modal>
  );
}

export default EmailVerification;
