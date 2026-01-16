export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-10  mx-auto w-full max-w-4xl p-8 bg-indigo-50 border-2 border-indigo-50 rounded-xl shadow-md">
      <h1 className="font-bold text-2xl/relaxed text-indigo-600">Projects</h1>
      {children}
    </main>
  );
}
