import { ArrowRight, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      className="mt-8"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between">
        {/* Logo + brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: "var(--green)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2H14V6H10V14H6V6H2V2Z" fill="white" />
            </svg>
          </div>
          <span
            className="text-sm font-semibold uppercase"
            style={{ color: "var(--text)", letterSpacing: "0.08em" }}
          >
            PantherHacks 2026
          </span>
        </div>

        {/* Info */}
        <div className="text-sm md:text-right" style={{ color: "var(--text-secondary)" }}>
          <p>April 19, 2026 &middot; 9:00 AM - 9:30 PM PST</p>
          <a
            href="https://maps.google.com/?q=Pinewood+School,+26800+Fremont+Rd,+Los+Altos+Hills,+CA+94022"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-0.5 inline-flex items-center gap-1"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            <MapPin size={13} />
            Pinewood Upper Campus
          </a>
        </div>

        {/* CTA */}
        <a
          href="about:blank"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold text-white"
          style={{ background: "var(--green)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-dim)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
        >
          Register Now
          <ArrowRight size={15} />
        </a>
      </div>

      <div
        className="mx-auto max-w-6xl px-4 pb-6 text-center text-xs sm:px-6"
        style={{ color: "var(--text-dim)" }}
      >
        Built with care by the Pinewood Tech Club
      </div>
    </footer>
  );
}
