import { Component, OnInit, inject, ElementRef, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfoliodata.service';
import { TranslationService } from '../../services/translation.service'; // TranslationService importieren

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit, OnInit {

  portfolioData = inject(PortfolioDataService);
  projects = this.portfolioData.projects;

  // Variablen für Übersetzungen
  headlineDescription: string = '';

  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private translationService: TranslationService) {}

  ngOnInit(): void {
    // Initial die Übersetzungen laden
    this.updateTranslations();

    // Übersetzungen aktualisieren bei Sprachwechsel
    this.translationService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
    });
  }

  updateTranslations(): void {
    this.headlineDescription = this.translationService.translate('projects.headlineDescription');

    // Übersetzte Projektbeschreibungen aktualisieren
    this.projects.forEach((project, index) => {
      project.description = this.translationService.translate(`projects.project${index}.description`);
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        this.setupIntersectionObserver();
      } else {
        this.setupFallback();
      }
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const box = entry.target.querySelector('.box');
        const details = entry.target.querySelector('.project-details');

        if (entry.isIntersecting) {
          if (box) {
            (box as HTMLElement).classList.add('animate');
          }
          if (details) {
            (details as HTMLElement).classList.add('visible');
          }
        } else {
          if (box) {
            (box as HTMLElement).classList.remove('animate');
          }
          if (details) {
            (details as HTMLElement).classList.remove('visible');
          }
        }
      });
    }, options);

    this.projectCards.forEach(projectCard => observer.observe(projectCard.nativeElement));
  }

  private setupFallback() {
    window.addEventListener('scroll', () => {
      this.projectCards.forEach(projectCard => {
        const box = projectCard.nativeElement.querySelector('.box');
        const details = projectCard.nativeElement.querySelector('.project-details');

        if (box && details) {
          const rect = box.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            (box as HTMLElement).classList.add('animate');
            (details as HTMLElement).classList.add('visible');
          } else {
            (box as HTMLElement).classList.remove('animate');
            (details as HTMLElement).classList.remove('visible');
          }
        }
      });
    });

    window.dispatchEvent(new Event('scroll'));
  }
}
