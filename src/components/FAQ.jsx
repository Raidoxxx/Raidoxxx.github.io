import { useSite } from '../SiteContext.jsx';
import { Kicker, Mark, WHATSAPP_URL } from './ui.jsx';

const QUESTIONS = ['faq_1', 'faq_2', 'faq_3', 'faq_4', 'faq_5', 'faq_6'];

export default function FAQ() {
  const { t } = useSite();
  return (
    <section id="faq" className="section paper">
      <div className="container faq-layout">
        <div className="faq-head">
          <Kicker index="05">FAQ</Kicker>
          <h2 className="display">{t('faq_title_a')} <Mark>{t('faq_title_mark')}</Mark></h2>
          <p className="lead">{t('faq_lead')}</p>
          <a className="btn btn-ink" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><i className="bx bxl-whatsapp" aria-hidden="true"></i>WhatsApp</a>
        </div>
        <div className="faq-list">
          {QUESTIONS.map((key, i) => (
            <details key={key}>
              <summary><span className="faq-num">0{i + 1}</span>{t(`${key}_q`)}</summary>
              <p>{t(`${key}_a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
