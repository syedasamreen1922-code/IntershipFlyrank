async function getHealthData() {
  return {
    status: "healthy",
    service: "Next.js application",
    timestamp: new Date().toISOString(),
  };
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Health Check</h1>

      <p className="mt-2 text-gray-600">
        Server-rendered health information.
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6">
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {data.status}
          </p>

          <p>
            <span className="font-semibold">Service:</span>{" "}
            {data.service}
          </p>

          <p>
            <span className="font-semibold">Checked:</span>{" "}
            {data.timestamp}
          </p>
        </div>
      </div>
    </section>
  );
}