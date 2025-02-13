import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma : FormGroup

  constructor( private fb: FormBuilder, 
               private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario(){

    this.forma = this.fb.group({
      nombre   : ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido : ['', Validators.required],
      correo   : ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      pass1    : ['',[Validators.required]],
      pass2    : ['',[Validators.required]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
        
      }),

      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordIguales('pass1', 'pass2')
    });
  }

  cargarDataAlFormulario(){
    this.forma.reset({
        nombre: 'juan',
        apellido: 'perez',
        correo: 'p@g.com',
        direccion: {
          distrito: '12',
          ciudad: 'panem'
        }
    });
    ['comer', 'Dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor) ) );
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }
  guardar(){
    console.log(this.forma);

    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=>{
        if( control instanceof FormGroup ){
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
      });
      
    }

    this.forma.reset({

    })
  }

  
}

