import { MfaForm } from "@/components/auth/mfa";
import Link from "next/link";

const MfaPage = () => (
  <main
    className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden w-full"
    aria-label="Identity verification"
  >
    {/* Decorative background blobs */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 w-full flex flex-col items-center">
      <MfaForm />

      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500 text-center max-w-md">
        Secured by Alberta Digital ID. By continuing, you agree to the{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  </main>
);

export default MfaPage;
