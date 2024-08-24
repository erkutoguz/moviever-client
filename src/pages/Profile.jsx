/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Avatar } from "@nextui-org/react";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { capitalizeText } from "../utils/textFormatter";

const Profile = () => {
  const { profileUsername } = useParams();
  const { fetchAnotherUserProfile } = useAppContext();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    fetchAnotherUserProfile(profileUsername).then((res) => {
      setUserDetails(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="mt-14 px-10 flex flex-col min-h-[calc(100vh-450px)]  md:flex-row md:gap-10 lg:justify-center border rounded-2xl border-textColor">
        <div className="flex text-textColor  items-center flex-col md:w-full lg:max-w-[550px] mt-8 gap-6">
          {userDetails && (
            <Avatar
              aria-label="change-profile-button"
              name={userDetails.username}
              as="button"
              className={`transition-transform w-24 h-24 text-large `}
              color="secondary"
              isBordered
              src={userDetails.profilePictureUrl}
            />
          )}
          <p className="text-textColor">{userDetails.username}</p>
        </div>

        <div className=" flex text-textColor flex-col md:w-full lg:max-w-[550px] mt-8 gap-6">
          <div className="name text-textColor flex flex-col gap-1">
            <p className="text-sm font-medium">Full Name</p>
            <p>
              {userDetails.firstname} {userDetails.lastname}
            </p>
          </div>
          <div className="about text-textColor flex flex-col gap-1">
            <p className="text-sm font-medium">About Me</p>
            <p>{userDetails.aboutMe}</p>
          </div>
          <div className="flex flex-col mb-8">
            <p className="text-sm font-medium">My Favourite Categories</p>
            <div className="flex flex-col gap-2 flex-wrap mt-2">
              {userDetails.favouriteCategories &&
                userDetails.favouriteCategories.map((c, i) => {
                  return (
                    <Link
                      to={`/movies/category/${c}`}
                      className="underline"
                      key={i}
                    >
                      {capitalizeText(c)}
                    </Link>
                  );
                })}
            </div>
            {!userDetails.favouriteCategories && (
              <p>There is nothing here yet</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
