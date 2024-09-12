import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;
  activeLanguage = 'EN';  // Speichert die aktuell aktive Sprache
  translationKeys = {
    aboutMe: 'overlay.aboutMe',
    skills: 'overlay.skills',
    portfolio: 'overlay.portfolio',
    sayHi: 'overlay.sayHi',
    email: 'overlay.email'
  };

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef, 
    private translationService: TranslationService
  ) {}

  getTranslation(key: string): string {
    return this.translationService.translate(key);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const button = this.el.nativeElement.querySelector('.btn');
    if (button) {
      if (this.menuOpen) {
        this.renderer.removeClass(button, 'not-active');
        this.renderer.addClass(button, 'active');
      } else {
        this.renderer.removeClass(button, 'active');
        this.renderer.addClass(button, 'not-active');
      }
    }
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  }

  navigateToSection(sectionId: string) {
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen = false;
    const button = this.el.nativeElement.querySelector('.btn');
    if (button) {
      this.renderer.removeClass(button, 'active');
      this.renderer.addClass(button, 'not-active');
    }
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  switchLanguage(language: string, event: Event) {
    event.preventDefault(); // Verhindert das Springen nach oben
    this.activeLanguage = language;
    this.translationService.switchLanguage(language);  // Sprachwechsel ausführen
  }
}
