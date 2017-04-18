import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesPage } from './messages'

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MessagesPage
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
		ComponentsModule,
  ],
  entryComponents: [
    MessagesPage
  ]
})
export class MessagesPageModule {}
