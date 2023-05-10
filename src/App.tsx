import "./App.css";

import { Form, useFieldAnswer } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
registerCoreBlocks();
import InvitationsConfig, {
  getInvitationNames,
  InvitationConfig,
  invitationHasDecorations,
  invitationHasEnvelopesChoice,
  invitationHasFolder,
  listOfColors,
  listToQuestions,
} from "./Invitations";
import { FormBlock } from "@quillforms/types/src/types/form-blocks";

const translations = {
  "label.button.ok": "Ok",
  "label.hintText.enter": "Naciśnij <strong>Enter ↵</strong>",
  "label.hintText.multipleSelection": "Możesz wybrać kilka opcji.",
  "block.dropdown.placeholder": "Wpisz, lub wybierz opcję.",
  "block.dropdown.noSuggestions": "",
  "block.shortText.placeholder": "Tu wpisz odpowiedź",
  "block.longText.placeholder": "Tu wpisz odpowiedź",
  "block.longText.hint": "Naciśnij <strong>Shift ⇧ + Enter ↵ aby złamać linię",
  "block.number.placeholder": "Tu wpisz odpowiedź",
  "block.email.placeholder": "Tu wpisz adres e–mail",
  "block.defaultThankYouScreen.label":
    "Dziękujemy za wypełnienie formularza.\n\n Wkrótce się z tobą skontaktujemy",
  "label.hintText.key": "Przycisk",
  "label.progress.percent": "Ukończono {{progress:percent}}%",
  "label.errorAlert.required": "Te pole jest wymagane!",
  "label.errorAlert.date": "Nieprawidłowa data!",
  "label.errorAlert.number": "Dozwolone są tylko liczby!",
  "label.errorAlert.selectionRequired": "Wybierz minimum jedną opcję",
  "label.errorAlert.email": "Nieprawidłowy adres e-mail!",
  "label.errorAlert.url": "Nieprawidłowy adres url!",
  "label.errorAlert.range":
    "Podaj liczbę pomiędzy {{attribute:min}} i {{attribute:mac}}",
  "label.errorAlert.minNum": "Podaj liczbę większą niż {{attribute:min}}",
  "label.errorAlert.maxNum": "Podaj liczbę mniejszą niż {{attribute:max}}",
  "label.errorAlert.maxCharacters": "Osiągnięto maximum znaków",
  "label.submitBtn": "Wyślij",
};

const folderPics: { [key: string]: string } = {
  "juliette-paris":
    "https://www.coniecopapieru.com/wp-content/uploads/2019/08/podroznicze-zaproszenia-slubne_nietypowe_zlocone_travel_boarding-pass_nowoczesne_bilet-lotniczy_zlota-folia_zlocenie_co-nieco-papieru6.jpg",
  "juliette-roma":
    "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru2.jpg",
  "just-gold":
    "https://www.coniecopapieru.com/wp-content/uploads/2021/02/eleganckie-zaproszenia-slubne_nietypowe_nowoczesne_ecru_zlocone_luksusowe_oryginalne_glamour_minimalistyczne_kaligrafia_co-nieco-papieru3.jpg",
  "simple-rose":
    "https://www.coniecopapieru.com/wp-content/uploads/2021/02/eleganckie-zaproszenia-slubne_nietypowe_nowoczesne_ecru_zlocone_luksusowe_oryginalne_glamour_minimalistyczne_kaligrafia_co-nieco-papieru3.jpg",
  "boarding-pass":
    "https://www.coniecopapieru.com/wp-content/uploads/2019/08/podroznicze-zaproszenia-slubne_nietypowe_zlocone_travel_boarding-pass_nowoczesne_bilet-lotniczy_zlota-folia_zlocenie_co-nieco-papieru6.jpg",
};

function folderFinishingQuestions(invitation: InvitationConfig) {
  return {
    name: "multiple-choice",
    id: "folder-finishing",
    attributes: {
      label: "Rodzaje wykończenia folderu",
      choices: listToQuestions(invitation.folderQuestions?.decorations),
      multiple: true,
      required: false,
    },
  };
}

function folderColorQuestions(invitation: InvitationConfig) {
  return [
    {
      name: "dropdown",
      id: "folder",
      attributes: {
        label: "Kolor",
        choices: listOfColors(invitation.folderQuestions?.colors),
        required: true,
      },
    },
  ];
}

