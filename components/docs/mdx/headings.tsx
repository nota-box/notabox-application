interface HeadingProps {
  children: React.ReactNode;
  id?: string;
}

export function H1({ children, id }: HeadingProps) {
  return (
    <h1 id={id} className="scroll-m-20 text-4xl font-bold tracking-tight">
      {children}
    </h1>
  );
}

export function H2({ children, id }: HeadingProps) {
  return (
    <h2 id={id} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children, id }: HeadingProps) {
  return (
    <h3 id={id} className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function H4({ children, id }: HeadingProps) {
  return (
    <h4 id={id} className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}