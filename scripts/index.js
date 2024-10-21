let bagItems;
onLoad();

/* functions' call */
function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}

/* items add to bag */
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

/* update bag icon */
function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

/* Add items */
function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".itmes-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += `
  <div class="item-container">
    <img class="item-image" src="${item.image}"alt="item-image" />
    <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
      <span class="current-price">RS ${item.current_price}</span>
      <span class="original-price">RS  ${item.original_price}</span>
      <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="item-add-btn" onclick="addToBag(${item.id})">Add to Bag</button>
  </div>`;
  });

  itemsContainerElement.innerHTML = innerHtml;
}
