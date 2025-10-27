import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Studente } from '../studente/studente';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina3',
  standalone: true,
  imports: [CommonModule, Studente],
  templateUrl: './pagina3.html',
  styleUrls: ['./pagina3.css'],
})
export class Pagina3 implements OnDestroy {
  studenti = [
    { id: 1, nome: 'Mario',   classe: '5D', voti: [4, 4, 4, 4.3] },
    { id: 2, nome: 'Luca',    classe: '5D', voti: [7, 7, 8] },
    { id: 3, nome: 'Luigi',   classe: '5D', voti: [4, 4, 3.7] },
    { id: 4, nome: 'Paolo',   classe: '5D', voti: [7, 7, 7] },
    { id: 5, nome: 'Andrea',  classe: '5D', voti: [6, 5.5, 5.6] },

    // nuovi studenti in altre classi
    { id: 6, nome: 'Giulia',  classe: '4A', voti: [8, 7.5, 9] },
    { id: 7, nome: 'Francesca', classe: '4A', voti: [6.5, 7, 6] },
    { id: 8, nome: 'Marco',   classe: '3B', voti: [5, 5.5, 6] },
    { id: 9, nome: 'Elena',   classe: '3B', voti: [9, 8.5, 9.5] },
    { id: 10, nome: 'Sofia',  classe: '2C', voti: [7, 6.5, 7.2] },
    { id: 11, nome: 'Tommaso',classe: '2C', voti: [4.5, 5, 5.2] },
    { id: 12, nome: 'Chiara',  classe: '5A', voti: [8, 8, 7.5] },
    { id: 13, nome: 'Federico',classe: '4D', voti: [6, 6.5, 6.2] },
    { id: 14, nome: 'Beatrice',classe: '1E', voti: [9.5, 9, 10] },
    { id: 15, nome: 'Alessandro', classe: '1E', voti: [5.5, 6, 5.8] },
  ];

  private sub: Subscription;
  searchTerm = '';

  constructor(private search: SearchService) {
    this.sub = this.search.term$.subscribe(t => this.searchTerm = (t || '').toLowerCase());
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

  isMediaVisible(id: number): boolean {
    return this.visibleMedia.has(id);
  }
}
