import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-fluxo-comercial',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatToolbarModule],
  templateUrl: './fluxo-comercial.component.html',
  styleUrls: ['./fluxo-comercial.component.scss'],
})
export class FluxoComercialComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'formatted_value', 'won_time'];
  public dataSource = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.refreshDados().subscribe({
      next: (data: any) => {
        this.dataSource = data;
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
  }
}
