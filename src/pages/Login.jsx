import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  LoginWithGoogle,
  LoginWithMail,
  useBlogListListener,
} from "../helpers/firebase";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter valid email...")
    .required("please enter an email..."),
  password: yup
    .string()
    .required()
    .min(6, "please enter min 6 chars")
    .max(10, "please enter max 10 chars")
    .matches(/\d+/, "please enter a number")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have an uppercase"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" to="/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useBlogListListener(dispatch);
  const loginGoogle = () => {
    LoginWithGoogle(navigate, dispatch);
  };
  const loginApp = (e, values) => {
    e.preventDefault();
    LoginWithMail(values, navigate, dispatch);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          navigate("/home");
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmiting,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <Form onSubmit={(e) => loginApp(e, values)}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => loginApp(e, values)}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={loginGoogle}
                >
                  Continue with Google
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Link to="" variant="body2">
        Forgot password?
      </Link>{" "}
      <br />
      <Link to="/register" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
