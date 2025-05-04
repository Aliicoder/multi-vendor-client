import { FaUpRightFromSquare } from "react-icons/fa6";
import CustomButton from "../buttons/CustomButton";

function Footer() {
  return (
    <section className="flex flex-col montserrat mt-10 border-t border-neutral-100">
      <div className="flex flex-col bg-blue-500 text-white">
        <div
          className="flex flex-col container mx-auto relative 
          md:px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 ">
            <div className="flex flex-col p-20 gap-3">
              <h1 className="font-semibold fs-49">ons</h1>
              <h1 className="fs-16 line-clamp-5">
                the ultimate multi-vendor e-commerce app that brings endless
                possibilities to your shopping experience! With Souq, you can
                explore a vast marketplace featuring products from a diverse
                range of trusted vendors, all in one place. Whether you’re
                searching for fashion, electronics, home essentials, or unique
                handmade items, Souq offers unbeatable variety, competitive
                prices
              </h1>
              <h1 className="font-semibold fs-20">Email</h1>
              <h1 className={""}>ons@gmail.com</h1>
            </div>

            <div
              className="flex flex-col p-20 py-10
              md:py-20"
            >
              <h1 className="font-semibold fs-20">EXPLORE</h1>
              <ul className="flex flex-col gap-5 my-5">
                <li>About us</li>
                <li>About our shop</li>
                <li>Privacy and policy</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div
              className="flex flex-col gap-3 p-20 py-10
              md:my-10"
            >
              <h1 className="font-semibold fs-20">Become a Seller</h1>
              <h1 className="my-2">join our community</h1>
              <div className="flex">
                <CustomButton
                  theme="white"
                  className="flex fs-16 gap-2 items-center transition-all"
                >
                  Join us
                  <FaUpRightFromSquare className="fs-10" />
                </CustomButton>
              </div>
              <h1 className="font-semibold fs-20 mt-5">Contact us</h1>
              <h1 className={""}>+91 6366313872</h1>
              <h1 className={""}>+91 7166313872</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
