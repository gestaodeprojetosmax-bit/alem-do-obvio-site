import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./form.css";
export const metadata: Metadata = {
 title: "O Próximo Nível — Masterclass com Dr. Ritchie",
 description: "Posicionamento, percepção de valor e comercial para profissionais de Harmonização Facial. 08/10, às 21h.",
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
 openGraph: { type: "website", locale: "pt_BR", title: "O Próximo Nível — Masterclass com Dr. Ritchie", description: "Por que seus pacientes perguntam o preço e somem? Ao vivo, 08/10 às 21h." }
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="pt-BR"><head><Script id="trackserver-hub" strategy="beforeInteractive">{`(function(t,s){
window.TS=window.TS||function(){(TS.q=TS.q||[]).push(arguments)};
TS('init','c96445e5-ba80-400d-82f6-2218d9fc8736',{ pixelId:'', endpoint:'https://s.api.wapptrack.com.br' });
var j=document.createElement('script');j.async=1;
j.src='https://s.api.wapptrack.com.br/t.js?id=c96445e5-ba80-400d-82f6-2218d9fc8736';document.head.appendChild(j);
})(window,document);`}</Script></head><body>{children}</body></html>;
}
