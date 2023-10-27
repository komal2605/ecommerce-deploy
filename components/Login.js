"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  getUsersAsync,
  registerUser,
  setIsOpenModal,
  signInUser,
} from "@/GlobalRedux/Slices/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  p: 2,
};
const LoginForm = ({ register, handleSubmit, errors }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(authState);
  const onLoginSubmit = (data) => {
    dispatch(signInUser({ email: data.email, password: data.password }));
    dispatch(getUsersAsync());
  };
  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="d-flex flex-column gap-3"
    >
      <TextField
        type="email"
        placeholder="email"
        size="small"
        {...register("email", { required: true })}
      />
      <TextField
        type="password"
        placeholder="Password"
        size="small"
        {...register("password")}
      />
      <FormControlLabel
        {...register("rememberMe")}
        control={<Checkbox />}
        label="Remember me"
      />
      <Typography variant="caption" sx={{ cursor: "pointer" }}>
        Lost your password?
      </Typography>
      {loading ? (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      ) : (
        <Button type="submit" className="bg-dark text-white px-5 rounded-0">
          Login
        </Button>
      )}
    </form>
  );
};
const RegisterForm = ({ register, handleSubmit, errors, getValues }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(authState);
  const onRegisterSubmit = (data) => {
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
        is_admin: false,
      })
    );
  };
  const validatePasswordConfirmation = (value) => {
    const password = getValues("password");
    return password === value || "Passwords do not match";
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
      <TextField
        type="password"
        placeholder="Repeat Password"
        size="small"
        {...register("confirmPassword", {
          required: true,
          min: 8,
          validate: validatePasswordConfirmation,
        })}
        helperText={errors.confirmPassword?.message}
      />
      <FormControlLabel
        {...register("rememberMe")}
        control={<Checkbox />}
        label="Remember me"
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
export default function login() {
  const [value, setValue] = React.useState("1");
  const { isOpenModal } = useSelector(authState);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={() => dispatch(setIsOpenModal({ bool: false }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", typography: "subtitle2" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Login" value="1" sx={{ width: "50%" }} />
                  <Tab label="Register" value="2" sx={{ width: "50%" }} />
                </TabList>
              </Box>
              <TabPanel value="1">
                <LoginForm
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              </TabPanel>
              <TabPanel value="2">
                <RegisterForm
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  getValues={getValues}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
