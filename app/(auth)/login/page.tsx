import { LoginForm, LoginHeroPanel } from "@/components/auth/login";

const LoginPage = () => (
  <main
    className="flex-grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden w-full"
    aria-label="Citizen sign in"
  >
    {/* Decorative background blobs */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
    </div>

    <div className="w-full max-w-240 grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden relative z-10">
      <LoginHeroPanel />
      <LoginForm />
    </div>
  </main>
);

export default LoginPage;
