# 🍔 K-sabor | Sistema de Cardápio Digital & Admin CRUD

Bem-vindo ao projeto **K-sabor**! Este é um sistema completo de lanchonete desenvolvido para fins didáticos no canal **Fluxo Code**. O projeto aborda desde a criação de uma interface de vendas (Client Side) até um painel administrativo protegido para gerenciamento de produtos e configurações (Admin Side).

![Status do Projeto](https://img.shields.io/badge/Status-Finalizado-success?style=for-the-badge)
![Tecnologias](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge&logo=javascript)

---

## 📺 Sobre o Projeto (Fluxo Code)

Este projeto foi desenvolvido para ensinar os fundamentos do desenvolvimento web fullstack utilizando apenas tecnologias nativas (Vanilla JS). O foco é o aprendizado de:

- Manipulação de DOM.
- Persistência de dados com `localStorage`.
- Lógica de CRUD (Create, Read, Update, Delete).
- Integração de pedidos via API do WhatsApp.

---

## 🚀 Funcionalidades

### 🛒 Área do Cliente

- **Cardápio Dinâmico:** Listagem de produtos vindo do banco de dados local.
- **Carrinho de Compras:** Adição/remoção de itens com cálculo automático de subtotal e taxa de entrega.
- **Finalização via WhatsApp:** Envio de pedido formatado diretamente para o número configurado.

### ⚙️ Painel Administrativo

- **Sistema de Login:** Proteção de rota via `sessionStorage`.
- **CRUD de Produtos:** Cadastro, edição, visualização e exclusão de lanches.
- **Configurações Globais:** Alteração em tempo real do nome da lanchonete, logo, taxa de entrega, rodapé e credenciais de acesso.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** & **CSS3** (Grid Layout e Flexbox)
- **JavaScript Vanilla** (ES6+)
- **SweetAlert2** (Alertas personalizados)
- **Font Awesome** (Ícones profissionais)
- **Google Fonts** (Tipografia Poppins)

---

## 📂 Estrutura de Pastas

```text
k-sabor-sistema/
├── assets/              # Imagens e ícones
├── css/                 # Estilização (style.css e admin.css)
├── js/                  # Lógica do Sistema
│   ├── db.js            # "Banco de dados" e persistência
│   ├── script.js        # Lógica da Loja
│   └── admin.js         # Lógica do Painel CRUD
├── index.html           # Página Principal (Cliente)
├── admin.html           # Painel Administrativo
└── login.html           # Tela de Acesso
```
