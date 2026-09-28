import { landingMarkup } from "./landing";
export default function Home() { return <div dangerouslySetInnerHTML={{__html:landingMarkup}} />; }
