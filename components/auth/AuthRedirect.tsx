"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/use-auth";

interface Props {
  redirect: string;
}

const AuthRedirect: React.FC<Props> = (props) => {
  const { redirect } = props;

  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirect ?? "/dashboard");
    }
  }, [isAuthenticated, isLoading, router, redirect]);
  return null;
};

export default AuthRedirect;
