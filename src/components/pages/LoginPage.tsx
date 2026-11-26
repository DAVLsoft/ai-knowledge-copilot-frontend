import { LoginForm } from "../organisms/LoginForm/LoginForm";
import { AuthTemplate } from "../templates/AuthTemplate";

export const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};
