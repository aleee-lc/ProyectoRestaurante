import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

type Rango = 'hoy' | 'semana' | 'mes' | 'personalizado';
type Tab = 'diario' | 'producto' | 'mesero' | 'area' | 'horas';

interface DailyMetric {
  fecha: string;
  ventas: number;
  ordenes: number;
}

interface ProductMetric {
  producto: string;
  ventas: number;
  ordenes: number;
}

interface MeseroMetric {
  mesero: string;
  ventas: number;
  ordenes: number;
}

interface AreaMetric {
  area: string;
  ventas: number;
}

interface HourMetric {
  hora: string;
  dia: string;
  valor: number;
}

@Component({
  selector: 'app-reporteria',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './reporteria.component.html',
  styleUrls: ['./reporteria.component.css'],
})
export class ReporteriaComponent {
  constructor(private router: Router) {}

  // --------- STATE BÁSICO ---------
  rango = signal<Rango>('semana');
  activeTab = signal<Tab>('diario');

  fechaInicio = signal<string>('');
  fechaFin = signal<string>('');

  // --------- DATA MOCK (luego la conectas al backend) ---------
  ventasDiarias = signal<DailyMetric[]>([
    { fecha: '08/10', ventas: 1250, ordenes: 40 },
    { fecha: '09/10', ventas: 1400, ordenes: 45 },
    { fecha: '10/10', ventas: 1320, ordenes: 42 },
    { fecha: '11/10', ventas: 1850, ordenes: 55 },
    { fecha: '12/10', ventas: 1980, ordenes: 57 },
    { fecha: '13/10', ventas: 1760, ordenes: 49 },
    { fecha: '14/10', ventas: 2210, ordenes: 60 },
  ]);

  porProducto = signal<ProductMetric[]>([
    { producto: 'Hamburguesa Clásica', ventas: 4200, ordenes: 120 },
    { producto: 'Pizza Margherita', ventas: 3800, ordenes: 95 },
    { producto: 'Ensalada César', ventas: 2100, ordenes: 70 },
    { producto: 'Pasta Alfredo', ventas: 2600, ordenes: 65 },
    { producto: 'Tacos de Arrachera', ventas: 3100, ordenes: 80 },
  ]);

  porMesero = signal<MeseroMetric[]>([
    { mesero: 'Alejandro', ventas: 5200, ordenes: 130 },
    { mesero: 'Carla', ventas: 4800, ordenes: 118 },
    { mesero: 'Luis', ventas: 3900, ordenes: 95 },
    { mesero: 'Fernanda', ventas: 3500, ordenes: 90 },
  ]);

  porArea = signal<AreaMetric[]>([
    { area: 'Comedor', ventas: 8200 },
    { area: 'Terraza', ventas: 4600 },
    { area: 'Room Service', ventas: 3900 },
    { area: 'Pool Lounge', ventas: 2400 },
  ]);

  // Heatmap simplificado: día x hora
  heatmapData = signal<HourMetric[]>([
    { dia: 'Lunes', hora: '13:00', valor: 10 },
    { dia: 'Lunes', hora: '14:00', valor: 22 },
    { dia: 'Lunes', hora: '15:00', valor: 8 },
    { dia: 'Martes', hora: '13:00', valor: 16 },
    { dia: 'Martes', hora: '14:00', valor: 28 },
    { dia: 'Martes', hora: '15:00', valor: 12 },
    { dia: 'Miércoles', hora: '13:00', valor: 20 },
    { dia: 'Miércoles', hora: '14:00', valor: 35 },
    { dia: 'Miércoles', hora: '15:00', valor: 18 },
    { dia: 'Jueves', hora: '13:00', valor: 25 },
    { dia: 'Jueves', hora: '14:00', valor: 32 },
    { dia: 'Jueves', hora: '15:00', valor: 21 },
    { dia: 'Viernes', hora: '13:00', valor: 30 },
    { dia: 'Viernes', hora: '14:00', valor: 45 },
    { dia: 'Viernes', hora: '15:00', valor: 26 },
  ]);

  // --------- KPI COMPUTADOS ---------
  totalVentas = computed(() =>
    this.ventasDiarias().reduce((acc, v) => acc + v.ventas, 0)
  );

  totalOrdenes = computed(() =>
    this.ventasDiarias().reduce((acc, v) => acc + v.ordenes, 0)
  );

  ticketPromedio = computed(() =>
    this.totalOrdenes() > 0 ? this.totalVentas() / this.totalOrdenes() : 0
  );

  totalPropinas = signal(1867);

  // --------- GRÁFICAS (ApexCharts) ---------

