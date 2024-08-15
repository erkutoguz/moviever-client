/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";

const CategoryPieChart = () => {
  const [categoryMovieCount, setCategoryMovieCount] = useState();
  const { fetchMovieCountForEachCategory } = useAppContext();
  const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#e78bfa"];

  useEffect(() => {
    fetchMovieCountForEachCategory().then((res) => {
      console.log(res.data);

      setCategoryMovieCount(
        res.data.map((d) => {
          return {
            title: d.categoryName,
            value: d.movieCount,
            color: "#E38627",
            label: d.categoryName,
          };
        })
      );
    });
  }, []);
  const labels = ["action", "fantasy", "horror", "thriller", "comedy"];
  const values = [10, 6, 2, 9, 5];
  const data = labels.map((label, index) => ({
    label,
    value: values[index],
  }));
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  let cumulativeValue = 0;
  return (
    <div className="w-full h-1/2 text-textColor">
      {categoryMovieCount && (
        <svg viewBox="0 0 32 32" className="w-64 h-64">
          {categoryMovieCount.map((slice, index) => {
            const startAngle = (cumulativeValue / total) * 360;
            const sliceAngle = (slice.value / total) * 360;
            cumulativeValue += slice.value;

            const x1 = 16 + 16 * Math.cos((Math.PI * startAngle) / 180);
            const y1 = 16 + 16 * Math.sin((Math.PI * startAngle) / 180);
            const x2 =
              16 + 16 * Math.cos((Math.PI * (startAngle + sliceAngle)) / 180);
            const y2 =
              16 + 16 * Math.sin((Math.PI * (startAngle + sliceAngle)) / 180);

            const largeArcFlag = sliceAngle > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M16,16 L${x1},${y1} A16,16 0 ${largeArcFlag},1 ${x2},${y2} z`}
                fill={colors[index]}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default CategoryPieChart;
