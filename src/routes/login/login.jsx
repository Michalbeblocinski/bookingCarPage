import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "..//../assets/logo.png";
import InputWithoutValidation from "../../components/form/inputWithoutValidation/inputWithoutValidation";



const LoginPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const validate = Yup.object({
    email: Yup.string().email(),
    password: Yup.string(),
  });

  return (
    <Container className="container d-flex vh-100">
      <Row className="m-auto align-self-center col-12 col-md-10 col-xxl-8">
        <div className="card p-5 pb-4">
          <img src={logo} alt="logo" width="144" height="124" />
          <h2 className="h2 my-3 fw-normal">Please login</h2>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              setMessage("");
              setLoading(true);
            }}
            validationSchema={validate}
          >
            <Form>
              <InputWithoutValidation
                type="email"
                label="Email address"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                required
              />
              <br />
              <InputWithoutValidation
                label="Password"
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                autoComplete="on"
                maxLength={64}
                required
              ></InputWithoutValidation>
              <p className="my-2 text-center">
                You don't have an account?
                <Link
                  to="/register"
                  className="ms-1 text-decoration-underline text-nowrap"
                >
                  Sing up
                </Link>
              </p>
              <button className="w-100 btn btn-lg btn-dark" type="submit">
                Sign in
              </button>
            </Form>
          </Formik>
          
        </div>
      </Row>
    </Container>
  );
};
export default LoginPanel;
