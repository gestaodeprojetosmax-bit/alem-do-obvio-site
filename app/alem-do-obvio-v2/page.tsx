import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { effectsCss } from './effects';

export default function Variacao() {
  return <SalesPage html={salesPageHtml + effectsCss} animated="v2" />;
}
