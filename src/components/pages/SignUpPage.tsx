import { SignUpForm } from "../organisms/SignUpForm/SignUpForm";
import { SignUpTemplate } from "../templates/SignUpTemplate";

export const SignUpPage = () => {
  return <SignUpTemplate signUpForm={<SignUpForm />} />;
};
