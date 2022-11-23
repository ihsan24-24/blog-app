import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";

import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import { createUserWithMail } from "../helpers/firebase";
const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .min(6, "Password must have min 6 chars")
    .max(10, "Password must have max 10 chars")
    .required("Please enter a password")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must have a special chars"),
  username: yup.string().required("Please enter a User Name"),

  first_name: yup.string().required("Please enter a First Name"),
  last_name: yup.string().required("Please enter a Last Name"),
});
const Register = () => {
  const navigate = useNavigate();
  const handleCreate = (e, values) => {
    e.preventDefault();

    createUserWithMail(values, navigate);
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            BLOG APP
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              navigate("/stock");
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              errors,
              touched,
            }) => (
              <Form onSubmit={(e) => handleCreate(e, values)}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  color="secondary"
                >
                  <TextField
                    label="User Name"
                    name="username"
                    id="username"
                    type="username"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    label="First Name"
                    name="first_name"
                    id="first_name"
                    type="first_name"
                    variant="outlined"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    id="last_name"
                    type="last_name"
                    variant="outlined"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    label="Again Password"
                    name="password2"
                    id="password2"
                    type="password"
                    variant="outlined"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password2 && Boolean(errors.password2)}
                    helperText={touched.password2 && errors.password2}
                  />
                  <Button
                    type="submit"
                    loadingPosition="center"
                    variant="contained"
                    onClick={(e) => handleCreate(e, values)}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>
        <Grid item xs={0} sm={7} md={6}></Grid>
      </Grid>
    </Container>
  );
};
export default Register;
