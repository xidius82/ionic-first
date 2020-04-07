import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
// {
//     path: 'details',
//     loadChildren: './pages/details/details.module#DetailsPageModule'
//   },
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'details',
    loadChildren: './details/details.module#DetailsPageModule'
  },
  {
    path: 'details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './details/details.module#DetailsPageModule'
  },
];

@NgModule({ 
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 