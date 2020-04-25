import { Component } from '@angular/core';
import { Contacto } from '../modelo/contacto';
import { Router } from '@angular/router';
import { ContactosService } from '../contactos.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  contacto: Contacto;
  nombre: string;
  telefono: number;
  fecha: Date;
  imagen: string;
  constructor(private router: Router,
              private servicio: ContactosService, private afs: AngularFirestore) {
      
    }

  nuevo(nombreTarea: string) {
    //const id = this.afs.createId();
    if (this.imagen === undefined) {
      this.imagen = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png';
    } 
    this.contacto = {
      nombre: this.nombre,
      telefono: this.telefono,
      fecha: this.fecha,
      imagen: this.imagen
    };
    
    this.servicio.altaContacto(this.contacto).then(
      () => {
        
        this.router.navigate(['tabs/tab1']);
        this.reset();
    },
      () => {console.log('Esto ha hecho pum');
      }
    );
  }

  reset() {
    this.nombre = null;
    this.imagen = null;
    this.telefono = null;
    this.contacto = null;
    this.fecha = null;
  }
}