function folderQuestions(invitation: InvitationConfig, folderPic: string) {
  const showFolderQuestions = invitationHasFolder(invitation);
  const folderAnswer: string = useFieldAnswer("folder") as string;

  return showFolderQuestions
    ? [
        {
          name: "group",
          id: "folder-group",
          attributes: {
            label: "Folder",
            attachment: {
              type: "image" as "image",
              url: folderPic,
            },
            layout: "split-right" as "split-right",
          },
          innerBlocks: [
            ...folderColorQuestions(invitation),
            ...(folderAnswer === "inny"
              ? [
                  {
                    name: "short-text",
                    id: "folder-other",
                    attributes: {
                      label: "Inny - Jaki?",
                      required: true,
                    },
                  },
                ]
              : []),
            folderFinishingQuestions(invitation),
          ],
        },
      ]
    : [];
}

function decorations(invitation: InvitationConfig) {
  const showDecorationsQuestions = invitationHasDecorations(invitation);

  return showDecorationsQuestions
    ? [
        {
          name: "multiple-choice",
          id: "invitation-decoration",
          attributes: {
            attachment: {
              type: "image" as "image",
              url: "https://www.coniecopapieru.com/wp-content/uploads/2021/02/eleganckie-zaproszenia-slubne_nietypowe_nowoczesne_ecru_zlocone_luksusowe_oryginalne_glamour_minimalistyczne_kaligrafia_co-nieco-papieru3.jpg",
            },
            layout: "split-right" as "split-right",
            label: "Rodzaje wykończenia zaproszenia",
            choices: listToQuestions(invitation.decoration || []),
            multiple: true,
            required: false,
          },
        },
      ]
    : [];
}

function invitationsCountGroup() {
  const nonPersonalizedAnswer = useFieldAnswer("non-personalized-count");
  const showNonPersonalizedDropdown =
    nonPersonalizedAnswer && nonPersonalizedAnswer > 0;
  return {
    name: "group",
    id: "invitations-count-group",
    attributes: {
      label: "Ilości zaproszeń.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru3.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      {
        name: "number",
        id: "personalized-count",
        attributes: {
          label: "Ilość zaproszeń personalizowanych",
          required: true,
        },
      },
      {
        name: "number",
        id: "non-personalized-count",
        attributes: {
          label: "Ilość zaproszeń bez personalizacji",
          required: true,
        },
      },
      ...(showNonPersonalizedDropdown
        ? [
            {
              name: "dropdown",
              id: "non-personalized-dropdown-answer",
              attributes: {
                label: "Miejsce na personalizację",
                required: true,
                choices: [
                  {
                    value: "bez-miejsca",
                    label: "Bez miejsca na wypisanie personalizacji",
                  },
                  { value: "linia", label: "Linia" },
                  { value: "wykropkowane", label: "Wykropkowane" },
                  { value: "puste-miejsce", label: "Puste miejsce" },
                ],
              },
            },
          ]
        : []),
      {
        name: "number",
        id: "zawiadomienia-ilosc",
        attributes: {
          label: "Ilość zawiadomień o ceremonii zaślubin.",
          required: false,
        },
      },
      {
        name: "number",
        id: "rsvp-count",
        attributes: {
          label: "Ilość RSVP",
          required: true,
        },
      },
      {
        name: "number",
        id: "karty-dodatkowe-ilosc",
        attributes: {
          label:
            "Ilość kart dodatkowych (np. informacja o noclegu lub transporcie - inna niż RSVP)",
          required: false,
        },
      },
    ],
  };
}

