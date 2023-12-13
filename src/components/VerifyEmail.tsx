"use client";

import React from "react";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="w-8 h-8 text-red-500" />
        <h3 className=" font-semibold text-xl">There was a problem.</h3>
        <p className=" text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className=" relative h-60 w-60 mb-4 text-muted-foreground">
          <Image src="/hippo-email-sent.png" alt="hippo was sent email" fill />
        </div>

        <h3 className=" font-semibold text-2xl">You&apos;re all set!</h3>

        <p className=" text-muted-foreground text-center mt-1">
          Thank you for verification your email.
        </p>

        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 text-zinc-300 animate-spin" />
        <h3 className=" font-semibold text-xl">Verifying...</h3>
        <p className=" text-muted-foreground text-sm">
          This won&apos;t take a long.
        </p>
      </div>
    );
  }

  return <div>VerifyEmail</div>;
};

export default VerifyEmail;