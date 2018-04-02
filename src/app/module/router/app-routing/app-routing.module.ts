import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from '../../../component/front-page/front-page.component';
import { NewActivityComponent } from '../../../component/new-activity/new-activity.component';

const routes : Routes = [
  {path : '', component : FrontPageComponent},
  {path : 'NewActivity', component : NewActivityComponent},
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