function miscGroup() {
  return {
    name: "group",
    id: "misc",
    attributes: {
      label: "Pytania dodatkowe.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2022/04/linee_1.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      {
        name: "long-text",
        id: "changes",
        attributes: {
          label: "Wszelkie informacje dotyczące zmian.",
          layout: "split-right",
        },
      },
      {
        name: "multiple-choice",
        id: "mode",
        attributes: {
          label: "Tryb.",
          choices: [
            { value: "normal", label: "Normalny" },
            { value: "express", label: "Ekspres(+30%)" },
          ],
          multiple: false,
          required: true,
        },
      },
      {
        name: "multiple-choice",
        id: "put-together-service",
        attributes: {
          label: "Usługa składu.",
          choices: [
            { value: "yes", label: "Tak" },
            { value: "no", label: "Nie" },
          ],
          multiple: false,
          required: true,
        },
      },
      {
        name: "multiple-choice",
        id: "skad-sie-dowiedzieliscie",
        attributes: {
          label: "Skąd się o nas dowiedzieliście? :)",
          choices: [
            { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" },
            { value: "pinterest", label: "Pinterest" },
            {
              value: "wyszukiwarka-internetowa",
              label: "Wyszukiwarka internetowa",
            },
            { value: "z-polecenia", label: "Z polecenia (znajomi / rodzina)" },
            { value: "z-wesela", label: "Z innego wesela" },
            { value: "konsultant", label: "Konsultant ślubny" },
            { value: "inne", label: "Inne źródło" },
          ],
          multiple: true,
          required: true,
        },
      },
    ],
  };
}

function invitationGroup() {
  return {
    name: "group",
    id: "invitation-group",
    attributes: {
      label: "Zaproszenie.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2022/04/linee_1.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      {
        id: "invitation-name",
        name: "dropdown",
        attributes: {
          label: "Nazwa zaproszenia",
          required: true,
          choices: getInvitationNames(),
        },
      },
    ],
  };
}

function personalData() {
  const invoiceAnswer = useFieldAnswer("needs-invoice") as string[];
  const invoice = invoiceAnswer && invoiceAnswer[0] === "tak";
  return {
    name: "group",
    id: "personal-data",
    attributes: {
      label: "Dane osobowe.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2022/12/zaproszenia-slubne_eleganckie_minimalistyczne_nowoczesne_proste_klasyczne_na-slub_coniecopapieru_baner-1536x727.jpg",
      },
      layout: "split-left" as "split-left",
    },
    innerBlocks: [
      {
        name: "short-text",
        id: "bride-name",
        attributes: {
          required: true,
          label: "Imię i nazwisko panny młodej",
          placeholder: "Joanna Kowalska",
        },
      },
      {
        name: "short-text",
        id: "groom-name",
        attributes: {
          required: true,
          label: "Imię i nazwisko pana młodego",
          placeholder: "Jan Nowak",
        },
      },
      {
        name: "email",
        id: "email",
        attributes: {
          label: "Adres e-mail",
          placeholder: "john-doe@gmail.com",
          required: true,
        },
      },
      {
        id: "addres",
        name: "long-text",
        attributes: {
          label: "Adres do wysyłki",
          required: true,
          placeholder: "Ul. Główna 28\n00-001 Warszawa",
        },
      },
      {
        id: "phone-number-bride",
        name: "short-text",
        attributes: {
          setMaxCharacters: true,
          maxCharacters: "20",
          required: true,
          label: "Numer telefonu Panny Młodej",
          placeholder: "48 123 456 789",
        },
      },
      {
        id: "phone-number-groom",
        name: "short-text",
        attributes: {
          setMaxCharacters: true,
          maxCharacters: "20",
          required: true,
          label: "Numer telefonu Pana Młodego",
          placeholder: "48 123 456 789",
        },
      },
      {
        name: "multiple-choice",
        id: "needs-invoice",
        attributes: {
          label: "Czy potrzebujesz faktury?",
          choices: [
            { value: "tak", label: "Tak" },
            { value: "nie", label: "Nie" },
          ],
          multiple: false,
          required: true,
        },
      },
      ...(invoice
        ? [
            {
              name: "long-text",
              id: "invoice-details",
              attributes: {
                label: "Dane do faktury",
                required: true,
              },
            },
          ]
        : []),
    ],
  };
}
function App() {
  const invitationNameAnswer = useFieldAnswer("invitation-name") as string;
  const folderPic = invitationNameAnswer
    ? folderPics[invitationNameAnswer]
    : "";

  const currentInvitation: InvitationConfig =
    InvitationsConfig[invitationNameAnswer];

  //clear all groups after personalData when user changes invitation answer

  return (
    <div className={"myForm"}>
      <Form
        formId={1}
        isPreview={false}
        applyLogic={false}
        formObj={{
          theme: {
            font: "Roboto",
            buttonsBgColor: "#fdf2ed",
            logo: {
              src: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/cropped-logo_coniecopapieru-1.png",
            },
            questionsColor: "#000",
            answersColor: "#a39364",
            buttonsFontColor: "#a39364",
            buttonsBorderRadius: 25,
            errorsFontColor: "#fff",
            errorsBgColor: "#f00",
            progressBarFillColor: "#fdf2ed",
            progressBarBgColor: "#cebb84",
          },
          messages: translations,
          hiddenFields: {},
          settings: {
            disableWheelSwiping: true,
            showLettersOnAnswers: false,
            animationDirection: "horizontal",
          },
          blocks: [
            personalData(),
            invitationGroup(),
            invitationsCountGroup(),
            invitationDetails(),
            invitationContent(),
            ...folderQuestions(currentInvitation, folderPic),
            ...decorations(currentInvitation),
            envelopeGroup(currentInvitation),
            miscGroup() as FormBlock,
          ],
        }}
        onSubmit={(data, { completeForm, setIsSubmitting }) => {
          setTimeout(() => {
            setIsSubmitting(false);
            completeForm();
          }, 500);
        }}
      />
    </div>
  );
}

