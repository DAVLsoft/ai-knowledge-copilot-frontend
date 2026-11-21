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
  identifier: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form using react-hook-form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={errors.identifier ? true : undefined}>
                <FieldLabel htmlFor="identifier">Username or Email</FieldLabel>
                <Input
                  id="identifier"
                  {...register("identifier", {
                    required: "Username or email is required",
                    minLength: {
                      value: 3,
                      message: "Must be at least 3 characters",
                    },
                    setValueAs: (value: string) => value.trim(),
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                      deps: "confirmPassword",
                    })}
                    placeholder="Enter your password"
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
                {errors.password ? (
                  <FieldError id="password-error">
                    {errors.password.message}
                  </FieldError>
                ) : (
                  <FieldDescription id="password-description">
                    Must be at least 8 characters long.
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={errors.confirmPassword ? true : undefined}>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  placeholder="Re-enter your password"
                  aria-invalid={errors.confirmPassword ? true : undefined}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirm-password-error"
                      : "confirm-password-description"
                  }
                />
                {errors.confirmPassword ? (
                  <FieldError id="confirm-password-error">
                    {errors.confirmPassword.message}
                  </FieldError>
                ) : (
                  <FieldDescription id="confirm-password-description">
                    Please confirm your password.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
                <FieldDescription className="text-center">
                  Have an account? <Link to="/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
