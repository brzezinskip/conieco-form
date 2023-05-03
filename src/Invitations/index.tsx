
export interface IInvitationsConfig {
  [key: string]: InvitationConfig
}

interface FolderQuestions {
  colors: string[], decorations: string[]
}

export interface InvitationConfig {
  decoration: string[] | null;
  envelopeDecoration: string[] | null;
  softEnvelopeColors: string[] | null;
  hardEnvelopeColors: string[] | null;
  softTouch: boolean;
  folderQuestions: FolderQuestions | null;
}

export function getInvitationNames(): Array<{ value: string, label: string }> {
  const capitalize = (s: string) => {
    const firstLetter = s.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = s.slice(1);

    return `${firstLetterCap}${remainingLetters}`;
  }

  return Object.keys(InvitationsConfig)
    .map((value) => ({ value, label: value.split("-").map(capitalize).join(" ") }))
    .sort((a, b) => a.value < b.value ? -1 : 1);
}

export function invitationHasFolder(invitation: InvitationConfig | undefined) {
  return invitation?.folderQuestions;
}

function slugify(s: string) {
  return s.replace(/ *\([^)]*\) */g, '')
    .toLowerCase()
    .replace(/[^\wł]+/g, '-');
}

export function listToQuestions(xs: string[] | undefined) {
  return xs ? xs.map(x => ({ value: slugify(x), label: x })) : []
}

export function listOfColors(xs: string[] | undefined) {
  return xs ? [...listToQuestions(xs), { value: "inny", label: "Inny" }] : []
}