function invitationDetails() {
  return {
    name: "group",
    id: "zaproszenie-detale",
    attributes: {
      label: "Informacje dotyczące zaproszeń.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/eleganckie-zaproszenia-slubne_nietypowe_zlocone_klasyczne_transparentne_czarne__zlota-folia_co-nieco-papieru1.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      {
        name: "multiple-choice",
        id: "wraz-z-rodzicami",
        attributes: {
          label: `Czy zaproszenie ma zawierać zwrot "wraz z Rodzicami"?`,
          required: true,
          choices: [
            { value: "tak", label: "Tak" },
            { value: "nie", label: "Nie" },
          ],
          multiple: false,
        },
      },
      {
        id: "data-slubu",
        name: "date",
        attributes: {
          label: "Data ślubu",
          format: "DDMMYYYY",
          separator: "-",
          required: true,
        },
      },
      {
        name: "long-text",
        id: "miejsce-adres-uroczystosci",
        attributes: {
          label:
            "Miejsce i adres zaślubin (np. Kościół/Urząd stanu cywilnego/plener)",
          required: true,
        },
      },
      {
        name: "long-text",
        id: "miejsce-adres-przyjecia",
        attributes: {
          label: "Miejsce i adres przyjęcia weselnego",
          required: true,
        },
      },
      {
        id: "data-potwierdzenia-przybycia",
        name: "date",
        attributes: {
          label: "Data potwierdzenia przybycia",
          format: "DDMMYYYY",
          separator: "-",
          required: true,
        },
      },
    ],
  };
}

function invitationContent() {
  const tz = useFieldAnswer("zawiadomienia-ilosc");
  const kd = useFieldAnswer("karty-dodatkowe-ilosc");
  const showTZ = tz && tz !== 0;
  const showKD = kd && kd !== 0;

  return {
    name: "group",
    id: "zaproszenie-tresc",
    attributes: {
      label: "Informacje dotyczące zaproszeń.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/eleganckie-zaproszenia-slubne_nietypowe_zlocone_klasyczne_transparentne_czarne__zlota-folia_co-nieco-papieru1.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      {
        name: "long-text",
        id: "tresc-zaproszenia-rodzice",
        attributes: {
          label: "Treść zaproszenia dla Rodziców.",
        },
      },
      ...(showTZ
        ? [
            {
              name: "long-text",
              id: "tresc-zawiadomienia",
              attributes: {
                label: "Treść zawiadomienia o ceremonii zaślubin.",
                required: true,
              },
            },
          ]
        : []),
      ...(showKD
        ? [
            {
              name: "long-text",
              id: "tresc-karty-dodatkowej",
              attributes: {
                label:
                  "Treść karty dodatkowej (np. informacja o noclegu lub transporcie - inna niż RSVP).",
                required: true,
              },
            },
          ]
        : []),
      {
        name: "short-text",
        id: "zaproszenie-dodatkowe-wersje-jezykowe",
        attributes: {
          label: "Dodatkowe wersje językowe.",
          placeholder: "angielska/niemiecka/hiszpańska",
        },
      },
      {
        name: "long-text",
        id: "zaproszenie-jezyk-obcy",
        attributes: {
          label: "Treść zaproszenia w języku obcym.",
        },
      },
    ],
  };
}

