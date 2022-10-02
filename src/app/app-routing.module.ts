import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./pages/layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./pages/layouts/content/content-layout.component";

import { Full_ROUTES } from "./pages/shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./pages/shared/routes/content-layout.routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES
  },
  {
    path: 'pages',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES
  },
  { path: '**', redirectTo: 'error/error-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
