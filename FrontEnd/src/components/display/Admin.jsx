import "./Admin.css";

function Admin() {
  return (
    <div className="admin-dashboard-cards">
      <div className="admin-card">
        <h3>Manage Students</h3>
        <p>Add, update, or remove student records.</p>
      </div>

      <div className="admin-card">
        <h3>Manage Staff</h3>
        <p>Manage teachers, staff roles, and schedules.</p>
      </div>

      <div className="admin-card">
        <h3>School Operations</h3>
        <p>Oversee school activities, events, and resources.</p>
      </div>
    </div>
  );
}

export default Admin;
