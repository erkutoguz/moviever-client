/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Textarea } from "@nextui-org/react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeProfileModal from "../components/common/ChangeProfileModal";
import { OpenEye } from "../assets/icons/OpenEye";
import { CloseEye } from "../assets/icons/CloseEye";

const UserProfile = () => {
  const { fetchProfile, updateProfile } = useAppContext();
  const [userDetails, setUserDetails] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [about, setAbout] = useState("");
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  const navigate = useNavigate();
  const updateUserProfile = () => {
    const data = { firstname, lastname, password, about };
    if (!firstname) {
      setFirstnameError("First name can not be empty");
      setSuccessMessage("");
    }
    if (!lastname) {
      setLastnameError("Last name can not be empty");
      setSuccessMessage("");
    }
    if (!password) {
      setPasswordError("Password can not be empty");
      setSuccessMessage("");
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords does not match");
      setSuccessMessage("");
    }

    if (firstname && lastname && password && password === confirmPassword) {
      updateProfile(data)
        .then((res) => {
          setSuccessMessage(res.data);
          setErrorMessage("");
          setFirstnameError("");
          setLastnameError("");
          setPasswordError("");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    }
  };
  useEffect(() => {
    fetchProfile().then((res) => {
      const data = res.data;
      console.log(res.data);
      setUserDetails(data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setAbout(data.about);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="profile mt-8 w-3/4 flex flex-col min-h-[calc(100vh-450px)] md:flex-row md:gap-10 lg:justify-center">
        <div className="left-profile py-8 border rounded-lg md:px-8 flex flex-col justify-center items-center">
          <ChangeProfileModal />

          <div className="profile-buttons w-full flex flex-col justify-center items-center my-8 gap-4">
            <Button
              className="w-52 py-2 px-4 bg-brandColor text-white rounded-lg shadow-md hover:bg-brandColorHover transition duration-300 ease-in-out"
              aria-label="edit-profile"
              disabled
            >
              Edit Profile
            </Button>
            <Button
              aria-label="go-watchlist"
              className="w-52 py-2 px-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-dangerColorHover transition duration-300 ease-in-out"
              onPress={() => navigate("/watchlists")}
            >
              My Watchlists
            </Button>
          </div>
        </div>
        {userDetails && (
          <div className="right-profile flex text-textColor flex-col md:w-full lg:max-w-[550px] mt-8 gap-6">
            <div className="field">
              <Input
                placeholder="Firstname"
                value={firstname}
                label="Firstname"
                variant="bordered"
                onChange={(e) => setFirstname(e.target.value)}
              />
              {firstnameError && (
                <p className=" text-center mt-2 text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
                  {firstnameError}
                </p>
              )}
            </div>
            <div className="field">
              <Input
                placeholder="Lastname"
                label="Lastname"
                value={lastname}
                variant="bordered"
                onChange={(e) => setLastname(e.target.value)}
              />
              {lastnameError && (
                <p className=" text-center mt-2 text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
                  {lastnameError}
                </p>
              )}
            </div>
            <div className="field">
              <Input
                label="Password"
                variant="bordered"
                placeholder="Password"
                classNames={{ input: "text-textColor" }}
                value={password}
                onValueChange={setPassword}
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
              />
              {passwordError && (
                <p className=" text-center mt-2 text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="field">
              <Input
                label="Confirm Password"
                variant="bordered"
                placeholder="Confirm Password"
                classNames={{ input: "text-textColor" }}
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                type={isVisible ? "text" : "password"}
              />
            </div>
            <div className="field">
              <Textarea
                label="About Me"
                variant="bordered"
                labelPlacement="inside"
                className=""
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <Button
              aria-label="save-profile-button"
              className="py-2 px-4 bg-brandColor text-white rounded-lg shadow-md hover:bg-brandColorHover transition duration-300 ease-in-out"
              onPress={updateUserProfile}
            >
              Save Profile
            </Button>
            {errorMessage && (
              <p className=" text-center mt-2 text-red-600 bg-red-100 p-4 border border-red-300 rounded-md shadow-sm">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className=" text-center mt-2 text-green-600 bg-green-100 p-4 border border-green-300 rounded-md shadow-sm">
                {successMessage}
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
