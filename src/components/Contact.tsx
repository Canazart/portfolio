import { useState } from 'react';
import { Check, Copy, Globe, Mail, Phone } from 'lucide-react';
import type { Translation } from '../i18n';

const EMAIL = 'canazartleo@gmail.com';

interface ContactProps {
  t: Translation;
}

export function Contact({ t }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-box reveal">
        <div>
          <h2 className="contact-title">{t.contact.title}</h2>
          <p className="contact-note">{t.contact.note}</p>
        </div>

        <div className="contact-actions">
          <a className="contact-btn" href={`mailto:${EMAIL}`}>
            <Mail size={14} />
            <span>{EMAIL}</span>
          </a>

          <button
            type="button"
            className={`contact-btn ${copied ? 'copied' : ''}`}
            onClick={copyEmail}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? t.contact.copied : t.contact.copyEmail}</span>
          </button>

          <a className="contact-btn" href="tel:+5531996650183">
            <Phone size={14} />
            <span>(31) 99665-0183</span>
          </a>

          <a
            className="contact-btn"
            href="https://www.linkedin.com/in/canazart"
            target="_blank"
            rel="noreferrer"
          >
            <Globe size={14} />
            <span>LinkedIn</span>
          </a>

          <a
            className="contact-btn"
            href="https://github.com/Canazart"
            target="_blank"
            rel="noreferrer"
          >
            <Globe size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: ContactProps) {
  return (
    <footer>
      <div className="footer-inner">
        <span>Leonardo P. P. Canazart</span>
        <span>{t.contact.footerPlace}</span>
      </div>
    </footer>
  );
}
