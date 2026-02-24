import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from "./components/CustomCursor";


export default function App() {
  return (
    <div className="gradient text-white">
      <CustomCursor/>
      <ParticlesBackground/>


      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}
