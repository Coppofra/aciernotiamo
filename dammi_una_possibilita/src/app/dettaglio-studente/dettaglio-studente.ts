import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentiService } from '../services/nome-servizio';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dettaglio-studente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dettaglio-studente.html',
  styleUrls: ['./dettaglio-studente.css'],
})
export class DettaglioStudente implements OnInit, OnDestroy {
  studente: any | undefined;
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentiService: StudentiService
  ) {}

  ngOnInit() {
    // Subscribe to paramMap so component updates when route param changes
    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (Number.isNaN(id)) {
        this.router.navigate(['/pagina3']);
        return;
      }
      const listaStudenti = this.studentiService.getStudenti();
      const found = listaStudenti.find(s => s.id === id);
      if (found) {
        this.studente = found;
      } else {
        this.router.navigate(['/pagina3']);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Aggiunto: getter per la media numerica / stringa e la classe di colore
  get mediaNumeric(): number | null {
    const v = this.studente?.voti ?? [];
    if (!v || v.length === 0) return null;
    const sum = v.reduce((a: number, b: number) => a + b, 0);
    return sum / v.length;
  }

  get mediaString(): string {
    const n = this.mediaNumeric;
    return n === null ? '-' : n.toFixed(1);
  }

  get mediaClass(): string {
    const n = this.mediaNumeric;
    if (n === null) return '';
    return n >= 6 ? 'text-success' : 'text-danger';
  }

  // Aggiunto: naviga al prossimo studente nella lista (se presente), altrimenti torna alla lista
  nextStudent() {
    if (!this.studente) {
      this.router.navigateByUrl('/pagina3');
      return;
    }
    const lista = this.studentiService.getStudenti();
    const idx = lista.findIndex((s: any) => s.id === this.studente.id);
    if (idx === -1) {
      this.router.navigateByUrl('/pagina3');
      return;
    }
    const next = lista[idx + 1];
    if (next) {
      // usa navigateByUrl per evitare ambiguità con la rotta 'pagina3'
      this.router.navigateByUrl(`/pagina3/${next.id}`);
    } else {
      // wrap: torna al primo studente se vuoi cycling, altrimenti torna alla lista
      const first = lista[0];
      if (first) {
        this.router.navigateByUrl(`/pagina3/${first.id}`);
      } else {
        this.router.navigateByUrl('/pagina3');
      }
    }
  }
}
