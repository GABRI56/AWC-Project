# Progetto AWC - A.A. 2023/2024

## Descrizione
Il progetto consiste in un'applicazione web dinamica per la gestione di ricette culinarie. Le principali funzionalità includono:
- Ricerca di ricette per parola chiave o categoria
- Salvataggio di ricette nel proprio ricettario personale
- Scrittura e gestione di recensioni sulle ricette

## Struttura del Sito

### Home Page (`index`)
La homepage include:
- Una barra di ricerca per trovare ricette tramite iniziale o parola chiave
- Un pulsante per visualizzare una ricetta casuale
- Un collegamento rapido al ricettario personale (se l'utente è loggato)

### Pagina delle Ricette
- Accessibile tramite la barra di ricerca o la navbar
- Mostra i risultati sotto forma di card contenenti immagine, titolo e informazioni

### Pagina delle Categorie
- Funzionamento simile alla pagina delle ricette
- La ricerca avviene per categoria selezionabile tramite un `select`

### Recensioni
- Mostra tutte le recensioni disponibili in una tabella
- Ogni riga include il nome della ricetta, il recensore, la data e le valutazioni
- Cliccando sul nome della ricetta, si accede alla sua pagina dettagliata

### Pagina della Ricetta
- Contiene il titolo, informazioni principali, procedimento completo e recensioni
- Sezione per salvataggio e recensioni sulla ricetta

### Area Personale
Accessibile tramite il tasto "Accedi" nella navbar, consente:
- Registrazione/Login
- Gestione del profilo (modifica dati, logout, eliminazione account)
- Visualizzazione delle ricette salvate nel proprio ricettario
- Consultazione e cancellazione delle proprie recensioni

## Implementazione Tecnica
Il sito è sviluppato con:
- **HTML5, CSS3, JavaScript**
- **Bootstrap 4** (incluso pacchetto icone)
- **ICONS8** per ulteriori icone

I dati vengono memorizzati in `localStorage` sotto forma di JSON:
- **Utenti**: salvati con chiavi `user_[emailutente]`, contenenti informazioni, statistiche e ricette salvate
- **Recensioni**: archiviate in un array separato, identificato dall'ID della ricetta e dall'email dell'utente
- **Utente loggato**: gestito con l'elemento `currentUser`, che memorizza l'email dell'utente attuale

## Funzionalità Principali

### Gestione del Profilo Utente
- Registrazione: creazione di un nuovo oggetto utente con le informazioni inserite e salvataggio in `localStorage`
- Modifica profilo: ripropone il form con i dati attuali, salvando le nuove modifiche
- Eliminazione account: rimozione dell'utente e dei relativi dati

### Ricerca di Ricette
- Implementata tramite l'API Rest di **TheMealDB**
- Due modalità:
  1. Ricerca per parola chiave o lettera
  2. Ricerca per categoria
- Una volta ottenuti i risultati, vengono generati dinamicamente gli elementi della pagina

### Gestione del Ricettario Personale
- Ogni card di ricetta include un'icona per aggiungere/rimuovere la ricetta dal ricettario
- Funzione avanzata nella pagina dettagliata della ricetta:
  - Permette di aggiungere una nota personale
  - Il salvataggio aggiorna la ricetta evitando duplicazioni

### Recensioni delle Ricette
- Nella pagina dei dettagli di una ricetta, gli utenti possono lasciare recensioni
- Le recensioni vengono salvate in `localStorage` e associate alla ricetta
- Gli utenti possono cancellare le proprie recensioni dal proprio profilo

## Conclusione
Questo progetto offre un'applicazione web intuitiva per gli appassionati di cucina, permettendo la gestione delle proprie ricette e interazioni con altri utenti attraverso recensioni e valutazioni.

