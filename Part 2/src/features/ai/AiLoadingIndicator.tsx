/**
 * Standard loading indicator for all AI-powered features.
 * Used as the `loading` state required by threadly-ai.instructions.md.
 *
 * Usage:
 *   {status === 'loading' && <AiLoadingIndicator />}
 */

export function AiLoadingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
      <span className="inline-block h-2 w-2 rounded-full bg-threadly-orange" />
      <span className="inline-block h-2 w-2 rounded-full bg-threadly-orange delay-150" />
      <span className="inline-block h-2 w-2 rounded-full bg-threadly-orange delay-300" />
      <span className="sr-only">Generating…</span>
    </div>
  );
}

export default AiLoadingIndicator;
