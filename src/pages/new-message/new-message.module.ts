import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NewMessagePage } from './new-message'

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    NewMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(NewMessagePage),
		ComponentsModule,
  ],
  entryComponents: [
    NewMessagePage,
  ]
})
export class NewMessagePageModule {}
