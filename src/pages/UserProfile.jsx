/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Textarea } from "@nextui-org/react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeProfileModal from "../components/common/ChangeProfileModal";

const UserProfile = () => {
  const { fetchProfile, updateProfile } = useAppContext();
  const [userDetails, setUserDetails] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [about, setAbout] = useState("");

  const navigate = useNavigate();
  const updateUserProfile = () => {
    const data = { firstname, lastname, about };

    updateProfile(data);
  };
  useEffect(() => {
    fetchProfile().then((res) => {
      const data = res.data;
      setUserDetails(data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setAbout(data.about);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="profile mt-8 w-3/4 flex flex-col md:flex-row md:gap-10 lg:justify-center">
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
            </div>
            <div className="field">
              <Input
                placeholder="Lastname"
                label="Lastname"
                value={lastname}
                variant="bordered"
                onChange={(e) => setLastname(e.target.value)}
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
