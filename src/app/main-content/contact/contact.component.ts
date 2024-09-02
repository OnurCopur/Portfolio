import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // <--- Importiere das CommonModule

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <--- Füge CommonModule hier hinzu
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  onSubmit() {
    if (this.formIsValid()) {
      // Hier kannst du den Code einfügen, um die Formulardaten zu verarbeiten
      console.log('Formular wurde abgesendet');
    }
  }

  formIsValid(): boolean {
    // Hier kannst du zusätzliche Validierungslogik einfügen, falls nötig
    return true;
  }
}
