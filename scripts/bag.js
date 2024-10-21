const CONVENIENCE_FEE = 99;
let bagItemObjects;
onLoad();

/* functions' call */
function onLoad() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

/* bag summary */
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;

  bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value"> &#8377;${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >- &#8377;${totalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value"> &#8377; 99</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> &#8377; ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

/* item searching from bagItem array */
function loadBagItemsObjects() {
  // console.log(bagItems);

  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  // console.log(bagItemObjects);
}

/* display bag item */
function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHtml = "";
  bagItemObjects.forEach((bagItem) => {
    innerHtml += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}

/* remove item from bag */
function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

/* generate structure for item */
function generateItemHTML(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img
                class="bag-item-img"
                src="../${item.image}"
                alt="cricket-kit"
              />
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">
                ${item.item_name}
              </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date} Oct 2024</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removeFromBag(${item.id})">X</div>
          </div>`;
}
