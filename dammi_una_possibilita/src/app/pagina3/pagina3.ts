import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Studente } from '../studente/studente';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { StudentiService } from '../services/nome-servizio';

@Component({
  selector: 'app-pagina3',
  standalone: true,
  imports: [CommonModule, Studente],
  templateUrl: './pagina3.html',
  styleUrls: ['./pagina3.css'],
})
export class Pagina3 implements OnDestroy, OnInit {

  private sub: Subscription;
  searchTerm = '';
  studenti: any[] = [];
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
