import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { ComboService } from 'src/app/services/combo/combos.service';

@Component({
  selector: 'app-combo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  combos: Combo[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private comboService: ComboService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comboService.list().subscribe({
      next: (data) => {
        this.combos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar combos:', err);
        this.isLoading = false;
      }
    });
  }

  create(): void {
    this.router.navigate(['/combo/create']);
  }

  filtered(): Combo[] {
    if (!this.searchTerm.trim()) return this.combos;

    const term = this.searchTerm.toLowerCase();
    return this.combos.filter(combo =>
      combo.id.toString().includes(term) ||
      combo.servicio_id?.toString().includes(term)
    );
  }
}
