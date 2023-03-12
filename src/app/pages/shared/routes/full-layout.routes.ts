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
    path: 'user-profile',
    loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule),
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
    path: 'contributeurs',
    loadChildren: () => import('../../contributeurs/contributeurs.module').then(
      m => m.ContributeursModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'statistiques',
    loadChildren: () => import('../../statistiques/statistiques.module').then(
      m => m.StatistiquesModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  }
];
