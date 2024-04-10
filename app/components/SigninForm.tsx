"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
    });

    if (!signInResult?.ok) {
      return toast({
        title: "Well this did not work..",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
    return toast({
      title: "Check you email",
      description: "A magic link has been sent to you",
    });
  }
  return (
    <form action={SignInWithEmail}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <label>Email</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="name@example.com"
          />
        </div>
        <Button className="mt-4 ">Login with Email</Button>
      </div>
    </form>
  );
}
