import Link from "next/link";
import { AuthForm } from "../../features/auth/AuthForm";

export default function SignupPage() {
  return (
    <>
      <AuthForm mode="signup" />
      <p className="mt-4 text-center text-sm">
        Already registered? <Link className="font-bold underline" href="/login">Login</Link>
      </p>
    </>
  );
}
