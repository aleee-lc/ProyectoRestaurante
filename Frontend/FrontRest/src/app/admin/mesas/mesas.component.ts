import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-mesas",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./mesas.component.html",
  styleUrls: ["./mesas.component.css"],
})
export class MesasComponent {
  mesas = [
    { id: 1, nombre: "Mesa 1", capacidad: 4 },
    { id: 2, nombre: "Mesa 2", capacidad: 2 },
  ];
}
