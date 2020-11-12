import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisServiceService } from 'src/app/services/pais-service.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  usuario = {
    nombre: 'Victor',
    apellido:'Tamayo',
    correo:'victor@gmail.com'
  }

  constructor( private paisservice: PaisServiceService ) { }

  ngOnInit(): void {

    this.paisservice.getPaises()
        .subscribe( paises => {
          console.log(paises);
        });
  }

  guardar( forma: NgForm ){
    console.log(forma);

    if(forma.invalid){
      Object.values(forma.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }

    console.log(forma.value);
  }

}
