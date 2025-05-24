import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-custom-table',
  standalone: false,
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent {

  // Recibimos las props correspondientes para renderizar la tabla dinamicamente con los datos enviados por props

  // Guardamos en dataSource la data a mostrar en cada fila de la tabla 
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  // Aqui guardaremos las columnas que queremos mostrar en la tabla
  @Input() displayedColumns: string[] = [];
  // viewDetails nos servira para ejecutar una acción cuando se le da click al botón de ver mas detalles
  @Output() viewDetails = new EventEmitter<any>();

  onView(user: any): void {
    this.viewDetails.emit(user);
  }

}
