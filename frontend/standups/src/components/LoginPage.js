import React from "react";

function LoginPage() {
  return (
    <div className="Login-Button">
      <a href="http://localhost:5000/api/auth">
        <button>Sign in with Discord</button>
      </a>
    </div>
  );
}

export default LoginPage;
