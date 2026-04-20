import { Mail, Phone, Globe, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="contact-wrap" id="contact">
      <h2 className="contact-title reveal">Vamos conversar?</h2>
      <div className="contact-sub reveal">ENGENHARIA · CCO · SISTEMAS OPERACIONAIS</div>
      <div className="contact-links reveal">
        <a className="contact-link" id="email-link" href="mailto:canazartleo@gmail.com">
          <Mail size={12} strokeWidth={2} />
          <span id="email-display">CANAZARTLEO@GMAIL.COM</span>
        </a>
        <a className="contact-link" href="tel:+5531996650183">
          <Phone size={12} strokeWidth={2} />
          (31) 99665-0183
        </a>
        <a className="contact-link" href="https://www.linkedin.com/in/canazart" target="_blank" rel="noreferrer">
          <Globe size={12} strokeWidth={2} />
          LINKEDIN · /IN/CANAZART
        </a>
        <a className="contact-link" href="#">
          <MapPin size={12} strokeWidth={2} />
          JOÃO MONLEVADE · MG
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-name">LEONARDO P. P. CANAZART</div>
      <div className="footer-copy">ENGENHARIA DE MINAS · CCO · INTELIGÊNCIA OPERACIONAL</div>
    </footer>
  );
}
