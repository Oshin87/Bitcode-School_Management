import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const carouselImages = [img1, img2, img3];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section className="carousel-section">
        <img
          src={carouselImages[currentIndex]}
          alt="School Banner"
          className="carousel-image"
        />
        <div className="carousel-overlay">
          <h1>Welcome to ABC Public School</h1>
          <p>Your journey to knowledge and excellence starts here.</p>
          <Link to="/addmission" className="btn-primary">
            Apply for Admission
          </Link>
        </div>
      </section>

    <section className="home-cards">
      <div className="card">
        <h3>Transport</h3>
        <p>Safe and reliable transport facilities for our students.</p>
        <Link to="/transport" className="btn-secondary">
          Learn More
        </Link>
      </div>

      <div className="card">
        <h3>Login</h3>
        <p>Access your student or admin account securely.</p>
        <Link to="/login" className="btn-secondary">
          Login
        </Link>
      </div>

      <div className="card">
        <h3>Academics</h3>
        <p>Quality education with experienced teachers and modern curriculum.</p>
      </div>

      <div className="card">
        <h3>Library</h3>
        <p>Extensive collection of books and digital resources for learning.</p>
      </div>

      <div className="card">
        <h3>Sports</h3>
        <p>Facilities for football, basketball, swimming, and more.</p>
      </div>

      <div className="card">
        <h3>Events</h3>
        <p>Annual day, cultural events, and competitions for students.</p>
      </div>

      <div className="card">
        <h3>Cafeteria</h3>
        <p>Healthy meals and snacks served daily for students and staff.</p>
      </div>

      <div className="card">
        <h3>Contact Us</h3>
        <p>Reach out for inquiries, feedback, or support from our staff.</p>
        <Link to="/addmission" className="btn-secondary">
          Get in Touch
        </Link>
      </div>
    </section>

    </div>
  );
}

export default Home;