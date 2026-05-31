import Link from "next/link";
import { AuthForm } from "../../features/auth/AuthForm";

export default function LoginPage() {
  return (
    <>
      <AuthForm mode="login" />
      <p className="mt-4 text-center text-sm">
        New recruiter? <Link className="font-bold underline" href="/signup">Sign up</Link>
      </p>
    </>
  );
}
