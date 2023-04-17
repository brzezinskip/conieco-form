import './App.css'

import { Form, useFieldAnswer } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
registerCoreBlocks();


const translations = {
  'label.button.ok': "Ok",
  'label.hintText.enter': "Naciśnij <strong>Enter ↵</strong>",
  'label.hintText.multipleSelection': "Możesz wybrać kilka opcji.",
  'block.dropdown.placeholder': "Wpisz, lub wybierz opcję.",
  'block.dropdown.noSuggestions': "",
  'block.shortText.placeholder': "Tu wpisz odpowiedź",
  'block.longText.placeholder': "Tu wpisz odpowiedź",
  'block.longText.hint': "Naciśnij <strong>Shift ⇧ + Enter ↵ aby złamać linię",
  'block.number.placeholder': "Tu wpisz odpowiedź",
  'block.email.placeholder': "Tu wpisz adres e–mail",
  'block.defaultThankYouScreen.label': "Dziękujemy za wypełnienie formularza.\n\n Wkrótce się z tobą skontaktujemy",
  'label.hintText.key': "Przycisk",
  'label.progress.percent': "Ukończono {{progress:percent}}%",
  'label.errorAlert.required': "Te pole jest wymagane!",
  'label.errorAlert.date': "Nieprawidłowa data!",
  'label.errorAlert.number': "Dozwolone są tylko liczby!",
  'label.errorAlert.selectionRequired': "Wybierz minimum jedną opcję",
  'label.errorAlert.email': "Nieprawidłowy adres e-mail!",
  'label.errorAlert.url': "Nieprawidłowy adres url!",
  'label.errorAlert.range': "Podaj liczbę pomiędzy {{attribute:min}} i {{attribute:mac}}",
  'label.errorAlert.minNum': "Podaj liczbę większą niż {{attribute:min}}",
  'label.errorAlert.maxNum': "Podaj liczbę mniejszą niż {{attribute:max}}",
  'label.errorAlert.maxCharacters': "Osiągnięto maximum znaków",
  'label.submitBtn': "Wyślij",
}

const folderPics: { [key: string]: string } = {
  "juliette-paris": "https://www.coniecopapieru.com/wp-content/uploads/2019/08/podroznicze-zaproszenia-slubne_nietypowe_zlocone_travel_boarding-pass_nowoczesne_bilet-lotniczy_zlota-folia_zlocenie_co-nieco-papieru6.jpg",
  "juliette-roma": "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru2.jpg",
  "just-gold": "https://www.coniecopapieru.com/wp-content/uploads/2021/02/eleganckie-zaproszenia-slubne_nietypowe_nowoczesne_ecru_zlocone_luksusowe_oryginalne_glamour_minimalistyczne_kaligrafia_co-nieco-papieru3.jpg",
  "simple-rose": "https://www.coniecopapieru.com/wp-content/uploads/2021/02/eleganckie-zaproszenia-slubne_nietypowe_nowoczesne_ecru_zlocone_luksusowe_oryginalne_glamour_minimalistyczne_kaligrafia_co-nieco-papieru3.jpg",
  "boarding-pass": "https://www.coniecopapieru.com/wp-content/uploads/2019/08/podroznicze-zaproszenia-slubne_nietypowe_zlocone_travel_boarding-pass_nowoczesne_bilet-lotniczy_zlota-folia_zlocenie_co-nieco-papieru6.jpg"
}



