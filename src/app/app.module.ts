import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarComponent } from './editar/editar.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAu2yU_9y7CnUSeT6THBHhDMJOVUpV1ZSo',
    authDomain: 'ionagenda.firebaseapp.com',
    databaseURL: 'https://ionagenda.firebaseio.com',
    projectId: 'ionagenda',
    storageBucket: 'ionagenda.appspot.com',
    messagingSenderId: '723883732730',
    appId: '1:723883732730:web:29b0a3f8e244b1df'
};

@NgModule({
  declarations: [
    AppComponent,
    DetalleComponent,
    EditarComponent
  ],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
