import { useState } from "react";
import { Link } from "react-router-dom";
import FormMessage from "../formMessage/formMessage";
import { useField } from "formik";
import zxcvbn from "zxcvbn";

const RegisterPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "password" });
  const [showHide, setShowHide] = useState(false);

  const handleShowHide = () => {
    setShowHide((showHide) => !showHide);
  };

  const ChangeColor = () => ({
    width: `${num}%`,
    background: ProgressColor(),
  });

  const ProgressColor = () => {
    switch (result) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "darkgreen";
      default:
        return "none";
    }
  };

  const PasswordLevel = () => {
    if (meta.value.length === 0) {
      return "";
    } else {
      switch (result) {
        case 0:
          return "very week";
        case 1:
          return "week";
        case 2:
          return "medium";
        case 3:
          return "strong";
        case 4:
          return "very strong";
        default:
          return "none";
      }
    }
  };

  const result = zxcvbn(meta.value).score;
  const num = (result * 100) / 4;
  const message = PasswordLevel();

  return (
    <>
      <div className="form-floating">
        <input
          {...field}
          {...props}
          type={
            props.type === "password"
              ? showHide
                ? "text"
                : "password"
              : "text"
          }
          className={
            "form-control mt-3 " +
            (meta.value === "" ? null : meta.error ? "is-invalid" : "is-valid")
          }
        />
        <label htmlFor={props.name}>{label}</label>
        {props.type === "password" ? (
          <div>
            <label>
              <input
                className="mx-2 mt-1"
                type="checkbox"
                checked={showHide}
                onChange={handleShowHide}
              />
              {showHide ? "Hide " : "Show "}
              {props.placeholder.toString().toLowerCase()}
            </label>
          </div>
        ) : (
          ""
        )}
        <div className="progress mt-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={ChangeColor()}
            aria-label="progress-bar"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="d-flex m-2">
          <div className="me-auto">
            <div className="">Password requirements:</div>
            <ul>
              <li>
                <span
                  className={
                    meta.value.length >= 12 && meta.value.length <= 64
                      ? " text-decoration-line-through "
                      : " text-danger "
                  }
                >
                  The password should be 12-64 characters long
                </span>
                {meta.value.length >= 12 && meta.value.length <= 64
                  ? ` (fulfilled)`
                  : ``}
              </li>
            </ul>
            <FormMessage
              message={
                meta.error
                  ? `${meta.error} ${message}`
                  : meta.value.length === 0
                  ? null
                  : `Password is ${message}`
              }
            />
          </div>
          <div className="ms-auto">
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPasswordInput;
