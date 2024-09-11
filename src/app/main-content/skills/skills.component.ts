import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfoliodata.service';
import { TranslationService } from '../../services/translation.service'; // TranslationService importieren

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  portfolioData = inject(PortfolioDataService);
  skills = this.portfolioData.skills;

  // Hier die übersetzten Texte
  title: string = '';
  specialInterest: string = '';
  letMeKnow: string = '';
  letMeKnowLink: string = '';  // Text für den Link
  letMeKnowDescription: string = '';  // Text für die Beschreibung nach dem Link

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    // Initial die Übersetzungen laden
    this.updateTranslations();

    // Aktualisiere die Texte bei Sprachwechsel
    this.translationService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
    });
  }

  updateTranslations(): void {
    this.title = this.translationService.translate('skills.title');
    this.specialInterest = this.translationService.translate('skills.special-interest');
    this.letMeKnow = this.translationService.translate('skills.let-me-know');
    this.letMeKnowLink = this.translationService.translate('skills.let-me-know-link');
    this.letMeKnowDescription = this.translationService.translate('skills.let-me-know-description');
  }
}