const invitationsConfig: { [key: string]: { softTouch: boolean } } = {
  "art-of-love": {
    softTouch: true,
  },
  "brigitte": {
    softTouch: false,
  },
  "classy": {
    softTouch: true,
  },
  "dune": {
    softTouch: false,
  },
  "elusive-beige": {
    softTouch: true,
  },
  "juliette-roma": {
    softTouch: false,
  },
  "juliette-paris": {
    softTouch: true,
  },
  "just-gold": {
    softTouch: false,
  },
  "frame": {
    softTouch: true,
  },
  "blossom": {
    softTouch: false,
  },
  "mocca": {
    softTouch: true,
  },
  "love-letter": {
    softTouch: false,
  },
  "minimal": {
    softTouch: true,
  },
  "marble": {
    softTouch: false,
  },
  "black": {
    softTouch: true,
  },
  "romance": {
    softTouch: false,
  },
  "lovely": {
    softTouch: true,
  },
  "line": {
    softTouch: false,
  },
  "boarding-pass": {
    softTouch: true,
  },
  "elisa": {
    softTouch: false,
  },
  "french-kiss": {
    softTouch: true,
  },
  "misty-green": {
    softTouch: false,
  },
  "silver-night": {
    softTouch: true,
  },
  "smooth-glam": {
    softTouch: false,
  },
  "sunset": {
    softTouch: true,
  },
  "palms": {
    softTouch: false,
  },
  "pure-love": {
    softTouch: true,
  },
  "emerald": {
    softTouch: false,
  },
  "simple-rose": {
    softTouch: true,
  },
  "fern": {
    softTouch: false,
  },
  "cheers": {
    softTouch: true,
  },
  "your-way": {
    softTouch: false,
  },
  "black-velvet": {
    softTouch: false,
  },
  "royal": {
    softTouch: true,
  },
  "marseille": {
    softTouch: false,
  },
  "himalayan-salt": {
    softTouch: true,
  },
  "sophie": {
    softTouch: false,
  },
  "snow-white": {
    softTouch: true,
  },
}

function folderFinishingQuestions() {
  return {
    name: "multiple-choice",
    id: "folder-finishing",
    attributes: {
      label: "Rodzaje wykończenia",
      choices: [{
        value: "magnes",
        label: "Magnes"
      }, {
        value: "magnes-z-chwostem",
        label: "Magnes z chwostem"
      },
      {
        value: "sznurek",
        label: "Sznurek"
      },
      {
        value: "sznurek-z-zawieszka",
        label: "Sznurek z zawieszką"
      },
      {
        value: "lak",
        label: "Lak"
      },
      {
        value: "wstazka-szyfonowa",
        label: "Wstążka szyfonowa"
      },
      {
        value: "wstazka-jedwabna",
        label: "Wstążka jedwabna"
      },
      {
        value: "papierowa-opaska",
        label: "Papierowa opaska"
      },
      ],
      multiple: true,
      required: true,
    }
  }
}

function folderQuestions(showFolderQuestions: boolean, folderPic: string, folderAnswer: string) {
  return (showFolderQuestions
    ? [
      {
        name: "group",
        id: "folder-group",
        attributes: {
          label: "Folder",
          attachment: {
            type: "image" as "image",
            url: folderPic
          },
          layout: "split-right" as "split-right",
        },
        innerBlocks: [
          {

            name: "dropdown",
            id: "folder",
            attributes: {
              label: "Kolor",
              choices: [
                { value: "złoty", label: "Złoty" },
                { value: "srebrny", label: "Srebrny" },
                { value: "czarny", label: "Czarny" },
                { value: "zielony", label: "Zielony" },
                { value: "granatowy", label: "Granatowy" },
                { value: "różowy", label: "Różowy" },
                { value: "biały", label: "Biały" },
                { value: "herbaciany", label: "Herbaciany" },
                { value: "bordowy", label: "Bordowy" },
                { value: "inny", label: "Inny" },
              ],
              required: true
            }
          }
          , ...(folderAnswer === "inny"
            ? [
              {
                name: "short-text",
                id: "folder-other",
                attributes: {
                  label: "Inny - Jaki?",
                  required: true
                }
              }
            ]
            : []),
          folderFinishingQuestions(),
        ]
      }
    ]
    : [])
}

function invitationsCountGroup() {
  return {
    name: "group",
    id: "invitations-count-group",
    attributes: {
      label: "Ilości zaproszeń.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru3.jpg"
      },
      layout: 'split-right' as 'split-right',
    }
    , innerBlocks: [
      {
        name: "number",
        id: "personalized-count",
        attributes: {
          label: "Ilość zaproszeń personalizowanych",
          required: true,
        }
      },
      {
        name: "number",
        id: "non-personalized-count",
        attributes: {
          label: "Ilość zaproszeń bez personalizacji",
          required: true,
        }
      },
      {
        name: "number",
        id: "rsvp-count",
        attributes: {
          label: "Ilość RSVP",
          required: true,
        }
      },
      {
        name: "number",
        id: "addons-count",
        attributes: {
          label: "Ilość kart dodatkowych np. INFO",
          required: true,
        }
      },
      {
        name: "number",
        id: "notify-count",
        attributes: {
          label: "Ilość zawiadomień o ceremonii",
          required: true,
        }
      },
    ]
  }
}

