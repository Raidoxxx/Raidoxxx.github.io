import { useSite } from '../SiteContext.jsx';
import AsciiAngel from './AsciiAngel.jsx';
import { Kicker, LINKEDIN_URL } from './ui.jsx';

const SKILLS = [
  ['Front-end', ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'UX/UI']],
  ['Back-end', ['Node.js', 'PHP / Laravel', 'Java / Spring Boot', 'Python', 'APIs REST']],
  ['Mobile', ['React Native', 'Android', 'iOS']],
  ['skills_data', ['PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Git / GitHub', 'Deploy']],
];

const TIMELINE = [
  ['exp_1', null],
  ['exp_2', '2025'],
  ['exp_3', '2022 — 2026'],
  ['exp_4', '2018'],
];

export default function About() {
  const { t } = useSite();
  return (
    <section id="sobre" className="section graphite">
      <div className="container">
        <div className="about-layout">
          <AsciiAngel label={t('angel_label')} hint={t('angel_hint')} />

          <div className="about-copy">
            <Kicker index="04">{t('about_tag')}</Kicker>
            <h2 className="display">{t('about_title')}</h2>

            <div className="definition">
              <p className="definition-label">{t('def_label')}</p>
              <p><strong>{t('def_word')}</strong> <em>{t('def_class')}</em>: {t('def_text')}</p>
            </div>

            <p className="about-text">{t('about_text_1')}</p>
            <p className="about-text">{t('about_text_2')}</p>
            <p className="about-text about-hire">{t('about_text_3')}</p>
            <div className="about-actions">
              <a className="btn btn-red" href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer"><i className="bx bx-download" aria-hidden="true"></i>{t('about_cv')}</a>
              <a className="btn btn-outline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><i className="bx bxl-linkedin" aria-hidden="true"></i>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="cv-grid">
          <div>
            <h3 className="cv-title">{t('exp_title')}</h3>
            <ol className="timeline">
              {TIMELINE.map(([key, period]) => (
                <li key={key}>
                  <div>
                    <h4>{t(`${key}_title`)}</h4>
                    <p>{t(`${key}_text`)}</p>
                  </div>
                  <span className="timeline-date">{period ?? t(`${key}_period`)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="cv-title">{t('skills_title')}</h3>
            <div className="skills">
              {SKILLS.map(([group, items]) => (
                <div className="skill-group" key={group}>
                  <h4>{group === 'skills_data' ? t(group) : group}</h4>
                  <ul className="chips">{items.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
