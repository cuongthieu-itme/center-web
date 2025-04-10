import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/shared/logo";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useAuthStore } from "../../stores/useAuthStore";
import { LoginSchemaType, loginSchema } from "../../validations/auth.schema";

export default function LoginPage() {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  //react hook-form with zod rosolver, validates login credentials and handles error
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //submit handler call the login method form zustand if success navigates to dashboard
  const onSubmit: SubmitHandler<LoginSchemaType> = (
    values: LoginSchemaType
  ) => {
    login(values);
    navigate("/dashboard/main-page");
  };

  return (
    <section className="flex flex-col min-h-screen justify-center items-center bg-muted">
      <div className="py-5">
        <Logo />
      </div>
      <Card className="sm:w-2/5 lg:w-[400px]">
        <CardHeader className="text-3xl font-bold tracking-tight text-foreground">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-wide text-foreground">
              Welcome back
            </h1>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your email"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                size={"lg"}
                className="w-full"
              >
                {loading && <Loader className="animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
