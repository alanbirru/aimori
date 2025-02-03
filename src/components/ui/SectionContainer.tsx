interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section className={`py-16 max-w-7xl px-6 ${className}`}>
      {children}
    </section>
  );
}
