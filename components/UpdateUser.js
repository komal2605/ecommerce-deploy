"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  authState,
  deleteUser,
  deleteUserAsync,
  getUsersAsync,
  updateUserAsync,
} from "@/app/GlobalRedux/Slices/authSlice";

function UpdateUser() {
  const [userData, setUserData] = React.useState(null);
  const { users, updateUserLoading } = useSelector(authState);
  const [checked, setChecked] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    const initialCheckedState = {};
    users?.forEach((item) => {
      initialCheckedState[item.uid] = item.is_admin;
    });
    setChecked(initialCheckedState);
  }, [users]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    for (const uid in checked) {
      if (
        checked.hasOwnProperty(uid) &&
        checked[uid] !== users.find((user) => user.uid === uid).is_admin
      ) {
        dispatch(updateUserAsync({ uid: uid, is_admin: checked[uid] }));
        // console.log("uid", uid, "is_admin", checked[uid]);
      }
    }
  };
  const handleDeleteUser = (uid) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAsync(uid));
      alert("User deleted successfully");
    }
  };
  const handleChange = (uid, value) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [uid]: value,
    }));
    // console.log(checked);
  };
  return (
    <Box>
      {users ? (
        users?.map((item, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="space text-capitalize">
                  <PersonIcon sx={{ mr: 1, mb: 0.5 }} />
                  {item.username}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ position: "relative" }}>
                <IconButton
                  color="error"
                  sx={{ position: "absolute", top: 5, right: 10 }}
                  onClick={() => handleDeleteUser(item.uid)}
                >
                  <DeleteIcon />
                </IconButton>
                <Box>
                  <Typography>
                    <strong>Username</strong> : {item.username}
                  </Typography>
                  <Typography>
                    <strong>Email</strong> : {item.email}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    onSubmit={handleUpdateUser}
                    component="form"
                    className="w-100 d-flex flex-column flex-md-row justify-content-between"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[item.uid] || false}
                          onChange={(e) =>
                            handleChange(item.uid, e.target.checked)
                          }
                        />
                      }
                      label="Make admin"
                    />

                    <Button
                      type="submit"
                      size="small"
                      onClick={() => setUserData(item)}
                      className="text-white bg-dark"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography variant="caption">Loading...</Typography>
      )}
    </Box>
  );
}

export default React.memo(UpdateUser);
