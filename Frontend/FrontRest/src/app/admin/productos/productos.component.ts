import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-productos",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"],
})
export class ProductosComponent {
  productos = [
    { id: 1, nombre: "Hamburguesa", precio: 140 },
    { id: 2, nombre: "Refresco", precio: 35 },
  ];
}
