import SalesPage from '../sales-page';
import { salesPageHtml } from '../alem-do-obvio/source';
import { cssV8 } from '../alem-do-obvio-v2/effects';

export default function VariacaoSkill8() {
  return <SalesPage html={salesPageHtml + cssV8} animated="v8" />;
}
