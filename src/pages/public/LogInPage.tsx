import LogInForm from "@/components/forms/LogInForm";

function LogInPage() {
  return (
    <div className="flex">
      <div
        className="flex justify-center items-center 
        md:w-1/2 max-md:hidden"
      >
        <img src="/svgs/login.svg" className="w-1/2" />
      </div>
      <LogInForm />
    </div>
  );
}

export default LogInPage;
