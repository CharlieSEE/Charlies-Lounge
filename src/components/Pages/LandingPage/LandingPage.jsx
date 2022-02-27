import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LandingPage;
