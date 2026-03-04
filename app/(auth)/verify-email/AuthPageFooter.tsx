import Link from "next/link";

const AuthPageFooter = () => {
  return (
    <footer className="py-8 px-6 text-center">
      <nav
        aria-label="Footer navigation"
        className="flex justify-center gap-6 mb-4"
      >
        <Link
          href="/privacy"
          className="text-slate-500 hover:text-primary text-sm font-medium transition-colors"
        >
          Privacy Statement
        </Link>
        <Link
          href="/terms"
          className="text-slate-500 hover:text-primary text-sm font-medium transition-colors"
        >
          Terms of Use
        </Link>
        <Link
          href="/help"
          className="text-slate-500 hover:text-primary text-sm font-medium transition-colors"
        >
          Help Center
        </Link>
      </nav>
      <p className="text-slate-400 dark:text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} Government of Alberta. All rights
        reserved.
      </p>
    </footer>
  );
};

export default AuthPageFooter;
