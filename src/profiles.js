export const PROFILE_IDS = ['freelance', 'backend', 'fullstack'];

export function profileFromSearch(search) {
  const value = new URLSearchParams(search).get('perfil');
  return PROFILE_IDS.includes(value) ? value : 'freelance';
}

export const PROFILES = {
  freelance: {
    cv: '/assets/cv.pdf',
    projects: ['gd', 'miss', 'ft', 'ilha', 'cow', 'donna', 'gomes', 'physicus'],
  },
  backend: {
    cv: '/assets/cv-backend.pdf',
    projects: ['gd', 'gomes', 'miss', 'ft'],
    skills: [
      ['Back-end', ['Node.js', 'TypeScript', 'Express.js', 'APIs REST']],
      ['profile_integrations', ['Webhooks', 'WebSocket', 'WhatsApp', 'Mercado Pago', 'OpenAI']],
      ['profile_database', ['PostgreSQL', 'MySQL', 'SQLite', 'Sequelize', 'SQL']],
      ['profile_quality', ['Git', 'Docker', 'GitHub Actions', 'Testes / Tests']],
    ],
  },
  fullstack: {
    cv: '/assets/cv-fullstack.pdf',
    projects: ['gd', 'miss', 'gomes', 'ft', 'ilha', 'physicus', 'cow', 'donna'],
    skills: [
      ['Front-end', ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']],
      ['Back-end', ['Node.js', 'Express.js', 'PHP', 'APIs REST']],
      ['Mobile', ['React Native', 'APIs', 'Android', 'iOS']],
      ['profile_database', ['PostgreSQL', 'MySQL', 'SQLite', 'Docker', 'Git / GitHub']],
    ],
  },
};

export const PROFILE_LABELS = {
  pt: { profile_label: 'Versão do portfólio', profile_freelance: 'Freelance', profile_backend: 'Backend', profile_fullstack: 'Full Stack', profile_integrations: 'Integrações', profile_database: 'Dados & Infra', profile_quality: 'Qualidade' },
  en: { profile_label: 'Portfolio version', profile_freelance: 'Freelance', profile_backend: 'Backend', profile_fullstack: 'Full Stack', profile_integrations: 'Integrations', profile_database: 'Data & Infrastructure', profile_quality: 'Quality' },
};

const recruiterPt = {
  nav_services: 'Competências', nav_process: 'Como trabalho', header_cta: 'Conversar sobre vaga',
  hero_meta_right: 'Aberto a\noportunidades', hero_btn_contact: 'Conversar sobre uma vaga', hero_btn_projects: 'Explorar projetos',
  hero_recruiter: 'Para recrutadores', hero_cv: 'Currículo · PT-BR', hero_note: 'Do código ao sistema em produção.',
  services_tag: 'Competências', services_title_a: 'O que levo para', services_title_mark: 'o time.',
  services_lead: 'Experiência prática construindo e mantendo produtos. Cada competência se conecta a decisões e entregas dos projetos abaixo.', services_hand: 'experiência aplicada',
  services_more: 'Quer entender minha experiência?', services_more_link: 'Vamos conversar',
  projects_tag: 'Experiência em projetos', projects_title_a: 'Código aplicado a', projects_title_mark: 'problemas reais.',
  label_solution: 'Implementação',
  gd_kind: 'SaaS · Produto próprio', gd_impl_text: 'API Node.js e TypeScript, React, banco relacional, autenticação e permissões. Integrações com WhatsApp, OpenAI e Mercado Pago.',
  gd_result_text: 'Produto em produção com usuários e pagamentos reais; evolução contínua do sistema e de suas integrações.',
  process_title_a: 'Da investigação à', process_title_mark: 'entrega.',
  step_1_title: 'Entender o contexto', step_1_text: 'Investigo o fluxo, as regras de negócio e os critérios de aceitação antes de propor uma implementação.',
  step_2_title: 'Planejar a solução', step_2_text: 'Divido o trabalho em etapas, considerando contratos de API, modelo de dados, permissões e dependências.',
  step_3_title: 'Implementar e verificar', step_3_text: 'Desenvolvo, reviso o código e verifico os fluxos com testes e logs para investigar falhas.',
  step_4_title: 'Publicar e evoluir', step_4_text: 'Acompanho o comportamento em produção, corrijo problemas e evoluo a solução conforme o uso.',
  quote_cta: 'Vamos conversar sobre o seu time.',
  val_1_title: 'Comunicação direta', val_1_text: 'Contexto, decisões e dúvidas compartilhados durante o desenvolvimento.',
  val_2_title: 'Visão de produto', val_2_text: 'Conecto a implementação às necessidades de quem usa o sistema.',
  about_title: 'Quem pode somar ao seu time.',
  about_text_2: 'Graduando em Ciência da Computação, com conclusão prevista para novembro de 2026. Também atuei com suporte e infraestrutura de TI no setor público.',
  about_text_3: 'Aberto a conversar sobre oportunidades em desenvolvimento e sobre como minha experiência se conecta ao seu time.',
  about_cv: 'Baixar currículo direcionado (PDF · PT-BR)',
  contact_title_a: 'Vamos falar sobre', contact_title_mark: 'a oportunidade.',
  contact_text: 'Conte sobre a vaga, a stack e os desafios do time. Podemos conversar sobre minha experiência e os projetos apresentados aqui.',
  contact_available: 'Conversar sobre uma vaga', contact_panel_title: 'Conte sobre a vaga', contact_hand: 'vamos conversar?',
  form_type: 'Assunto', form_msg: 'Vaga e contexto', form_msg_ph: 'Qual é a oportunidade, a stack e o modelo de trabalho?',
  whatsapp_freelance: 'Olá, João! Vi seu portfólio e gostaria de conversar sobre uma oportunidade de desenvolvimento no nosso time.',
  whatsapp_service: 'Assunto:', footer_tagline: 'Desenvolvimento de software com experiência prática em produtos e integrações.',
  faq_1_q: 'Onde encontro seu currículo?', faq_1_a: 'Os botões de currículo desta versão abrem o PDF direcionado à área selecionada. Você pode trocar entre Backend e Full Stack no cabeçalho.',
  faq_2_q: 'Como posso avaliar sua experiência?', faq_2_a: 'Os projetos apresentam contexto, implementação, tecnologias e resultados. Podemos conversar sobre decisões técnicas e demonstrações.',
  faq_3_q: 'Qual é sua formação?', faq_3_a: 'Estou cursando Ciência da Computação, com conclusão prevista para novembro de 2026.',
  faq_4_q: 'Você já trabalhou em sistemas existentes?', faq_4_a: 'Sim. Minha experiência inclui investigação de falhas, manutenção e evolução de sistemas em produção.',
  faq_5_q: 'Como você verifica as entregas?', faq_5_a: 'Uso revisão de código, testes e logs. O currículo detalha exemplos de testes automatizados e integrações nos projetos.',
  faq_6_q: 'Como conversar sobre uma vaga?', faq_6_a: 'Envie a descrição da oportunidade pelo formulário, WhatsApp ou e-mail. Inclua a stack, o modelo de trabalho e o contexto do time.',
};

const recruiterEn = {
  nav_services: 'Skills', nav_process: 'Workflow', header_cta: 'Discuss a role',
  hero_meta_right: 'Open to\nopportunities', hero_btn_contact: 'Discuss an opportunity', hero_btn_projects: 'Explore projects', hero_recruiter: 'For recruiters', hero_cv: 'Resume · PT-BR', hero_note: 'From code to software in production.',
  services_tag: 'Skills', services_title_a: 'What I bring to', services_title_mark: 'the team.', services_lead: 'Practical experience building and maintaining products, connected to the implementation decisions in the projects below.', services_hand: 'applied experience', services_more: 'Want to discuss my experience?', services_more_link: "Let's talk",
  projects_tag: 'Project experience', projects_title_a: 'Code applied to', projects_title_mark: 'real problems.', label_solution: 'Implementation',
  gd_kind: 'SaaS · Own product', gd_impl_text: 'Node.js and TypeScript API, React, relational database, authentication and permissions. WhatsApp, OpenAI and Mercado Pago integrations.', gd_result_text: 'Product in production with users and real payments, with ongoing maintenance and integration work.',
  process_title_a: 'From investigation to', process_title_mark: 'delivery.',
  step_1_title: 'Understand the context', step_1_text: 'Investigate workflows, business rules and acceptance criteria before proposing an implementation.',
  step_2_title: 'Plan the solution', step_2_text: 'Break work into steps, considering API contracts, data models, permissions and dependencies.',
  step_3_title: 'Implement and verify', step_3_text: 'Develop, review code and verify workflows using tests and logs to investigate failures.',
  step_4_title: 'Release and improve', step_4_text: 'Follow production behavior, fix problems and improve the solution based on usage.',
  quote_cta: "Let's talk about your team.", val_1_title: 'Direct communication', val_1_text: 'Share context, decisions and questions throughout development.', val_2_title: 'Product perspective', val_2_text: 'Connect implementation to the needs of the people using the system.',
  about_title: 'Someone who can contribute to your team.', about_text_2: 'Computer Science student, with graduation expected in November 2026. Previous experience includes IT support and infrastructure in the public sector.', about_text_3: 'Open to discussing development opportunities and how my experience connects to your team.', about_cv: 'Download focused resume (PDF · PT-BR)',
  contact_title_a: "Let's discuss", contact_title_mark: 'the opportunity.', contact_text: 'Tell me about the role, stack and team challenges. We can discuss my experience and the projects presented here.', contact_available: 'Discuss an opportunity', contact_panel_title: 'Tell me about the role', contact_hand: "let's talk!", form_type: 'Subject', form_msg: 'Role and context', form_msg_ph: 'What is the opportunity, technology stack and work arrangement?',
  whatsapp_freelance: "Hi João! I saw your portfolio and would like to discuss a software development opportunity on our team.", whatsapp_service: 'Subject:', footer_tagline: 'Software development with practical product and integration experience.',
  faq_1_q: 'Where can I find your resume?', faq_1_a: 'Resume buttons open the PDF for the selected profile. Switch between Backend and Full Stack in the header. The PDFs are in Portuguese.',
  faq_2_q: 'How can I evaluate your experience?', faq_2_a: 'Projects include context, implementation, technologies and results. We can discuss technical decisions and demonstrations.',
  faq_3_q: 'What is your education?', faq_3_a: 'I am studying Computer Science, with graduation expected in November 2026.',
  faq_4_q: 'Have you worked on existing systems?', faq_4_a: 'Yes. My experience includes troubleshooting, maintaining and improving systems in production.',
  faq_5_q: 'How do you verify your work?', faq_5_a: 'I use code review, tests and logs. My resume provides examples of automated tests and integrations.',
  faq_6_q: 'How can we discuss a role?', faq_6_a: 'Send the opportunity through the form, WhatsApp or email, including the stack, work arrangement and team context.',
};

const capabilities = {
  pt: [
    ['APIs REST', 'Contratos e regras de negócio', 'Endpoints, autenticação e permissões com Node.js, TypeScript e Express.js.'],
    ['Dados relacionais', 'Consistência e modelagem', 'SQL, PostgreSQL, MySQL e SQLite; modelagem de dados e uso de Sequelize.'],
    ['Integrações', 'Sistemas que se conectam', 'Integrações com WhatsApp, Mercado Pago e OpenAI, usando APIs e webhooks.'],
    ['Interfaces e mobile', 'Experiência de ponta a ponta', 'React e React Native conectados ao backend, com interfaces responsivas.'],
    ['Qualidade', 'Investigar e verificar', 'Testes automatizados, análise de logs e revisão de código durante a implementação.'],
    ['Entrega e manutenção', 'Software em produção', 'Git, Docker e GitHub Actions; correções e evolução contínua de produtos.'],
  ],
  en: [
    ['REST APIs', 'Contracts and business rules', 'Endpoints, authentication and permissions using Node.js, TypeScript and Express.js.'],
    ['Relational data', 'Consistency and modeling', 'SQL, PostgreSQL, MySQL and SQLite; data modeling and Sequelize.'],
    ['Integrations', 'Connected systems', 'WhatsApp, Mercado Pago and OpenAI integrations using APIs and webhooks.'],
    ['Interfaces and mobile', 'End-to-end experience', 'React and React Native connected to backend services, with responsive interfaces.'],
    ['Quality', 'Investigate and verify', 'Automated tests, log analysis and code review during implementation.'],
    ['Delivery and maintenance', 'Software in production', 'Git, Docker and GitHub Actions; fixes and ongoing product improvements.'],
  ],
};

function withCapabilities(base, language) {
  const result = { ...base };
  capabilities[language].forEach(([title, pain, text], i) => {
    result[`svc_${i + 1}_title`] = title;
    result[`svc_${i + 1}_pain`] = pain;
    result[`svc_${i + 1}_text`] = text;
  });
  return result;
}

export const PROFILE_COPY = {
  freelance: { pt: {}, en: {} },
  backend: {
    pt: withCapabilities({ ...recruiterPt, page_title: 'João Vitor | Desenvolvedor Backend · Node.js e APIs', page_description: 'Portfólio backend de João Vitor: Node.js, TypeScript, APIs REST, dados relacionais e integrações. Projetos e currículo direcionado.', hero_meta_left: 'Desenvolvedor\nBackend', hero_role: 'Backend, APIs e integrações que sustentam produtos reais', hero_text: 'Desenvolvo APIs em Node.js e TypeScript, autenticação, permissões e integrações com serviços externos. Nos projetos, cuido de dados, webhooks, testes e manutenção em produção.', projects_lead: 'Seleção com foco em backend: APIs, dados, autenticação e integrações. Os projetos mostram também a interface que consome esses serviços.' }, 'pt'),
    en: withCapabilities({ ...recruiterEn, page_title: 'João Vitor | Backend Developer · Node.js and APIs', page_description: 'Backend portfolio: Node.js, TypeScript, REST APIs, relational data and integrations. Projects and focused resume.', hero_meta_left: 'Backend\nDeveloper', hero_role: 'Backend, APIs and integrations behind real products', hero_text: 'I develop Node.js and TypeScript APIs, authentication, permissions and integrations. My project work covers data, webhooks, tests and production maintenance.', projects_lead: 'A backend-focused selection covering APIs, data, authentication and integrations, alongside the interfaces consuming these services.' }, 'en'),
  },
  fullstack: {
    pt: withCapabilities({ ...recruiterPt, page_title: 'João Vitor | Desenvolvedor Full Stack · React e Node.js', page_description: 'Portfólio full stack de João Vitor: React, Node.js, TypeScript, sistemas web e mobile. Projetos completos e currículo.', hero_meta_left: 'Desenvolvedor\nFull Stack', hero_role: 'Da interface ao banco de dados, produtos completos', hero_text: 'Desenvolvo interfaces em React, APIs em Node.js e aplicações mobile com React Native. Conecto experiência do usuário, regras de negócio, dados e integrações até a publicação.', projects_lead: 'Sistemas web, e-commerce, interfaces e mobile. A seleção prioriza produtos em que conecto frontend, backend e dados.' }, 'pt'),
    en: withCapabilities({ ...recruiterEn, page_title: 'João Vitor | Full Stack Developer · React and Node.js', page_description: 'Full stack portfolio: React, Node.js, TypeScript, web and mobile applications. Complete projects and resume.', hero_meta_left: 'Full Stack\nDeveloper', hero_role: 'Complete products, from interface to database', hero_text: 'I build React interfaces, Node.js APIs and React Native mobile applications, connecting user experience, business rules, data and integrations through deployment.', projects_lead: 'Web systems, e-commerce, interfaces and mobile. This selection prioritizes products connecting frontend, backend and data.' }, 'en'),
  },
};