export default App;

function envelopeColorQuestion(
  invitation: InvitationConfig,
  grammageAnswer: string[] | undefined
) {
  const kind = grammageAnswer
    ? grammageAnswer[0] === "miekka"
      ? "softEnvelopeColors"
      : "hardEnvelopeColors"
    : undefined;

  const defaultEnvelopeColors = invitation?.softEnvelopeColors
    ? invitation?.softEnvelopeColors
    : invitation?.hardEnvelopeColors;

  return [
    {
      name: "dropdown",
      id: "envelope-color",
      attributes: {
        label: "Kolor",
        choices: listOfColors(
          kind && invitation ? invitation[kind] : defaultEnvelopeColors
        ),
        required: true,
      },
    },
  ];
}

function envelopeGroup(invitation: InvitationConfig) {
  const hasFolder = invitationHasFolder(invitation);
  const hasEnvelopesChoice = invitationHasEnvelopesChoice(invitation);
  const envelopeColorAnswer = useFieldAnswer("envelope-color");
  const grammageAnswer = useFieldAnswer("gramatura-koperty") as string[];
  const wantsEnvelopeAnswer = useFieldAnswer("chce-koperte") as string[];
  const invitationNameAnswer = useFieldAnswer("invitation-name") as string;
  const smoothGlamEnvelopeKindAnswer = useFieldAnswer(
    "smooth-glam-koperta"
  ) as string[];
  const isSmoothGlam = invitationNameAnswer === "smooth-glam";

  const wantsEnvelopeQuestion = hasFolder
    ? [
        {
          name: "multiple-choice",
          id: "chce-koperte",
          attributes: {
            label: "Czy potrzebujesz koperty?",
            choices: [
              { value: "no", label: "Nie" },
              { value: "yes", label: "Tak" },
            ],
            required: true,
          },
        },
      ]
    : [];

  const grammageQuestion = hasEnvelopesChoice
    ? [
        {
          name: "multiple-choice",
          id: "gramatura-koperty",
          attributes: {
            label: "Gramatura koperty",
            choices: [
              { value: "miekka", label: "Miękka (120g)" },
              { value: "sztywna", label: "Sztywna (250g-300g)" },
            ],
            required: true,
          },
        },
      ]
    : [];

  const smoothGlamEnvelopeKind = isSmoothGlam
    ? [
        {
          name: "multiple-choice",
          id: "smooth-glam-koperta",
          attributes: {
            label: "Rodzaj koperty.",
            choices: [
              { value: "klasyczna", label: "Klasyczna" },
              { value: "kieszeniowa", label: "Kieszeniowa" },
            ],
            required: true,
          },
        },
      ]
    : [];

  return {
    name: "group",
    id: "envelope-group",
    attributes: {
      label: "Koperta.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/eleganckie-zaproszenia-slubne_nietypowe_zlocone_klasyczne_transparentne_czarne__zlota-folia_co-nieco-papieru1.jpg",
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      ...wantsEnvelopeQuestion,
      ...smoothGlamEnvelopeKind,
      ...(hasFolder
        ? wantsEnvelopeAnswer && wantsEnvelopeAnswer[0] == "yes"
          ? grammageQuestion
          : []
        : isSmoothGlam
        ? smoothGlamEnvelopeKindAnswer &&
          smoothGlamEnvelopeKindAnswer[0] === "klasyczna"
          ? grammageQuestion
          : []
        : grammageQuestion),
      ...envelopeColorQuestions(
        hasFolder,
        hasEnvelopesChoice,
        wantsEnvelopeAnswer,
        grammageAnswer,
        invitation,
        isSmoothGlam,
        smoothGlamEnvelopeKindAnswer
      ),
      ...(envelopeColorAnswer === "inny"
        ? [
            {
              name: "short-text",
              id: "folder-other",
              attributes: {
                label: "Inny - Jaki?",
                required: true,
              },
            },
          ]
        : []),
      ...envelopeDecorationQuestions(
        hasFolder,
        hasEnvelopesChoice,
        wantsEnvelopeAnswer,
        grammageAnswer,
        invitation,
        isSmoothGlam,
        smoothGlamEnvelopeKindAnswer
      ),
    ],
  };
}