const InvitationsConfig: IInvitationsConfig = {
  "waves": {
    decoration: ["Folder z ażurowym monogramem (6 zł)"],
    envelopeDecoration: ["Wkładka do koperty z ażurowym monogramem (4,5 zł)", "Nadruk na kopercie (2 - 3 zł)"],
    softEnvelopeColors: ["Beżowa", "Cynamonowa", "Lawendowa"],
    hardEnvelopeColors: null,
    softTouch: false,
    folderQuestions: null
  },
  "minimal": {
    decoration: ["Tłoczenie na karcie RSVP (0,5 zł)"],
    envelopeDecoration: ["Tłoczenie monogramu (4 zł)", "Wkładka do koperty (4 zł)"],
    softEnvelopeColors: ["Jasnoszara", "Czarna"],
    hardEnvelopeColors: null,
    softTouch: true,
    folderQuestions: null
  },
  "line": {
    decoration: ["Ręczne złocenie zaproszenia (4 zł)", "Transparentna obwoluta ze złotą nitką (4 zł)", "Złote kółeczko (2 zł)"],
    envelopeDecoration: ["Ręczne złocenie koperty (4 zł)", "Wkładka do koperty (4 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: ["Migdałowa"],
    hardEnvelopeColors: ["Migdałowa"],
    softTouch: false,
    folderQuestions: null
  },
  "aurora": {
    decoration: ["Jedwabna wstążka (4 zł)", "Szkic/ilustracja miejsca ślubu/wesela (300 - 600 zł)"],
    envelopeDecoration: ["Wkładka do koperty z papieru standardowego (proste krawędzie) (4 zł)", "Wkładka do koperty (6 zł)", "Nadruk na kopercie (2 zł - 4 zł)", "Odbicie lakowe (4 zł)", "Personalizowana pieczęć lakowa (350 zł)"],
    softEnvelopeColors: ["Beżowa", "Biała"],
    hardEnvelopeColors: ["Beżowa", "Ciemnobeżowa o matowej strukturze"],
    softTouch: false,
    folderQuestions: null
  },
  "snow-white": {
    decoration: ["Wstążka ręcznie rwana (3,5 zł)"],
    envelopeDecoration: ["Odbicie lakowe (4 zł)", "Wkładka do koperty (4 zł)", "Nadruk na kopercie (2 zł - 4 zł)"],
    softEnvelopeColors: ["Jasnoszara"],
    hardEnvelopeColors: ["Jasnoszara"],
    softTouch: false,
    folderQuestions: null
  },
  "frame": {
    decoration: null,
    envelopeDecoration: ["Transparentna opaska (2,5 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: null,
    hardEnvelopeColors: ["Beżowa", "Czarna", "Ciemnobeżowa o matowej strukturze"],
    softTouch: false,
    folderQuestions: null
  },
  "canela": {
    decoration: ["Jedwabna wstążka (4,5 zł)", "Folder z zadrukiem (5,5 zł)"],
    envelopeDecoration: ["Nadruk na kopercie (2,5 zł - 3 zł)"],
    softEnvelopeColors: ["Beżowa", "Cynamonowa"],
    hardEnvelopeColors: ["Beżowa"],
    softTouch: false,
    folderQuestions: null
  },
  "sophie": {
    decoration: null,
    envelopeDecoration: ["Nadruk na kopercie (2 zł - 4 zł)", "Wkładka do koperty (4 zł)", "Zamknięcie koperty bawełnianym sznureczkiem (1 zł)"],
    softEnvelopeColors: ["Beżowa"],
    hardEnvelopeColors: ["Beżowa", "Ciemnobeżowa o matowej strukturze"],
    softTouch: false,
    folderQuestions: null
  },
  "blossom": {
    decoration: ["Transparentna obwoluta ze złotym sznureczkiem lub naklejką (4 zł)"],
    envelopeDecoration: ["Etykieta z monogramem na kopertę (1,5 zł)", "Złote kółeczko z chwostem (6 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: ["Nude (metalizowana)"],
    hardEnvelopeColors: ["Szara", "Biała"],
    softTouch: false,
    folderQuestions: null
  },
  "art-of-love": {
    decoration: ["Złoty dekor przewiązany złotym sznurkiem (2 zł)"],
    envelopeDecoration: ["Naklejka na kopertę z monogramem (2 zł)", "Wkładka do koperty (4 zł)", "Odbicie lakowe (4 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: ["Beżowa"],
    hardEnvelopeColors: ["Ciemnobeżowa o matowej strukturze", "Beżowa", "Czarna"],
    softTouch: false,
    folderQuestions: null
  },
  "juliette-paris": {
    decoration: ["Złoty sznurek (1 zł)", "Złoty sznurek z kółeczkiem (2,5 zł)", "Złoty sznurek z kółeczkiem i chwostem (6,5 zł)", "Odbicie lakowe (4 zł)"],
    envelopeDecoration: ["Złoty sznurek (1 zł)", "Złoty sznurek z kółeczkiem (2,5 zł)", "Złoty sznurek z kółeczkiem i chwostem (6 zł)", "Odbicie lakowe (4 zł)", "Nadruk monogramu na kopercie (2,5 zł)"],
    softEnvelopeColors: ["Nude (metalizowana)", "Głęboka zieleń"],
    hardEnvelopeColors: null,
    softTouch: true,
    folderQuestions: null
  },
  "juliette-roma": {
    decoration: null,
    envelopeDecoration: ["Złoty sznurek (1 zł)", "Złoty sznurek z kółeczkiem (2,5 zł)", "Złoty sznurek z kółeczkiem i chwostem (6 zł)", "Odbicie lakowe (4 zł)", "Nadruk monogramu na kopercie (2,5 zł - 3,5 zł)"],
    softEnvelopeColors: ["Nude (metalizowana)", "Głęboka zieleń"],
    hardEnvelopeColors: null,
    softTouch: true,
    folderQuestions: { colors: ["Nude (metalizowany)", "Głęboka zieleń"], decorations: ["Złoty sznurek (1 zł)", "Złoty sznurek z kółeczkiem (2,5 zł)", "Złoty sznurek z kółeczkiem i chwostem (6 zł)", "Odbicie lakowe (4 zł)"] },
  },
  "dune": {
    decoration: null,
    envelopeDecoration: ["Nadruk na kopercie (3 zł - 5 zł)", "Wkładka do koperty 4 zł", "Wkładka do koperty złocona 5 zł"],
    softEnvelopeColors: ["Nude (metalizowana)", "Czarna"],
    hardEnvelopeColors: ["Czarna"],
    softTouch: true,
    folderQuestions: null,
  },
  "classy": {
    decoration: null,
    envelopeDecoration: ["Zamknięcie koperty kółeczkiem i chwostem (6 zł)", "Nadruk na kopercie (2,5 zł - 3,5 zł)", "Ozdobny pasek z imionami pary młodej na kopercie (2 zł)", "Odbicie lakowe (4 zł)", "Złocona wkładka do koperty (6 zł)"],
    softEnvelopeColors: ["Różowa perłowa", "Złota"],
    hardEnvelopeColors: ["Złota"],
    softTouch: true,
    folderQuestions: null,
  },
  "just-gold": {
    decoration: null,
    envelopeDecoration: ["Zamknięcie koperty złotym sznureczkiem ?????", "Zamknięcie koperty na magnes (2 zł)", "Zamknięcie koperty na magnes z chwostem (5,5 zł)", "Wkładka do koperty złocona (6 zł)", "Odbicie lakowe (4 zł)"],
    softEnvelopeColors: ["Złota", "Czarna"],
    hardEnvelopeColors: ["Złota", "Czarna"],
    softTouch: true,
    folderQuestions: { colors: ["Złoty", "Srebrny"], decorations: ["Zamknięcie folderu na magnes (2 zł)", "Zamknięcie folderu na magnes z chwostem (5,5 zł)", "Odbicie lakowe (4 zł)"] },
  },
  "elusive-beige": {
    decoration: null,
    envelopeDecoration: ["Zamknięcie na magnes (2 zł) (wybrane koperty)", "Chwost (4 zł)", "Wkładka do koperty drukowana (4 zł)", "Wkładka do koperty złocona (5 zł)"],
    softEnvelopeColors: ["Czarna", "Złota metalizowana"],
    hardEnvelopeColors: ["Czarna", "Złota metalizowana"],
    softTouch: true,
    folderQuestions: null,
  },
  "pure-love": {
    decoration: null,
    envelopeDecoration: ["Naklejhka na kopertę z imionami pary młodej (2 zł)", "Wkładka do koperty (4 zł)"],
    softEnvelopeColors: ["Beżowa", "Transparentna"],
    hardEnvelopeColors: ["Beżowa"],
    softTouch: false,
    folderQuestions: null
  },
  "marseille": {
    decoration: ["Wstążka jedwabna (2,5 zł)", "Transparentna karta RSVP (4 zł)"],
    envelopeDecoration: ["Naklejka na kopertę z imionami pary młodej (2 zł)", "Odbicie lakowe (4 zł)", "Wkładka do koperty (4 zł)"],
    softEnvelopeColors: ["Beżowa", "Rubinowa"],
    hardEnvelopeColors: ["Beżowa"],
    softTouch: false,
    folderQuestions: null
  },
  "royal": {
    decoration: null,
    envelopeDecoration: null,
    softEnvelopeColors: ["Jasno szara"],
    hardEnvelopeColors: ["Jasno szara"],
    softTouch: true,
    folderQuestions: { colors: ["Off-white"], decorations: ["Zamknięcie folderu na magnes (2 zł)", "Chwost (4 zł)"] },
  },
  "black-velvet": {
    decoration: ["Aaksamitka (2 zł)", "Odbicie lakowe (4 zł)"],
    envelopeDecoration: ["Wkładka do koperty drukowana (4 zł)", "Wkładka do koperty złocona (6 zł)"],
    softEnvelopeColors: ["Czarna"],
    hardEnvelopeColors: ["Czarna"],
    softTouch: true,
    folderQuestions: null,
  },
  "romance": {
    decoration: ["Wstążka jedwabna/szyfonowa (4 zł)"],
    envelopeDecoration: ["Odbicie lakowe (4 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: ["Transparentna bez klapy", "Brudny róż", "Rubinowa"],
    hardEnvelopeColors: null,
    softTouch: false,
    folderQuestions: null,
  },
  "smooth-glam": {
    decoration: null,
    //jaka koperta - klasyczna czy kieszeniowa (pionowa)
    envelopeDecoration: ["Wkładka do koperty drukowana (4 zł)", "Wkładka do koperty złocona (6 zł)"], //tylko do klasycznej
    softEnvelopeColors: ["Złota metalizowana", "Srebrna metalizowana", "Jasno szara"], //klasyczna
    hardEnvelopeColors: ["Złota metalizowana", "Srebrna metalizowana", "Piaskowa szarość"], //kieszeniowa
    softTouch: true,
    folderQuestions: null,
  },
  "boarding-pass": {
    //folder czy nie
    decoration: ["Karta dodatkowa RSVP (4 - 6 zł)"],
    envelopeDecoration: ["Zamknięcie koperty złotym/srebrnym sznureczkiem (1 zł)", "Nadruk na kopercie (2,5 zł - 4 zł)"],
    softEnvelopeColors: ["Granat", "Czarny", "Beżowo-złoty", "Srebrny"],
    hardEnvelopeColors: ["Granat", "Czarny", "Beżowo-złoty", "Srebrny"],
    softTouch: true,
    folderQuestions: { colors: ["Granat", "Czarny", "Beżowo-złoty", "Srebrny"], decorations: ["Papierowa opaska ze złoceniem (3 zł)", "Zamknięcie folderu złotym/srebrnym sznureczkiem (1 zł)"] },
  },
  "elisa": {
    decoration: ["Opaska z papieru transparentnego z różą (3,5 zł)", "Transparentna obwoluta ze złotą nitką (4 zł)", "Ręcznie rwana szyfonowa wstążka (3 zł)", "Odbicie lakowe (4 zł)"],
    envelopeDecoration: ["Wkładka do koperty (4 zł)"],
    softEnvelopeColors: ["Transparentna", "Ecru z deliktanymi drobinkami", "Beżowa metalizowana"],
    hardEnvelopeColors: ["Ecru z deliktanymi drobinkami", "Beżowa metalizowana"],
    softTouch: false,
    folderQuestions: null
  },
}

export default InvitationsConfig;
