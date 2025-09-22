import { useState } from "react";
import Account from "../components/settings/Account";
import DangerZone from "../components/settings/DangerZone";
import ProfileView from "../components/settings/ProfileView"
import useAuth from "../hooks/useAuth";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const {user}  =  useAuth();
  const currentUser = user?.username || localStorage.getItem("username");

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div
          className={`settings-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </div>

        <div
          className={`settings-tab ${activeTab === "danger" ? "active" : ""}`}
          onClick={() => setActiveTab("danger")}
        >
          Danger Zone
        </div>

        <div
          className={`settings-tab ${
            activeTab === "profile-view" ? "active" : ""
          }`}
          onClick={() => setActiveTab("profile-view")}
        >
          Profile View
        </div>
      </div>
      <div className="settings-content">
        {activeTab === "account" && <Account />}
        {activeTab === "danger" && <DangerZone />}
        {activeTab === "profile-view" && <ProfileView username={currentUser} /> }
      </div>
    </div>
  );
};

export default Settings;
