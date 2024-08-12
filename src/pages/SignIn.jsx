import { Link } from "react-router-dom";
import LandingNavbar from "../components/layout/LandingNavbar";
import SignInForm from "../components/signin/SignInForm";
import "../index.css";

function SignIn() {
  return (
    <div className="flex items-center flex-col min-h-svh text-textColor">
      <LandingNavbar />
      <div className="brand w-26 h-26 border-2 border-brandColor px-4 py-2 rounded-xl mt-20">
        <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
      </div>
      <SignInForm />
      <div className="">
        {"Don't have an account?"}{" "}
        <Link to={"/register"} className="text-brandColor">
          Sign Up
        </Link>
      </div>
      <p className="absolute bottom-10 ">
        © 2024 Moviever. All Rights Reserved.
      </p>
    </div>
  );
}

export default SignIn;
