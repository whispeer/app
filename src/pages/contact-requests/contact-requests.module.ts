import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactRequestsPage } from './contact-requests'

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ContactRequestsPage
  ],
  imports: [
    IonicPageModule.forChild(ContactRequestsPage),
    ComponentsModule
  ],
  entryComponents: [
    ContactRequestsPage
  ]
})
export class ContactRequestPageModule {}
