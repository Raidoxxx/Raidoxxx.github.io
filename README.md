# Portfólio — João Vitor

Site em React + Vite para **https://raidoxx.com.br**, com layout responsivo,
idiomas português/inglês, FAQ e formulário que prepara mensagens para WhatsApp ou e-mail.

## Versões do portfólio

- `/?perfil=freelance`: serviços, projetos para clientes e orçamento (versão padrão).
- `/?perfil=backend`: APIs, dados, integrações e currículo de backend.
- `/?perfil=fullstack`: interfaces, APIs, produtos completos e currículo full stack.

O seletor no cabeçalho atualiza o link compartilhável. A versão é definida pelo
link, sem depender de preferências salvas. Os botões de currículo em Backend e
Full Stack abrem PDFs em português, copiados da pasta de currículos do autor.
Os temas e o idioma funcionam em todas as versões.

## Desenvolvimento local

Use Node.js 20.19+ ou 22.12+.

```sh
npm ci
npm run dev
```

## Build e prévia

```sh
npm run build
npm run preview
```

Publique o conteúdo de `dist/` em uma hospedagem estática. O servidor de desenvolvimento
e a prévia são locais; não são servidores de produção.

## Estrutura

- `src/components/`: cabeçalho, seções e rodapé.
- `src/components/ui.jsx`: peças visuais compartilhadas (marca-texto, borda
  rasgada e fitas animadas).
- `src/angel.js` + `src/components/AsciiAngel.jsx`: anjo 3D em ASCII da seção
  "Sobre". A silhueta e a textura vêm de `src/angel-map.js` (densidade dos
  caracteres da imagem de referência, gerada uma vez por script); `angel.js`
  transforma esse mapa em volume e o renderiza com z-buffer e iluminação.
- `src/components/HalftoneLight.jsx` e `HalftoneAngel.jsx`: luz (canto superior
  direito) e anjo estático (canto inferior esquerdo) do topo, desenhados em
  retícula num `<canvas>`.
- `src/SiteContext.jsx`: idioma, menu e indicadores de navegação.
- `src/translations.js`: textos em português e inglês.
- `src/useLeadForm.js`: validação e preparação das mensagens.
- `src/styles.css`: estilos e responsividade.
- `public/`: imagens, currículo, favicon e `CNAME`.
- `index.html`: metadados, compartilhamento e dados estruturados.

## Domínio e hospedagem

Os metadados e o arquivo `public/CNAME` já usam `raidoxx.com.br`. Isso não altera
DNS nem publica o site. Conecte o domínio na hospedagem escolhida e configure
os registros DNS conforme as instruções desse provedor.

Se continuar no GitHub Pages, selecione **GitHub Actions** em Settings → Pages.
O workflow `.github/workflows/deploy.yml` executa `npm ci` e `npm run build` e
publica `dist/` a cada push na `main`. O `CNAME` será copiado para o build. Em outras hospedagens, configure o comando
de build como `npm run build` e o diretório de saída como `dist`.

O formulário não usa backend nem armazena mensagens: o visitante confirma o
envio no WhatsApp ou no aplicativo de e-mail.
