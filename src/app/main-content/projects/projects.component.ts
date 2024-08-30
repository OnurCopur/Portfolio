import { Component, inject, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  ngAfterViewInit() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const box = entry.target.querySelector('.box');
        if (box) {
          if (entry.isIntersecting) {
            (box as HTMLElement).classList.add('animate');
          } else {
            (box as HTMLElement).classList.remove('animate');
          }
        }
      });
    }, options);

    this.projectCards.forEach(projectCard => observer.observe(projectCard.nativeElement));
  }
}
