import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

// SERVICIOS
import { UsersService } from '../../services/users.service';
import { AlertService } from '../../services/alert.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  public charging: boolean = true;

  // PÁGINA ACTUAL DE LA TABLA
  public page: number = 0;

  // TOTAL DE USUARIOS
  public totalData: number = 0;

  // ELEMENTOS POR PAGINA
  public elementLimit: number = 5;

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions'];
  // Inicializamos vacio el dataSource para despues llenarlo con dos datos correspondientes
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private router: Router,
    private usersService: UsersService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getUsers(1, this.elementLimit);
  }

  getUsers( page: number, limit: number ): void {
    // Mostramos el cargando
    this.charging = true;
    this.alertService.loadingData();
    this.usersService.getUsers( page, limit )
    .subscribe({
        next: (resp) => {    
          // Obtenemos todos los usuarios y los guardamos en dataSource
          this.dataSource.data = resp.data;
          this.totalData = resp.total;
          this.charging = false;
          // Cerramos el cargando
          Swal.close();
        },
        error: () => {
          Swal.fire('Error', 'Error al obtener los datos', 'error' );
        }
      });
  }

  onPageChange(event: PageEvent): void {
    // Le sumamos 1 a event.pageIndex porque pageIndex comienza en 0
    this.page = event.pageIndex + 1;
    this.getUsers(this.page, this.elementLimit);
  }

  viewUserDetails( user: any ): void {
    this.router.navigate([`/user-details/${user.id}`]);
  }

}
