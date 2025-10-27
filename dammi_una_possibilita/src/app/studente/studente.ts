import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studente.html',
  styleUrls: ['./studente.css'],
})
export class Studente {
  @Input() studente!: { id: number; nome: string; classe: string; voti: number[] };

  showMedia = false;
  mediaCalcolata: string | null = null;

  toggleMedia() {
    this.showMedia = !this.showMedia;
    if (this.showMedia) {
      const v = this.studente?.voti;
      if (!v || v.length === 0) {
        this.mediaCalcolata = '-';
      } else {
        const sum = v.reduce((a, b) => a + b, 0);
        this.mediaCalcolata = (sum / v.length).toFixed(1);
      }
    }
  }

  private computeAverage(): number | null {
    const v = this.studente?.voti;
    if (!v || v.length === 0) return null;
    const sum = v.reduce((a, b) => a + b, 0);
    return sum / v.length;
  }

  get averageValue(): string {
    const avg = this.computeAverage();
    return avg === null ? '-' : avg.toFixed(1);
  }
}
