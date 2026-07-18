"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/dashboard");
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary p-3">
              <Link href="/">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </Link>
            </div>
          </div>
          <CardTitle className="text-2xl">Vehicle Accident Analyzer</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            {state?.error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {state.error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@vehicle-assess.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Demo: admin@vehicle-assess.com / admin123
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
