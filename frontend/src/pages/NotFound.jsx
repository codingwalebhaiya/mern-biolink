import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>404 - Not Found</h2>
      <p>
        <Link className="font-bold" to="/">Go back to Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
