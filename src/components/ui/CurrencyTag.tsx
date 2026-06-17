export function CurrencyTag({ code }: { code: string }) {
  return (
    <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-semibold text-secondary">
      {code}
    </span>
  );
}
