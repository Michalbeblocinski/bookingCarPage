
import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,  } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input";
import FormButton from "../formButton/formButton";
import { useNavigate } from "react-router";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert("Password do not match")
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(
        email, 
        password
        )

        await createUserDocumentFromAuth(user, {displayName})
        resetFormFields();
        navigate('/car-rental-froncik')
    } catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      } else {
        console.log(error)
      }
      
    }
  }

  return (
    <div>
      
        <form onSubmit={handleSubmit}>
          
          <FormInput
            label="Display name"
            type="text"
            onChange={handleChange}
            name="displayName"
            value={displayName}
            required
          />

          
          <FormInput
            label="Email"
            type="email"
            onChange={handleChange}
            name="email"
            value={email}
            required
          />

         
          <FormInput
            label="Password"
            type="password"
            onChange={handleChange}
            name="password"
            value={password}
            required
          />

          
          <FormInput
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            required
          />
          <FormButton buttonType='normal' type="submit">Sign Up</FormButton>
        </form>
    </div>
  );
}

export default SignUpForm;
