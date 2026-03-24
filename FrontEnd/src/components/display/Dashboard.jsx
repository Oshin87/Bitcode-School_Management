import "./Dashboard.css";

function Dashboard({ student }) {

  if (!student) {
    return (
      <div className="student-dashboard-page">
        <h2>No student data available</h2>
      </div>
    );
  }

  return (
    <div className="student-dashboard-page">
      <h1>Welcome, {student.name}</h1>
      <h2>Grade: {student.grade}</h2>

      <div className="student-dashboard-cards">
        <div className="dashboard-card">
          <h3>Assignments</h3>
          <p>{student.assignments}</p>
        </div>

        <div className="dashboard-card">
          <h3>Fees</h3>
          <p>₹{student.fees}</p>
        </div>

        <div className="dashboard-card">
          <h3>Results</h3>
          <p>{student.results}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
