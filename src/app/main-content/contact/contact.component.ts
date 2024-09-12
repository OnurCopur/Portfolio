import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service'; // TranslationService importieren


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  http = inject(HttpClient);
  translationService = inject(TranslationService);

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  mailTest = false;


  ngOnInit(): void {
    // Initial die Übersetzungen laden
    this.updateTranslations();

    // Aktualisiere Übersetzungen, wenn die Sprache gewechselt wird
    this.translationService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
    });
  }


  sayHi: string = '';
  discussProject: string = '';
  letsDiscuss: string = '';
  placeholderName: string = '';
  placeholderEmail: string = '';
  placeholderMessage: string = '';
  privacyTextBeforeLink: string = '';
  privacyLinkText: string = '';
  privacyTextAfterLink: string = '';
  sendMessageText: string = '';
  mobileText: string = '';


  updateTranslations(): void {
    this.sayHi = this.translationService.translate('contact.sayHi');
    this.discussProject = this.translationService.translate('contact.discussProject');
    this.letsDiscuss = this.translationService.translate('contact.letsDiscuss');
    this.placeholderName = this.translationService.translate('contact.placeholderName');
    this.placeholderEmail = this.translationService.translate('contact.placeholderEmail');
    this.placeholderMessage = this.translationService.translate('contact.placeholderMessage');
    this.privacyTextBeforeLink = this.translationService.translate('contact.privacyTextBeforeLink');
    this.privacyLinkText = this.translationService.translate('contact.privacyLinkText');
    this.privacyTextAfterLink = this.translationService.translate('contact.privacyTextAfterLink');
    this.sendMessageText = this.translationService.translate('contact.sendMessage');
    this.mobileText = this.translationService.translate('contact.mobileText');
  }

  
  post = {
    endPoint: 'https://onur-copur.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.log('hat funktioniert')
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }
}
