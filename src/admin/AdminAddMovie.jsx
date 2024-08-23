/* eslint-disable no-unused-vars */
import { Select, SelectItem, Slider } from "@nextui-org/react";
import { useAppContext } from "../context/appContext";
import { capitalizeText } from "../utils/textFormatter";
import { useState } from "react";

const AdminAddMovie = () => {
  const { categories, createMovie } = useAppContext();
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [poster, setPoster] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("releaseYear", parseInt(releaseDate.substring(0, 4)));
    formData.append("director", director);
    formData.append("trailerUrl", trailerUrl);
    formData.append("rating", parseFloat(rating));
    formData.append("poster", poster);
    const cats = [];
    selectedCategories.forEach((c) => {
      cats.push(c);
    });
    formData.append("categories", JSON.stringify(cats));

    createMovie(formData)
      .then((res) => {
        console.log(title);

        setShowPopup(true);
        setTitle("");
        setReleaseDate("");
        setDirector("");
        setRating("");
        setTrailerUrl("");
        setPoster(null);
        setSelectedCategories([]);
        setErrorMessage("");
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <div className="md:w-full max-w-lg text-textColor bg-sidebarBg p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add Movie</h1>

        <form className="space-y-5 " onSubmit={submitForm}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium ">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium ">
              Category
            </label>

            <Select
              placeholder="Select category"
              selectionMode="multiple"
              aria-label="select-category"
              selectedKeys={selectedCategories}
              onSelectionChange={setSelectedCategories}
              className="mt-1 text-textColor"
            >
              {categories &&
                categories.map((category) => (
                  <SelectItem
                    key={category.categoryType}
                    className="text-textColor"
                  >
                    {capitalizeText(category.categoryType)}
                  </SelectItem>
                ))}
            </Select>
          </div>
          <div>
            <label htmlFor="director" className="block text-sm font-medium ">
              Director
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="releaseDate" className="block text-sm font-medium ">
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="">
            <label htmlFor="rating" className="block text-sm font-medium ">
              Rating
            </label>
            <Slider
              aria-label="select-rating"
              showTooltip={true}
              step={0.1}
              formatOptions={{ style: "decimal" }}
              maxValue={10}
              minValue={0}
              value={rating}
              onChange={setRating}
              marks={[
                {
                  value: 0,
                  label: "Worst",
                },
                {
                  value: 2.5,
                  label: "Bad",
                },
                {
                  value: 5,
                  label: "Fair",
                },
                {
                  value: 7.5,
                  label: "Good",
                },
                {
                  value: 10,
                  label: "Perfect",
                },
              ]}
              color="secondary"
              defaultValue={5}
              className="max-w-md text-textColor th"
            />
          </div>

          <div className="pt-5">
            <label htmlFor="trailerUrl" className="block text-sm font-medium ">
              Trailer Url
            </label>
            <input
              type="text"
              id="trailerUrl"
              name="trailerUrl"
              value={trailerUrl}
              onChange={(e) => setTrailerUrl(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="pictureUrl" className="block text-sm font-medium ">
              Poster
            </label>
            <input
              type="file"
              id="pictureUrl"
              accept="image/png, image/gif, image/jpeg, image/webp"
              name="pictureUrl"
              onChange={(e) => setPoster(e.target.files[0])}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              aria-label="add-movie"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Movie
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-green-500 text-white p-4 rounded shadow-lg">
            <p>Movie successfully added!</p>
          </div>
        )}
        {errorMessage && (
          <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-red-500 text-white p-4 rounded shadow-lg">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddMovie;
