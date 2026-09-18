export default function StoreLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />

        <p className="text-sm text-neutral-500">Loading...</p>
      </div>
    </div>
  );
}
