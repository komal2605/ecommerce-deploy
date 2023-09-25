"use client";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  getUsersAsync,
  registerUser,
} from "../GlobalRedux/Slices/authSlice";
import UpdateUser from "@/components/UpdateUser";

const CreateUser = ({ register, handleSubmit, errors }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(authState);
  const onRegisterSubmit = (data) => {
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
        is_admin: data.is_admin,
      })
    );
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onRegisterSubmit)}
      className="d-flex flex-column gap-3"
    >
      <TextField
        type="text"
        placeholder="Username"
        size="small"
        {...register("username", { required: true })}
      />
      <TextField
        type="email"
        placeholder="Email"
        size="small"
        {...register("email", { required: true })}
      />
      <TextField
        type="password"
        placeholder="Password"
        size="small"
        {...register("password", { required: true, minLength: 8 })}
        helperText={errors.password && "min 8 character required"}
      />

      <FormControlLabel
        {...register("is_admin")}
        control={<Checkbox />}
        label="Admin"
      />
      <Typography variant="caption">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other purposes
        described in our privacy policy.
      </Typography>
      {loading ? (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      ) : (
        <Button type="submit" className="bg-dark text-white px-5 rounded-0">
          Register
        </Button>
      )}
    </form>
  );
};

function page() {
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();
  dispatch(getUsersAsync());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        mt: 14,
        p: 10,
        bgcolor: "#fafafa",
      }}
    >
      <Box sx={{ width: "100%", typography: "subtitle2" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Create User" value="1" />
              <Tab label="Update User" value="2" />
              <Tab label="Add Product" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              className="d-flex align-items-center"
              sx={{ maxWidth: { xs: "100%", md: "50%" } }}
            >
              <CreateUser
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <UpdateUser
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </TabPanel>
          <TabPanel value="3">Comming soon...</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default page;
