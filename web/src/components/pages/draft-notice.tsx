/** Shown on policy pages that still need the owner's details and a legal review. */
export function DraftNotice() {
  return (
    <p className="mb-8 border-2 border-neutral-950 bg-[#ffe45c] p-4 text-sm font-medium text-neutral-950">
      Draft. Fill in every [bracketed] detail and have a lawyer review this page
      before you publish it.
    </p>
  );
}
