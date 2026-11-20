import { LoginForm } from "../organisms/LoginForm/LoginForm";
import { LoginTemplate } from "../templates/LoginTemplate";

export const LoginPage = () => {
  return <LoginTemplate loginForm={<LoginForm />} />;
};
