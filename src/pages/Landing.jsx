import { Divider } from "@nextui-org/react";
import Features from "../components/layout/Features";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import LandingNavbar from "../components/layout/LandingNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

function Landing() {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div className="flex justify-center items-center flex-col">
      <LandingNavbar />
      <Hero />
      <Features />
      <Divider className="my-4" />

      <Footer />
    </div>
  );
}

export default Landing;
