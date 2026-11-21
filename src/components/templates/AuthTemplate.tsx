type Props = {
  children: React.ReactNode;
};

export const AuthTemplate: React.FC<Props> = ({ children }) => {
  return (
    <section>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </section>
  );
};
