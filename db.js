const DB_PRODUCTS_KEY = "ksabor_products";
const DB_ORDERS_KEY = "ksabor_orders";
const DB_SETTINGS_KEY = "ksabor_settings";

const initialProducts = [
  {
    id: 1,
    name: "X-Sabor Bacon",
    price: 25.9,
    category: "Lanches",
    desc: "Hambúrguer 180g, muito bacon e queijo.",
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500",
  },
  {
    id: 2,
    name: "Suco de Laranja",
    price: 8.0,
    category: "Bebidas",
    desc: "Natural 500ml.",
    img: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=500",
  },
];

const db = {
  getSettings: () => {
    const data = localStorage.getItem(DB_SETTINGS_KEY);
    const defaultSettings = {
      name: "K-sabor",
      logo: "https://via.placeholder.com/150x50?text=K-Sabor",
      footer: "© 2024 K-sabor - Todos os direitos reservados",
      deliveryFee: 5.0,
      adminUser: "admin",
      adminPass: "123",
      whatsapp: "5511999999999",
    };
    if (!data) {
      localStorage.setItem(DB_SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(data);
  },

  saveSettings: (newSettings) => {
    localStorage.setItem(DB_SETTINGS_KEY, JSON.stringify(newSettings));
  },

  getProducts: () => {
    const data = localStorage.getItem(DB_PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(DB_PRODUCTS_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(data);
  },

  saveProduct: (product) => {
    const products = db.getProducts();
    if (product.id) {
      const index = products.findIndex((p) => p.id === product.id);
      products[index] = product;
    } else {
      product.id = Date.now();
      products.push(product);
    }
    localStorage.setItem(DB_PRODUCTS_KEY, JSON.stringify(products));
  },

  deleteProduct: (id) => {
    const products = db.getProducts().filter((p) => p.id !== id);
    localStorage.setItem(DB_PRODUCTS_KEY, JSON.stringify(products));
  },
};
