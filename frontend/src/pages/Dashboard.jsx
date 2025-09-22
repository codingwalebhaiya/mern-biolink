import { useState } from "react";
import Profile from "./Profile";
import Links from "./Links";
import Settings from "./Settings";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");


  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "links":
        return <Links />;
      case "settings":
        return <Settings />;

      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar ">
      
    
          <NavLink
        className="flex flex-col items-start text-center ml-5 mb-2 font-bold hover:border-b-2 border-b-blue-700"
        to="/"
      >
        Home
      </NavLink>
     
       

        <div
          className={`sidebar-tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </div>
        <div
          className={`sidebar-tab ${activeTab === "links" ? "active" : ""}`}
          onClick={() => setActiveTab("links")}
        >
          Links
        </div>
        <div
          className={`sidebar-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </div>
      </div>
      <div className="dashboard-content">{renderTabContent()}</div>
    </div>

    
  );
};

export default Dashboard;
