import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service'; // Korrigiere den Pfad je nach Struktur
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  title: string = '';
  name: string = '';
  scrollText: string = '';

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
    this.title = this.translationService.translate('landing-page.title');
    this.name = this.translationService.translate('landing-page.name');
    this.scrollText = this.translationService.translate('landing-page.scroll');
  }
}
