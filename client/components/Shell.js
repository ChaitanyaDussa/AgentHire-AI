import Link from "next/link";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Jobs", "/dashboard/jobs"],
  ["Candidates", "/dashboard/candidates"],
  ["Workflows", "/dashboard/workflows"],
  ["Analytics", "/dashboard/analytics"]
];

export function Shell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/dashboard" className="text-lg font-black">AgenticHire AI</Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-3 py-2 hover:bg-mist">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-6">{children}</main>
    </div>
  );
}
