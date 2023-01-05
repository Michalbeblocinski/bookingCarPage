import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

import logo from "..//../assets/logo.png";
import InputWithValidation from "../../components/form/inputWithValidation/inputWithValidation";
import RegisterPasswordInput from "../../components/form/RegisterPasswordInput/RegisterPasswordInput";

const RegistrationPanel = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = (values) => {
    console.log(values)
    
  }
  const validate = Yup.object({
    email: Yup.string().email("Must be a valid email").required("Required"),
    password: Yup.string()
      .min(12, "Password is too short and")
      .max(64, "Password is too long and")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required"),
  });
  return (
    <Container className="container d-flex vh-100">
      <Row className="m-auto align-self-center col-12 col-md-10 col-xxl-8">
        <div className="card p-5 pb-4">
          <img src={logo} alt="logo" width="144" height="124" />
          <h2 className="h2 my-3 fw-normal">Registration</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              
            }}
            validationSchema={validate}
          >
            <Form>
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {successful ? (
                      <div>
                        Registration was successful! Go to
                        <Link
                          to="/login"
                          className="ms-1 text-decoration-underline text-nowrap"
                        >
                          login panel{" "}
                        </Link>
                        to log in.
                      </div>
                    ) : (
                      message
                    )}
                  </div>
                </div>
              )}
              <InputWithValidation
                label="Email address"
                name="email"
                type="email"
                placeholder="your-email@example.com"
                required
              />
              <RegisterPasswordInput
                label="Password"
                name="password"
                type="password"
                className="form-control"
                autoComplete="on"
                id="floatingPassword"
                placeholder="Password"
                maxLength={64}
                required
              />
              <InputWithValidation
                label="Confirm password"
                name="confirmPassword"
                type="password"
                id="floatingConfirmPassword"
                placeholder="Confirm password"
                autoComplete="on"
                maxLength={64}
                required
              />
              <p className="my-3 text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="ms-1 text-decoration-underline text-nowrap"
                >
                  Sing in
                </Link>
              </p>
              <button className="w-100 btn btn-lg btn-dark" type="submit">
                Sign up
              </button>
            </Form>
          </Formik>
        </div>
      </Row>
    </Container>
  ); 
};
export default RegistrationPanel;
