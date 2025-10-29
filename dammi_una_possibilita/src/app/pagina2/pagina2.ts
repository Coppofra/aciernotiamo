import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentiService } from '../services/nome-servizio';

@Component({
  selector: 'app-pagina2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina2.html',
  styleUrls: ['./pagina2.css'],
})
export class Pagina2 {
  // modello per il form
  nome = '';
  classe = '';
  mediaVoti: number | null = null;
  message = '';

  constructor(private studentiService: StudentiService) {}

  addStudent() {
    this.message = '';
    const nomeTrim = (this.nome || '').trim();
    const classeTrim = (this.classe || '').trim();
    if (!nomeTrim) {
      this.message = 'Il nome è obbligatorio.';
      return;
    }
    const nuovo = this.studentiService.addStudent({ nome: nomeTrim, classe: classeTrim, mediaVoti: this.mediaVoti ?? '' });
    this.message = `Studente aggiunto: ${nuovo.nome} (id ${nuovo.id})`;
    // reset form
    this.nome = '';
    this.classe = '';
    this.mediaVoti = null;
  }
}
