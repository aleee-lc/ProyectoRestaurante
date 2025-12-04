// src/app/core/config/api.config.ts

export const API = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
  },

  users: {
    list: "/usuarios-locales",
    create: "/usuarios-locales",
    update: (id: number) => `/usuarios-locales/${id}`,
    delete: (id: number) => `/usuarios-locales/${id}`,
  },

  hoteles: {
    list: "/hoteles",
    create: "/hoteles",
    update: (id: number) => `/hoteles/${id}`,
    delete: (id: number) => `/hoteles/${id}`,
  },

  cadenaUsuarios: {
    list: "/cadena-usuarios",
    create: "/cadena-usuarios",
    update: (id: number) => `/cadena-usuarios/${id}`,
    delete: (id: number) => `/cadena-usuarios/${id}`,
  },

  roles: {
    list: "/roles",
    create: "/roles",
    update: (id: number) => `/roles/${id}`,
    delete: (id: number) => `/roles/${id}`,
  },

  cash: {
    sessionOpen: "/cash/open",
    sessionClose: "/cash/close",
    activeSession: "/cash/active",
    history: "/cash/history",
  },

  orders: {
    list: "/orders",
    byId: (id: number) => `/orders/${id}`,
    byHotel: (id: number) => `/orders/hotel/${id}`,
    create: "/orders",
    update: (id: number) => `/orders/${id}`,
    cancel: (id: number) => `/orders/${id}/cancel`,
  },

  orderItems: {
    updateStatus: (id: number) => `/order-items/${id}/status`,
    addItem: "/order-items",
    deleteItem: (id: number) => `/order-items/${id}`,
  },

  mesas: {
    list: "/tables",
    byHotel: (hotelId: number) => `/tables/hotel/${hotelId}`,
    create: "/tables",
    update: (id: number) => `/tables/${id}`,
    delete: (id: number) => `/tables/${id}`,
  },

  tableSessions: {
    list: "/table-sessions",
    byTable: (tableId: number) => `/table-sessions/table/${tableId}`,
    open: "/table-sessions/open",
    close: "/table-sessions/close",
  },

  productos: {
    list: "/products",
    byCategory: (catId: number) => `/products/category/${catId}`,
    create: "/products",
    update: (id: number) => `/products/${id}`,
    delete: (id: number) => `/products/${id}`,
  },

  categories: {
    list: "/categories",
    create: "/categories",
    update: (id: number) => `/categories/${id}`,
    delete: (id: number) => `/categories/${id}`,
  },

  inventario: {
    movimientos: "/inventory/movements",
    add: "/inventory/add",
    reduce: "/inventory/reduce",
  },

  metrics: {
    sales: "/metrics/sales",
    daily: "/metrics/sales/daily",
    orders: "/metrics/orders",
    items: "/metrics/items",
  },

  notifications: {
    list: "/notifications",
    markRead: "/notifications/read",
    subscribe: "/notifications/subscribe",
  },

  printer: {
    print: "/printer/print",
    kitchen: "/printer/kitchen",
    receipt: "/printer/receipt",
  },
};
