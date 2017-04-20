import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile'

import { QRCodeModule } from "../../../node_modules/angular2-qrcode/angular2-qrcode";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
		ComponentsModule,
		QRCodeModule,
  ],
  entryComponents: [
    ProfilePage,
  ]
})
export class ProfilePageModule {}
