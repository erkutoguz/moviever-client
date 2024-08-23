/* eslint-disable no-unused-vars */
import { useState } from "react";
import Footer from "../components/layout/Footer";
import { Button, Input } from "@nextui-org/react";
import LandingNavbar from "../components/layout/LandingNavbar";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { OpenEye } from "../assets/icons/OpenEye";
import { CloseEye } from "../assets/icons/CloseEye";

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validateNewPassword, setValidateNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { sendResetPassEmail, resetUserPassword } = useAppContext();
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  const handleSendResetPassEmail = () => {
    sendResetPassEmail(resetEmail)
      .then((res) => {
        setResetEmail("");
        setSuccessMessage("Check your email");
        setErrorMessage("");
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage(err.response.data.message);
      });
  };

  const handleResetPassword = () => {
    if (newPassword !== validateNewPassword) {
      setErrorMessage("Passwords does not match");
    } else {
      resetUserPassword(newPassword, searchParams.get("reset-password-token"))
        .then((res) => {
          setErrorMessage("");
          setSuccessMessage("Password successfully reset");
        })
        .catch((err) => {
          setErrorMessage(
            err.response.data.message + ". Please go back and try again."
          );
          setSuccessMessage("");
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <LandingNavbar />
      <div className="brand w-26 h-26 border-2 border-brandColor px-4 py-2 rounded-xl mt-20">
        <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
      </div>
      <h3 className="text-textColor text-2xl font-bold tracking-wide py-10">
        Reset Password
      </h3>
      {!searchParams.get("reset-password-token") ? (
        <div className="w-full bg-lightGray flex flex-col items-center h-[calc(100vh-550px)] ">
          <input
            type="text"
            className="py-2 pl-4 pr-4 text-textColor border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] sm:w-auto"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => {
              setResetEmail(e.target.value);
            }}
          />
          {errorMessage && (
            <p className=" text-center mt-4  text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-center mt-4 text-green-600 bg-green-100 p-4 border border-green-300 rounded-md shadow-sm">
              {successMessage}
            </p>
          )}
          <Button
            className="bg-btnColor mt-8 w-36 md:w-48 font-normal text-white  rounded-none text-base"
            aria-label="reset-password"
            onPress={handleSendResetPassEmail}
          >
            Send reset e-mail
          </Button>
          <Link to={"/sign-in"} className="text-textColor mt-4 text-sm">
            Go back
          </Link>
        </div>
      ) : (
        <div className="w-full bg-lightGray flex flex-col items-center h-[calc(100vh-550px)] gap-5">
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            classNames={{ input: "text-textColor" }}
            value={newPassword}
            onValueChange={setNewPassword}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <OpenEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <CloseEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Input
            label="Confirm Password"
            variant="bordered"
            placeholder="Confirm your password"
            classNames={{ input: "text-textColor" }}
            value={validateNewPassword}
            onValueChange={setValidateNewPassword}
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />

          {errorMessage && (
            <p className=" text-center  text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-center  text-green-600 bg-green-100 p-4 border border-green-300 rounded-md shadow-sm">
              {successMessage}
            </p>
          )}
          {successMessage && (
            <Button
              className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
              aria-label="go-to-sign-in"
              onPress={() => {
                navigate("/sign-in");
              }}
            >
              Go sign in
            </Button>
          )}
          {!successMessage && (
            <Button
              className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
              aria-label="reset-password"
              onPress={handleResetPassword}
            >
              Reset my password
            </Button>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ResetPassword;
