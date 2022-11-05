import { Routes } from '@angular/router';
import {UserRoutesAccessGuard} from "../../../guards/user-routes-access.guard";

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../home/home.module').then(m => m.HomeModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'icons',
    loadChildren: () => import('../../icons/icons.module').then(m => m.IconsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [UserRoutesAccessGuard],

  },
  {
    path: 'faq',
    loadChildren: () => import('../../faq/faq.module').then(m => m.FaqModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('../../users/users.module').then(
      m => m.UsersModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'profils',
    loadChildren: () => import('../../profils/profils.module').then(
      m => m.ProfilsModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'source-donnees',
    loadChildren: () => import('../../source-donnees/source-donnees.module').then(
      m => m.SourceDonneesModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'contributions',
    loadChildren: () => import('../../contributions/contributions.module').then(
      m => m.ContributionsModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'contributeus',
    loadChildren: () => import('../../contributeurs/contributeurs.module').then(
      m => m.ContributeursModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  }
];
