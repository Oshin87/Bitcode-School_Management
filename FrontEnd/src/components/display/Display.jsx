import Dashboard from "./Dashboard";
import "./display.css";
import Admin from "./Admin";

function Display({ user }) {
  const { userType, email } = user;

  const student = {
    name: email || "John Doe",
    grade: "10th",
    assignments: 5,
    fees: 2000,
    results: "A",
  };

  return (
    <div className="display-page">
      <h1>Welcome {email ? email : "User"}</h1>
      <h2>
        You are logged in as{" "}
        {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : "Guest"}
      </h2>

      {userType === "student" && <Dashboard student={student} />}
      {userType === "admin" && <Admin />}
    </div>
  );
}

export default Display;
