type Props = {
  loginForm: React.ReactNode;
};

export const LoginTemplate: React.FC<Props> = ({ loginForm }) => {
  return (
    <section>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{loginForm}</div>
      </div>
    </section>
  );
};
