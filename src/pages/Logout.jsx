import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/sign-in");
    } else {
      const timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [navigate, countdown]);

  return (
    <div className="w-full min-h-screen bg-lightGray flex justify-center items-center">
      <div className="container flex flex-col items-center w-full lg:w-1/2 xl:w-1/4 px-6 h-[500px] bg-darkBlue text-white rounded-lg shadow-lg justify-center text-center gap-4">
        <div className="brand w-26 border-2 border-brandColor px-4 py-2 rounded-xl">
          <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
        </div>
        <p className="text-2xl font-semibold mb-4">
          Logout Successful. Goodbye!
        </p>
        <p className="text-lg">
          You will be redirected to the sign-in page in{" "}
          <span className="text-xl ">{countdown}</span>s.
        </p>
      </div>
    </div>
  );
};

export default Logout;
