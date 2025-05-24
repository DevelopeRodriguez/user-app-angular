import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// SERVICIOS
import { UsersService } from '../../services/users.service';
import { AlertService } from '../../services/alert.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  public charging: boolean = true;
  public user: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe({
      next: ({ id }) => {
        // Extraemos el id que viene de la url
        this.getUserDetails( id );
      },
      error: () => {
        Swal.fire('Error', 'Error al obtener los datos', 'error' );
      }
    });
  }

  getUserDetails( id: string ): void {
    // Mostramos el cargando
    this.charging = true;
    this.alertService.loadingData();
    this.usersService.getUserDetails( id )
    .subscribe({
        next: (resp) => {  
          // Obtenemos los detalles del usuario y los guardamos en users  
          this.user = resp.data;
          this.charging = false;
          // Cerramos el cargando
          Swal.close();
        },
        error: () => {
          this.charging = false;
          Swal.fire('Error al obtener los datos', 'Usuario no encontrado.', 'error' );
        }
      });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

}
