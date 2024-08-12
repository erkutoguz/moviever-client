import { Link } from "react-router-dom";
import LandingNavbar from "../components/layout/LandingNavbar";
import RegisterForm from "../components/signin/RegisterForm";
function Register() {
  return (
    <div className="flex  items-center flex-col min-h-svh text-textColor">
      <LandingNavbar />
      <div className="brand border-2 border-brandColor px-4 py-2 rounded-xl mt-20">
        <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
      </div>
      <RegisterForm />
      <div className="text-color">
        {"Have an account?"}{" "}
        <Link to={"/sign-in"} className="text-brandColor">
          Sign In
        </Link>
      </div>
      <p className="text-color absolute bottom-10">
        © 2024 Moviever. All Rights Reserved.
      </p>
    </div>
  );
}

export default Register;
