import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Technologies from '../components/Technologies';
import Weather from '../components/Weather';

const Home = () => {
  return (
    <div id='home'>
      <Hero />
      <About />
      <Projects />
      <Technologies />
      <Contact />
      <div id='weather'>
      <Weather />
      </div>
    </div>
  );
};

export default Home;