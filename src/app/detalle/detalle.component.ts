import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactosService } from '../contactos.service';
import { Contacto } from '../modelo/contacto';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  contacto: Contacto;
  id: string;

  constructor(private api: ContactosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contacto = {
      id: this.id,
      nombre: null,
      fecha: null,
      telefono: null,
      imagen: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png'
    }
    this.api.getContacto(this.id).subscribe(
      (contacto) => {
        this.contacto.id = this.id;
        this.contacto.nombre = contacto.get('nombre');
        this.contacto.telefono = contacto.get('telefono');
        this.contacto.fecha = contacto.get('fecha');
        this.contacto.imagen = contacto.get('imagen');
      }
    );
  }
  eliminarContacto() {
    this.api.borrarContacto(this.contacto);
    this.router.navigate(['tabs/tab1']);

  }
  navegarEditar() {
    this.router.navigate(['editar/' + this.id]);

  }
  navegarLista() {
    this.router.navigate(['tabs/tab1']);

  }
}
