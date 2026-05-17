import "./achivements.css";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

function Achivements() {

  return (
    <div className="achievements-page">


      <div className="achievements-hero">

        <div className="hero-overlay">

          <h1>Our Achievements</h1>

          <p>
            Celebrating excellence in academics, sports,
            cultural activities, and student success.
          </p>

        </div>

      </div>


      <div className="achievements-container">

        <div className="achievement-card">

          <img src={img1} alt="Academic Achievement" />

          <div className="achievement-content">

            <h2>Academic Excellence</h2>

            <p>
              Our students consistently achieve top ranks in board
              examinations with outstanding academic performance.
            </p>

          </div>

        </div>

        <div className="achievement-card">

          <img src={img2} alt="Sports Achievement" />

          <div className="achievement-content">

            <h2>Sports Championship</h2>

            <p>
              Students have won district and state-level championships
              in football, basketball, and athletics competitions.
            </p>

          </div>

        </div>

        <div className="achievement-card">

          <img src={img3} alt="Cultural Achievement" />

          <div className="achievement-content">

            <h2>Cultural Activities</h2>

            <p>
              Our talented students actively participate and win prizes
              in dance, music, drama, and art competitions.
            </p>

          </div>

        </div>

      </div>


      <div className="stats-section">

        <div className="stat-box">
          <h2>5000+</h2>
          <p>Successful Students</p>
        </div>

        <div className="stat-box">
          <h2>100+</h2>
          <p>Awards Won</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Expert Teachers</p>
        </div>

        <div className="stat-box">
          <h2>25+</h2>
          <p>Years of Excellence</p>
        </div>

      </div>

    </div>
  )
}

export default Achivements;