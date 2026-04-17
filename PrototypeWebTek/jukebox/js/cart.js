// cart.js — controls the Cart / Checkout screen (cart.html)

function renderCart() {
  // TODO: clear #cart-list and render one <li> per song in cart
  // Each row should contain:
  //   - album art div (song.color as background)
  //   - song title and artist
  //   - price label ("2 kr")
  //   - a remove button (×) that calls handleRemove(song.id) on click
  // If cart is empty, show a message like "Your cart is empty"
}

function updatePricingSummary() {
  // TODO: update #total-label with the number of songs ("2 songs" etc.)
  // TODO: update #total-price with getCartTotal() + " kr"
  // Highlight the bundle row (#price-row-bundle) if cart.length === 3
}

function handleRemove(songId) {
  // TODO: call removeFromCart(songId)
  // Then call renderCart() and updatePricingSummary() to refresh the UI
}

function handleMobilePay() {
  // TODO: handle MobilePay payment flow
  // For now this can show an alert or navigate to a confirmation screen
}

function handlePayAtBar() {
  // TODO: handle pay-at-bar flow
  // For now this can show an alert or a confirmation message
}

// ─── Entry point ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  initData().then(function () {
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
});
