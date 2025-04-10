import { Suspense } from "react";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestHunt | Login",
  description: "Login to your account or register a new account",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Suspense wraps LoginForm to avoid CSR bailout */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login into your account with the following credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suspense wraps RegisterForm */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create your account here. After register, you can login.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterForm />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
