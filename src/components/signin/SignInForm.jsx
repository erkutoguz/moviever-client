import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { OpenEye } from "../../assets/icons/OpenEye";
import { CloseEye } from "../../assets/icons/CloseEye";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const { login, isAuthenticated, isLoading, errMessage } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!isVisible);
  };
  const changeUsername = (e) => {
    setUsername(e.target.value);
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

    if (!password) {
      errors.password = "Password cannot be empty";
    } else if (password.length < 3) {
      errors.password = "Password cannot be shorter than 3 chars";
    } else if (password.length > 25) {
      errors.password = "Password cannot be longer than 25 chars";
    }

    setUsernameErr(errors.username || "");
    setPasswordErr(errors.password || "");

    if (Object.keys(errors).length === 0) {
      login(username, password);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center gap-y-4 py-10">
      <h3 className="text-textColor text-2xl font-bold tracking-wide">
        Sign In
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

      <Button
        className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
        onPress={() => {
          validateAndSubmit();
        }}
        aria-label="sign-in-button"
        isDisabled={isLoading}
      >
        Sign In
      </Button>
    </div>
  );
}

export default SignInForm;
