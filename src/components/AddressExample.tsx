import { useState } from "react";
import type { Language, Lesson } from "../types";

export default function AddressExample({ lang, lesson }: { lang: Language; lesson: Lesson }) {
  const [showNumbers, setShowNumbers] = useState(false);
  const ml = lang === "ml";
  const word = lesson.words.find(w => w.text === lesson.focus_word) || lesson.words[0];
  return <section className="address-example" aria-labelledby="address-heading">
    <h2 id="address-heading">{ml ? "ഒരു സ്ഥലത്തിന് രണ്ട് വിലാസങ്ങൾ!" : "One place, two kinds of address!"}</h2>
    <p>{ml ? "ഒരു കൂട്ടുകാരന് സ്ഥലം പറഞ്ഞുകൊടുക്കാൻ പേരും വിലാസവും ഉപയോഗിക്കാം. മാപ്പിന് അതേ സ്ഥലം രണ്ട് അക്കങ്ങൾ കൊണ്ട് കാണിക്കാം." : "Tell a friend a place’s name and address. A map can locate that place using two numbers."}</p>
    <div className="address-place"><span aria-hidden="true">📍</span><strong>{ml ? "പ്രിൻസസ് സ്ട്രീറ്റ്" : "Princess Street"}</strong><p>{ml ? "ഫോർട്ട് കൊച്ചി, എറണാകുളം, കേരളം, ഇന്ത്യ" : "Fort Kochi, Ernakulam, Kerala, India"}</p></div>
    <button className="primary" aria-expanded={showNumbers} aria-controls="map-address-numbers" onClick={() => setShowNumbers(!showNumbers)}>{ml ? (showNumbers ? "അക്കവിലാസം മറയ്ക്കാം" : "ഇതിന്റെ അക്കവിലാസം കാണാം!" ) : (showNumbers ? "Hide the number address" : "Show its number address!")}</button>
    <div id="map-address-numbers" hidden={!showNumbers}>
      <div className="address-pair">
        <article><h3>Latitude · അക്ഷാംശം</h3><strong>9.9675° N</strong><p>{ml ? "ഭൂമധ്യരേഖയിൽ നിന്ന് എത്ര വടക്കോ തെക്കോ? ഇവിടെ N എന്നാൽ വടക്ക്." : "How far north or south of the equator? N means north."}</p></article>
        <article><h3>Longitude · രേഖാംശം</h3><strong>76.2443° E</strong><p>{ml ? "ഗ്രീനിച്ചിലെ 0° രേഖയിൽ നിന്ന് എത്ര കിഴക്കോ പടിഞ്ഞാറോ? ഇവിടെ E എന്നാൽ കിഴക്ക്." : "How far east or west of the 0° line at Greenwich? E means east."}</p></article>
      </div>
      <p className="address-result">📍 [9.9675° N, 76.2443° E] → {ml ? "പ്രിൻസസ് സ്ട്രീറ്റിലെ ഒരു സ്ഥാനം" : "A point on Princess Street"}</p>
      <p className="fine-print">{ml ? "ചുരുക്കി എഴുതിയ coordinates. ഒരു തെരുവിന് നീളമുണ്ട്; ഈ അക്കങ്ങൾ അതിലെ ഒരു സ്ഥാനമാണ് കാണിക്കുന്നത്." : "Rounded coordinates. A street stretches over an area; these numbers mark one point on it."} <a href="https://www.keralatourism.org/french/destination/princess-street-fort-kochi/176" target="_blank" rel="noreferrer">Kerala Tourism ↗</a></p>
    </div>
    <div className="word-address"><h3>{ml ? "ഇനി ഒരു വാക്കിന്റെ അക്കവിലാസം നോക്കാം" : "Now try a word’s number address"}</h3><p><strong>{word.text}</strong> → <code>[{word.x}, {word.y}]</code></p><p>{ml ? `ആദ്യ അക്കം ${word.x}: ${lesson.dimensions[0].name_ml}. രണ്ടാമത്തെ അക്കം ${word.y}: ${lesson.dimensions[1].name_ml}. ഈ രണ്ട് അളവുകളാണ് താഴെയുള്ള പഠനമാപ്പിൽ വാക്കിന്റെ സ്ഥാനം നിശ്ചയിക്കുന്നത്.` : `First number ${word.x}: ${lesson.dimensions[0].name_en}. Second number ${word.y}: ${lesson.dimensions[1].name_en}. These two scales place the word on our learning map below.`}</p></div>
    <p>{ml ? "ശ്രദ്ധിക്കൂ: വാക്കിന്റെ അക്കങ്ങൾ latitude, longitude അല്ല! ഒരു സ്ഥലത്തെ അക്കങ്ങൾ കൊണ്ട് കാണിക്കുന്ന ആശയം മാത്രമാണ് കടമെടുത്തത്. യഥാർത്ഥ AI വാക്കുകളെ കാണിക്കാൻ അനേകം അക്കങ്ങൾ ഉപയോഗിക്കുന്നു." : "A word’s numbers are not latitude and longitude! We are borrowing the idea of locating something with numbers. Real AI uses many numbers to represent words."}</p>
  </section>;
}
