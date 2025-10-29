import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Studente } from '../studente/studente';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { StudentiService } from '../services/nome-servizio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina3',
  standalone: true,
  imports: [CommonModule, FormsModule, Studente],
  templateUrl: './pagina3.html',
  styleUrls: ['./pagina3.css'],
})
export class Pagina3 implements OnDestroy, OnInit {

  private sub: Subscription;
  searchTerm = '';
  studenti: any[] = [];
  classFilter = '';

  constructor(private search: SearchService, private studentiService: StudentiService) {
    this.sub = this.search.term$.subscribe(t => this.searchTerm = (t || '').toLowerCase());
  }
  ngOnInit() {
    this.studenti = this.studentiService.getStudenti();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get filteredStudents() {
    const term = this.searchTerm;
    if (!term) return this.studenti;
    return this.studenti.filter(s =>
      (s.nome || '').toLowerCase().includes(term) ||
      (s.classe || '').toLowerCase().includes(term)
    );
  }

  // Nuovo: lista mostrata considerando il filtro per classe
  get displayedStudents(): any[] {
    const cls = (this.classFilter || '').trim().toLowerCase();
    if (!cls) {
      return this.filteredStudents;
    }
    return this.studenti.filter(s => ((s.classe || '').toLowerCase() === cls));
  }

  // set di id per cui mostrare la media
  visibleMedia = new Set<number>();

  toggleMedia(id: number) {
    if (this.visibleMedia.has(id)) {
      this.visibleMedia.delete(id);
    } else {
      this.visibleMedia.add(id);
    }
  }

  averageOf(studente: { voti?: number[] } ): string {
    const v = studente.voti ?? [];
    if (v.length === 0) return '-';
    const sum = v.reduce((a, b) => a + b, 0);
    return (sum / v.length).toFixed(1);
  }

  // Aggiunto: ritorna la media numerica o null (puoi lasciarlo, non usato in template)
  averageNumber(studente: { voti?: number[] } ): number | null {
    const v = studente.voti ?? [];
    if (v.length === 0) return null;
    const sum = v.reduce((a, b) => a + b, 0);
    return sum / v.length;
  }

  // Aggiunto: restituisce la classe CSS da applicare in base alla media (evita null checks nel template)
  averageClass(studente: { voti?: number[] } ): string {
    const n = this.averageNumber(studente);
    if (n === null) return '';
    return n >= 6 ? 'text-success' : 'text-danger';
  }

  isMediaVisible(id: number): boolean {
    return this.visibleMedia.has(id);
  }

  // Aggiunto: rimuove uno studente (con conferma)
  removeStudent(id: number) {
    const ok = confirm('Confermi la rimozione dello studente?');
    if (!ok) return;
    const removed = this.studentiService.removeStudent(id);
    if (removed) {
      // ricarica la lista locale
      this.studenti = this.studentiService.getStudenti();
      // opzionale: rimuovi anche dallo stato delle media visibili
      this.visibleMedia.delete(id);
    }
  }
}