function envelopeDecorationQuestion(invitation: InvitationConfig) {
  return [
    {
      name: "multiple-choice",
      id: "envelope-finishing",
      attributes: {
        label: "Wykończenie koperty.",
        choices: listToQuestions(invitation?.envelopeDecoration),
        multiple: true,
        required: false,
      },
    },
  ];
}

function envelopeDecorationQuestions(
  hasFolder: boolean,
  hasEnvelopesChoice: boolean,
  wantsEnvelopeAnswer: string[],
  grammageAnswer: string[],
  invitation: InvitationConfig,
  isSmoothGlam: boolean,
  smoothGlamEnvelopeKindAnswer: string[]
) {
  if (!invitation?.envelopeDecoration) {
    return [];
  }
  if (
    isSmoothGlam &&
    smoothGlamEnvelopeKindAnswer &&
    smoothGlamEnvelopeKindAnswer[0] === "klasyczna"
  ) {
    return envelopeDecorationQuestion(invitation);
  }
  if (hasFolder) {
    if (wantsEnvelopeAnswer && wantsEnvelopeAnswer[0] === "yes") {
      if (hasEnvelopesChoice) {
        if (grammageAnswer && grammageAnswer.length) {
          return envelopeDecorationQuestion(invitation);
        }
      } else {
        return envelopeDecorationQuestion(invitation);
      }
    }
  } else {
    if (hasEnvelopesChoice) {
      if (grammageAnswer && grammageAnswer.length) {
        return envelopeDecorationQuestion(invitation);
      }
    } else {
      return envelopeDecorationQuestion(invitation);
    }
  }
  return [];
}

function envelopeColorQuestions(
  hasFolder: boolean,
  hasEnvelopesChoice: boolean,
  wantsEnvelopeAnswer: string[],
  grammageAnswer: string[],
  invitation: InvitationConfig,
  isSmoothGlam: boolean,
  smoothGlamEnvelopeKindAnswer: string[]
) {
  if (
    isSmoothGlam &&
    smoothGlamEnvelopeKindAnswer &&
    smoothGlamEnvelopeKindAnswer[0] === "kieszeniowa"
  ) {
    return envelopeColorQuestion(invitation, ["twarda"]);
  }
  if (hasFolder) {
    if (wantsEnvelopeAnswer && wantsEnvelopeAnswer[0] === "yes") {
      if (hasEnvelopesChoice) {
        if (grammageAnswer && grammageAnswer.length) {
          return envelopeColorQuestion(invitation, grammageAnswer);
        }
      } else {
        return envelopeColorQuestion(invitation, grammageAnswer);
      }
    }
  } else {
    if (hasEnvelopesChoice) {
      if (grammageAnswer && grammageAnswer.length) {
        return envelopeColorQuestion(invitation, grammageAnswer);
      }
    } else {
      return envelopeColorQuestion(invitation, grammageAnswer);
    }
  }
  return [];
}

//wybierz -> jezeli zaproszenie smooth-glam, pytaj o rodzaj, w innym wypadku zawsze klasyczna  (wybor) klasyczna/kieszeniowa (tylko dla smooth-glam)
//120g miekka -> wszystkie zaproszenia, 250g- 300g sztywna - tylko niektore z zaproszen [potrzebna lista]
//
// kolor -> kazde zaproszenie musi miec zdefiniowana pule kolorow, lub kolor "inny", wtedy wyswietl pole tekstowe
// zdobienie koperty -> brak, lub lista wielokrotnego wyboru w zaleznosci od wybranego zaproszenia
//folder -> kazde zaproszenie w folderze ma zdefiniowana liste dostepnych kolorow, lub "inny"
//folder -> kazde zaproszenie ma zdefiniowana liste mozliwych wykonczen folderu -> lub wielokrotny wybor
//wykonczenie zaproszenia (przed pytaniem o folder) -> kazde zaproszenie ma zdefiniowana liste wykonczen [moze byc pusta, wtedy nie wyswietlamy]
//jezeli lista nie jest pusta, wyswietl brak, lub lista wielokrotnego wyboru

//RSVP:

//
//Tresc zaproszenia w jezyku obcym -> pole tekstowe niewymagane
//
// wszelkie informacje dotyczace zmian
//
//
//Skad sie dowiedzieliscie - wielokrotny wybor

//checkbox z regulaminem -> pozwol na "wyslij" tylko jak zaznaczony
