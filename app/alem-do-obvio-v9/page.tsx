import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV9 } from '../alem-do-obvio-v2/effects';

export default function VariacaoSkill9() {
  return <SalesPage html={salesPageHtml + cssV9} animated="v9" />;
}
