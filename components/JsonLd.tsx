/**
 * Renders a JSON-LD <script> for structured data (schema.org).
 * Server-safe: no client JS, just a script tag in the markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and developer-authored (not user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
