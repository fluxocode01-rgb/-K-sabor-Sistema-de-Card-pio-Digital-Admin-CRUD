let cart = [];
const settings = db.getSettings();

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar Configurações Dinâmicas
  document.querySelector("header h1").innerText = settings.name;
  document.title = `${settings.name} | Cardápio Digital`;

  const container = document.getElementById("menu-container");
  const products = db.getProducts();

  function renderProducts() {
    container.innerHTML = products
      .map(
        (p) => `
        <div class="card-product">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <span class="price-tag">R$ ${p.price.toFixed(2).replace(".", ",")}</span>
                <button class="btn-add" onclick="addToCart(${p.id})">Adicionar</button>
            </div>
        </div>
    `,
      )
      .join("");
  }
  renderProducts();

  // Modal
  const cartModal = document.getElementById("cart-modal");
  document.getElementById("cart-icon").onclick = () => {
    renderCart();
    cartModal.style.display = "block";
  };
  document.querySelector(".close-modal").onclick = () => {
    cartModal.style.display = "none";
  };
});

function addToCart(id) {
  const p = db.getProducts().find((p) => p.id === id);
  cart.push(p);
  updateCartCount();
  Swal.fire({
    title: "Adicionado!",
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  let subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  let totalComFrete = subtotal + settings.deliveryFee;

  if (cart.length === 0) {
    container.innerHTML = "<p>Vazio...</p>";
    totalEl.innerText = "R$ 0,00";
    return;
  }

  container.innerHTML = cart
    .map(
      (item, index) => `
    <div class="cart-item">
        <div><strong>${item.name}</strong><br><small>R$ ${item.price.toFixed(2)}</small></div>
        <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
    </div>
  `,
    )
    .join("");

  container.innerHTML += `<div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
    <small>Subtotal: R$ ${subtotal.toFixed(2)}</small><br>
    <small>Taxa entrega: R$ ${settings.deliveryFee.toFixed(2)}</small>
  </div>`;

  totalEl.innerText = `R$ ${totalComFrete.toFixed(2).replace(".", ",")}`;
}

document.getElementById("btn-finish").onclick = () => {
  const name = document.getElementById("cust-name").value;
  const address = document.getElementById("cust-address").value;
  if (cart.length === 0 || !name || !address)
    return Swal.fire("Atenção", "Preencha tudo!", "warning");

  let msg = `*Pedido ${settings.name}*%0A*Cliente:* ${name}%0A*Endereço:* ${address}%0A%0A*Itens:*%0A`;
  cart.forEach((i) => (msg += `- ${i.name}%0A`));
  const final =
    cart.reduce((acc, i) => acc + i.price, 0) + settings.deliveryFee;
  msg += `%0A*Total c/ Frete: R$ ${final.toFixed(2)}*`;

  window.open(`https://wa.me/${settings.whatsapp}?text=${msg}`, "_blank");
  cart = [];
  updateCartCount();
  document.getElementById("cart-modal").style.display = "none";
};
