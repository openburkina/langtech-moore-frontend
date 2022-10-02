import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SidebarService } from "./sidebar.service";

import * as $ from 'jquery';
import {RouteInfo} from "./sidebar.metadata";
import {AccountService} from "../../auth/services/account.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];


  constructor(
    public sidebarservice: SidebarService,
    private router: Router,
    private accountService: AccountService,
  ) {

    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd && $(window).width() < 1025 && ( document.readyState == 'complete' || false ) ) {

        this.toggleSidebar();
        // Hide loading indicator

      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());

    if ($(".wrapper").hasClass("nav-collapsed")) {
      // unpin sidebar when hovered
      $(".wrapper").removeClass("nav-collapsed");
      $(".sidebar-wrapper").unbind( "hover");
    } else {
      $(".wrapper").addClass("nav-collapsed");
      $(".sidebar-wrapper").hover(
        function () {
          $(".wrapper").addClass("sidebar-hovered");
        },
        function () {
          $(".wrapper").removeClass("sidebar-hovered");
        }
      )

    }

  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }


  ngOnInit() {
    const menus: RouteInfo[] = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter(menuItem => {

      if (this.hasAnyAuthority(menuItem.authorities)) {
        // Enabl showed item
        return menuItem;
      }

      // menu item will be hideen
      return null;
    });
    $.getScript('./assets/js/app-sidebar.js');
  }

  /**
   * Check if user has any authorities. If user hasn't any authority, menu item will be hidden
   * @param authorities
   */
  hasAnyAuthority(authorities: string[]) {
    return !authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities);
  }

}
