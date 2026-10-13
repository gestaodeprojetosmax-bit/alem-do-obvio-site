import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV4 } from '../alem-do-obvio-v2/effects';

export default function VariacaoUiUxProMax() {
  return <SalesPage html={salesPageHtml + cssV4} animated="v4" />;
}
