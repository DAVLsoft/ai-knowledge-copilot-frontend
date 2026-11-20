type Props = {
  signUpForm: React.ReactNode;
};

export const SignUpTemplate: React.FC<Props> = ({ signUpForm }) => {
  return (
    <section>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{signUpForm}</div>
      </div>
    </section>
  );
};
