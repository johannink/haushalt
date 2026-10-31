# Haushaltstool einrichten: PC, Laptop und Handy mit demselben Stand

Dauer: etwa 20 Minuten, nur einmal. Du brauchst einen Computer und eine E-Mail-Adresse.
Danach läuft die App ohne Claude. Was du auf einem Gerät einträgst, erscheint auf den anderen.

Die Menünamen bei Supabase und Netlify können sich leicht ändern. Die Schritte bleiben gleich.

---

## Schritt 1: Supabase-Konto und Projekt anlegen (Datenbank)

1. Öffne https://supabase.com und klicke auf **Start your project**. Melde dich an (z. B. mit E-Mail oder GitHub).
2. Klicke auf **New project**.
3. Trage ein:
   - **Name:** `haushaltstool`
   - **Database Password:** auf **Generate a password** klicken (brauchst du später nicht, aber notieren schadet nicht)
   - **Region:** **Central EU (Frankfurt)**
4. **Create new project** klicken und 1 bis 2 Minuten warten, bis das Projekt bereit ist.

## Schritt 2: Tabelle anlegen

1. Links im Menü **SQL Editor** öffnen.
2. Die Datei `setup.sql` aus diesem Ordner mit einem Texteditor öffnen, alles kopieren und in das Feld einfügen.
3. Unten rechts auf **Run** klicken. Es erscheint **Success. No rows returned**. Fertig.

## Schritt 3: Euer gemeinsames Konto anlegen

1. Links **Authentication** öffnen, dann **Users**.
2. **Add user** und **Create new user** wählen.
3. E-Mail und Passwort (mindestens 8 Zeichen) eintragen. **Auto Confirm User** anhaken.
4. **Create user** klicken.

Mit genau diesem Konto meldet ihr euch später auf allen Geräten an.

## Schritt 4: Fremde Anmeldungen sperren

1. Unter **Authentication** den Punkt **Sign In / Providers** öffnen.
2. **Allow new users to sign up** ausschalten und speichern.

Damit kann niemand sonst ein Konto in deiner App anlegen.

## Schritt 5: Zugangsdaten in die App eintragen

1. Links unten **Project Settings** (Zahnrad) öffnen, dann **API Keys**.
2. Kopiere den **Publishable key** (beginnt mit `sb_publishable_`).
3. Kopiere die **Project URL** (z. B. `https://abcdefgh.supabase.co`). Du findest sie unter **Project Settings > Data API** oder oben über den Knopf **Connect**.
4. Öffne die Datei `config.js` aus diesem Ordner mit einem Texteditor (Windows: Rechtsklick > Öffnen mit > Editor; Mac: TextEdit).
5. Trage beide Werte zwischen die Anführungszeichen ein:

```js
window.ABO_CONFIG = {
  url: 'https://abcdefgh.supabase.co',
  anonKey: 'sb_publishable_xxxxxxxxxxxx'
};
```

6. Speichern.

Wichtig: Niemals den **Secret key** oder **service_role**-Schlüssel eintragen.

## Schritt 6: App ins Netz stellen (Netlify)

1. Öffne https://app.netlify.com/drop und lege dir ein kostenloses Konto an (sonst wird die Seite nach kurzer Zeit gelöscht).
2. Ziehe den **ganzen Ordner** `haushaltstool-app` (nicht die ZIP-Datei) in das Feld auf der Seite.
3. Nach wenigen Sekunden bekommst du eine Adresse wie `https://zauberhaft-123.netlify.app`.
4. Optional: Unter **Site configuration > Change site name** einen schöneren Namen wählen, z. B. `haushalt-johannink`.

## Schritt 7: Auf allen Geräten öffnen

Öffne die Netlify-Adresse und melde dich mit dem Konto aus Schritt 3 an.

- **Desktop-PC und Laptop (Chrome oder Edge):** In der Adressleiste rechts auf das Symbol **App installieren** klicken. Dann gibt es ein eigenes Fenster und ein Symbol im Startmenü.
- **iPhone (Safari):** Teilen-Symbol, dann **Zum Home-Bildschirm**.
- **Android (Chrome):** Menü mit drei Punkten, dann **App installieren** oder **Zum Startbildschirm hinzufügen**.

Oben unter dem Titel steht **Synchron**, wenn alles verbunden ist.

---

## Gut zu wissen

- **Daten aus dem Claude-Artefakt übernehmen:** Im Artefakt gibt es keinen Export. Trage die echten Daten deshalb direkt in der App ein. Zum Ausprobieren: Menü (☰) > **Beispieldaten laden**, später **Beispieldaten entfernen**.
- **Offline:** Einträge ohne Internet werden gespeichert und beim nächsten Online-Gang abgeglichen.
- **Sicherung:** Menü (☰) > **Sicherung speichern** erzeugt eine CSV-Datei. **Sicherung laden** liest sie wieder ein.
- **Pause bei Nichtnutzung:** Kostenlose Supabase-Projekte werden nach etwa einer Woche ohne Zugriff pausiert. Im Supabase-Dashboard lässt sich das Projekt mit einem Klick wieder starten. Bei regelmäßiger Nutzung passiert das nicht.
- **Passwort vergessen:** In Supabase unter **Authentication > Users** beim Konto ein neues Passwort setzen.
- **Neue Version der App:** Neue Dateien in den Ordner legen, `config.js` behalten, Ordner bei Netlify unter **Deploys** erneut hineinziehen.
- **Ohne Einrichtung:** Ist `config.js` leer, läuft die App nur auf dem jeweiligen Gerät ohne Abgleich.
