import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV3 } from '../alem-do-obvio-v2/effects';

export default function VariacaoFrontendDesign() {
  return <SalesPage html={salesPageHtml + cssV3} animated="v3" />;
}
