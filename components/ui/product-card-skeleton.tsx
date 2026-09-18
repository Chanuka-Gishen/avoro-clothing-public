export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl bg-neutral-200" />

      <div className="mt-4 h-3 w-20 rounded bg-neutral-200" />

      <div className="mt-2 h-4 w-3/4 rounded bg-neutral-200" />

      <div className="mt-3 h-4 w-1/2 rounded bg-neutral-200" />

      <div className="mt-3 flex gap-1.5">
        <div className="size-4 rounded-full bg-neutral-200" />
        <div className="size-4 rounded-full bg-neutral-200" />
        <div className="size-4 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}
