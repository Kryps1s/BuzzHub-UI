import { NextPage, Metadata } from "next";
import SignUpForm from "../components/signUpForm";

export const metadata: Metadata = {
  title: "Sign Up To Buzzhub"
};

const Page: NextPage = () => (
  <main className="h-full flex flex-column items-start pt-5 sm:items-center  justify-center">
    <div className="w-1/2 h-1/2">
      <SignUpForm />
    </div>
  </main>
);
export default Page;