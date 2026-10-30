import { useSite } from '../SiteContext.jsx';
import { Kicker, Mark } from './ui.jsx';

const SERVICES = [
  ['svc_1', 'bx-globe'],
  ['svc_2', 'bx-grid-alt'],
  ['svc_3', 'bx-store-alt'],
  ['svc_4', 'bx-mobile-alt'],
  ['svc_5', 'bx-git-merge'],
  ['svc_6', 'bx-wrench'],
];

export default function Services() {
  const { t } = useSite();
  return (
    <section id="servicos" className="section paper">
      <div className="container">
        <div className="section-head">
          <div>
            <Kicker index="01">{t('services_tag')}</Kicker>
            <h2 className="display">{t('services_title_a')} <Mark>{t('services_title_mark')}</Mark><span className="asterisk" aria-hidden="true">✱</span></h2>
          </div>
          <div className="section-aside">
            <p className="lead">{t('services_lead')}</p>
            <p className="hand hand-arrow" aria-hidden="true">{t('services_hand')} <i className="bx bx-subdirectory-right"></i></p>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map(([key, icon], i) => (
            <article className="service" key={key}>
              <div className="service-top">
                <i className={`bx ${icon} service-icon`} aria-hidden="true"></i>
                <span className="service-num">0{i + 1}</span>
              </div>
              <p className="service-pain hand">{t(`${key}_pain`)}</p>
              <h3>{t(`${key}_title`)}</h3>
              <p className="service-text">{t(`${key}_text`)}</p>
              <a className="service-link" href="#contato" aria-label={`${t('header_cta')}: ${t(`${key}_title`)}`}><i className="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
            </article>
          ))}
        </div>

        <p className="services-more">
          <span>{t('services_more')}</span>
          <a className="btn btn-ink" href="#contato">{t('services_more_link')}<i className="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
        </p>
      </div>
    </section>
  );
}
