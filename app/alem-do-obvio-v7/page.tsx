import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV7 } from '../alem-do-obvio-v2/effects';

export default function VariacaoReferencia7() {
  return <SalesPage html={salesPageHtml + cssV7} animated="v7" />;
}
