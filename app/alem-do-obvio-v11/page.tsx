import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV11 } from '../alem-do-obvio-v2/effects';

export default function Variacao11() {
  return <SalesPage html={salesPageHtml + cssV11} />;
}
