import { useState } from "react";
import { sendCode } from "../../controllers/authController";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import TextForm from "../../components/textForm";
import { registerUser } from "../../controllers/userController";

const RegisterPage = () => {
  const [Loading, setLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-background  flex justify-center items-center text-dark">
      <div className="w-8/12 2xl:w-5/12 rounded-2xl bg-white flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              role: "publisher",
              name: e.target.name.value,
              email: e.target.email.value,
              phone: e.target.phone.value,
            };
            setLoading(true);
            registerUser(payload)
              .then((data) => {
                toast.success("Sent successfully");
                navigate(`/confirm/${payload.email}`);
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                const message = err.response.data.message;
                toast.error(message);
              });
          }}
          className="w-6/12  flex flex-col items-start px-10 justify-center"
        >
          <h1 className="font-bold text-3xl mb-2">Are you a publisher ?</h1>
          <p className="text-sm text-muted dark:text-white dark:text-opacity-50">
            Create a new publisher account
          </p>
          <div className="space-y-2 mt-12 w-full">
            <div className="flex flex-col space-y-2 w-full">
              <TextForm
                name={"name"}
                placeholder={"Enter full name"}
                label={"Full Name"}
              />
              <TextForm
                name={"email"}
                placeholder={"Enter email address"}
                label={"Email Address"}
              />
              <TextForm
                name={"phone"}
                placeholder={"Enter phone number"}
                label={"Phone number"}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary py-3 transition-all w-full font-semibold rounded-lg mt-4 text-white hover:bg-opacity-85  "
          >
            {Loading ? "Sending verification code..." : "Create an account"}
          </button>
          <div className="flex space-x-1 text-sm mt-2">
            <p>Already registered ?</p>
            <p
              onClick={() => {
                navigate("/login");
              }}
              className="text-primary cursor-pointer"
            >
              Login
            </p>
          </div>
        </form>
        <div className="w-6/12 px-12 bg-background rounded-2xl m-3 ">
          <div className="py-32">
            <img className="" src="/loginn.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
