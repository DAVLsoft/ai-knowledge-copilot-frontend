import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type LoginFormValues = {
  identifier: string;
  password: string;
};

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email or username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={errors.identifier ? true : undefined}>
                <FieldLabel htmlFor="identifier">Username</FieldLabel>
                <Input
                  id="identifier"
                  {...register("identifier", {
                    required: "Username or email is required",
                    minLength: {
                      value: 3,
                      message: "Must be at least 3 characters",
                    },
                    setValueAs: (value: string) => value.trim(),
                    validate: (value) => {
                      if (value.includes("@")) {
                        return (
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                          "Enter a valid email address"
                        );
                      }

                      return (
                        /^[a-zA-Z0-9_]{3,}$/.test(value) ||
                        "Username must be at least 3 characters"
                      );
                    },
                  })}
                  placeholder="Enter your email or username"
                  aria-invalid={errors.identifier ? true : undefined}
                  aria-describedby={
                    errors.identifier ? "identifier-error" : undefined
                  }
                />
                {errors.identifier && (
                  <FieldError id="identifier-error">
                    {errors.identifier.message}
                  </FieldError>
                )}
              </Field>
              <Field data-invalid={errors.password ? true : undefined}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                      validate: (value) => {
                        if (!/[A-Z]/.test(value)) {
                          return "Must include at least one uppercase letter";
                        }

                        if (!/[^A-Za-z0-9\s]/.test(value)) {
                          return "Must include at least one symbol";
                        }

                        return true;
                      },
                    })}
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? true : undefined}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  <InputGroupButton
                    type="button"
                    size="icon-sm"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-controls="password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </InputGroupButton>
                </InputGroup>
                {errors.password && (
                  <FieldError id="password-error">
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