function miscGroup() {
  return {
    name: "group",
    id: "misc",
    attributes: {
      label: "Pytania dodatkowe.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru3.jpg"
      },
      layout: 'split-right' as 'split-right',
    }
    , innerBlocks: [
      {
        name: "short-text",
        id: "languages",
        attributes: { label: "Dodatkowe wersje językowe.", placeholder: "angielska/niemiecka/hiszpańska" }
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
          required: true
        }
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
          required: true
        }
      },
    ]
  }
}


function invitationGroup() {
  const invitationNameAnswer = useFieldAnswer("invitation-name") as string;
  const showSoftTouch = invitationsConfig[invitationNameAnswer]?.softTouch;

  return {
    name: "group",
    id: "invitation-group",
    attributes: {
      label: "Zaproszenie.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2022/04/linee_1.jpg"
      },
      layout: 'split-right' as 'split-right',
    },
    innerBlocks: [
      {
        id: "invitation-name",
        name: "dropdown",
        attributes: {
          label: "Nazwa zaproszenia",
          required: true,
          choices: [
            { value: "art-of-love", label: "Art of Love" },
            { value: "brigitte", label: "Brigitte" },
            { value: "classy", label: "Classy" },
            { value: "dune", label: "Dune" },
            { value: "elusive-beige", label: "Elusive Beige" },
            { value: "juliette-roma", label: "Juliette Roma" },
            { value: "juliette-paris", label: "Juliette Paris" },
            { value: "just-gold", label: "Just Gold" },
            { value: "frame", label: "Frame" },
            { value: "blossom", label: "Blossom" },
            { value: "mocca", label: "Mocca" },
            { value: "love-letter", label: "Love Letter" },
            { value: "minimal", label: "Minimal" },
            { value: "marble", label: "Marble" },
            { value: "black", label: "Black Elegance" },
            { value: "romance", label: "Romance" },
            { value: "lovely", label: "Lovely" },
            { value: "line", label: "Line" },
            { value: "boarding-pass", label: "Boarding Pass" },
            { value: "elisa", label: "Elisa" },
            { value: "french-kiss", label: "French Kiss" },
            { value: "misty-green", label: "Misty Green" },
            { value: "silver-night", label: "Silver Night" },
            { value: "smooth-glam", label: "Smooth Glam" },
            { value: "sunset", label: "Sunset" },
            { value: "palms", label: "Palms" },
            { value: "pure-love", label: "Pure Love" },
            { value: "emerald", label: "Emerald" },
            { value: "simple-rose", label: "Simple Rose" },
            { value: "fern", label: "Fern" },
            { value: "cheers", label: "Cheers" },
            { value: "your-way", label: "Your Way" },
            { value: "black-velvet", label: "Black Velvet" },
            { value: "royal", label: "Royal" },
            { value: "marseille", label: "Marseille" },
            { value: "himalayan-salt", label: "Himalayan Salt" },
            { value: "sophie", label: "Sophie" },
            { value: "snow-white", label: "Snow White" },
          ]
        }
      }
      , ...(showSoftTouch
        ? [
          {
            name: "multiple-choice",
            id: "soft-touch",
            attributes: {
              label: "Soft touch (Jest to dodatkowe uszlachetnienie nanoszone na papier, dzięki któremu powierzchnia staje się niesamowicie gładka i aksamitna w dotyku).",
              required: true,
              choices: [
                { value: "yes", label: "Tak" },
                { value: "no", label: "Nie" }
              ]
            }
          }
        ]
        : []),
    ]
  }
}
function App() {
  const invitationNameAnswer = useFieldAnswer("invitation-name") as string;
  const folderAnswer: string = useFieldAnswer("folder") as string;
  const folderPic = invitationNameAnswer ? folderPics[invitationNameAnswer] : '';
  const showFolderQuestions = ["juliette-roma", "just-gold", "royal", "boarding-pass"].includes(invitationNameAnswer);


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
            //backgroundImage: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/blog.jpg"
          },
          messages: translations,
          hiddenFields: {},
          settings: {
            disableWheelSwiping: true,
            showLettersOnAnswers: false,
            animationDirection: 'horizontal',
          },
          blocks: [
            {
              name: "group",
              id: "personal-data",
              attributes: {
                label: "Dane osobowe.",
                attachment: {
                  type: "image",
                  url: "https://www.coniecopapieru.com/wp-content/uploads/2022/12/zaproszenia-slubne_eleganckie_minimalistyczne_nowoczesne_proste_klasyczne_na-slub_coniecopapieru_baner-1536x727.jpg"

                },
                layout: 'split-left',
              },
              innerBlocks: [
                {
                  name: "short-text",
                  id: "bride-name",
                  attributes: {
                    required: true,
                    label: "Imię i nazwisko panny młodej",
                    placeholder: "Joanna Kowalska",
                  }
                },
                {
                  name: "short-text",
                  id: "groom-name",
                  attributes: {
                    required: true,
                    label: "Imię i nazwisko pana młodego",
                    placeholder: "Jan Nowak",
                  }
                },
                {
                  name: "email",
                  id: "email",
                  attributes: {
                    label: "Adres e-mail",
                    placeholder: "john-doe@gmail.com",
                    required: true,
                  }
                },
                {
                  id: "addres",
                  name: "long-text",
                  attributes: {
                    label: "Adres do wysyłki",
                    required: true,
                    placeholder: "Ul. Główna 28\n00-001 Warszawa",
                  }
                },
                {
                  id: "phone-number-bride",
                  name: "short-text",
                  attributes: {
                    setMaxCharacters: true,
                    maxCharacters: "20",
                    required: true,
                    label: "Numer telefonu Panny Młodej",
                    placeholder: "48 123 456 789"
                  }
                },
                {
                  id: "phone-number-groom",
                  name: "short-text",
                  attributes: {
                    setMaxCharacters: true,
                    maxCharacters: "20",
                    required: true,
                    label: "Numer telefonu Pana Młodego",
                    placeholder: "48 123 456 789"
                  }
                }
              ]

            },
            {
              id: "date",
              name: "date",
              attributes: {
                label: "Data ślubu",
                format: "DDMMYYYY",
                required: true,
                attachment: {
                  type: "image",
                  url: "https://www.coniecopapieru.com/wp-content/uploads/2022/04/line4_4.jpg"

                },
                layout: 'split-right',
              }
            },
            invitationGroup(),
            {
              name: "long-text",
              id: "changes",
              attributes: {
                label: "Wszelkie informacje dotyczące zmian.",
                attachment: {
                  type: "image",
                  url: "https://www.coniecopapieru.com/wp-content/uploads/2020/12/oryginalne-zaproszenia-slubne_nowoczesne_eleganckie_ekskluzywne_biale_zlocone_pozlacane_minimalistyczne_nietypowe_co-nieco-papieru3.jpg"
                },
                layout: 'split-right',
              }
            },
            invitationsCountGroup(),
            miscGroup(),
            ...folderQuestions(showFolderQuestions, folderPic, folderAnswer),
            envelopeGroup(showFolderQuestions)
          ],
        }}
        beforeGoingNext={({ answers, ...rest }) => {
          if ((answers["notify-count"] as any).value === 6) {
            //return { ...rest, answers }
          }
          rest.goNext();
          //return { ...rest, answers }
        }}
        onSubmit={(data, { completeForm, setIsSubmitting }) => {
          setTimeout(() => {
            setIsSubmitting(false);
            completeForm();
          }, 500);
        }}
      />
    </div>
  )
}

