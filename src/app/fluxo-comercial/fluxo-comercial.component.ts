import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fluxo-comercial',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule, 
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './fluxo-comercial.component.html',
  styleUrls: ['./fluxo-comercial.component.scss'],
})
export class FluxoComercialComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'formatted_value', 'won_time'];
  public dataSource = [];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.apiService.refreshDados().subscribe({
      next: (res: any) => {
        console.log(res);
  
        this.dataSource = Array.isArray(res.data) ? res.data : [];
  ;
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados do servidor:', err);
        this.snackBar.open(
          'Não foi possível conectar ao servidor, verifique e tente novamente.',
          'Fechar',
          {
            duration: 5000,
            panelClass: ['snackbar-erro']
          }
        );
      }
    });
  }

  atualizarDados(){
    this.apiService.refreshDados().subscribe({
      next: (res: any) => {
        this.dataSource = Array.isArray(res.data) ? res.data : [];
        this.snackBar.open(
          res.message,
          'Fechar',
          {
            duration: 5000,
            panelClass: ['snackbar-erro']
          }
        );
  ;
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados do servidor:', err);
        this.snackBar.open(
          'Não foi possível conectar ao servidor, verifique e tente novamente.',
          'Fechar',
          {
            duration: 5000,
            panelClass: ['snackbar-erro']
          }
        );
      }
    });
  };
  
}
