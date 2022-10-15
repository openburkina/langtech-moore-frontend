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
    path: 'application',
    loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule),
    canActivate: [UserRoutesAccessGuard],

  },
  {
    path: 'widgets',
    loadChildren: () => import('../../widgets/widgets.module').then(m => m.WidgetsModule),
    canActivate: [UserRoutesAccessGuard],

  },
  {
    path: 'ecommerce',
    loadChildren: () => import('../../ecommerce/ecommerce.module').then(m => m.EcommerceModule),
    canActivate: [UserRoutesAccessGuard],

  },
  {
    path: 'components',
    loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'content',
    loadChildren: () => import('../../content/content.module').then(m => m.ContentModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'icons',
    loadChildren: () => import('../../icons/icons.module').then(m => m.IconsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'form',
    loadChildren: () => import('../../form/form.module').then(m => m.FormModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'table',
    loadChildren: () => import('../../table/table.module').then(m => m.TableModule),
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
    path: 'pricing',
    loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'earnings',
    loadChildren: () => import('../../earnings/earnings.module').then(m => m.EarningsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'downloads',
    loadChildren: () => import('../../downloads/downloads.module').then(m => m.DownloadsModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'timeline',
    loadChildren: () => import('../../timeline/timeline.module').then(m => m.TimelineModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'charts',
    loadChildren: () => import('../../charts/chart.module').then(m => m.ChartModule),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'maps',
    loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule),
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
    path: 'parametres',
    loadChildren: () => import('../../parametres/parametres.module').then(
      m => m.ParametresModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'groupes',
    loadChildren: () => import('../../groupes/groupes.module').then(
      m => m.GroupesModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  },
  {
    path: 'source-donnees',
    loadChildren: () => import('../../source-donnees/source-donnees.module').then(
      m => m.SourceDonneesModule,
    ),
    canActivate: [UserRoutesAccessGuard],
  }
];
