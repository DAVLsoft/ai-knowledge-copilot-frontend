import { RegisterForm } from "../organisms/RegisterForm/RegisterForm";
import { AuthTemplate } from "../templates/AuthTemplate";

export const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};
