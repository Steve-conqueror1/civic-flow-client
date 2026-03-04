import { ResetPasswordForm } from "@/components/auth/reset-password";
import AuthPageFooter from "../verify-email/AuthPageFooter";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main
      className="flex-grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden w-full"
      aria-label="Set new password"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <ResetPasswordForm token={token ?? null} />
      </div>
    </main>
  );
}
