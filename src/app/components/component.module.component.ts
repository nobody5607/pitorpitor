import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './profile/profile.component';

const PAGES_COMPONENTS = [
  ProfileComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    PAGES_COMPONENTS
  ],
  exports: [
    PAGES_COMPONENTS
  ],
  entryComponents: [],
})
export class ComponentsModule {}