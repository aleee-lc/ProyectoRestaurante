import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CashierOrder {
  id: number;
  cliente: string;
  mesa: string;
  productos: number;
  hora: string;
  total: number;
  estado: 'Listo' | 'Pendiente Pago' | 'Pagado';
  area: 'Comedor' | 'Room Service' | 'Delivery';
}

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cajero.component.html',
  styleUrls: ['./cajero.component.css'],
})
export class CajeroComponent {
  constructor(private router: Router) {}

  // ---- STATE CON SIGNALS ----
  search = signal('');
  filtroEstado = signal<'Todos' | 'Listo' | 'Pagado'>('Todos');
  filtroArea = signal<'Comedor' | 'Room Service' | 'Delivery'>('Comedor');

  orders = signal<CashierOrder[]>([
    {
      id: 101,
      cliente: 'Carlos Mendoza',
      mesa: 'Mesa 5',
      productos: 3,
      hora: '14:30',
      total: 33.96,
      estado: 'Pendiente Pago',
      area: 'Comedor',
    },
    {
      id: 104,
      cliente: 'Business Corp',
      mesa: 'Mesa 12',
      productos: 3,
      hora: '13:30',
      total: 115.97,
      estado: 'Pagado',
      area: 'Comedor',
    },
  ]);

  // Lista filtrada reactiva
  filteredOrders = computed(() => {
    const search = this.search().toLowerCase().trim();
    const estado = this.filtroEstado();
    const area = this.filtroArea();

    return this.orders().filter((order) => {
      const matchSearch =
        !search ||
        order.cliente.toLowerCase().includes(search) ||
        order.mesa.toLowerCase().includes(search);

      const matchEstado =
        estado === 'Todos' || order.estado === estado;

      const matchArea = order.area === area;

      return matchSearch && matchEstado && matchArea;
    });
  });

  // ---- HANDLERS ----
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }

  setEstado(estado: 'Todos' | 'Listo' | 'Pagado') {
    this.filtroEstado.set(estado);
  }

  setArea(area: 'Comedor' | 'Room Service' | 'Delivery') {
    this.filtroArea.set(area);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
  selectedOrder = signal<CashierOrder | null>(null);
showPaymentModal = signal(false);

// Abrir modal con datos
openPayment(order: CashierOrder) {
  this.selectedOrder.set(order);
  this.showPaymentModal.set(true);
}

// Cerrar modal
closePayment() {
  this.showPaymentModal.set(false);
  this.selectedOrder.set(null);
}

}

