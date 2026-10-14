import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV12 } from '../alem-do-obvio-v2/effects';

/* Ordem nova: topo, quem já viveu, não é mais um curso, três dias, quem conduz, o que vai viver, a experiência, faz sentido para você, incluído, investimento, perguntas. */
function reordenar(html: string): string {
  const p = html.split(/(?=<section)/);
  if (p.length !== 11) return html;
  const [head, naoCurso, experiencia, aprender, tresDias, conduz, viveu, voce, incluido, investimento, perguntas] = p;
  const faixa = '<div class="qbar">Imersão para profissionais da harmonização facial</div>';
  const topo = head.replace('<div class="topbg">', faixa + '<div class="topbg">');
  return [topo, viveu, naoCurso, tresDias, conduz, aprender, experiencia, voce, incluido, investimento, perguntas].join('');
}

export default function Variacao12() {
  return <SalesPage html={reordenar(salesPageHtml) + cssV12} />;
}
