export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      music: "Music",
      contact: "Contact",
      bookNow: "Book now",
      backHome: "Back home",
    },

    // Home Section
    home: {
      subtitle: "WELCOME",
      title: "The Home of Your Music",
      description:
        "Discover your creativity in our premium equipped music studio. Equipped with pristine Genelec monitors and a powerful subwoofer, every nuance of your mix will come through with crystal clarity. A high performance audio interface and professional microphone setup ensure your recordings capture every detail, while our selection of MIDI controllers lets you bring your musical ideas to life.",
    },

    // Services Section
    services: {
      title: "Services",
      subtitle: "What Do We Offer",
      bookButton: "Book Studio",
      equipmentTitle: "Studio Equipment Showcase",
      cards: {
        trackProduction: {
          title: "Track Production",
          description:
            "Transform your ideas into fully produced tracks with our music producer — including composing, recording, mixing, and mastering.",
          price: "€500 / track",
        },
        composition: {
          title: "Composition",
          description:
            "Compose instrumental tracks collaboratively with the music producer — excluding recording, mixing, and mastering.",
          price: "€300 / track",
        },
        recording: {
          title: "Recording",
          description:
            "Capture your sound with high-quality recording services in a professional studio environment. Recording of the vocals and podcasts with recording engineer.",
          price: "€30 / hour (min. 3 hrs)",
        },
        mixing: {
          title: "Mixing",
          description:
            "Elevate your tracks with professional mixing services designed to bring your music to life.",
          price: "€250 / track",
        },
        mastering: {
          title: "Mastering",
          description:
            "Our professional mastering services ensure your music sounds polished, balanced, and ready for any platform, from streaming to radio.",
          price: "€100 / track",
        },
        studioRent: {
          title: "Studio rent",
          description:
            "Modern music studio with high-quality equipment and creative atmosphere. Includes separate kitchen and comfortable relaxation area. For monthly studio",
          memberships: "memberships",
          descriptionEnd: "please contact us by email.",
          price: "€40 / 2h | €60 / 4h | €100 / 8h",
        },
      },
    },

    // Music Section
    music: {
      title: "Music",
      subtitle: "Our Projects",
    },

    // Contact Section
    contact: {
      title: "",
      subtitle: "Contact Us",
      form: {
        name: "Your name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        success: "Thank you, {name}! Your message has been sent.",
        errors: {
          nameRequired: "Username is required!",
          emailRequired: "Please give your Email!",
          emailInvalid: "Give a valid Email!",
          messageRequired: "Message is required!",
          sendFailed: "Failed to send the message. Please try again later.",
        },
      },
    },

    // Footer
    footer: {
      contacts: "CONTACTS",
      media: "MEDIA",
      location: "LOCATION",
      address: {
        street: "Sörnäisten rantatie 25",
        postal: "00520",
        city: "Helsinki",
      },
    },

    // Booking Page
    booking: {
      pageTitle: "Book a Music Studio in Helsinki | Eclipse Productions Oy",
      metaDescription:
        "Reserve your studio session online at Eclipse Productions Oy. Affordable hourly rates, professional equipment, and modern facilities in Helsinki.",
      selectedDate: "Selected Date",
      selectedTime: "Selected Time",
      duration: "Duration & Price",
      bookSlot: "Book This Slot",
      cancel: "Cancel",
      form: {
        bookingOn: "Booking on",
        time: "Time",
        duration: "Duration",
        studioRental: "Studio rental",
        recordingEngineer: "Recording engineer",
        total: "Total",
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone",
        email: "Email",
        notes: "Notes",
        optional: "(optional)",
        required: "*",
        needsEngineer: "I need a recording engineer",
        engineerNote: "+ 10 € per hour · Professional recording assistance",
        confirmBooking: "Confirm Booking",
        booking: "Booking…",
      },
      terms: {
        checkboxLabel: "I have read and accept the",
        linkLabel: "Terms & Conditions",
        mustAccept: "⚠️ You must accept the Terms & Conditions before booking.",
        modalTitle: "Terms & Conditions",
        close: "Close",
        sections: [
          {
            title: "Duration",
            items: [
              "The rental period shall begin and end at the specific start and end times confirmed in the booking form for the reserved date.",
              "Any overtime usage must be approved in advance and will incur additional charges.",
            ],
          },
          {
            title: "Invoicing",
            items: [
              "Full payment is required before the studio use.",
              "The payment invoice is sent to the customer by email.",
              "Invoices must be paid within seven (7) days of issuance.",
              "A payment reminder will be sent for an overdue invoice, and additional charges may apply.",
              "Please include the invoice reference number when making payments to ensure proper processing.",
            ],
          },
          {
            title: "Use of Equipment",
            items: [
              "The renter is responsible for handling all studio equipment with care.",
              "Any damage to the equipment caused by negligence, misuse, or abuse will be charged to the renter.",
              "Equipment shall not be removed from the studio premises under any circumstances.",
              "Speakers and the subwoofer must not be moved. If moved, the renter will be charged a calibration fee.",
            ],
          },
          {
            title: "Conduct and Studio Rules",
            items: [
              "No smoking, alcohol, or illegal substances are allowed inside the studio.",
              "Liquids are strictly prohibited on worktable and musical instruments to prevent damage.",
              "Food may only be consumed in the designated kitchen area.",
              "Noise levels must be kept within reasonable limits.",
              "The renter is responsible for maintaining cleanliness and tidiness in the studio.",
              "The studio reserves the right to terminate the rental session without a refund if the rules are violated.",
              "A maximum of four (4) people is permitted in the studio during the rental period.",
            ],
          },
          {
            title: "Security and Access",
            items: [
              "The studio will be opened at the beginning of the booked session time.",
              "Security cameras may be in operation for safety and equipment protection.",
            ],
          },
          {
            title: "Cancellations and Refunds",
            items: [
              "Cancellations made at least 48 hours before the scheduled rental period may qualify for a full or partial refund.",
              "Last-minute cancellations (less than 48 hours) may result in a forfeited payment.",
            ],
          },
          {
            title: "Insurance",
            items: [
              "Eclipse Productions Oy does not provide insurance coverage for renters or their guests.",
              "Customers are responsible for covering any accidents or injuries through their personal insurance.",
            ],
          },
          {
            title: "Privacy Notice",
            items: [
              "We collect your personal information solely for the purpose of managing your studio booking and fulfilling our contractual obligations. Your data will be stored securely and will not be shared with third parties except when required by law. You have the right to access, correct, or request deletion of your personal data at any time by contacting us.",
            ],
          },
        ],
        footer:
          "By confirming the booking, you agree to these terms and conditions.",
      },
      messages: {
        pastSlot: "⚠️ You cannot book past time slots.",
        overlap: "⚠️ Selected time overlaps with an existing booking.",
        selectRange: "⚠️ Please select a time range before booking.",
        fillRequired: "⚠️ Please fill in all required fields.",
        confirmed: "✅ Booking confirmed! Confirmation email sent.",
        failed: "❌ Booking failed. Please try again.",
        loadError:
          "❌ Error loading existing bookings. Please refresh the page.",
      },
      instructions: {
        title: "How to Book Your Studio",
        steps: [
          {
            title: "Pick Your Time",
            description:
              "Choose available time slot in the calendar by dragging over the time you want to book.",
          },
          {
            title: "Preview & Book",
            description:
              'A pop-up window will show your selected time range — click "Book this slot" to continue.',
          },
          {
            title: "Enter Details",
            description:
              'Fill in your name, contact info, and add notes if you have any wishes, then click "Confirm Booking".',
          },
          {
            title: "Confirmation & Access",
            description:
              "You'll receive a confirmation email along with your invoice. Once payment is completed, we'll open the studio with a mobile key for you.",
          },
        ],
      },
    },

    // SEO
    seo: {
      home: {
        title: "Professional Music Studio Helsinki | Eclipse Productions",
        description:
          "Professional music studio in Helsinki equipped with Genelec monitors, professional microphones, and MIDI controllers. Book your recording session today.",
        ogTitle: "Professional Music Studio Helsinki | Eclipse Productions",
        ogDescription:
          "Professional music studio in Helsinki equipped with Genelec monitors, professional microphones, and MIDI controllers.",
      },
      booking: {
        title: "Book a Music Studio in Helsinki | Eclipse Productions Oy",
        description:
          "Reserve your studio session online at Eclipse Productions Oy. Affordable hourly rates, professional equipment, and modern facilities in Helsinki.",
        ogTitle: "Book a Music Studio in Helsinki | Eclipse Productions Oy",
        ogDescription:
          "Reserve your studio session online at Eclipse Productions Oy. Affordable rates, professional equipment, and modern facilities in Helsinki.",
      },
    },
  },

  fi: {
    // Navigation
    nav: {
      home: "Etusivu",
      services: "Palvelut",
      music: "Musiikki",
      contact: "Yhteystiedot",
      bookNow: "Varaa tästä",
      backHome: "Etusivulle",
    },

    // Home Section
    home: {
      subtitle: "TERVETULOA",
      title: "Paikka musiikillesi",
      description:
        "Studiomme on varustettu Genelec-monitorilla ja subwooferilla, jotka tarjoavat poikkeuksellisen tarkan äänikuvan miksauksellesi. Tehokas audioliitäntä ja ammattimaiset mikrofoniasetukset takaavat, että äänityksesi vangitsevat jokaisen yksityiskohdan. MIDI-ohjainten valikoiman ansiosta voit toteuttaa musiikilliset ideasi helposti.",
    },

    // Services Section
    services: {
      title: "Palvelut",
      subtitle: "Mitä Tarjoamme",
      bookButton: "Varaa Tästä",
      equipmentTitle: "Studion Laitteet",
      cards: {
        trackProduction: {
          title: "Biisituotanto (paketti)",
          description:
            "Ideasta valmiiksi kappaleeksi tuottajamme kanssa — sisältäen sävellyksen, äänityksen, miksauksen ja masteroinnin.",
          price: "€500 / kappale",
        },
        composition: {
          title: "Sävellys",
          description:
            "Instrumentaaliraitojen sävellys yhdessä studion tuottajan kanssa — ilman äänitystä, miksausta ja masterointia.",
          price: "€300 / kappale",
        },
        recording: {
          title: "Äänittäminen",
          description:
            "Äänittäminen korkealaatuisessa studioympäristössä ammattitaitoisen äänittäjän kanssa — laulujen ja podcastien äänitys.",
          price: "€30 / tunti (min. 3 tuntia)",
        },
        mixing: {
          title: "Miksaus",
          description:
            "Vie kappaleesi uudelle tasolle ammattitaitoisilla miksauspalveluillamme, jotka on suunniteltu herättämään musiikkisi eloon.",
          price: "€250 / kappale",
        },
        mastering: {
          title: "Masterointi",
          description:
            "Ammattimaiset masterointipalvelumme viimeistelevät musiikkisi, jotta se kuulostaa huolitellulta ja valmiilta kaikille alustoille — suoratoistosta radioon.",
          price: "€100 / kappale",
        },
        studioRent: {
          title: "Studion vuokraus",
          description:
            "Moderni ja tyylikäs musiikkistudio korkealaatuisella laitteistolla ja inspiroivassa ilmapiirissä. Studiolla on erillinen keittiö ja mukava rentoutumistila. Kuukausittaisista jäsenyyksistä voit tiedustella lisää sähköpostitse.",
          memberships: "jäsenyyksistä",
          descriptionEnd: "ota yhteyttä sähköpostitse.",
          price: "€40 / 2h | €60 / 4h | €100 / 8h",
        },
      },
    },

    // Music Section
    music: {
      title: "Musiikki",
      subtitle: "Projektimme",
    },

    // Contact Section
    contact: {
      title: "",
      subtitle: "Ota Yhteyttä",
      form: {
        name: "Nimesi",
        email: "Sähköposti",
        message: "Viesti",
        send: "Lähetä Viesti",
        success: "Kiitos, {name}! Viestisi on lähetetty.",
        errors: {
          nameRequired: "Nimi vaaditaan!",
          emailRequired: "Anna sähköpostiosoitteesi!",
          emailInvalid: "Anna kelvollinen sähköpostiosoite!",
          messageRequired: "Viesti vaaditaan!",
          sendFailed:
            "Viestin lähettäminen epäonnistui. Yritä myöhemmin uudelleen.",
        },
      },
    },

    // Footer
    footer: {
      contacts: "YHTEYSTIEDOT",
      media: "MEDIA",
      location: "OSOITE",
      address: {
        street: "Sörnäisten rantatie 25",
        postal: "00520",
        city: "Helsinki",
      },
    },

    // Booking Page
    booking: {
      pageTitle: "Varaa Musiikkistudio Helsingissä | Eclipse Productions Oy",
      metaDescription:
        "Varaa studiosessiosi verkossa Eclipse Productions Oy:stä. Edulliset tuntihinnat, ammattilaitteisto ja modernit tilat Helsingissä.",
      selectedDate: "Valittu Päivämäärä",
      selectedTime: "Valittu Aika",
      duration: "Tunnit & Hinta",
      bookSlot: "Varaa Tämä Aika",
      cancel: "Peruuta",
      form: {
        bookingOn: "Varaus",
        time: "Aika",
        duration: "Tunnit",
        studioRental: "Studion vuokra",
        recordingEngineer: "Äänittäjä",
        total: "Hinta",
        firstName: "Etunimi",
        lastName: "Sukunimi",
        phone: "Puhelin",
        email: "Sähköposti",
        notes: "Muistiinpanot",
        optional: "(valinnainen)",
        required: "*",
        needsEngineer: "Tarvitsen äänittäjän",
        engineerNote: "+ 10 € tunnilta · Ammattimainen äänittämisapu",
        confirmBooking: "Vahvista Varaus",
        booking: "Varataan…",
      },
      terms: {
        checkboxLabel: "Olen lukenut ja hyväksyn",
        linkLabel: "Varausehdot",
        mustAccept:
          "⚠️ Sinun on hyväksyttävä varausehdot ennen varauksen tekemistä.",
        modalTitle: "Varausehdot",
        close: "Sulje",
        sections: [
          {
            title: "Vuokra-aika",
            items: [
              "Vuokra-aika alkaa ja päättyy varauslomakkeessa vahvistettujen varausaikojen mukaisesti.",
              "Vuokra-ajan ylittävä käyttö on hyväksytettävä etukäteen, ja siitä veloitetaan lisämaksu.",
            ],
          },
          {
            title: "Laskutus",
            items: [
              "Vuokra on maksettava kokonaisuudessaan ennen studion käyttöä.",
              "Lasku lähetetään asiakkaalle sähköpostitse.",
              "Lasku on maksettava seitsemän (7) päivän kuluessa sen päiväyksestä.",
              "Maksamattomasta laskusta lähetetään maksumuistutus, ja siitä voidaan veloittaa lisämaksuja.",
              "Maksu on suoritettava käyttäen laskun viitenumeroa, jotta maksu voidaan käsitellä oikein.",
            ],
          },
          {
            title: "Laitteiden käyttö",
            items: [
              "Vuokraaja on vastuussa kaikkien studiolaitteiden huolellisesta käsittelystä.",
              "Laitteille aiheutuneet vahingot, jotka johtuvat huolimattomuudesta, väärinkäytöstä tai tahallisesta vahingoittamisesta, peritään vuokraajalta.",
              "Laitteita ei saa viedä pois studion tiloista missään olosuhteissa.",
              "Kaiuttimia ja subwooferia ei saa siirtää. Mikäli niitä siirretään, vuokraajalta peritään kalibrointimaksu.",
            ],
          },
          {
            title: "Käyttäytyminen ja studion säännöt",
            items: [
              "Tupakointi, alkoholin käyttö ja laittomien aineiden käyttö ovat studiossa kiellettyjä.",
              "Nesteiden tuominen työpöydälle tai soittimien läheisyyteen on ehdottomasti kielletty vahinkojen estämiseksi.",
              "Ruokailu on sallittua vain siihen tarkoitetussa keittiötilassa.",
              "Melutaso on pidettävä kohtuullisena.",
              "Vuokraaja on vastuussa studion siisteydestä ja järjestyksestä.",
              "Studio pidättää oikeuden keskeyttää vuokrauksen ilman hyvitystä, jos sääntöjä rikotaan.",
              "Studiossa saa oleskella enintään neljä (4) henkilöä vuokra-ajan aikana.",
            ],
          },
          {
            title: "Turvallisuus ja pääsy",
            items: [
              "Studio avataan varatun vuoroajan alkaessa.",
              "Studiossa voidaan käyttää turvakameroita turvallisuuden ja laitteiden suojaamiseksi.",
            ],
          },
          {
            title: "Peruutukset ja hyvitykset",
            items: [
              "Mikäli varaus peruutetaan vähintään 48 tuntia ennen vuokra-ajan alkamista, on asiakkaalla oikeus täyteen tai osittaiseen hyvitykseen yrityksen harkinnan mukaan.",
              "Alle 48 tuntia ennen vuokra-ajan alkamista tehdyt peruutukset eivät oikeuta hyvitykseen, ja koko vuokrasumma voidaan veloittaa.",
            ],
          },
          {
            title: "Vakuutus",
            items: [
              "Eclipse Productions Oy ei tarjoa vakuutusta vuokraajille tai heidän vierailleen.",
              "Vuokraaja on vastuussa mahdollisten onnettomuuksien tai vammojen kattamisesta omalla vakuutuksellaan.",
            ],
          },
          {
            title: "Tietosuojailmoitus",
            items: [
              "Keräämme henkilötietojasi yksinomaan studion varauksen hallintaa varten ja sopimusvelvoitteidemme täyttämiseksi. Tietosi säilytetään turvallisesti, eikä niitä luovuteta kolmansille osapuolille, ellei laki toisin edellytä. Sinulla on oikeus milloin tahansa pyytää tietojesi tarkastamista, korjaamista tai poistamista ottamalla meihin yhteyttä.",
            ],
          },
        ],
        footer: "Vahvistamalla varauksen hyväksyt varausehdot.",
      },
      messages: {
        pastSlot: "⚠️ Et voi varata menneitä aikavälejä.",
        overlap:
          "⚠️ Valittu aika on päällekkäin olemassa olevan varauksen kanssa.",
        selectRange: "⚠️ Valitse aikaväli ennen varaamista.",
        fillRequired: "⚠️ Täytä kaikki pakolliset kentät.",
        confirmed: "✅ Varaus vahvistettu! Vahvistussähköposti lähetetty.",
        failed: "❌ Varaus epäonnistui. Yritä uudelleen.",
        loadError: "❌ Virhe varausten lataamisessa. Päivitä sivu.",
      },
      instructions: {
        title: "Näin Varaat Studion",
        steps: [
          {
            title: "Valitse Aikasi",
            description:
              "Valitse aika kalenterista varataksesi haluamasi ajankohta.",
          },
          {
            title: "Esikatsele & Varaa",
            description:
              'Ponnahdusikkuna näyttää valitsemasi aikavälin — klikkaa "Varaa tämä aika" jatkaaksesi.',
          },
          {
            title: "Syötä Tiedot",
            description:
              'Täytä nimesi ja yhteystietosi, lisää muistiinpanoja tai toiveita studiovuokrallesi, ja klikkaa sen jälkeen "Vahvista Varaus".',
          },
          {
            title: "Vahvistus & Pääsy",
            description:
              "Saat vahvistussähköpostin ja laskun. Kun maksu on suoritettu, avaamme studion sinulle mobiiliavaimella.",
          },
        ],
      },
    },

    // SEO
    seo: {
      home: {
        title: "Ammattimainen Musiikkistudio Helsinki | Eclipse Productions",
        description:
          "Ammattimainen musiikkistudio Helsingissä varustettu Genelec-monitoreilla, ammattimikrofoneilla ja MIDI-ohjaimilla. Varaa äänityksesi tänään.",
        ogTitle: "Ammattimainen Musiikkistudio Helsinki | Eclipse Productions",
        ogDescription:
          "Ammattimainen musiikkistudio Helsingissä varustettu Genelec-monitoreilla, ammattimikrofoneilla ja MIDI-ohjaimilla.",
      },
      booking: {
        title: "Varaa Musiikkistudio Helsingissä | Eclipse Productions Oy",
        description:
          "Varaa studiosessiosi verkossa Eclipse Productions Oy:stä. Edulliset tuntihinnat, ammattilaitteisto ja modernit tilat Helsingissä.",
        ogTitle: "Varaa Musiikkistudio Helsingissä | Eclipse Productions Oy",
        ogDescription:
          "Varaa studiosessiosi verkossa Eclipse Productions Oy:stä. Edulliset hinnat, ammattilaitteisto ja modernit tilat Helsingissä.",
      },
    },
  },
};

export type Language = "en" | "fi";
export type TranslationKeys = typeof translations.en;
