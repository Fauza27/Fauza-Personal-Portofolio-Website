import { ReactNode } from 'react';

export const MDXComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 mt-12 first:mt-0 leading-[1.2] tracking-tight">
      <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
        {children}
      </span>
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 mt-16 leading-[1.3] tracking-tight border-b border-white/10 pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-10 leading-[1.4] flex items-center gap-3">
      <span className="w-1.5 h-6 bg-linear-to-b from-primary to-accent rounded-full" />
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-lg sm:text-xl font-semibold text-foreground/90 mb-3 mt-8 leading-[1.4]">
      {children}
    </h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-6 tracking-wide">
      {children}
    </p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="space-y-3 mb-8 ml-0 bg-white/[0.02] rounded-xl p-6 border border-white/5">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="space-y-3 mb-8 ml-0 bg-white/[0.02] rounded-xl p-6 border border-white/5 counter-reset-[item]">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-base sm:text-lg text-muted-foreground leading-[1.8] flex items-start gap-3 ml-0">
      <span className="text-primary mt-1.5 shrink-0 select-none text-lg">▸</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="relative border-l-4 border-primary/50 pl-6 pr-6 py-4 my-8 bg-primary/5 rounded-r-xl">
      <div className="text-foreground/90 text-base sm:text-lg leading-[1.8] italic">
        {children}
      </div>
      <div className="absolute top-2 left-2 text-primary/20 text-6xl font-serif leading-none">"</div>
    </blockquote>
  ),
  code: ({ children, className }: { children: ReactNode; className?: string }) => {
    const isInline = !className;
    
    if (isInline) {
      return (
        <code className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-[0.9em] font-mono border border-primary/20 whitespace-nowrap">
          {children}
        </code>
      );
    }
    
    return (
      <code className={`${className} block text-sm sm:text-base`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-black/60 rounded-xl p-6 sm:p-8 overflow-x-auto mb-8 border border-white/10 backdrop-blur-sm shadow-2xl">
      <div className="text-sm sm:text-base font-mono text-foreground/90 leading-relaxed">{children}</div>
    </pre>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline decoration-primary/40 underline-offset-4 hover:decoration-primary/80 transition-all font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic text-foreground/90 font-medium">{children}</em>
  ),
  hr: () => (
    <hr className="border-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-12" />
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto mb-8 rounded-xl border border-white/10 shadow-lg">
      <table className="w-full">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-white/5 border-b border-white/10">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-white/5">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="hover:bg-white/5 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-6 py-4 text-left text-sm font-bold text-foreground uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-6 py-4 text-sm sm:text-base text-muted-foreground">
      {children}
    </td>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-12 group">
      <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {alt && (
        <figcaption className="text-sm text-muted-foreground text-center mt-4 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};
