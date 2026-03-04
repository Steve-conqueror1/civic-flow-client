import AuthPageFooter from "./AuthPageFooter";
import VerifyEmailCard from "@/components/auth/verify-email";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <section className="flex-grow flex flex-col items-center justify-center px-4 py-12 w-full">
      <VerifyEmailCard token={token ?? null} />
      <AuthPageFooter />
    </section>
  );
}
