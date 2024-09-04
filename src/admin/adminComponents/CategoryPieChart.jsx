/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const CategoryPieChart = () => {
  const [chartData, setChartData] = useState({});
  const { fetchMovieCountForEachCategory } = useAppContext();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovieCountForEachCategory().then((res) => {
      console.log(res);

      setChartData({
        labels: res.data.map((d) => d.categoryName),
        datasets: [
          {
            data: res.data.map((d) => d.movieCount),
            backgroundColor: [
              "#FF4136", // ACTION
              "#FFDC00", // COMEDY
              "#FF851B", // DRAMA
              "#85144b", // HORROR
              "#B10DC9", // HISTORY
              "#111111", // MYSTERY
              "#FF69B4", // ROMANCE
              "#0074D9", // SCIENCE_FICTION
              "#3D9970", // THRILLER
              "#FF851B", // ANIMATION
              "#39CCCC", // FANTASY
              "#AAAAAA", // DOCUMENTARY
              "#2ECC40", // ADVENTURE
              "#2E2D88", // CRIME
              "#FF77C3", // MUSIC
              "#DDDDDD", // OTHER
              "#FFDD00", // FAMILY
            ],
            borderWidth: 1,
          },
        ],
      });
      setLoading(true);
    });
  }, []);
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  return (
    <div className=" flex justify-center w-full text-textColor bg-sidebarBg p-3">
      {isLoading && <Pie data={chartData} options={options} />}
    </div>
  );
};

export default CategoryPieChart;
