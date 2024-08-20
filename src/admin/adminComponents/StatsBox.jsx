/* eslint-disable react/prop-types */
const StatsBox = ({ icon, label, count }) => {
  // hover:w-[170px] hover:sm:w-[190px] hover:xl:w-[220px] hover:h-[135px]
  return (
    <div className="gap-4 p-4 duration-300 bg-sidebarBg h-full flex flex-col sm:flex-row justify-center items-center text-textColor">
      {icon}
      <div className=" flex flex-col justify-center items-center">
        <p>{label}</p>
        <p className="text-2xl">{count}</p>
      </div>
    </div>
  );
};

export default StatsBox;
