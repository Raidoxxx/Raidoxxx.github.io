"""Rebuild the portfolio's main resume. Requires reportlab; uses Windows Arial."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/assets/cv.pdf'
for name, file in [('Arial', 'arial.ttf'), ('Arial-Bold', 'arialbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(Path('C:/Windows/Fonts') / file)))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold', italic='Arial', boldItalic='Arial-Bold')
INK = colors.HexColor('#172337')
BLUE = colors.HexColor('#205B79')
MUTED = colors.HexColor('#526172')
styles = {
    'name': ParagraphStyle('name', fontName='Arial-Bold', fontSize=23, leading=28, textColor=INK, spaceAfter=3),
    'role': ParagraphStyle('role', fontName='Arial-Bold', fontSize=11.5, leading=16, textColor=BLUE, spaceAfter=7),
    'contact': ParagraphStyle('contact', fontName='Arial', fontSize=9, leading=13, textColor=MUTED),
    'section': ParagraphStyle('section', fontName='Arial-Bold', fontSize=9.5, leading=13, textColor=BLUE, spaceBefore=13, spaceAfter=6, keepWithNext=True),
    'title': ParagraphStyle('title', fontName='Arial-Bold', fontSize=10, leading=14, textColor=INK, spaceAfter=2, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName='Arial', fontSize=9, leading=12.5, textColor=MUTED, spaceAfter=5, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Arial', fontSize=9.5, leading=13.5, textColor=INK, spaceAfter=4, alignment=TA_LEFT),
    'bullet': ParagraphStyle('bullet', fontName='Arial', fontSize=9.5, leading=13.5, textColor=INK, leftIndent=10, firstLineIndent=-10, spaceAfter=3),
}
story = []
def p(text, style='body'):
    story.append(Paragraph(text, styles[style]))
def section(title):
    p(title, 'section')
def bullet(text):
    p('•  ' + text, 'bullet')

p('João Vitor Gomes Martins', 'name')
p('DESENVOLVEDOR FULL STACK | React · Node.js · TypeScript', 'role')
p('Rio Claro, SP · (19) 99186-7596 · <link href="mailto:joaovitorgomesmartins01@gmail.com">joaovitorgomesmartins01@gmail.com</link>', 'contact')
p('<link href="https://raidoxxx.github.io">raidoxxx.github.io</link> · <link href="https://github.com/Raidoxxx">github.com/Raidoxxx</link> · <link href="https://linkedin.com/in/joaovitorgomesmartins">linkedin.com/in/joaovitorgomesmartins</link>', 'contact')
section('PERFIL PROFISSIONAL')
p('Desenvolvedor com experiência prática em aplicações web, APIs REST e integrações de serviços. Atuação no desenvolvimento e manutenção do Gestão de Demandas, conectando interfaces em React, backend em Node.js e dados relacionais. Experiência profissional em suporte técnico e infraestrutura de TI; graduando em Ciência da Computação.')
section('PROJETOS DE DESENVOLVIMENTO')
p('Gestão de Demandas | Plataforma SaaS', 'title')
p('Desenvolvimento full stack · Fev. 2025 - atual', 'meta')
bullet('Desenvolvimento de interfaces em React e TypeScript, com dashboards, formulários públicos, filtros, histórico de solicitações e mapas interativos com Leaflet.')
bullet('Criação de APIs REST em Node.js e Express, com autenticação, equipes, permissões e múltiplos workspaces; modelagem e persistência em PostgreSQL/SQLite com Sequelize.')
bullet('Integração de assinaturas com Mercado Pago, serviços da OpenAI e armazenamento Cloudflare R2/S3; comunicação em tempo real com Socket.IO.')
bullet('Manutenção de frontend e backend, correção de falhas, refatoração, testes de fluxos e versionamento com Git/GitHub.')
story.append(Spacer(1, 5))
p('TSO | Plataforma competitiva multijogo', 'title')
p('Projeto de desenvolvimento · Jan. 2026 - atual', 'meta')
bullet('Construção de funcionalidades para ligas, filas, partidas, rankings e perfis de jogadores, com API Node.js/Express e PostgreSQL.')
bullet('Integração de identidade com OCR, Steam OpenID e Riot Sign On; comunicação com bot Discord via WebSocket.')
bullet('Uso de transações e locks para proteger as atualizações de classificação contra operações duplicadas.')
section('EXPERIÊNCIA PROFISSIONAL')
p('Estagiário de Tecnologia da Informação', 'title')
p('Câmara Municipal de Itanhaém · Itanhaém, SP · Jun. 2025 - abr. 2026', 'meta')
bullet('Atendimento a usuários, diagnóstico e solução de problemas de hardware, software e sistemas internos; registro e acompanhamento de solicitações técnicas.')
bullet('Instalação e configuração de computadores, sistemas, drivers e periféricos; apoio a redes locais, conectividade e infraestrutura de TI.')
section('COMPETÊNCIAS TÉCNICAS')
p('<b>Frontend:</b> React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS.<br/><b>Backend e integrações:</b> Node.js, Express, APIs REST, WebSocket, Socket.IO, JWT, OAuth 2.0.<br/><b>Dados e ferramentas:</b> PostgreSQL, SQLite, MySQL, SQL, Sequelize, Git, GitHub, Docker.', 'body')
section('FORMAÇÃO ACADÊMICA')
p('Bacharelado em Ciência da Computação', 'title')
p('Universidade Digital Descomplica · Início em set. 2022 · Conclusão prevista em 2026', 'body')

def page(canvas, doc):
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2)
    canvas.line(40, A4[1] - 31, A4[0] - 40, A4[1] - 31)
    canvas.setTitle('João Vitor Gomes Martins | Desenvolvedor Full Stack')
    canvas.setAuthor('João Vitor Gomes Martins')
    canvas.setSubject('Currículo profissional - desenvolvimento de software')

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=40, leftMargin=40, topMargin=42, bottomMargin=32)
doc.build(story, onFirstPage=page, onLaterPages=page)
print(OUTPUT)
