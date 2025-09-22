import { NavLink } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
//import hero from "../../public/images/hero.svg";

const Home = () => {
    return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-y-5 ">
        <h1 className="font-bold text-center text-7xl ">
          Connect with <br /> world in{" "}
          <span className="text-green-700">one link</span>
        </h1>

        <div className="mt-5" >
          <NavLink to="/register" className="mt-5 bg-blue-500 text-white font-bold px-5 py-3 rounded-sm  cursor-pointer hover:bg-blue-600 transition-all duration-300  " >Get Started</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
