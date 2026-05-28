# Rocket 15 Questions – Quick Guide for Teachers

## What is Rocket 15 Questions?

Rocket 15 Questions is an H5P content type for gamified practice in the classroom. Learners begin by choosing a graphic (rocket, butterfly, owl, or ice cream cone). Each correct answer adds another part to the graphic. After 15 correct answers the graphic is complete and a final animation plays.

**Supported question types:**

- **Single Choice** – one question with multiple answer options, exactly one is correct
- **True / False** – a statement to be evaluated as true or false
- **Short Answer** – learners type a short text answer (case-insensitive)

---

## ⚠️ Important Note on Installation

> Rocket 15 Questions is not an official H5P content type and is therefore not available in the H5P Content Type Hub. It must be installed once by the Moodle administrator before teachers can use it. Please contact your Moodle administrator and share this guide with them.

---

## Installation (for Moodle Administrators)

Download the installation file here:  
**[→ Download Rocket15Questions-1_0_8.h5p](https://github.com/UGrabe/h5p-rocket15questions/releases/download/v1.0.8/Rocket15Questions-1_0_8.h5p)**

### Option A: Moodle Core H5P (built-in, standard since Moodle 3.9)

Upload the file `Rocket15Questions-1_0_8.h5p` directly into a Moodle course:

1. Enable editing mode (top right in the course)
2. Drag and drop `Rocket15Questions-1_0_8.h5p` into the course area
3. Moodle recognises the file as an H5P activity and installs the library automatically
4. Done – the content type is now available across the entire Moodle instance

### Option B: Black H5P Plugin (mod_hvp)

On Moodle installations using the separate H5P plugin ("black H5P"), the library must be installed via site administration:

1. Site administration → Plugins → H5P → H5P Libraries
2. Under "Upload library" select the file `Rocket15Questions-1_0_8.h5p`
3. Click the "Upload" button
4. Moodle installs the library and it is then available across all courses

---

## Creating an Activity and Entering Questions

A new Rocket 15 Questions activity is created like any H5P activity:

- **Moodle Core (Blue H5P):** In the course, go to "More" → Content bank and under "Add" select the Rocket 15 Questions content type.
- **H5P Plugin (Black H5P):** In the course, add an activity, select "Interactive Content" and find Rocket 15 Questions via the content type list or search.

Questions can be entered in two ways:

### Way 1: Form

In the **Form** tab, questions can be entered one by one via a structured input form. For each question, first select the question type, then enter the question and answer(s).

Notes:

- **Single Choice:** The first answer entered is treated as correct. The order is automatically randomised in the game.
- **True / False:** Select the correct answer using the radio button.
- **Short Answer:** The answer is compared regardless of capitalisation.

### Way 2: Text Input (short format)

In the **Text input** tab, questions can be entered in a compact format – one question per line. This is especially handy for larger question pools.

**Format:**

```
SC|Question|Correct answer|Answer B|Answer C|Answer D
TF|Statement|wahr
TF|Statement|falsch
KA|Question|Correct answer
```

> **Note:** SC = Single Choice, TF = True/False (keywords: `wahr` / `falsch`), KA = Short Answer. For SC the first answer is the correct one. Optionally the correct answer can be marked with an asterisk (`*`) (e.g. `Answer A*`) – this answer is then automatically moved to the first position.

Form and text input are synchronised: when switching between tabs the content is transferred automatically.

---

## Tips for Good Activities

- **Enter at least 20 questions.** Winning requires 15 correct answers – a larger pool keeps repeated plays varied.
- **Mix question types:** Alternating SC, TF and KA keeps the game more varied.
- **Keep short answers brief:** Single-word answers or numbers work best (e.g. "Paris", "81", "8").
- **Shuffle option:** By default questions are drawn randomly. This can be disabled in the settings.
- **AI support:** AI tools can help create questions. Include the short text format in your prompt so that questions are generated in the correct format and can then simply be pasted into the text input field.

---

## Settings

| Setting | Description |
|---|---|
| **Enable graphics** | Select which graphics learners can choose (rocket, butterfly, owl, ice cream) |
| **Shuffle questions** | Random question order (default: enabled) |
| **Retry button** | Learners can restart the activity after finishing |
| **Show solution** | At the end all questions are shown with correct and given answers |
| **Customise texts** | All labels (buttons, feedback, graphic names) can be changed |

---

*Rocket 15 Questions is an unofficial, freely available H5P content type.*