export default App
//folder -> kazde zaproszenie w folderze ma zdefiniowana liste dostepnych kolorow, lub "inny"
//folder -> kazde zaproszenie ma zdefiniowana liste mozliwych wykonczen folderu -> lub wielokrotny wybor


//wykonczenie zaproszenia (przed pytaniem o folder) -> kazde zaproszenie ma zdefiniowana liste wykonczen [moze byc pusta, wtedy nie wyswietlamy]
//jezeli lista nie jest pusta, wyswietl brak, lub lista wielokrotnego wyboru


function envelopeGroup(showFolderQuestions: boolean) {
  const invitationNameAnswer = useFieldAnswer("invitation-name") as string;
  const wantsEnvelopeAnswer = useFieldAnswer("wants-envelope") as [string];
  const envelopeColorAnswer = useFieldAnswer("envelope-color") as string;
  const envelopeTypeAnswer = useFieldAnswer("envelope-type") as string;

  const colorQuestion = {
    name: "dropdown",
    id: "envelope-color",
    attributes: {
      label: "Kolor koperty",
      choices: [
        { value: "blue", label: "Niebieski" },
        { value: "other", label: "Inny" },
      ],
      required: true
    }
  };

  const otherColorQuestion =
  {
    name: "short-text",
    id: "envelope-color-other",
    attributes: {
      label: "Inny - jaki?",
      required: true
    }
  };

  const wantsEnvelopeQuestion =
  {
    name: "multiple-choice",
    id: "wants-envelope",
    attributes: {
      label: "Czy potrzebujesz koperty?",
      choices: [
        { value: "no", label: "Nie" },
        { value: "yes", label: "Tak" },
      ],
      required: true
    }
  };

  const grammageQuestion = {
    name: "multiple-choice",
    id: "folder-envelope-grammage",
    attributes: {
      label: "Gramatura koperty",
      choices: [
        { value: "soft", label: "Miękka(120g)" },
        { value: "stiff", label: "Sztywna(250g-300g)" },
      ],
      required: true
    }
  };


  const askForEnvelope = showFolderQuestions ? [
    wantsEnvelopeQuestion,
    ...((["just-gold", "royal", "boarding-pass"].includes(invitationNameAnswer) && wantsEnvelopeAnswer && wantsEnvelopeAnswer[0] === "yes") ? [
      grammageQuestion,
      ...(invitationNameAnswer !== "juliette-roma" ? [colorQuestion] : []),
      ...(envelopeColorAnswer === "other" ? [otherColorQuestion] : [])]
      : [])
  ] : [
    ...(invitationNameAnswer === "smooth-glam" ? [
      {
        name: "multiple-choice",
        id: "envelope-type",
        attributes: {
          label: "Rodzaj koperty",
          choices: [
            { value: "classic", label: "Klasyczna" },
            { value: "pocket", label: "Kieszeniowa" },
          ],
          required: true
        }
      },
    ] : []),
    ...(envelopeTypeAnswer && envelopeTypeAnswer[0] === "classic" || invitationNameAnswer !== "smooth-glam" ? [grammageQuestion] : [])
  ];

  return {
    name: "group",
    id: "envelope-group",
    attributes: {
      label: "Koperta.",
      attachment: {
        type: "image" as "image",
        url: "https://www.coniecopapieru.com/wp-content/uploads/2019/10/eleganckie-zaproszenia-slubne_nietypowe_zlocone_klasyczne_transparentne_czarne__zlota-folia_co-nieco-papieru1.jpg"
      },
      layout: "split-right" as "split-right",
    },
    innerBlocks: [
      ...(askForEnvelope),
    ]
  }

}

