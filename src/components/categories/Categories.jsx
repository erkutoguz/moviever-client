import { Button } from "@nextui-org/react";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const { categories, fetchCategories } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-8 flex flex-col justify-center items-center gap-2">
      <p className="font-semibold text-textColor text-lg md:text-xl text-center">
        Discover Categories
      </p>
      <div className="flex flex-wrap gap-2 justify-center items-center md:max-w-[675px] lg:max-w-[900px] ">
        <Button
          className="bg-primary-200"
          aria-label="all-movies-button"
          onPress={() => {
            return navigate(`/movies/category/${"ALL"}`);
          }}
        >
          ALL
        </Button>
        {categories &&
          categories.length > 0 &&
          categories.map((c, i) => {
            let text = c.categoryType;
            if (text.includes("_")) {
              text = text.replace("_", " ");
            }
            return (
              <Button
                key={i}
                className="bg-primary-200"
                aria-label="category-movies-button"
                onPress={() => {
                  return navigate(`/movies/category/${c.categoryType}`);
                }}
              >
                {text}
              </Button>
            );
          })}
      </div>
    </div>
  );
}

export default Categories;
