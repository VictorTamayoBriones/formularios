import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  usuario = {
    nombre: 'Carlos'
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar( forma: NgForm ){
    console.log(forma);
    console.log(forma.value);
  }

}
