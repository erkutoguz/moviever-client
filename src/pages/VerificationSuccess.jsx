import { Link } from "react-router-dom";

const VerificationSuccess = () => {
  return (
    <div className="w-full min-h-screen bg-lightGray flex justify-center items-center">
      <div className="container flex flex-col items-center w-full lg:w-1/2 xl:w-1/4 px-6 h-[500px] bg-darkBlue text-white rounded-lg shadow-lg justify-center text-center gap-4">
        <div className="brand w-26  border-2 border-brandColor px-4 py-2 rounded-xl ">
          <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
        </div>
        <p className="text-2xl font-semibold mb-4">
          Verification Success. Welcome!
        </p>
        <Link
          to="/sign-in"
          className="mt-4 px-6 py-2 bg-btnColor text-white font-semibold rounded-lg shadow-md hover:bg-lightBlueHover transition duration-300 ease-in-out"
        >
          {"Let's Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;
