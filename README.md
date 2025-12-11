# Generatore di Prompt C.R.A.F.T.

Un'applicazione web React TypeScript per generare prompt strutturati utilizzando il framework C.R.A.F.T. (Contesto, Ruolo, Azione, Formato, Target).

## 🚀 Caratteristiche

- **Framework C.R.A.F.T.**: Genera prompt strutturati e professionali
- **Interfaccia 3D**: Bottoni interattivi con animazioni 3D
- **Suggerimenti Dinamici**: Rotazione automatica di esempi di prompt ogni 10 secondi
- **Design Responsive**: Ottimizzato per desktop e dispositivi mobili
- **Tutorial Integrato**: Guida interattiva per imparare a usare C.R.A.F.T.
- **Tema Scuro**: Interfaccia moderna e professionale

## 🛠️ Tecnologie

- **React 18** con TypeScript
- **Vite** per lo sviluppo veloce
- **Tailwind CSS** per lo styling
- **React Router** per la navigazione
- **Google Gemini API** per la generazione AI

## 📦 Installazione

1. Clona il repository:
```bash
git clone https://github.com/fracabu/generatore-di-prompt-craft.git
cd generatore-di-prompt-craft
```

2. Installa le dipendenze:
```bash
npm install
```

3. Configura la API key di Google Gemini:
   - Crea un file `.env.local` nella root del progetto
   - Aggiungi la tua API key:
     ```
     VITE_GEMINI_API_KEY=la_tua_api_key_qui
     ```

4. Avvia il server di sviluppo:
```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:3000`

## 🎯 Come Usare

1. **Inserisci un argomento**: Digita l'argomento per cui vuoi generare un prompt
2. **Clicca "Genera Prompt"**: L'AI creerà un prompt strutturato C.R.A.F.T.
3. **Visualizza il risultato**: Esamina il prompt generato con tutti i componenti C.R.A.F.T.
4. **Testa il prompt**: Prova il prompt generato per vedere i risultati

## 📚 Il Framework C.R.A.F.T.

- **C**ontesto: Informazioni di background sulla situazione
- **R**uolo: La persona o l'entità che dovrebbe agire
- **A**zione: L'attività specifica da compiere
- **F**ormato: La struttura o il tipo di output desiderato
- **T**arget: Il pubblico destinatario del contenuto

## 🏗️ Struttura del Progetto

```
src/
├── components/          # Componenti React riutilizzabili
│   ├── Header.tsx      # Header con navigazione
│   ├── Footer.tsx      # Footer del sito
│   ├── PromptCard.tsx  # Card per visualizzare i prompt
│   └── ...
├── views/              # Pagine principali dell'app
│   ├── HomeView.tsx    # Pagina principale
│   ├── ResultView.tsx  # Risultati del prompt
│   └── TestView.tsx    # Test del prompt
├── services/           # Servizi esterni
│   ├── geminiService.ts # Integrazione con Gemini API
│   └── aiService.ts    # Servizi AI generici
├── data/               # Dati statici
│   └── examplePrompts.ts # Esempi di prompt
└── types.ts            # Definizioni TypeScript
```

## 🎨 Personalizzazione

### Colori e Tema
I colori principali sono definiti in Tailwind CSS:
- **Primario**: Sky blue (`sky-600`)
- **Secondario**: Emerald (`emerald-400`)
- **Background**: Slate dark (`slate-900`)

### Animazioni 3D
I bottoni utilizzano animazioni CSS 3D personalizzate con:
- Effetti hover e active
- Transizioni fluide
- Ombre dinamiche

## 🚀 Build e Deploy

Per creare la versione di produzione:
```bash
npm run build
```

Per anteprima della build:
```bash
npm run preview
```

## 🤝 Contributi

1. Fork del progetto
2. Crea un branch feature (`git checkout -b feature/nuova-caratteristica`)
3. Commit delle modifiche (`git commit -am 'Aggiunta nuova caratteristica'`)
4. Push al branch (`git push origin feature/nuova-caratteristica`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

## 🔗 Link Utili

- [Documentazione React](https://react.dev/)
- [Documentazione Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Framework C.R.A.F.T.](https://www.example.com/craft-framework)

---

Creato con ❤️ da [fracabu](https://github.com/fracabu)
