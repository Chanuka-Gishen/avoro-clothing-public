// src/app/(store)/products/[slug]/loading.tsx

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid animate-pulse gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-square rounded-2xl bg-neutral-200" />

          <div className="mt-4 grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-neutral-200"
              />
            ))}
          </div>
        </div>

        <div className="lg:py-4">
          <div className="h-4 w-24 rounded bg-neutral-200" />

          <div className="mt-4 h-10 w-3/4 rounded bg-neutral-200" />

          <div className="mt-5 h-6 w-40 rounded bg-neutral-200" />

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-2/3 rounded bg-neutral-200" />
          </div>

          <div className="mt-8 h-28 rounded-xl bg-neutral-200" />

          <div className="mt-6 h-12 rounded-xl bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
