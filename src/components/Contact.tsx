import { useState } from 'react';
import { Check, Copy, Globe, Mail, MapPin, Phone } from 'lucide-react';

const EMAIL = 'canazartleo@gmail.com';

export function Contact() {
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
    <section className="contact-wrap" id="contact">
      <div className="contact-sub reveal">ENGENHARIA DE MINAS · CCO · SISTEMAS OPERACIONAIS</div>
      <h2 className="contact-title reveal">Vamos conversar?</h2>
      <p className="contact-note reveal">
        Aberto a conexões técnicas, projetos de transformação digital na mineração, sistemas de despacho e
        desafios em inteligência operacional.
      </p>

      <div className="contact-links reveal">
        <a className="contact-link" href={`mailto:${EMAIL}`}>
          <Mail size={14} strokeWidth={2} />
          <span>{EMAIL.toUpperCase()}</span>
        </a>

        <button
          type="button"
          className={`contact-link ${copied ? 'copied' : ''}`}
          onClick={copyEmail}
        >
          {copied ? <Check size={14} strokeWidth={2.2} /> : <Copy size={14} strokeWidth={2} />}
          <span>{copied ? 'E-MAIL COPIADO!' : 'COPIAR E-MAIL'}</span>
        </button>

        <a className="contact-link" href="tel:+5531996650183">
          <Phone size={14} strokeWidth={2} />
          <span>(31) 99665-0183</span>
        </a>

        <a
          className="contact-link"
          href="https://www.linkedin.com/in/canazart"
          target="_blank"
          rel="noreferrer"
        >
          <Globe size={14} strokeWidth={2} />
          <span>LINKEDIN · /IN/CANAZART</span>
        </a>

        <a
          className="contact-link"
          href="https://github.com/Canazart"
          target="_blank"
          rel="noreferrer"
        >
          <Globe size={14} strokeWidth={2} />
          <span>GITHUB · /CANAZART</span>
        </a>

        <span className="contact-link" style={{ cursor: 'default' }}>
          <MapPin size={14} strokeWidth={2} />
          <span>JOÃO MONLEVADE · MG</span>
        </span>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-name">LEONARDO P. P. CANAZART</div>
      <div className="footer-copy">
        © 2026 · ENGENHARIA DE MINAS (UEMG) · TÉCNICO DE SALA DE CONTROLE I · MINERAÇÃO 4.0
      </div>
    </footer>
  );
}
