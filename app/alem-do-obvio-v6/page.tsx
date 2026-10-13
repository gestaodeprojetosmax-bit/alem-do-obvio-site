import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV6 } from '../alem-do-obvio-v2/effects';

export default function VariacaoReferencia6() {
  return <SalesPage html={salesPageHtml + cssV6} animated="v6" />;
}
