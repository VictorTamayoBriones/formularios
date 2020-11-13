import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma : FormGroup

  constructor( private fb: FormBuilder ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre   : ['Victor'],
      apellido : ['Herrera'],
      correo   : ['victor@gmail.com'],
    });
  }

  guardar(){
    console.log(this.forma);
  }

}
