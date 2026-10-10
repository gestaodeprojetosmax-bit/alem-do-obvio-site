import type { Metadata } from 'next';
import Image from 'next/image';
import LeadForm from './lead-form';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Além do Óbvio — Imersão presencial com Dr. Ritchie',
  description: 'Última turma de 2026. Três dias de imersão presencial em São Paulo, com prática em pacientes reais e supervisão do Dr. Ritchie.',
};

export default function AlemDoObvioPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/assets/alem-do-obvio-hero.jpeg" alt="Dr. Ritchie em uma sala de aula" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.heroTop}>
        <p className={styles.eyebrow}>ÚLTIMA TURMA DE 2026 <span>·</span> 12 VAGAS</p>
        <p className={styles.mobileDate}>4, 5 E 6 DEZ 2026</p>
      </div>
      <div className={styles.heroContent}>
        <p className={styles.brand}>ALÉM DO ÓBVIO</p>
        <h1>Você já acompanha o Dr. Ritchie. <em>Agora aprenda ao lado dele.</em></h1>
        <p className={styles.heroText}>4, 5 e 6 de dezembro, em São Paulo. Três dias de imersão presencial, com prática em pacientes reais e supervisão do Dr. Ritchie.</p>
        <a className={styles.primaryButton} href="#inscricao">Falar com a equipe agora <span>↓</span></a>
      </div>
      <div className={styles.heroMeta}><span>IMERSÃO PRESENCIAL</span><span>SÃO PAULO</span><span>4 — 6 DEZ 2026</span></div>
    </section>

    <section className={styles.decision}>
      <div className={styles.decisionCopy}>
        <p className={styles.sectionEyebrow}>UMA EXPERIÊNCIA PEQUENA DE PROPÓSITO</p>
        <h2>Turma pequena, <em>atenção de verdade.</em></h2>
        <p>Só 12 alunos. Você atende pelo menos 3 full faces completas, é acompanhado e discute cada decisão clínica no mesmo dia.</p>
        <p>Têmpora, glabela, nariz e crow lifting — com o raciocínio por trás de cada decisão, não apenas a técnica pronta.</p>
        <blockquote>“A técnica do Ritchie é genial, pra mim é um divisor de águas.”<cite>— Aluno da turma de agosto de 2026</cite></blockquote>
      </div>
      <div className={styles.included}>
        <p className={styles.sectionEyebrow}>O QUE ESTÁ INCLUÍDO</p>
        <ul>
          <li><span>01</span>Material e kit para a imersão</li>
          <li><span>02</span>Alimentação nos três dias</li>
          <li><span>03</span>Certificado e troféu</li>
          <li><span>04</span>Gravação disponível por 3 meses</li>
        </ul>
        <p className={styles.note}>O investimento e as condições são apresentados pela equipe no WhatsApp.</p>
      </div>
    </section>

    <section id="inscricao" className={styles.formSection}>
      <div className={styles.formIntro}>
        <p className={styles.sectionEyebrow}>PRÓXIMO PASSO</p>
        <h2>Quer saber se essa turma é para você?</h2>
        <p>Deixe seus dados. A equipe responde no WhatsApp com o investimento e as formas de pagamento.</p>
      </div>
      <LeadForm />
    </section>

    <footer className={styles.footer}>ALÉM DO ÓBVIO <span>·</span> DR. RITCHIE</footer>
  </main>;
}
