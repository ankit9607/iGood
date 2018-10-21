import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from '../../../component/front-page/front-page.component';
import { NewActivityComponent } from '../../../component/new-activity/new-activity.component';
import { StrikeDatePickerComponent } from '../../../component/strike-date-picker/strike-date-picker/strike-date-picker.component';
import { GraphComponent } from '../../../component/graph/graph/graph.component';

const routes : Routes = [
  {path : '', component : FrontPageComponent},
  {path : 'NewActivity', component : NewActivityComponent},
  {path : 'StrikeDatePicker', component : StrikeDatePickerComponent},
  {path : 'Graphs', component : GraphComponent}
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
