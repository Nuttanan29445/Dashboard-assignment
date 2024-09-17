interface WelcomeMessageProps {
  name: string | null;
  onClick: () => void;
}
import Logo from "../assets/Logo.png";
const WelcomeMessage = ({ name, onClick }: WelcomeMessageProps) => {
  const techStack = ["ReactJs", "Typescript", "TailwindCSS"];
  return (
    <div className="flex flex-col gap-3 items-center">
      <img src={Logo} alt="Logo" className="w-52" />
      <div className="font-semibold text-2xl flex flex-col items-center">
        <div className="flex">
          Hello {name} <div className="">&#128075;</div>
        </div>
        Welcome to my Dashboard page
      </div>
      <div className="text-center">
        This website is an assignment for the junior frontend developer
        position. <br />
        Designed and developed by Nuttanan Ruangpanich.
      </div>
      <div className="text-center flex gap-1">
        Tech Stack:{" "}
        {techStack.map((item) => {
          return (
            <div className="text-white bg-[#857d6b] px-2 rounded-lg" key={item}>
              {item}
            </div>
          );
        })}
      </div>
      <button
        onClick={onClick}
        className="p-2 bg-[#295F98] rounded-xl text-white font-normal h-fit w-fit mt-2 hover:bg-[#18385a]"
      >
        Get started
      </button>
    </div>
  );
};

export default WelcomeMessage;
