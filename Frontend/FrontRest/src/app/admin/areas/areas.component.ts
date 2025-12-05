import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-areas",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./areas.component.html",
  styleUrls: ["./areas.component.css"],
})
export class AreasComponent {
  areas = [
    { id: 1, nombre: "Restaurante" },
    { id: 2, nombre: "Bar" },
  ];
}

