import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fluxo-comercial',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './fluxo-comercial.component.html',
  styleUrls: ['./fluxo-comercial.component.scss'],
})
export class FluxoComercialComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['person_name', 'org_name', 'formatted_value', 'won_time'];
  public dataSource = new MatTableDataSource<any>([]);
  public loading: boolean = true;

  // Configurações do paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'won_time': 
          return new Date(item.won_time).getTime();
        default: 
          return item[property];
      }
    };
  }

  carregarDados() {
    this.loading = true;
    this.apiService.refreshDados().subscribe({
      next: (res: any) => {
        const dados = Array.isArray(res.data) ? res.data : [];
        this.dataSource.data = dados;
        
        setTimeout(() => {
          if (this.dataSource.paginator) {
            this.dataSource.paginator._changePageSize(this.dataSource.paginator.pageSize);
          }
        });
        
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados:', err);
        this.mostrarErro('Erro ao carregar dados');
        this.loading = false;
      }
    });
  }

  atualizarDados() {
    this.loading = true;
    this.apiService.refreshDados().subscribe({
      next: (res: any) => {
        const dados = Array.isArray(res.data) ? res.data : [];
        this.dataSource.data = dados;
        
        setTimeout(() => {
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
            this.dataSource.paginator._changePageSize(this.dataSource.paginator.pageSize);
          }
        });
        
        this.snackBar.open('Dados atualizados!', 'Fechar', { duration: 3000 });
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar:', err);
        this.mostrarErro('Erro ao atualizar dados');
        this.loading = false;
      }
    });
  }

  private mostrarErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}