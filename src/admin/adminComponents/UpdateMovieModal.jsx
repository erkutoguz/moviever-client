/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import { useAppContext } from "../../context/appContext";
import { capitalizeText } from "../../utils/textFormatter";
import ChangeMoviePoster from "./ChangeMoviePoster";

const UpdateMovieModal = ({ movieId }) => {
  const { categories, fetchMovieDetailsWithMovieId, updateMovie } =
    useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieDetails, setMovieDetails] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [director, setDirector] = useState();
  const [selectedCategories, setSelectedCategories] = useState(
    movieDetails.categories
  );
  const [rating, setRating] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [poster, setPoster] = useState();
  const [releaseDate, setReleaseDate] = useState();

  useEffect(() => {
    fetchMovieDetailsWithMovieId(movieId).then((res) => {
      setMovieDetails(res.data);
      console.log(res.data);

      setSelectedCategories(res.data.categories.map((c) => c.categoryType));
    });
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("title", title || movieDetails.title);
    formData.append(
      "releaseYear",
      (releaseDate && parseInt(releaseDate.substring(0, 4))) ||
        movieDetails.releaseYear
    );
    formData.append("director", director || movieDetails.director);
    formData.append("description", description || movieDetails.description);
    formData.append("trailerUrl", trailerUrl || movieDetails.trailerUrl);
    formData.append("rating", parseFloat(rating) || movieDetails.rating);

    formData.append("poster", poster);
    const cats = [];
    selectedCategories.forEach((c) => {
      cats.push(c);
    });
    formData.append("categories", JSON.stringify(cats));
    return formData;
  };

  return (
    <div>
      <Button
        aria-label="update-movie-button"
        className="bg-transparent"
        onPress={onOpen}
      >
        <EditIcon className="w-5" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement={"center"}
      >
        <ModalContent className="text-textColor">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Movie
              </ModalHeader>
              {movieDetails && (
                <ModalBody>
                  <div className="flex justify-center">
                    <ChangeMoviePoster
                      pictureUrl={movieDetails.pictureUrl}
                      setPoster={setPoster}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium "
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder={movieDetails.title}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium "
                    >
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
                    <label
                      htmlFor="director"
                      className="block text-sm font-medium "
                    >
                      Director
                    </label>
                    <input
                      type="text"
                      id="director"
                      name="director"
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      placeholder={movieDetails.director}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="releaseDate"
                      className="block text-sm font-medium "
                    >
                      Release Year
                    </label>
                    <input
                      type="date"
                      id="releaseDate"
                      name="releaseDate"
                      placeholder={movieDetails.releaseYear}
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium "
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="descriptin"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={movieDetails.description}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium "
                    >
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
                      defaultValue={movieDetails.rating}
                      className="max-w-md text-textColor th"
                    />
                  </div>
                  <div className="pt-5">
                    <label
                      htmlFor="trailerUrl"
                      className="block text-sm font-medium "
                    >
                      Trailer Url
                    </label>
                    <input
                      type="text"
                      id="trailerUrl"
                      name="trailerUrl"
                      value={trailerUrl}
                      onChange={(e) => setTrailerUrl(e.target.value)}
                      placeholder={movieDetails.trailerUrl}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </ModalBody>
              )}
              <ModalFooter>
                <Button
                  color="danger"
                  aria-label="close-modal-button"
                  variant="light"
                  onPress={() => {
                    setTitle("");
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    const formdata = createFormData();
                    updateMovie(formdata, movieId)
                      .then((res) => {
                        console.log(res);

                        setShowPopup(true);
                        setTitle("");
                        setReleaseDate("");
                        setDirector("");
                        setRating("");
                        setDescription("");
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

                    onClose();
                  }}
                  aria-label="open-modal-button"
                >
                  Update Movie
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {showPopup && (
        <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-green-500 text-white p-4 rounded shadow-lg">
          <p>Movie successfully updated!</p>
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-24 z-50 right-0 sm:right-2 md:right-4 xl:right-8 bg-red-500 text-white p-4 rounded shadow-lg">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateMovieModal;
