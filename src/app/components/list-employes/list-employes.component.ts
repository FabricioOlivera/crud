import { Component, OnInit } from '@angular/core';
import { Employe } from '../../models/employe.model';
import { EmployesService } from '../../services/employes.service';
import { firstValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-employes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-employes.component.html',
  styleUrl: './list-employes.component.scss',
})
export class ListEmployesComponent implements OnInit {
  listEmployes: Employe[] = [];
  constructor(private _employeservice: EmployesService, private toastr: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.getEmployes();
  }

  async getEmployes() {
    try {
      const data = await firstValueFrom(this._employeservice.getEmployes());
      console.log('Empleados obtenidos:', data);
      this.listEmployes = data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      // Manejo del error: puedes asignar un valor por defecto o manejar el estado de error
      this.listEmployes = [];
    }
  }


  async deleteEmploye(id: any){
    try {
      await firstValueFrom(this._employeservice.deleteEmploye(id));
      this.toastr.warning('El empleado fue eliminado con exito','Empleado eliminado');
      const data = await firstValueFrom(this._employeservice.getEmployes());
      this.listEmployes = data;
    } catch (error) {
      console.log(error)
    }
  }
}
