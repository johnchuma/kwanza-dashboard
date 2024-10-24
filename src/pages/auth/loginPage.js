import { useState } from "react";
import { sendCode } from "../../controllers/authController";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-background  flex justify-center items-center text-dark">
      <div className="w-8/12 2xl:w-5/12 rounded-2xl bg-white flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const identifier = e.target.identifier.value;
            let email = null;
            let phone = null;
            if (identifier.includes("@")) {
              email = identifier;
            } else {
              phone = identifier;
            }
            setLoading(true);
            const payload = {
              email: email && email.trim(),
              phone: phone && phone.trim(),
            };
            "".trim();
            sendCode(payload)
              .then((response) => {
                setLoading(false);
                toast.success("Sent successfully");
                navigate(`/confirm/${email || phone}`);
              })
              .catch((e) => {
                setLoading(false);
                const message = e.response.data.message;
                toast.error(message);
              });
          }}
          className="w-6/12  flex flex-col items-start px-10 justify-center"
        >
          <h1 className="font-bold text-3xl mb-2">Welcome Back</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            Enter your credentials to login
          </p>
          <div className="space-y-2 mt-12 w-full">
            <div className="flex flex-col space-y-2 w-full">
              <label>Email/Phone number</label>
              <input
                required
                name="identifier"
                className="input-style"
                placeholder="Enter email/phone number"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary py-3 transition-all w-full font-semibold rounded-lg mt-4 text-white hover:bg-opacity-85  "
          >
            {Loading ? "Sending verification code..." : "Continue"}
          </button>
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

export default LoginPage;