//wybierz -> jezeli zaproszenie smooth-glam, pytaj o rodzaj, w innym wypadku zawsze klasyczna  (wybor) klasyczna/kieszeniowa (tylko dla smooth-glam)
//120g miekka -> wszystkie zaproszenia, 250g- 300g sztywna - tylko niektore z zaproszen [potrzebna lista]
// kolor -> kazde zaproszenie musi miec zdefiniowana pule kolorow, lub kolor "inny", wtedy wyswietl pole tekstowe
// zdobienie koperty -> brak, lub lista wielokrotnego wyboru w zaleznosci od wybranego zaproszenia
// ilosc kopert -liczba 
//
//
// Treść zaproszenia:
// Czy zaproszenie ma zawierać zwrot "wraz z rodzicami?"
// Data ślubu
// Godzina
// Miejsce uroczystości (np. Kościół/Urząd stanu cywilnego/plener)
// Adres uroczystości
// Czy poza ślubem odbywa się wesele? tak/nie
// tak -> Miejsce przyjęcia weselnego
// Adres przyjęcia weselnego


//RSVP:
//Data potwierdzenia przybycia (pole data)
// Rebus ślubny -> tak/nie
// tak -> tekst (np. Zamiast prezentów - koperta/zamiast kwiatów - butelka wina)
//

//Treść karty dodatkowej np.INFO -> pole tekstowe niewymagane
//

//Treść zawiadomienia -> brak
//
//Tresc zaproszenia w jezyku obcym -> pole tekstowe niewymagane
// wszelkie informacje dotyczace zmian
//
//
//Skad sie dowiedzieliscie - wielokrotny wybor
//
//Dane do faktury -> Czy potrzebujesz faktury? tak/nie
//tak -> pole tekstowe

//checkbox z regulaminem -> pozwol na "wyslij" tylko jak zaznaczony
