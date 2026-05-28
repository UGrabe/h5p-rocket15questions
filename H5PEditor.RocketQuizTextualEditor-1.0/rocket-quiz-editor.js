// ════════════════════════════════════════════════════════════════════════════
// EDITOR WIDGET – H5P.RocketPickPic
// Registriert als H5PEditor.widgets.rocketQuizEditor
// H5P ruft auf: appendTo($wrapper), validate(), remove()
// validate() MUSS den gespeicherten String zurückgeben.
// ════════════════════════════════════════════════════════════════════════════

if (typeof H5PEditor !== 'undefined') {
  H5PEditor.widgets = H5PEditor.widgets || {};

  H5PEditor.widgets.rocketQuizEditor = (function ($) {
    'use strict';

    var PLACEHOLDER =
      'SC|Was ist 3+4?|7|8|9\n' +
      'TF|Die Erde ist rund.|wahr\n' +
      'KA|Die Hauptstadt von Frankreich ist ___.|Paris';

    // ── Konstruktor ──────────────────────────────────────────────────────────

    function RocketQuizEditorWidget(parent, field, params, setValue) {
      this.parent      = parent;
      this.field       = field;
      this.setValue    = setValue;
      this.storedText  = (typeof params === 'string') ? params : '';
      this.formQuestions = this._parseText(this.storedText);
      // Aktiver Tab: Textfeld wenn bereits Inhalt vorhanden
      this.activeTab   = this.storedText.trim() ? 'text' : 'form';
    }

    // ── appendTo ─────────────────────────────────────────────────────────────

    RocketQuizEditorWidget.prototype.appendTo = function ($wrapper) {
      var self = this;
      this.$wrapper = $wrapper;

      // Hinweisbox
      $('<div class="rqe-info-box">' +
          '&#8505; Mindestens 20&nbsp;Fragen eingeben &mdash; ' +
          'zum Gewinnen werden 15 richtige Antworten ben&ouml;tigt.' +
        '</div>').appendTo($wrapper);

      var $w = $('<div class="rqe-widget"></div>');

      // Tabs
      $w.append(
        '<div class="rqe-tabs">' +
          '<button type="button" class="rqe-tab" data-tab="form">Formular</button>' +
          '<button type="button" class="rqe-tab" data-tab="text">Texteingabe</button>' +
        '</div>'
      );

      this.$formPanel = $('<div class="rqe-panel"></div>');
      this.$textPanel = $('<div class="rqe-panel"></div>');
      $w.append(this.$formPanel).append(this.$textPanel);
      $wrapper.append($w);

      $w.find('.rqe-tab').on('click', function () {
        self._switchTab($(this).data('tab'));
      });

      this._renderFormPanel();
      this._renderTextPanel();
      this._applyTabVisibility();
    };

    // ── Tab-Verwaltung ────────────────────────────────────────────────────────

    RocketQuizEditorWidget.prototype._switchTab = function (tab) {
      if (tab === this.activeTab) { return; }
      if (tab === 'text') {
        // Formular → Text: Formulardaten lesen und ins Textfeld übertragen
        this._readFormToData();
        this.$textPanel.find('.rqe-textarea').val(this._toText(this.formQuestions));
      } else {
        // Text → Formular: Textinhalt parsen und Formular neu aufbauen
        var raw = this.$textPanel.find('.rqe-textarea').val().trim();
        if (raw) {
          this.formQuestions = this._parseText(raw);
          this._renderFormPanel();
        }
      }
      this.activeTab = tab;
      this._applyTabVisibility();
      this._commit();
    };

    RocketQuizEditorWidget.prototype._applyTabVisibility = function () {
      var self = this;
      this.$wrapper.find('.rqe-tab').each(function () {
        $(this).toggleClass('rqe-tab-active', $(this).data('tab') === self.activeTab);
      });
      this.$formPanel.toggle(this.activeTab === 'form');
      this.$textPanel.toggle(this.activeTab === 'text');
    };

    // ── Formular-Panel ────────────────────────────────────────────────────────

    RocketQuizEditorWidget.prototype._renderFormPanel = function () {
      var self = this;
      this.$formPanel.off('.rqe').empty();

      var $list = $('<div class="rqe-question-list"></div>');
      this.formQuestions.forEach(function (q, idx) {
        $list.append(self._buildItem(q, idx));
      });
      this.$formPanel.append($list);

      $('<button type="button" class="rqe-btn rqe-add-btn">+ Frage hinzuf\u00fcgen</button>')
        .on('click', function () {
          self.formQuestions.push({
            type: 'SC',
            question: '',
            answers: [{ text: '', correct: true }, { text: '', correct: false }]
          });
          self._renderFormPanel();
          self._commit();
        }).appendTo(this.$formPanel);

      this._bindFormEvents();
    };

    RocketQuizEditorWidget.prototype._buildItem = function (q, idx) {
      var $item = $('<div class="rqe-item"></div>').attr('data-idx', idx);

      // Header
      var $hdr = $('<div class="rqe-item-header"></div>');
      $('<span class="rqe-item-num">Frage ' + (idx + 1) + '</span>').appendTo($hdr);
      var $sel = $('<select class="rqe-type-sel"></select>');
      [['SC', 'Single Choice'], ['TF', 'Wahr / Falsch'], ['KA', 'Kurzantwort']].forEach(function (o) {
        $('<option></option>').val(o[0]).text(o[1]).prop('selected', q.type === o[0]).appendTo($sel);
      });
      $sel.appendTo($hdr);
      $('<button type="button" class="rqe-btn rqe-icon-btn rqe-del-item" title="Frage l\u00f6schen">\u00d7</button>').appendTo($hdr);
      $item.append($hdr);

      // Felder
      var $fields = $('<div class="rqe-fields"></div>');

      // Fragetext
      $('<div class="rqe-field-group"></div>')
        .append('<label class="rqe-field-label">Frage</label>')
        .append($('<input type="text" class="rqe-inp rqe-q-text">').val(q.question || ''))
        .appendTo($fields);

      if (q.type === 'SC') {
        var $ac = $('<div class="rqe-field-group"></div>');
        $('<label class="rqe-field-label">Antworten ' +
          '<span class="rqe-field-hint">(erste Antwort = richtig; Reihenfolge wird im Spiel zuf\u00e4llig gemischt)</span>' +
          '</label>').appendTo($ac);
        var $al = $('<div class="rqe-ans-list"></div>');
        (q.answers || []).forEach(function (a, ansIdx) {
          var $row = $('<div class="rqe-ans-row"></div>');
          if (ansIdx === 0) {
            $('<span class="rqe-ans-badge">\u2713</span>').appendTo($row);
          } else {
            $('<span class="rqe-ans-badge rqe-ans-badge-empty"></span>').appendTo($row);
          }
          $('<input type="text" class="rqe-inp rqe-ans-text">').val(a.text || '').appendTo($row);
          if (q.answers.length > 2) {
            $('<button type="button" class="rqe-btn rqe-icon-btn rqe-del-ans" title="Antwort l\u00f6schen">\u00d7</button>').appendTo($row);
          }
          $al.append($row);
        });
        $ac.append($al);
        if (q.answers.length < 6) {
          $('<button type="button" class="rqe-btn rqe-add-ans">+ Antwort</button>').appendTo($ac);
        }
        $fields.append($ac);

      } else if (q.type === 'TF') {
        var $tfGroup = $('<div class="rqe-field-group"></div>');
        $('<label class="rqe-field-label">Richtige Antwort</label>').appendTo($tfGroup);
        var $tfRow = $('<div class="rqe-tf-row"></div>');
        var wLabel = $('<label class="rqe-radio-label"><input type="radio" name="rqe-tf-' + idx + '" value="wahr"> Wahr</label>');
        var fLabel = $('<label class="rqe-radio-label"><input type="radio" name="rqe-tf-' + idx + '" value="falsch"> Falsch</label>');
        wLabel.find('input').prop('checked', (q.tfAnswer || 'wahr') === 'wahr');
        fLabel.find('input').prop('checked', (q.tfAnswer || 'wahr') === 'falsch');
        $tfRow.append(wLabel).append(fLabel);
        $tfGroup.append($tfRow);
        $fields.append($tfGroup);

      } else if (q.type === 'KA') {
        $('<div class="rqe-field-group"></div>')
          .append('<label class="rqe-field-label">Richtige Antwort</label>')
          .append($('<input type="text" class="rqe-inp rqe-short-ans">').val(q.shortAnswer || ''))
          .appendTo($fields);
      }

      $item.append($fields);
      return $item;
    };

    RocketQuizEditorWidget.prototype._bindFormEvents = function () {
      var self = this;
      var $p   = this.$formPanel;

      $p.on('change.rqe', '.rqe-type-sel', function () {
        var $item = $(this).closest('.rqe-item');
        var idx   = parseInt($item.data('idx'));
        var newType = $(this).val();
        self.formQuestions[idx].type = newType;
        if (newType === 'SC' && (!self.formQuestions[idx].answers || !self.formQuestions[idx].answers.length)) {
          self.formQuestions[idx].answers = [{ text: '', correct: true }, { text: '', correct: false }];
        }
        // Felder neu rendern
        var $newItem = self._buildItem(self.formQuestions[idx], idx);
        $item.find('.rqe-fields').replaceWith($newItem.find('.rqe-fields'));
        self._commit();
      });

      $p.on('click.rqe', '.rqe-del-item', function () {
        var idx = parseInt($(this).closest('.rqe-item').data('idx'));
        self.formQuestions.splice(idx, 1);
        self._renderFormPanel();
        self._commit();
      });

      $p.on('click.rqe', '.rqe-add-ans', function () {
        var idx = parseInt($(this).closest('.rqe-item').data('idx'));
        self.formQuestions[idx].answers.push({ text: '', correct: false });
        self._renderFormPanel();
        self._commit();
      });

      $p.on('click.rqe', '.rqe-del-ans', function () {
        var $item = $(this).closest('.rqe-item');
        var idx   = parseInt($item.data('idx'));
        var ansIdx = $(this).closest('.rqe-ans-row').index();
        if (self.formQuestions[idx].answers.length <= 2) { return; }
        self.formQuestions[idx].answers.splice(ansIdx, 1);
        // Erste Antwort sicherstellen dass sie correct=true hat
        self.formQuestions[idx].answers[0].correct = true;
        self._renderFormPanel();
        self._commit();
      });

      $p.on('change.rqe blur.rqe',
        '.rqe-q-text, .rqe-ans-text, [name^="rqe-tf-"], .rqe-short-ans',
        function () { self._readFormToData(); self._commit(); }
      );
    };

    RocketQuizEditorWidget.prototype._readFormToData = function () {
      var self = this;
      this.$formPanel.find('.rqe-item').each(function () {
        var $item = $(this);
        var idx   = parseInt($item.data('idx'));
        if (idx >= self.formQuestions.length) { return; }
        var q = self.formQuestions[idx];
        q.question = $item.find('.rqe-q-text').val().trim();
        if (q.type === 'SC') {
          q.answers = [];
          $item.find('.rqe-ans-row').each(function (ansIdx) {
            // Erste Antwort ist immer richtig
            q.answers.push({
              text: $(this).find('.rqe-ans-text').val().trim(),
              correct: ansIdx === 0
            });
          });
        } else if (q.type === 'TF') {
          q.tfAnswer = $item.find('[name^="rqe-tf-"]:checked').val() || 'wahr';
        } else if (q.type === 'KA') {
          q.shortAnswer = $item.find('.rqe-short-ans').val().trim();
        }
      });
    };

    // ── Texteingabe-Panel ─────────────────────────────────────────────────────

    RocketQuizEditorWidget.prototype._renderTextPanel = function () {
      var self = this;
      this.$textPanel.empty();
      $('<p class="rqe-hint">' +
          '<strong>SC</strong>&nbsp;= Single Choice &nbsp;&middot;&nbsp; ' +
          '<strong>TF</strong>&nbsp;= Wahr / Falsch &nbsp;&middot;&nbsp; ' +
          '<strong>KA</strong>&nbsp;= Kurzantwort<br>' +
          'Erste SC-Antwort = richtig &nbsp;&middot;&nbsp; Eine Frage pro Zeile' +
        '</p>').appendTo(this.$textPanel);
      $('<textarea class="rqe-textarea" rows="20" spellcheck="false"></textarea>')
        .attr('placeholder', PLACEHOLDER)
        .val(this.storedText)
        .on('change.rqe blur.rqe', function () { self._commit(); })
        .appendTo(this.$textPanel);
    };

    // ── Datenpflege ───────────────────────────────────────────────────────────

    RocketQuizEditorWidget.prototype._commit = function () {
      var text;
      if (this.activeTab === 'form') {
        this._readFormToData();
        text = this._toText(this.formQuestions);
      } else {
        text = this.$textPanel.find('.rqe-textarea').val();
      }
      this.storedText = text;
      if (typeof this.setValue === 'function') { this.setValue(this.field, text); }
    };

    RocketQuizEditorWidget.prototype.validate = function () {
      this._commit();
      return this.storedText;
    };

    RocketQuizEditorWidget.prototype.remove = function () {
      if (this.$wrapper) { this.$wrapper.find('.rqe-widget').remove(); }
    };

    // ── Hilfsfunktionen ───────────────────────────────────────────────────────

    // Text → interne Datenstruktur
    // Richtige SC-Antwort (mit *) wird an erste Stelle gesetzt
    RocketQuizEditorWidget.prototype._parseText = function (text) {
      var qs = [];
      (text || '').split('\n').forEach(function (line) {
        line = line.trim();
        if (!line) { return; }
        var p = line.split('|');
        if (p.length < 3) { return; }
        var type = p[0].trim().toUpperCase();
        if (type === 'SC') {
          var ans = [];
          var correctIdx = -1;
          for (var i = 2; i < p.length; i++) {
            var a = p[i].trim();
            var c = a.slice(-1) === '*';
            if (c) { a = a.slice(0, -1).trim(); }
            if (c && correctIdx === -1) { correctIdx = ans.length; }
            ans.push({ text: a, correct: c });
          }
          // Richtige Antwort an erste Stelle
          if (correctIdx > 0) {
            var correctAns = ans.splice(correctIdx, 1)[0];
            ans.unshift(correctAns);
          }
          // Alle correct-Flags normalisieren: nur erste = true
          ans.forEach(function (a, i) { a.correct = (i === 0); });
          if (ans.length < 2) { return; }
          qs.push({ type: 'SC', question: p[1].trim(), answers: ans });
        } else if (type === 'TF') {
          qs.push({ type: 'TF', question: p[1].trim(), tfAnswer: p[2].trim().toLowerCase() });
        } else if (type === 'KA') {
          qs.push({ type: 'KA', question: p[1].trim(), shortAnswer: p[2].trim() });
        }
      });
      return qs;
    };

    // Interne Datenstruktur → Text
    // Erste SC-Antwort bekommt automatisch *
    RocketQuizEditorWidget.prototype._toText = function (questions) {
      return (questions || []).map(function (q) {
        if (!q || !q.type) { return ''; }
        if (q.type === 'SC') {
          return 'SC|' + (q.question || '') + '|' +
            (q.answers || []).map(function (a, i) {
              return (a.text || '') + (i === 0 ? '*' : '');
            }).join('|');
        }
        if (q.type === 'TF') { return 'TF|' + (q.question || '') + '|' + (q.tfAnswer || 'wahr'); }
        if (q.type === 'KA') { return 'KA|' + (q.question || '') + '|' + (q.shortAnswer || ''); }
        return '';
      }).filter(Boolean).join('\n');
    };

    return RocketQuizEditorWidget;

  }(H5P.jQuery));
}
