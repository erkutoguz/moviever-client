/* eslint-disable react/no-unescaped-entities */
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

function About() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header />
      <div className="w-full bg-lightGray flex flex-col items-center">
        <div className="container flex flex-col items-center w-full lg:w-2/3 xl:w-1/2 px-6 py-12 bg-darkBlue text-white rounded-lg shadow-lg mt-12">
          <div className="brand w-26 border-2 border-brandColor px-4 py-2 rounded-xl mb-6">
            <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">About Us</h1>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Welcome to Moviever, your number one source for all movie reviews
            and ratings. We're dedicated to providing you the very best of film
            reviews, with an emphasis on user experience, reliability, and
            in-depth analysis.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Founded in 2024 by <span className="font-semibold">Erkut Oğuz</span>
            , Moviever has come a long way from its beginnings in{" "}
            <span className="font-semibold">Antalya/TURKEY</span>. When{" "}
            <span className="font-semibold">Erkut Oğuz</span> first started out,
            his passion for movies drove them to start their own business.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            We hope you enjoy our reviews as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Sincerely,
            <br />
            Erkut Oğuz
          </p>
          <a
            href="mailto:erkutoguz.eo@gmail.com"
            className="mt-4 px-6 py-2 bg-btnColor text-white font-semibold rounded-lg shadow-md hover:bg-lightBlueHover transition duration-300 ease-in-out"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
