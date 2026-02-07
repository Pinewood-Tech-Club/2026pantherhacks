type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 space-y-2">
      <div>
        <h2 className="font-display text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">{title}</h2>
        <span className="section-title-line" />
      </div>
      <p className="text-base text-[color:var(--muted)] sm:text-lg">{description}</p>
    </div>
  );
}
