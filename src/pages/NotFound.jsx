import { Link } from "@nextui-org/react";

/* eslint-disable react/no-unescaped-entities */
const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-lightGray flex justify-center items-center">
      <div className="container flex flex-col items-center w-full lg:w-1/2 xl:w-1/4 px-6 h-[500px] bg-darkBlue text-white rounded-lg shadow-lg justify-center text-center gap-4">
        <div className="brand w-26 border-2 border-brandColor px-4 py-2 rounded-xl">
          <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
        </div>
        <p className="text-4xl font-semibold">404</p>
        <p className="text-2xl  mb-4">Sorry we don't have that page!</p>
        <Link href="/home" className="text-brandColor underline  text-xl">
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
