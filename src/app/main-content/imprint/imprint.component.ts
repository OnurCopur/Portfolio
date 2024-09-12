import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  encapsulation: ViewEncapsulation.None // Deaktiviert das View Encapsulation
})
export class ImprintComponent implements OnInit {
  imprintHtmlContent: string = ''; // Variable für den Inhalt der geladenen HTML-Datei

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.currentLanguage$.subscribe(language => {
      this.loadImprintContent(language);
    });
  }

  loadImprintContent(language: string) {
    this.translationService.loadImprintHtml(language).subscribe(
      (htmlContent: string) => {
        this.imprintHtmlContent = htmlContent; // Lade den HTML-Inhalt dynamisch
      },
      (error) => {
        console.error('Fehler beim Laden der Imprint-Datei:', error);
      }
    );
  }
}
