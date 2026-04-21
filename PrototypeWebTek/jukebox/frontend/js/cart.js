// cart.js — controls the Cart / Checkout screen (cart.html)

function renderCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML =
      '<li class="px-5 py-8 text-center text-zinc-500">Your cart is empty</li>';
    return;
  }

  cart.forEach(function (song) {
    const li = document.createElement("li");
    li.className =
      "flex items-center gap-3 px-5 py-2.5 border-b border-zinc-800 min-h-[68px]";

    li.innerHTML =
      '<div class="w-12 h-12 rounded-md shrink-0" style="background:' +
      song.color +
      '"></div>' +
      '<div class="flex-1 min-w-0">' +
      '<p class="text-[15px] font-medium truncate">' +
      song.title +
      "</p>" +
      '<p class="text-[13px] text-zinc-500 mt-0.5 truncate">' +
      song.artist +
      "</p>" +
      "</div>" +
      '<button data-song-id="' +
      song.id +
      '" class="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0 text-lg">&#x2715;</button>';

    li.querySelector("button").addEventListener("click", function () {
      removeFromCart(song.id);
      renderCart();
      updatePricingSummary();
    });

    list.appendChild(li);
  });
}

function updatePricingSummary() {
  document.getElementById("total-label").textContent =
    "Total  ·  " + cart.length + (cart.length === 1 ? " song" : " songs");
  document.getElementById("total-price").textContent = getCartTotal() + " kr";

  const bundleRow = document.getElementById("price-row-bundle");
  if (cart.length === 3) {
    bundleRow.classList.add(
      "text-emerald-400",
      "bg-emerald-950/30",
      "font-semibold",
    );
    bundleRow.classList.remove("text-zinc-500");
  } else {
    bundleRow.classList.remove(
      "text-emerald-400",
      "bg-emerald-950/30",
      "font-semibold",
    );
    bundleRow.classList.add("text-zinc-500");
  }
}

function handleMobilePay() {
  // pop from cart array
  // push to queue array
  for (let i = 0; i < cart.length; i++) {
    queue.push(cart[i]);
  }
  cart = [];
}

function handlePayAtBar() {}

// ─── This is where the magic happens ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async function () {
  await buildSongs();
  loadCart();
  renderCart();
  updatePricingSummary();

  document
    .getElementById("btn-mobilepay")
    .addEventListener("click", handleMobilePay);
  document
    .getElementById("btn-pay-bar")
    .addEventListener("click", handlePayAtBar);
});
