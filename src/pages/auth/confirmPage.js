import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { sendCode, verifyCode } from "../../controllers/authController";
import { saveTokens } from "../../utils/authStore";

const ConfirmPage = () => {
  const { identifier } = useParams();
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-background  flex justify-center items-center text-dark">
      <div className="w-8/12 2xl:w-5/12 rounded-2xl bg-white flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let email = null;
            let phone = null;
            if (identifier.includes("@")) {
              email = identifier;
            } else {
              phone = identifier;
            }
            setLoading(true);
            const payload = {
              email,
              phone,
              code: e.target.code.value,
            };
            verifyCode(payload)
              .then((response) => {
                setLoading(false);
                const token = response.data.body.tokens.ACCESS_TOKEN;
                toast.success("Logged in successfully");
                saveTokens(token);
                navigate("/");
                // navigate(`/confirm/${email || phone}`);
              })
              .catch((err) => {
                setLoading(false);
                e.target.code.value = "";
                const message = err.response.data.message;
                toast.error(message);
              });
          }}
          className="w-6/12 flex flex-col items-start px-10 justify-center"
        >
          <h1 className="font-bold text-3xl mb-2">Confirm Account</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Enter confirmation code we sent to{" "}
            <span className="font-bold">{identifier}</span>
          </p>
          <div className="space-y-2 mt-12 w-full">
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex justify-between">
                <label>Code</label>
                <div className="flex space-x-2 items-center">
                  {resend && (
                    <div className="size-3 border-2 rounded-full border-primary animate-spin border-t-transparent"></div>
                  )}
                  <p
                    onClick={() => {
                      let email = null;
                      let phone = null;
                      if (identifier.includes("@")) {
                        email = identifier;
                      } else {
                        phone = identifier;
                      }
                      setResend(true);
                      const payload = {
                        email,
                        phone,
                      };
                      sendCode(payload).then(() => {
                        setResend(false);
                        toast.success("Check your email for confirmation code");
                      });
                    }}
                    className="text-xs font-bold cursor-pointer hover:text-primary  text-muted dark:text-mutedLight"
                  >
                    {resend ? "Sending new Code" : " Resend Code"}
                  </p>
                </div>
              </div>
              <input
                name="code"
                className="w-full focus:border-primary focus:ring-primary rounded-lg"
                placeholder="*********"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary py-3 transition-all w-full  font-semibold rounded-lg mt-4 text-white hover:bg-opacity-85  "
          >
            {loading ? "Checking Code..." : "Confirm"}
          </button>
          <p className="text-base mt-2">
            Go back to{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="text-primary font-bold cursor-pointer hover:scale-105 transition-all duration-200"
            >
              login
            </span>
          </p>
        </form>
        <div className="w-6/12 px-12 bg-background rounded-2xl m-3 ">
          <div className="py-32">
            <img className="" src="/confirm.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
