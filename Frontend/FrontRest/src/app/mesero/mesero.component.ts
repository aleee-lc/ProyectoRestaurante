import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Order {
  id: number;
  cliente: string;
  mesa: string;
  area: string;
  comensales: number;
  productos: number;
  total: number;
  hora: string;
  estado: 'Preparando' | 'Pendiente' | 'Completada';
  completada: boolean;
}

interface MenuProduct {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
}

interface NewOrderState {
  cliente: string;
  tipoServicio: 'Comedor' | 'Terraza' | 'Room Service';
  mesa: string;
  comensales: number;
  notas: string;
  items: { product: MenuProduct; qty: number }[];
}

@Component({
  selector: 'app-mesero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css'],
})
export class MeseroComponent {
  constructor(private router: Router) {}

  // ---- TABS ----
  activeTab = signal<'activas' | 'completadas'>('activas');

  // ---- ÓRDENES MOCK ----
  orders = signal<Order[]>([
    {
      id: 101,
      cliente: 'Carlos Mendoza',
      mesa: 'Mesa 5',
      area: 'Comedor',
      comensales: 2,
      productos: 3,
      total: 33.96,
      hora: '14:30',
      estado: 'Preparando',
      completada: false,
    },
    {
      id: 102,
      cliente: 'María Rodríguez',
      mesa: 'Habitación 205',
      area: 'Room Service',
      comensales: 1,
      productos: 2,
      total: 24.98,
      hora: '14:45',
      estado: 'Pendiente',
      completada: false,
    },
  ]);

  // Lista filtrada por tab
  filteredOrders = computed(() => {
    const tab = this.activeTab();
    const list = this.orders();

    if (tab === 'activas') {
      return list.filter(o => !o.completada);
    }
    return list.filter(o => o.completada);
  });

  // ---- NUEVA ORDEN ----
  showNewOrder = signal(false);

  menuProducts = signal<MenuProduct[]>([
    {
      id: 1,
      name: 'Hamburguesa Clásica',
      desc: 'Carne de res, lechuga, tomate, cebolla y queso',
      price: 12.99,
      category: 'Platos Principales',
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      desc: 'Salsa de tomate, mozzarella y albahaca fresca',
      price: 15.99,
      category: 'Platos Principales',
    },
    {
      id: 3,
      name: 'Ensalada César',
      desc: 'Lechuga romana, pollo a la parrilla, crutones y aderezo',
      price: 9.99,
      category: 'Ensaladas',
    },
  ]);

  newOrder = signal<NewOrderState>({
    cliente: '',
    tipoServicio: 'Comedor',
    mesa: '',
    comensales: 1,
    notas: '',
    items: [],
  });

  newOrderTotal = computed(() =>
    this.newOrder().items.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    )
  );

  // ---- UI / ACCIONES ----

  setTab(tab: 'activas' | 'completadas') {
    this.activeTab.set(tab);
  }

  openNewOrder() {
    this.showNewOrder.set(true);
    this.newOrder.set({
      cliente: '',
      tipoServicio: 'Comedor',
      mesa: '',
      comensales: 1,
      notas: '',
      items: [],
    });
  }

  closeNewOrder() {
    this.showNewOrder.set(false);
  }

  addProductToOrder(product: MenuProduct) {
    this.newOrder.update(state => {
      const items = [...state.items];
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        items.push({ product, qty: 1 });
      }
      return { ...state, items };
    });
  }

  changeQty(item: { product: MenuProduct; qty: number }, delta: number) {
    this.newOrder.update(state => {
      let items = [...state.items];
      const idx = items.findIndex(i => i.product.id === item.product.id);
      if (idx === -1) return state;

      items[idx] = { ...items[idx], qty: items[idx].qty + delta };

      if (items[idx].qty <= 0) {
        items = items.filter(i => i.product.id !== item.product.id);
      }

      return { ...state, items };
    });
  }

  createOrder() {
    const order = this.newOrder();
    const total = this.newOrderTotal();

    if (!order.cliente || !order.mesa || order.items.length === 0) {
      alert('Completa cliente, mesa y al menos un producto.');
      return;
    }

    const now = new Date();
    const hora = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newId =
      this.orders().length > 0
        ? Math.max(...this.orders().map(o => o.id)) + 1
        : 101;

    const productos = order.items.reduce((acc, i) => acc + i.qty, 0);

    const nueva: Order = {
      id: newId,
      cliente: order.cliente,
      mesa: order.mesa,
      area: order.tipoServicio,
      comensales: order.comensales,
      productos,
      total,
      hora,
      estado: 'Pendiente',
      completada: false,
    };

    this.orders.update(list => [nueva, ...list]);
    this.showNewOrder.set(false);
  }

  // ---- HANDLERS DE FORM ----

  onClienteInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newOrder.update(s => ({ ...s, cliente: value }));
  }

  onMesaInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newOrder.update(s => ({ ...s, mesa: value }));
  }

  onNotasInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.newOrder.update(s => ({ ...s, notas: value }));
  }

  onTipoServicioChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as
      | 'Comedor'
      | 'Terraza'
      | 'Room Service';
    this.newOrder.update(s => ({ ...s, tipoServicio: value }));
  }

  onComensalesInput(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.newOrder.update(s => ({
      ...s,
      comensales: value > 0 ? value : 1,
    }));
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
