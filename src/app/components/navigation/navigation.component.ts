import { Component } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  openNav(): void {
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav(): void {
    document.getElementById("mySidenav").style.width = "0";
  }

  reloadPage(): void {
    location.reload();
  }

}
