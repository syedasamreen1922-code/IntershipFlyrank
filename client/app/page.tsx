export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Foundations
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Settings Application
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          A responsive settings application built with Next.js and Tailwind
          CSS.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/settings"
            className="rounded-lg bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
          >
            Open Settings
          </a>

          <a
            href="/health"
            className="rounded-lg border border-gray-300 px-5 py-3 text-center font-medium hover:bg-gray-50"
          >
            Health Check
          </a>
        </div>
      </div>
    </section>
  );
}