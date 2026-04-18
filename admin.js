if (sessionStorage.getItem("logged") !== "true") {
  window.location.href = "login.html";
}

function logout() {
  sessionStorage.removeItem("logged");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  const settingsForm = document.getElementById("settings-form");
  const list = document.getElementById("admin-product-list");

  // --- LÓGICA DE CONFIGURAÇÕES ---
  const settings = db.getSettings();
  document.getElementById("set-name").value = settings.name;
  document.getElementById("set-fee").value = settings.deliveryFee;
  document.getElementById("set-logo").value = settings.logo;
  document.getElementById("set-footer").value = settings.footer;
  document.getElementById("set-whatsapp").value = settings.whatsapp;
  document.getElementById("set-user").value = settings.adminUser;
  document.getElementById("set-pass").value = settings.adminPass;

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById("set-name").value,
      deliveryFee: parseFloat(document.getElementById("set-fee").value),
      logo: document.getElementById("set-logo").value,
      footer: document.getElementById("set-footer").value,
      whatsapp: document.getElementById("set-whatsapp").value,
      adminUser: document.getElementById("set-user").value,
      adminPass: document.getElementById("set-pass").value,
    };
    db.saveSettings(updated);
    Swal.fire("Sucesso!", "Configurações atualizadas!", "success");
  });

  // --- LÓGICA DO CRUD DE PRODUTOS ---
  function loadAdminProducts() {
    const products = db.getProducts();
    list.innerHTML = products
      .map(
        (p) => `
        <tr>
            <td><img src="${p.img}" class="img-preview" style="width:50px; height:50px; object-fit:cover;"></td>
            <td>${p.name}</td>
            <td>R$ ${p.price.toFixed(2)}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="removeProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `,
      )
      .join("");
  }

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
      id: document.getElementById("prod-id").value
        ? Number(document.getElementById("prod-id").value)
        : null,
      name: document.getElementById("prod-name").value,
      price: parseFloat(document.getElementById("prod-price").value),
      img: document.getElementById("prod-img").value,
      desc: document.getElementById("prod-desc").value,
      category: "Lanches",
    };
    db.saveProduct(product);
    productForm.reset();
    document.getElementById("prod-id").value = "";
    document.getElementById("form-title").innerText = "Cadastrar Novo Produto";
    document.getElementById("btn-cancel").style.display = "none";
    loadAdminProducts();
    Swal.fire("Sucesso!", "Produto salvo!", "success");
  });

  window.removeProduct = (id) => {
    Swal.fire({
      title: "Deletar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
    }).then((res) => {
      if (res.isConfirmed) {
        db.deleteProduct(id);
        loadAdminProducts();
      }
    });
  };

  window.editProduct = (id) => {
    const p = db.getProducts().find((p) => p.id === id);
    document.getElementById("prod-id").value = p.id;
    document.getElementById("prod-name").value = p.name;
    document.getElementById("prod-price").value = p.price;
    document.getElementById("prod-img").value = p.img;
    document.getElementById("prod-desc").value = p.desc;
    document.getElementById("form-title").innerText = "Editando Produto";
    document.getElementById("btn-cancel").style.display = "block";
    window.scrollTo(0, 0);
  };

  document.getElementById("btn-cancel").onclick = () => {
    productForm.reset();
    document.getElementById("prod-id").value = "";
    document.getElementById("form-title").innerText = "Cadastrar Novo Produto";
    document.getElementById("btn-cancel").style.display = "none";
  };

  loadAdminProducts();
});
