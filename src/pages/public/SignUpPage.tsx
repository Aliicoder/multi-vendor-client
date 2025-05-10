import SignupForm from "@/components/forms/SignupForm";

function SignupPage() {
  return (
    <div className="flex">
      <SignupForm />
      <div
        className="flex w-full justify-center items-center 
      max-md:hidden md:w-1/2"
      >
        <img src="/svgs/signup.svg" className="w-1/2" />
      </div>
    </div>
  );
}

export default SignupPage;
