import { useSite } from '../SiteContext.jsx';
import { useLeadForm } from '../useLeadForm.js';
import { EMAIL, GITHUB_URL, Kicker, LINKEDIN_URL, Mark, WHATSAPP_URL } from './ui.jsx';

const OPTIONS = ['opt_site', 'opt_system', 'opt_store', 'opt_app', 'opt_api', 'opt_fix', 'opt_job', 'opt_other'];

export default function Contact() {
  const { t, language, selectedService, setSelectedService } = useSite();
  const { formError, handleSubmit } = useLeadForm(t, language);
  return (
    <section id="contato" className="section ink contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <Kicker index="06">{t('contact_tag')}</Kicker>
          <h2 className="display">{t('contact_title_a')} <Mark>{t('contact_title_mark')}</Mark><span className="asterisk" aria-hidden="true">✦</span></h2>
          <p className="lead">{t('contact_text')}</p>
          <ul className="contact-links">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span className="ring"><i className="bx bxl-whatsapp" aria-hidden="true"></i></span><span>WhatsApp<small>(13) 98136-5553</small></span></a></li>
            <li><a href={`mailto:${EMAIL}`}><span className="ring"><i className="bx bx-envelope" aria-hidden="true"></i></span><span>E-mail<small>{EMAIL}</small></span></a></li>
            <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><span className="ring"><i className="bx bxl-linkedin" aria-hidden="true"></i></span><span>LinkedIn<small>joaovitorgomesmartins</small></span></a></li>
            <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><span className="ring"><i className="bx bxl-github" aria-hidden="true"></i></span><span>GitHub<small>Raidoxxx</small></span></a></li>
          </ul>
          <p className="available"><span className="ring ring-red"><i className="bx bx-right-arrow-alt" aria-hidden="true"></i></span>{t('contact_available')}</p>
        </div>

        <div className="contact-panel">
          <p className="hand panel-hand" aria-hidden="true">{t('contact_hand')}</p>
          <h3 className="panel-title">{t('contact_panel_title')}</h3>
          <form className="lead-form" noValidate onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="lf_name">{t('form_name')}</label>
              <input id="lf_name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="lf_type">{t('form_type')}</label>
              <select id="lf_type" name="type" value={selectedService} onChange={event => setSelectedService(event.target.value)}>
                {OPTIONS.map(key => <option value={key} key={key}>{t(key)}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="lf_msg">{t('form_msg')}</label>
              <textarea id="lf_msg" name="message" rows="4" required placeholder={t('form_msg_ph')}></textarea>
            </div>
            <p className="form-error" role="alert" hidden={!formError}>{t('form_error')}</p>
            <div className="form-actions">
              <button className="btn btn-ink" type="submit" value="whatsapp"><i className="bx bxl-whatsapp" aria-hidden="true"></i>{t('form_send_wa')}</button>
              <button className="btn btn-ghost-ink" type="submit" value="email"><i className="bx bx-envelope" aria-hidden="true"></i>{t('form_send_mail')}</button>
            </div>
            <p className="form-note">{t('form_note')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
