import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../hooks/use-auth-context";

const SigninForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = UseAuthContext();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = signIn(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[500px] justify-center">
      <h1 className="text-3xl font-semibold text-center">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        {error !== "" ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {error}
          </div>
        ) : null}
        <button
          type="submit"
          className="p-3 bg-[#295F98] text-white rounded-lg hover:bg-[#19395c]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
