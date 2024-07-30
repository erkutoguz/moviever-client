/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function LayoutLink({ text, to }) {
  const navigate = useNavigate();
  return (
    <div className="mt-8 lg:min-w-[700px] lg:max-w-[980px] lg:px-0 md:w-full md:px-6 sm:min-w-[675px]  px-6  flex sm:px-0">
      <p
        className="font-semibold text-dark text-lg md:text-xl underline hover:cursor-pointer"
        onClick={() => {
          navigate(to);
        }}
      >
        {text} {"->"}
      </p>
    </div>
  );
}

export default LayoutLink;
