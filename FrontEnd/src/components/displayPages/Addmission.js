import "./addmission.css";

function Addmission() {

    return (
        <div className="admission-page">


            <div className="admission-hero">

                <div className="admission-overlay">

                    <h1>Admissions Open 2026</h1>

                    <p>
                        Begin your child’s journey towards excellence,
                        knowledge, and success at OSHIN SCHOOL.
                    </p>

                </div>

            </div>


            <div className="admission-container">

                <div className="admission-info">

                    <h2>Why Choose OSHIN SCHOOL?</h2>

                    <p>
                        We provide high-quality education with experienced
                        teachers, modern classrooms, sports facilities,
                        and overall personality development programs.
                    </p>

                    <div className="features">

                        <div className="feature-card">
                            <h3>📚 Smart Education</h3>
                            <p>Modern teaching methods with digital classrooms.</p>
                        </div>

                        <div className="feature-card">
                            <h3>🏆 Achievements</h3>
                            <p>Excellent academic and sports performance every year.</p>
                        </div>

                        <div className="feature-card">
                            <h3>🚌 Transport</h3>
                            <p>Safe and reliable transport facilities for students.</p>
                        </div>

                        <div className="feature-card">
                            <h3>⚽ Sports & Activities</h3>
                            <p>Indoor and outdoor activities for holistic development.</p>
                        </div>

                    </div>

                </div>


                <div className="admission-form-container">

                    <h2>Admission Form</h2>

                    <form className="admission-form">

                        <input
                            type="text"
                            placeholder="Student Full Name"
                        />

                        <input
                            type="text"
                            placeholder="Parent Name"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                        <input
                            type="number"
                            placeholder="Mobile Number"
                        />

                        <input
                            type="text"
                            placeholder="Class Applying For"
                        />

                        <textarea
                            rows="4"
                            placeholder="Address"
                        ></textarea>

                        <button type="submit">
                            Submit Admission Form
                        </button>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Addmission;