 get dailyChartOptions() {
  const data = this.ventasDiarias();
  return {
    series: [
      { name: 'Ventas', data: data.map(d => d.ventas) },
      { name: 'Órdenes', data: data.map(d => d.ordenes) }
    ],
    chart: {
      height: 280,
      type: 'line' as const,
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth' as const, width: 3 },
    xaxis: { categories: data.map((d) => d.fecha) },
    theme: { mode: 'dark' as const },
    dataLabels: { enabled: false },
    legend: { labels: { colors: '#ffffffb3' } },
    grid: { borderColor: '#ffffff10' }
  };
}

 get productChartOptions() {
  const data = this.porProducto();
  return {
    series: [
      { name: 'Ventas', data: data.map(d => d.ventas) }
    ],
    chart: {
      height: 280,
      type: 'bar' as const,
      toolbar: { show: false }
    },
    xaxis: { categories: data.map(d => d.producto), labels: { rotate: -20 } },
    theme: { mode: 'dark' as const },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
    grid: { borderColor: '#ffffff10' },
    dataLabels: { enabled: false }
  };
}


get meseroChartOptions() {
  const data = this.porMesero();
  return {
    series: [
      { name: 'Ventas', data: data.map(d => d.ventas) }
    ],
    chart: {
      height: 280,
      type: 'bar' as const,
      toolbar: { show: false }
    },
    xaxis: { categories: data.map(d => d.mesero) },
    theme: { mode: 'dark' as const },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
    grid: { borderColor: '#ffffff10' },
    dataLabels: { enabled: false }
  };
}


get areaChartOptions() {
  const data = this.porArea();
  return {
    series: data.map(d => d.ventas),
    chart: {
      height: 260,
      type: 'donut' as const,
    },
    labels: data.map(d => d.area),
    theme: { mode: 'dark' as const },
    legend: { labels: { colors: '#ffffffb3' } }
  };
}


 get hoursHeatmapOptions() {
  const horas = Array.from(new Set(this.heatmapData().map(h => h.hora)));
  const dias = Array.from(new Set(this.heatmapData().map(h => h.dia)));

  const series = dias.map(dia => ({
    name: dia,
    data: horas.map(hora => {
      const item = this.heatmapData().find(h => h.dia === dia && h.hora === hora);
      return { x: hora, y: item ? item.valor : 0 };
    })
  }));

  return {
    series,
    chart: {
      height: 280,
      type: 'heatmap' as const,
      toolbar: { show: false }
    },
    theme: { mode: 'dark' as const },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'category' as const
    },
    grid: { borderColor: '#ffffff10' }
  };
}


  // --------- FILTROS & NAVEGACIÓN ---------

  setRango(event: Event) {
    const value = (event.target as HTMLSelectElement).value as Rango;
    this.rango.set(value);
    // Aquí podrías disparar una llamada al backend
  }

  setFechaInicio(event: Event) {
    this.fechaInicio.set((event.target as HTMLInputElement).value);
  }

  setFechaFin(event: Event) {
    this.fechaFin.set((event.target as HTMLInputElement).value);
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  // --------- EXPORTS ---------

  exportCSV() {
    const { header, rows } = this.getCurrentTableData();
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte.csv';
    a.click();
    a.remove();
  }

  exportExcel() {
    // Por ahora mandamos el mismo CSV; luego podemos montar XLSX real
    this.exportCSV();
  }

  exportPDF() {
    // Versión sencilla usando print; luego se puede usar pdfmake
    window.print();
  }

  private getCurrentTableData(): { header: string[]; rows: (string | number)[][] } {
    switch (this.activeTab()) {
      case 'diario': {
        const data = this.ventasDiarias();
        return {
          header: ['Fecha', 'Ventas', 'Órdenes'],
          rows: data.map((d) => [d.fecha, d.ventas, d.ordenes]),
        };
      }
      case 'producto': {
        const data = this.porProducto();
        return {
          header: ['Producto', 'Ventas', 'Órdenes'],
          rows: data.map((d) => [d.producto, d.ventas, d.ordenes]),
        };
      }
      case 'mesero': {
        const data = this.porMesero();
        return {
          header: ['Mesero', 'Ventas', 'Órdenes'],
          rows: data.map((d) => [d.mesero, d.ventas, d.ordenes]),
        };
      }
      case 'area': {
        const data = this.porArea();
        return {
          header: ['Área', 'Ventas'],
          rows: data.map((d) => [d.area, d.ventas]),
        };
      }
      case 'horas': {
        const data = this.heatmapData();
        return {
          header: ['Día', 'Hora', 'Órdenes'],
          rows: data.map((d) => [d.dia, d.hora, d.valor]),
        };
      }
      default:
        return { header: [], rows: [] };
    }
  }
}
