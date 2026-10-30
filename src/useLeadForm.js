import { useState } from 'react';

const WHATSAPP_NUMBER = '5513981365553';
const EMAIL = 'suporterdx@gmail.com';

export function useLeadForm(t, language) {
  const [formError, setFormError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) {
      setFormError(true);
      (name ? form.elements.message : form.elements.name).focus();
      return;
    }
    setFormError(false);
    const type = t(form.elements.type.value);
    const english = language === 'en';
    const body = english
      ? `Hi João! My name is ${name}.\nI need: ${type}\n\n${message}\n\n(Sent from your portfolio)`
      : `Olá, João! Meu nome é ${name}.\nPreciso de: ${type}\n\n${message}\n\n(Enviado pelo seu portfólio)`;
    const channel = event.nativeEvent.submitter?.value || 'whatsapp';
    if (channel === 'email') {
      const subject = `${english ? 'Project' : 'Projeto'}: ${type} — ${name}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    }
  }

  return { formError, handleSubmit };
}
