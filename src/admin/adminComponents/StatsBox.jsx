/* eslint-disable react/prop-types */
const StatsBox = ({ icon, label, count }) => {
  return (
    <div className="gap-4 hover:w-[170px] hover:sm:w-[190px] hover:xl:w-[220px] hover:h-[135px] duration-300 py-2 bg-sidebarBg w-[165px] sm:w-[180px] xl:w-[200px] h-32 flex flex-col sm:flex-row justify-center items-center text-textColor">
      {icon}
      <div className=" flex flex-col justify-center items-center">
        <p>{label}</p>
        <p className="text-2xl">{count}</p>
      </div>
    </div>
  );
};

export default StatsBox;
