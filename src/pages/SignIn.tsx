import SigninForm from "../components/SigninForm";

const SignIn = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#EAE4DD]">
      <div className="w-[80%] max-w-5xl flex rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="flex flex-col justify-center p-10 w-full sm:w-1/2">
          <SigninForm />
        </div>
        <div className="hidden sm:block w-1/2">
          <img
            src="https://images8.alphacoders.com/133/1337140.png"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
