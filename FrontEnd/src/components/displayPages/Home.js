import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const images = [img1, img2, img3];

function Home() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const slider = setInterval(() => {

      setIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(slider);

  }, []);

  return (
    <div className="home">


      <section className="hero-section">

        <img
          src={images[index]}
          alt="school"
          className="hero-image"
        />

        <div className="overlay">

          <h1>Welcome To OSHIN SCHOOL</h1>

          <p>
            Building bright futures with quality education and discipline.
          </p>

          <Link to="/admission" className="hero-btn">
            Apply Now
          </Link>

        </div>

      </section>


      <section className="cards-section">

        <div className="card">
          <h2>Admissions</h2>
          <p>Apply for new admissions online easily.</p>

          <Link to="/admission" className="card-btn">
            Learn More
          </Link>
        </div>

        <div className="card">
          <h2>Achievements</h2>
          <p>Explore school achievements and student success stories.</p>

          <Link to="/achievements" className="card-btn">
            View
          </Link>
        </div>

        <div className="card">
          <h2>Faculty</h2>
          <p>Experienced teachers and excellent guidance.</p>
        </div>

        <div className="card">
          <h2>Sports</h2>
          <p>Indoor and outdoor sports activities available.</p>
        </div>

        <div className="card">
          <h2>Library</h2>
          <p>Modern digital library with thousands of books.</p>
        </div>

      </section>

    </div>
  )
}

export default Home;