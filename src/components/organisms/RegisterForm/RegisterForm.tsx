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

type RegisterFormValues = {
  email: string;
  username: string;
  password: string;
};

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="items-center gap-2">
          <img
            className="m-auto h-10 w-10 rounded-md"
            src="/Logo.webp"
            alt="Logo"
          />
          <CardTitle className="text-center text-xl">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your username, email, and password to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(() => console.log("Clicked"))}>
            <FieldGroup>
              <Field
                className="gap-2"
                data-invalid={errors.email ? true : undefined}
              >
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    setValueAs: (value: string) => value.trim(),
                    validate: (value) => {
                      return (
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                        "Enter a valid email address"
                      );
                    },
                  })}
                  placeholder="Enter your email address"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? "email-error" : "email-description"
                  }
                />
                {errors.email && (
                  <FieldError id="email-error">
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>
              <Field
                className="gap-2"
                data-invalid={errors.username ? true : undefined}
              >
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username must be at least 8 characters",
                    },
                    setValueAs: (value: string) => value.trim(),
                    pattern: {
                      value: /^[a-zA-Z0-9_]{4,}$/,
                      message:
                        "Use at least 4 letters, numbers, or underscores",
                    },
                  })}
                  placeholder="Enter your username"
                  aria-invalid={errors.username ? true : undefined}
                  aria-describedby={
                    errors.username ? "username-error" : "username-description"
                  }
                />
                {errors.username && (
                  <FieldError id="username-error">
                    {errors.username.message}
                  </FieldError>
                )}
              </Field>
              <Field
                className="gap-2"
                data-invalid={errors.password ? true : undefined}
              >
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
                        message:
                          "The password must contain at least 8 characters.",
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
                    aria-invalid={errors.password ? true : undefined}
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : "password-description"
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
                  {isSubmitting ? "Creating..." : "Create account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
