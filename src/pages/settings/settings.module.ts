import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings'

import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
		ComponentsModule,
  ],
  entryComponents: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
