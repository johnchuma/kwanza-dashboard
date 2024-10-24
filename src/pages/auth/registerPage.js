const RegisterPage = () => {
  return (
    <div className="w-screen min-h-screen bg-background  flex justify-center items-center text-dark">
      <div className="w-8/12 2xl:w-6/12 rounded-2xl bg-white flex">
        <div className="w-6/12 flex flex-col items-start px-10 justify-center">
          <h1 className="font-bold text-3xl mb-2">Welcome Back</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            Enter your credentials to login
          </p>
          <div className="space-y-2 mt-12 w-full">
            <div className="flex flex-col space-y-2 w-full">
              <label>Email/Phone number</label>
              <input
                className="w-full focus:border-primary focus:ring-primary rounded-lg"
                placeholder="Enter email/phone number"
              />
            </div>
          </div>
          <button className="bg-primary py-3 transition-all w-full rounded-lg mt-4 text-white hover:bg-opacity-85  ">
            Continue
          </button>
        </div>
        <div className="w-6/12 px-12 bg-background rounded-2xl m-3 ">
          <div className="py-32">
            <img className="" src="/ad.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
