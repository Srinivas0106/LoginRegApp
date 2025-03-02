// Dashboard.jsx
import "react";
import "./assets/dashboard.css";
import PropTypes from "prop-types"; 
function Dashboard({ username }) {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard, {username}!</h1>
    </div>
  );
}
Dashboard.propTypes = { username: PropTypes.string.isRequired };  
export default Dashboard;
