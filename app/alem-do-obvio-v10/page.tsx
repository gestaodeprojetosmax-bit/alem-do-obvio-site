import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV10 } from '../alem-do-obvio-v2/effects';

export default function VariacaoSkill10() {
  return <SalesPage html={salesPageHtml + cssV10} animated="v10" />;
}
