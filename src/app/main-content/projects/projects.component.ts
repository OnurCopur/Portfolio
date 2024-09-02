import { Component, inject, ElementRef, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfoliodata.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit {

  portfolioData = inject(PortfolioDataService);
  projects = this.portfolioData.projects;

  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // IntersectionObserver supported, set it up
        this.setupIntersectionObserver();
      } else {
        // IntersectionObserver not supported, use fallback
        console.warn('IntersectionObserver is not supported in this environment.');
        this.setupFallback();
      }
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
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
    // Fallback logic: manually apply classes based on scroll position
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

    // Trigger the scroll event to apply initial state
    window.dispatchEvent(new Event('scroll'));
  }
}
