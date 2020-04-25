import { Component, OnInit } from '@angular/core';
import { Contacto } from '../modelo/contacto';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactosService } from '../contactos.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  contacto: Contacto;
  id = '';
  nombre: string;
  telefono: number;
  fecha: Date;
  imagen: string;
  contactoActualizar: Contacto;

  constructor(private api: ContactosService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contacto = {
      id: this.id,
      nombre: null,
      telefono: null,
      fecha: null,
      imagen: null
    }
    //  console.log(this.contacto.id);
    this.api.getContacto(this.id).subscribe(
      (contacto) => {
        this.contacto.id = this.id;
        // console.log('asignación en subscribe' + this.contacto.id);
        this.contacto.nombre = contacto.get('nombre');
        //console.log(this.contacto.nombre + ' probando nombre');
        this.contacto.telefono = contacto.get('telefono');
        this.contacto.fecha = contacto.get('fecha');
        this.contacto.imagen = contacto.get('imagen');
        this.nombre = this.contacto.nombre;
        console.log(this.nombre + ' probando nombre');
        this.telefono = this.contacto.telefono;
        this.fecha = this.contacto.fecha;
        this.imagen = this.contacto.imagen;
      }
    );
  }
  actualizarContacto() {
    this.contactoActualizar = {
      id: this.id,
      nombre: this.nombre,
      telefono: this.telefono,
      fecha: this.fecha,
      imagen: this.imagen

    }
    // console.log(this.contacto.id);
    this.api.actualizaContacto(this.contactoActualizar).then(
      () => { this.router.navigate(['detalle/' + this.contactoActualizar.id]); }
    );

   

  }
  navegarEditar() {
    this.router.navigate(['editar/' + this.id]);

  }
  navegarLista() {
    this.router.navigate(['tabs/tab1']);

  }
}
