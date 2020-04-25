import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto } from '../modelo/contacto';
import { Observable } from 'rxjs';
import { ContactosService } from '../contactos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page  implements OnInit {
  @ViewChild('slidingList') slidingList;
  contactos: Observable<Contacto[]>;
  constructor(private api: ContactosService, private router: Router) {

  }
  ngOnInit() {
    this.contactos = this.api.getcontactos();
  }
  eliminarContacto(slidingItem, contacto) {

    this.api.borrarContacto(contacto);
    this.cerrarSlider(slidingItem);
    //console.log('to tus muertos ' + contacto.nombre);

  }
  cerrarSlider(slidingItem) {
    slidingItem.close();
  }
 
}
