import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service'; // Korrigiere den Pfad je nach Struktur

@Component({
  selector: 'app-about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  headline: string = '';
  text: string = '';
  basedIn: string = '';
  remoteWork: string = '';
  button: string = '';

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    // Abonniere Sprachwechsel und aktualisiere die Übersetzungen
    this.translationService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
    });

    // Initiale Texte laden
    this.updateTranslations();
  }

  updateTranslations(): void {
    this.headline = this.translationService.translate('about-me.headline');
    this.text = this.translationService.translate('about-me.text');
    this.basedIn = this.translationService.translate('about-me.based-in');
    this.remoteWork = this.translationService.translate('about-me.remote-work');
    this.button = this.translationService.translate('about-me.button');
  }
}
