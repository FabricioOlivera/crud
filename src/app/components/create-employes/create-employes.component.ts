import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Employe } from '../../models/employe.model';
import { EmployesService } from '../../services/employes.service';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/positions.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValueChangeEvent,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-employes',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-employes.component.html',
  styleUrls: ['./create-employes.component.scss'],
})
export class CreateEmployesComponent implements OnInit {
  listPositions?: Position;
  title = "Crear empleado";
  id?: string | null = null;
  detail?: string | null = null;
  employeForm = new FormGroup({
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    born: new FormControl(''),
    position: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private employeService: EmployesService,
    private positionService: PositionService,
    private toastr: ToastrService
  ) {
   
  }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.detail = this.aRouter.snapshot.paramMap.get('detail');
    this.EditEmploye();
    this.getEmploye();
    this.getPositions();
    this.employeForm.events.subscribe((event) => {
      if (event instanceof ValueChangeEvent) {
        console.log(event.value.firstName);
      }
    });
   
   
  }


  async addEmployee() {
    console.log('addEmployee');
    if (this.employeForm?.invalid) {
      return;
    }
    try {
      if (this.id !== null) {
        // Edit employee
        console.log('**edit**');
        this.id = this.aRouter.snapshot.paramMap.get('id');
  
        const employe = {
          employeId: this.id, 
          firstName: this.employeForm.value.firstName,
          secondName: this.employeForm.value.secondName,
          born: this.employeForm.value.born,
          position: this.employeForm.value.position,

        }
        const data = await firstValueFrom(this.employeService.saveEmployee(employe));
        this.toastr.info("Empleado editado exitosamente", "Empleado editado");
        this.router.navigate(['/']);
        // Add edit functionality here
      } else {
        // Create employee
        console.log(this.employeForm.value);
        const data = await firstValueFrom(this.employeService.saveEmployee(this.employeForm.value));
        this.toastr.success("Empleado creado exitosamente", "Empleado creado");
        this.router.navigate(['/']);
        console.log('**create**');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }


  async EditEmploye(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    if(this.id !== null){
      this.title = "Editar empleado";
      console.log(this.id);
      console.log(this.employeForm.value);
      const data = await firstValueFrom(this.employeService.getIdEmploye(this.id));
      console.log(data);
      this.employeForm.patchValue({
        firstName: data.firstName,
        secondName: data.secondName,
        born: data.born,
        position: data.position
      })
    }

  }


  async getEmploye(){
   this.detail = this.aRouter.snapshot.paramMap.get('detail');
   if(this.detail !== null){
    this.title = "Detalle empleado"
    const data = await firstValueFrom(this.employeService.getIdEmploye(this.detail));
    console.log(data);
    this.employeForm.patchValue({
      firstName: data.firstName,
      secondName: data.secondName,
      born: data.born,
      position: data.position
    });
    this.employeForm.disable();

   }
  }

  async getPositions() {
    try {
      const data = await firstValueFrom(this.positionService.getPositions());
      this.listPositions = data;
      console.log('positions: ', this.listPositions);
    } catch (error) {
      console.error('Error al obtener las posiciones', error);
    }
  }
}
