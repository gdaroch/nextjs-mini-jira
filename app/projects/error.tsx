"use client";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <p>Projects could not be loaded</p>
      <button
        onClick={reset}
        className="rounded-md border px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-600 hover:text-indigo-200"
      >
        Try again
      </button>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-red-500">{error.message}</pre>
      )}
    </>
  );
}
