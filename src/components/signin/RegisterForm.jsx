import { useEffect, useState } from "react";
import { OpenEye } from "../../assets/icons/OpenEye";
import { CloseEye } from "../../assets/icons/CloseEye";
import { Button, Input } from "@nextui-org/react";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, isAuthenticated, isLoading, errMessage } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [passwordErr, setPasswordErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");

  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changePass = (e) => {
    setPassword(e.target.value);
  };

  const validateAndSubmit = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username cannot be empty";
    } else if (username.length < 3) {
      errors.username = "Username cannot be shorter than 3 chars";
    } else if (username.length > 25) {
      errors.username = "Username cannot be longer than 25 chars";
    }
    if (!email) {
      errors.email = "Email cannot be empty";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.email = "Invalid email";
    }

    if (!firstName) {
      errors.firstName = "First name cannot be empty";
    } else if (firstName.length < 3) {
      errors.firstName = "First name cannot be shorter than 3 chars";
    } else if (firstName.length > 25) {
      errors.firstName = "First name cannot be longer than 25 chars";
    }
    if (!lastName) {
      errors.lastName = "Last name cannot be empty";
    } else if (lastName.length < 3) {
      errors.lastName = "Last name cannot be shorter than 3 chars";
    } else if (lastName.length > 25) {
      errors.lastName = "Last name cannot be longer than 25 chars";
    }

    if (!password) {
      errors.password = "Password cannot be empty";
    } else if (password.length < 3) {
      errors.password = "Password cannot be shorter than 3 chars";
    } else if (password.length > 25) {
      errors.password = "Password cannot be longer than 25 chars";
    }

    setUsernameErr(errors.username || "");
    setPasswordErr(errors.password || "");
    setEmailErr(errors.email || "");
    setFirstNameErr(errors.firstName || "");
    setLastNameErr(errors.lastName || "");

    if (Object.keys(errors).length === 0) {
      register(username, email, password, firstName, lastName);
    }
  };
  return (
    <div className="container flex flex-col justify-center items-center gap-y-4 pt-10">
      <h3 className="text-darkBlue text-2xl font-bold tracking-wide">
        Register
      </h3>

      <p className="text-danger-600">{errMessage}</p>

      <fieldset className="w-80 flex flex-col items-center">
        <Input
          type="text"
          label="Username"
          variant="bordered"
          onChange={changeUsername}
        />
        <p className="text-danger-600 text-sm">
          {usernameErr && "*" + usernameErr}
        </p>
      </fieldset>

      <fieldset className="w-80 flex flex-col items-center">
        <Input
          label="Password"
          variant="bordered"
          onChange={changePass}
          endContent={
            <button
              className="focus:outline-none absolute top-1/3 right-2"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <OpenEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <CloseEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <p className="text-danger-600 text-sm">
          {passwordErr && "*" + passwordErr}
        </p>
      </fieldset>

      <fieldset className="w-80 flex flex-col items-center">
        <Input
          type="email"
          label="Email"
          variant="bordered"
          onChange={changeEmail}
        />
        <p className="text-danger-600 text-sm">{emailErr && "*" + emailErr}</p>
      </fieldset>

      <fieldset className="w-80 flex flex-col items-center">
        <Input
          type="text"
          label="First Name"
          variant="bordered"
          onChange={changeFirstName}
        />
        <p className="text-danger-600 text-sm">
          {firstNameErr && "*" + firstNameErr}
        </p>
      </fieldset>

      <fieldset className="w-80 flex flex-col items-center">
        <Input
          type="text"
          label="First Name"
          variant="bordered"
          onChange={changeLastName}
        />
        <p className="text-danger-600 text-sm">
          {lastNameErr && "*" + lastNameErr}
        </p>
      </fieldset>

      <Button
        className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
        onPress={() => {
          validateAndSubmit();
          console.log("hola");
        }}
        isDisabled={isLoading}
      >
        Register
      </Button>
    </div>
  );
}

export default RegisterForm;
