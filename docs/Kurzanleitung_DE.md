# Rocket 15 Questions – Kurzanleitung für Lehrkräfte

## Was ist Rocket 15 Questions?

Rocket 15 Questions ist ein H5P-Inhaltstyp für das spielerische Üben im Unterricht. Lernende wählen zu Beginn eine Grafik (Rakete, Schmetterling, Eule oder Eistüte). Für jede richtig beantwortete Frage wird ein weiterer Teil der Grafik gezeichnet. Nach 15 richtigen Antworten ist die Grafik vollständig und eine Abschlussanimation startet.

**Unterstützte Fragetypen:**

- **Single Choice** – eine Frage mit mehreren Antwortoptionen, genau eine ist richtig
- **Wahr / Falsch** – eine Aussage, die als wahr oder falsch bewertet wird
- **Kurzantwort** – Lernende tippen eine kurze Textantwort ein (Groß-/Kleinschreibung wird ignoriert)

---

## ⚠️ Wichtiger Hinweis zur Installation

> Rocket 15 Questions ist kein offizieller H5P-Inhaltstyp und ist daher nicht im H5P Content Type Hub verfügbar. Er muss einmalig von der Moodle-Administration installiert werden, bevor Lehrkräfte ihn nutzen können. Bitte wenden Sie sich an Ihre Moodle-Administration und leiten Sie diese Anleitung weiter.

---

## Installation (für Moodle-Administratoren)

Die Installationsdatei kann hier heruntergeladen werden:  
**[→ Rocket15Questions-1_0_8.h5p herunterladen](https://github.com/UGrabe/h5p-rocket15questions/releases/download/v1.0.8/Rocket15Questions-1_0_8.h5p)**

### Option A: Moodle-Core-H5P (integriert, Standard seit Moodle 3.9)

Die Beispieldatei `Rocket15Questions-1_0_8.h5p` wird direkt in einen Moodle-Kurs hochgeladen:

1. Bearbeitungsmodus einschalten (oben rechts im Kurs)
2. Die Datei `Rocket15Questions-1_0_8.h5p` per Drag & Drop in den Kursbereich ziehen
3. Moodle erkennt die Datei als H5P-Aktivität und installiert die Library automatisch
4. Fertig – der Inhaltstyp steht ab sofort in der gesamten Moodle-Instanz zur Verfügung

### Option B: Schwarzes H5P-Plugin (mod_hvp)

Bei Moodle-Installationen mit dem separaten H5P-Plugin („schwarzes H5P") muss die Library über die Website-Administration installiert werden:

1. Website-Administration → Plugins → H5P → H5P-Bibliotheken
2. Unter „Bibliothek hochladen" die Datei `Rocket15Questions-1_0_8.h5p` hochladen
3. Klick auf den Button „Hochladen"
4. Moodle installiert die Library und sie steht anschließend kursübergreifend zur Verfügung

---

## Aufgabe erstellen und Fragen eingeben

Eine neue Rocket-15-Questions-Aktivität wird wie jede H5P-Aktivität angelegt:

- **Moodle-Core (Blaues H5P):** Im Kurs unter „Mehr" den Inhaltsspeicher aufrufen und unter „Hinzufügen" den Inhaltstyp Rocket 15 Questions auswählen.
- **H5P-Plugin (Schwarzes H5P):** Im Kurs Aktivität hinzufügen, „Interaktiver Inhalt" auswählen und über die Liste aller Inhaltstypen oder die Suche Rocket 15 Questions auswählen.

Fragen können auf zwei Wegen eingegeben werden:

### Weg 1: Formular

Im Reiter **Formular** können Fragen einzeln über ein strukturiertes Eingabeformular erfasst werden. Für jede Frage wird zunächst der Fragetyp gewählt, dann die Frage und die Antwort(en) eingetragen.

Hinweise:

- **Single Choice:** Die erste eingetragene Antwort gilt als richtig. Die Reihenfolge wird im Spiel automatisch zufällig gemischt.
- **Wahr / Falsch:** Richtige Antwort per Radiobutton auswählen.
- **Kurzantwort:** Die Antwort wird unabhängig von Groß- und Kleinschreibung verglichen.

### Weg 2: Texteingabe (Kurzformat)

Im Reiter **Texteingabe** können Fragen im Kurzformat eingetragen werden – eine Frage pro Zeile. Das ist besonders praktisch für größere Fragenpools.

**Format:**

```
SC|Frage|Richtige Antwort|Antwort B|Antwort C|Antwort D
TF|Aussage|wahr
TF|Aussage|falsch
KA|Frage|Richtige Antwort
```

> **Hinweis:** SC = Single Choice, TF = Wahr/Falsch (Schlüsselwörter: `wahr` / `falsch`), KA = Kurzantwort. Bei SC ist die erste Antwort die richtige. Optional kann die richtige Antwort auch mit einem Sternchen (`*`) markiert werden (z. B. `Antwort A*`) – diese Antwort wird dann automatisch an die erste Stelle gesetzt.

Formular und Texteingabe sind synchronisiert: Beim Wechsel zwischen den Reitern wird der Inhalt jeweils übertragen.

---

## Tipps für gute Aufgaben

- **Mindestens 20 Fragen eingeben.** Zum Gewinnen sind 15 richtige Antworten nötig – ein größerer Pool sorgt für Abwechslung bei Wiederholungen.
- **Fragetypen mischen:** SC, TF und KA abwechseln macht das Spiel abwechslungsreicher.
- **Kurzantworten kurz halten:** Einwortige Antworten oder Zahlen funktionieren am besten (z. B. „Paris", „81", „8").
- **Zufällige Mischoption:** Standardmäßig werden Fragen zufällig gezogen. Das kann in den Einstellungen deaktiviert werden.
- **KI-Unterstützung:** Für die Erstellung von Fragen kann KI zur Unterstützung herangezogen werden. Übergeben Sie im Prompt das Fragenformat für die Texteingabe (Kurzformat), damit die Fragen im richtigen Format ausgegeben werden und nur noch in das Textfeld eingefügt werden müssen.

---

## Einstellungen

| Einstellung | Beschreibung |
|---|---|
| **Grafiken aktivieren** | Auswahl, welche Grafiken Lernende wählen können (Rakete, Schmetterling, Eule, Eistüte) |
| **Fragen mischen** | Zufällige Reihenfolge der Fragen (Standard: aktiviert) |
| **Wiederholen-Button** | Lernende können die Aufgabe nach Abschluss neu starten |
| **Lösung anzeigen** | Am Ende werden alle Fragen mit richtigen und eigenen Antworten angezeigt |
| **Texte anpassen** | Alle Beschriftungen (Buttons, Feedback, Grafik-Bezeichnungen) können geändert werden |

---

*Rocket 15 Questions ist ein inoffizieller, frei verwendbarer H5P-Inhaltstyp.*
