import { useState } from "react";
import useAuth from "../../hooks/useAuth"
import API from "../../utils/api";

const DangerZone = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }

    if (!window.confirm("Are you absolutely sure? This cannot be undone!")) {
      return;
    }

    setIsDeleting(true);
    
    try {
     const res = await API.delete('/settings/account');
     const data = res.data;
      if (data.success) {
        alert("Account deleted successfully");
        await logout();
        // Redirect to home page
      } else {
        alert("Failed to delete account: " + data.message);
      }
    } catch (error) {
      console.error("Account deletion error:", error);
      alert("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-start mb-2 ">
      <h2 className="font-bold mb-2">Delete Account</h2>
      <p className="warning">
        <strong>Warning:</strong> This action is permanent and cannot be undone. 
        All your data, including your profile and links, will be permanently deleted.
      </p>
      
      <div className="gap-x-2 mt-5">
        <p>To confirm, type <strong>DELETE</strong> in the box below:</p>
        <input
        className="rounded-xl px-1 py-1 text-sm"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE to confirm"
        />
      </div>
      
      <button 
        onClick={handleDeleteAccount}
        disabled={isDeleting || confirmText !== "DELETE"}
      //  className="delete-btn"
        className="delete-button"
      >
        {isDeleting ? "Deleting..." : "Permanently Delete Account"}
      </button>
    </div>
  );
};

export default DangerZone;