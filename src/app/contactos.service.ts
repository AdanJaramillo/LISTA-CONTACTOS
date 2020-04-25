import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { Contacto } from './modelo/contacto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  contactos = 'contactos';
  private ContactosCollection: AngularFirestoreCollection<Contacto>;
  private ContactoDoc: AngularFirestoreDocument<Contacto>;
  private Contactos: Observable<Contacto[]>;
  private Contacto: Observable<Contacto>;
  constructor(private afs: AngularFirestore) {
    this.ContactosCollection = afs.collection<Contacto>('Contactos');
    this.Contactos = this.ContactosCollection.valueChanges();
  }

  getcontactos() : Observable<Contacto[]> {
    //return this.afs.collection<Contacto[]>(this.contactos).valueChanges();
    return this.afs.collection<Contacto>(this.contactos).snapshotChanges().pipe(
      map( contactos => {
        return contactos.map(
          contacto => {
            const data = contacto.payload.doc.data();
            const key = contacto.payload.doc.id;
            return {id: key, ...data};
          }
        )
      })
    );
  }
  
  getContacto(id: string) {
    return this.afs.collection<Contacto>(this.contactos).doc(id).get();
  }
  altaContacto(contacto: Contacto) {
    return this.afs.collection<Contacto>(this.contactos).add(contacto);
  }
  borrarContacto(contacto: Contacto) {
    return this.afs.collection<Contacto>(this.contactos).doc(contacto.id).delete().then(
      () => { console.log('esto ha ido perfect: borrado')},
      () => { console.log('Pero esto que eeeeeeh: borrado puuum  :S');}
    );
  }
  

  actualizaContacto(contacto: Contacto) {
    return this.afs.collection<Contacto>(this.contactos).doc(contacto.id).set(contacto).then(
      () => { console.log('esto ha ido perfect: actualizar')},
      () => { console.log('Pero esto que eeeeeeh: actualizar puuum :S');}
    );
  }
}
