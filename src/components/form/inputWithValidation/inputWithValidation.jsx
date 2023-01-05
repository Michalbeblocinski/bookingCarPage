import { useState } from "react";
import { useField } from "formik";
import FormMessage from "../formMessage/formMessage";

const InputWithValidation = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props });
  const [showHide, setShowHide] = useState(false);

  const handleShowHide = () => {
    setShowHide((showHide) => !showHide);
  };

  return (
    <div className="form-floating">
      <input
        {...field}
        {...props}
        type={
          props.type === "password" ? (showHide ? "text" : "password") : "text"
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
            {showHide ? "Hide" : "Show"}{" "}
            {props.placeholder.toString().toLowerCase()}
          </label>
        </div>
      ) : (
        ""
      )}
      <FormMessage message={meta.error ? meta.error : null} />
    </div>
  );
};
export default InputWithValidation;
