import { useSite } from '../SiteContext.jsx';
import { Kicker, Mark } from './ui.jsx';

const STEPS = [
  ['step_1', 'bx-search'],
  ['step_2', 'bx-bulb'],
  ['step_3', 'bx-code-alt'],
  ['step_4', 'bx-send'],
];

const VALUES = [
  ['val_1', 'bx-conversation'],
  ['val_2', 'bx-target-lock'],
  ['val_3', 'bx-shield-quarter'],
];

export default function Process() {
  const { t } = useSite();
  return (
    <section id="processo" className="section paper">
      <div className="container">
        <div className="process-layout">
          <div>
            <Kicker index="03">{t('process_tag')}</Kicker>
            <h2 className="display">{t('process_title_a')} <Mark>{t('process_title_mark')}</Mark></h2>
            <ol className="steps">
              {STEPS.map(([key, icon], i) => (
                <li key={key}>
                  <span className="step-num">0{i + 1}</span>
                  <span className="step-icon"><i className={`bx ${icon}`} aria-hidden="true"></i></span>
                  <div>
                    <h3>{t(`${key}_title`)}</h3>
                    <p>{t(`${key}_text`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="quote-panel">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{t('quote_text')}</blockquote>
            <figcaption>
              <span className="hand signature">João Vitor</span>
              <a href="#contato" className="quote-cta">{t('quote_cta')} <span aria-hidden="true">✦</span></a>
            </figcaption>
          </figure>
        </div>

        <ul className="values">
          {VALUES.map(([key, icon]) => (
            <li key={key}>
              <i className={`bx ${icon}`} aria-hidden="true"></i>
              <h3>{t(`${key}_title`)}</h3>
              <p>{t(`${key}_text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
