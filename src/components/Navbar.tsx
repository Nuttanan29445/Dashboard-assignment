import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import UseAuthContext from "../hooks/use-auth-context";

const Navbar = () => {
  const { signOut, username } = UseAuthContext();
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="absolute w-full h-fit flex justify-between items-center px-3 bg-[#857d6b]">
      <div className="flex items-center">
        <img src={Logo} alt="" className="w-14" />
        <div className="font-semibold text-white">{username}</div>
      </div>

      <button
        onClick={handleSignout}
        className="p-2 bg-[#C96868] rounded-md text-white font-normal h-fit w-fit hover:bg-[#814343]"
      >
        Sign out
      </button>
    </nav>
  );
};

export default Navbar;
