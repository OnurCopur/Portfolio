import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: any = {};  // Hier werden die Übersetzungen gespeichert
  private currentLanguage = new BehaviorSubject<string>('EN');  // Aktuelle Sprache (default: Englisch)
  currentLanguage$ = this.currentLanguage.asObservable();  // Observable für Sprache

  constructor(private http: HttpClient) {
    // Standardmäßig Englisch laden
    this.switchLanguage('EN');  // Stelle sicher, dass die englische Sprache beim Start geladen wird
  }

  // Funktion zum Laden der Sprachdateien
  loadTranslations(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang.toLowerCase()}.json`);
  }

  // Funktion zum Umschalten der Sprache
  switchLanguage(lang: string) {
    this.loadTranslations(lang).subscribe(
      (translations: any) => {
        this.translations = translations;
        this.currentLanguage.next(lang);
      },
      (error) => {
        console.error('Fehler beim Laden der Übersetzungen:', error);
      }
    );
  }

  // Funktion, um eine Übersetzung für einen bestimmten Schlüssel zu erhalten
  translate(key: string): string {
    const keys = key.split('.'); // Zerlege den Schlüssel in einzelne Teile
    let result = this.translations;

    for (const k of keys) {
      result = result[k];
      if (!result) {
        return key; // Schlüssel nicht gefunden, gebe den Schlüssel zurück
      }
    }

    return result;
  }
}
