export const navigation = [
  { href: "#uvod", label: "Úvod" },
  { href: "#kde-a-kdy", label: "Kde a kdy" },
  { href: "#osoby", label: "Osoby" },
  { href: "#harmonogram", label: "Harmonogram" },
  { href: "#v-kostce", label: "Kde se uvidíme" },
  { href: "#rsvp", label: "Formulář" },
];

export const timeline = [
  {
    time: "12:00",
    title: "Obřad",
    text: "Sejdeme se v kostele Povýšení sv. Kříže ve Strání a řekneme si své ano.",
  },
  {
    time: "13:30",
    title: "Oběd",
    text: "Po přesunu do Květné společně usedneme ke sváteční tabuli.",
  },
  {
    time: "14:30",
    title: "Krájení dortu",
    text: "Dáme si dort, kávu a chvíli na sladké zastavení s rodinou i přáteli.",
  },
  {
    time: "15:00",
    title: "Společné focení",
    text: "Najdeme si chvíli na společné fotografie a hezké vzpomínky.",
  },
  {
    time: "17:00",
    title: "Dětská diskotéka",
    text: "Pro malé hosty přijde čas na tanec, hudbu a zábavu.",
  },
  {
    time: "18:00",
    title: "Party",
    text: "Hudba, přípitky, tanec a všechno hezké, co k takovému dni patří.",
  },
];

export const details = [
  {
    label: "Datum a čas obřadu",
    value: "5. září 2026 ve 12:00",
  },
  {
    label: "Místo obřadu",
    value: "Kostel Povýšení sv. Kříže ve Strání",
  },
  {
    label: "Hostina",
    value: "Restaurace Kavárna Květná",
  },
  {
    label: "Parkování",
    value: "Parkoviště Sklárny Květná",
  },
];

export const highlights = [
  {
    title: "Dress code",
    text: "Dress code necháváme na vás. Potěší nás ale, pokud se sladíte do barev naší svatby: vínová a pudrově růžová.",
  },
  {
    title: "Tip na dárek",
    text: "Nějaký ten pátek žijeme už společně, proto nové sklenky jsou pro nás již zbytečné. Chcete-li nás obdarovat, přispějte nám raději na cestu, kde si ženich užije svoji milou nevěstu.",
  },
  {
    title: "Malá prosba",
    text: "Pro zachování synova soukromí prosíme o nezveřejňování jeho fotek na sociálních sítích. Děkujeme.",
  },
];

export const mapCards = {
  ceremony: {
    label: "Obřad",
    title: "Kostel Povýšení sv. Kříže",
    href: "https://www.google.com/maps/place/%C5%98%C3%ADmskokatolick%C3%A1+farnost+Str%C3%A1n%C3%AD/@48.9035576,17.6974566,2770m/data=!3m1!1e3!4m6!3m5!1s0x47135cae3283fc2d:0xf1900feacc846c82!8m2!3d48.9036134!4d17.7020577!16s%2Fg%2F11g0g4s3f8?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D",
    embedSrc:
      "https://www.google.com/maps?q=48.9036134,17.7020577&z=15&output=embed",
    frameTitle: "Obřad na Google Maps",
    buttonLabel: "Otevřít v Google Maps",
  },
  reception: {
    label: "Oslava",
    title: "Kavárna Květná",
    href: "https://www.google.com/maps/place/Restarurace+KAV%C3%81RNA+Kv%C4%9Btn%C3%A1/@48.8859726,17.7087622,2325m/data=!3m1!1e3!4m10!1m2!2m1!1zUmVzdGF1cmFjZSBrYXbDoXJuYSBLdsSbdG7DoQ!3m6!1s0x47135b649aad93bf:0x45b305dcd48d0dcb!8m2!3d48.8850824!4d17.720766!15sChxSZXN0YXVyYWNlIGthdsOhcm5hIEt2xJt0bsOhWh4iHHJlc3RhdXJhY2Uga2F2w6FybmEga3bEm3Ruw6GSAQpyZXN0YXVyYW50mgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIxYWRFNXNPVlpSTWpseFRUQmFjbHBWY0U5VVZrcHFXa1JrYWxReFJSQULgAQD6AQUI5QEQKw!16s%2Fg%2F11fmx0vy5h?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D",
    embedSrc:
      "https://www.google.com/maps?q=48.8850824,17.720766&z=16&output=embed",
    frameTitle: "Oslava na Google Maps",
    buttonLabel: "Otevřít v Google Maps",
  },
};

export const witnessPhotos: Record<string, string> = {
  Terka: "/Terka.png",
  Patrik: "/Paťa.png",
};

export const contacts = [
  {
    role: "Svědkyně nevěsty",
    name: "Terka",
    description: "Prořízlá pusa, ostrý humor, měkké zlaté srdce.",
  },
  {
    role: "Svědek ženicha",
    name: "Patrik",
    description: "Tabulka v hlavě, klid v duši, plán na všechno.",
  },
];

export const drivers = [
  {
    name: "Jenda",
    phone: "+420 777 111 222",
  },
  {
    name: "Tonda",
    phone: "+420 777 333 444",
  },
];
