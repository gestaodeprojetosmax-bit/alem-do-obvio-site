import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV5 } from '../alem-do-obvio-v2/effects';

export default function VariacaoReferencia5() {
  return <SalesPage html={salesPageHtml + cssV5} animated="v5" />;
}
