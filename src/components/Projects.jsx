import { useSite } from '../SiteContext.jsx';
import { Kicker, Mark } from './ui.jsx';
import { PROFILES } from '../profiles.js';

const PROJECTS = [
  { key: 'gd', name: 'Gestão de Demandas', url: 'https://www.gestaodedemandas.com', stack: ['React', 'Node.js', 'PostgreSQL'] },
  { key: 'miss', name: 'Missdell', url: 'https://www.missdell.discloud.app/', image: '/images/missdell.webp', stack: ['React', 'Node.js', 'PostgreSQL'] },
  { key: 'ft', name: 'Finance Tracker', image: '/images/finance-tracker.webp', stack: ['React Native', 'Node.js', 'PostgreSQL'] },
  { key: 'ilha', name: 'Ilha Cultural · A Arte Está na Rua', url: 'https://arte-esta-na-rua.discloud.app/', image: '/images/ilha-cultural.jpg', stack: ['React', 'Vite', 'Node.js'] },
  { key: 'cow', name: 'Cow Brownies', url: 'https://cowbrownies.discloud.dev/', image: '/images/cow-brownies.jpg', stack: ['React', 'Vite', 'WhatsApp'] },
  { key: 'donna', name: 'Donna Cake', url: 'https://donna-cake.discloud.dev/', image: '/images/donna-cake.jpg', stack: ['React', 'Vite', 'WhatsApp'] },
  { key: 'gomes', name: 'Gomes Ricomini Engenharia', url: 'https://gomes-ricomini.discloud.dev/', image: '/images/gomes-ricomini.jpg', stack: ['React', 'TypeScript', 'Node.js'] },
  { key: 'physicus', name: 'Physicus Fit', url: 'https://physicus-fit.discloud.dev/', image: '/images/physicus-fit.jpg', stack: ['React', 'Vite', 'Express'] },
];

function Cover({ project, onError }) {
  if (!project.image) {
    return (
      <div className="cover-type" aria-hidden="true">
        <span className="cover-grid"></span>
        <strong>Gestão<br />de Demandas<em>.</em></strong>
      </div>
    );
  }
  return <img src={project.image} alt="" width="960" height="600" loading="lazy" decoding="async" onError={onError} />;
}

export default function Projects() {
  const { t, handlePreviewError, profile } = useSite();
  const projects = PROFILES[profile].projects.map(key => PROJECTS.find(project => project.key === key));
  return (
    <section id="projetos" className="section ink">
      <div className="container">
        <div className="section-head">
          <div>
            <Kicker index="02">{t('projects_tag')}</Kicker>
            <h2 className="display">{t('projects_title_a')} <Mark>{t('projects_title_mark')}</Mark></h2>
          </div>
          <p className="lead section-aside">{t('projects_lead')}</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const PreviewTag = project.url ? 'a' : 'div';
            const previewProps = project.url
              ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', tabIndex: -1, 'aria-hidden': true }
              : {};
            return (
              <article className="project-card" key={project.key}>
                <span className={`tape-piece tilt-${i % 3}`} aria-hidden="true"></span>
                <PreviewTag className={`project-preview tilt-${i % 3}`} {...previewProps}>
                  <Cover project={project} onError={handlePreviewError} />
                  <span className="project-tag">{t(`${project.key}_tag`)}</span>
                  <span className="project-caption">{t(`${project.key}_caption`)}</span>
                </PreviewTag>

                <div className="project-row">
                  <span className="project-index">0{i + 1}</span>
                  <div>
                    <h3>{project.name}</h3>
                    <p className="project-kind">{t(`${project.key}_kind`)}</p>
                  </div>
                  {project.url
                    ? <a className="project-go" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('view_project')}: ${project.name}`}><i className="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
                    : <span className="project-status" title={t('in_development')}><i className="bx bx-time-five" aria-hidden="true"></i><span className="sr-only">{t('in_development')}</span></span>}
                </div>

                <dl className="case">
                  <div><dt>{t('label_problem')}</dt><dd>{t(`${project.key}_problem_text`)}</dd></div>
                  <div><dt>{t('label_solution')}</dt><dd>{t(`${project.key}_impl_text`)}</dd></div>
                  <div><dt>{t('label_result')}</dt><dd>{t(`${project.key}_result_text`)}</dd></div>
                </dl>

                <div className="project-foot">
                  <ul className="chips" aria-label="Stack">{project.stack.map(s => <li key={s}>{s}</li>)}</ul>
                  {project.url
                    ? <a className="project-live" href={project.url} target="_blank" rel="noopener noreferrer"><span className="live-dot" aria-hidden="true"></span>{t('badge_live')} ↗</a>
                    : <span className="project-live muted">{t('in_development_note')}</span>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
