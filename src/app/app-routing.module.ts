import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from './Components/maps/maps.component';
import { LayoutComponent } from './Layout/layout/layout.component';


const routes: Routes = [
    {
      path:'',
      component:LayoutComponent,
      children:[
        {
          path:'',
          component:MapsComponent    
        },
        {
          path: '',
          loadChildren: () =>
            import('./Components/users/users/users-routing.module').then((module) => {
              return module.UsersRoutingModule;
            }),
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
