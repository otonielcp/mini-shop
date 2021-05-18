/** @format */

class Products {
	constructor(title, image, description, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = description;
		this.price = price;
	}
}

class ShoppingCart {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
			2,
		)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce((prevValue, curItem) => {
			return prevValue + curItem.price;
		}, 0);
		return sum;
	}

	addProduct(product) {
		this.items.push(product);
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}

	render() {
		const cartEl = document.createElement('section');
		cartEl.innerHTML = `
		<h2>Total: \$${0}</h2>
		<button>Order Now!</button>
		`;
		cartEl.className = 'cart';
		this.totalOutput = cartEl.querySelector('h2');
		return cartEl;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = document.createElement('li');
		prodEl.className = 'product-item';
		prodEl.innerHTML = `
      <div>
      <img src="${this.product.imageUrl}" alt='${this.product.title}'>
      </div>
      <div class="product-item__content">
      <h2>${this.product.title}</h2>
      <h3>\$${this.product.price}</h3>
      <p>${this.product.description}</p>
      <button> Add to Cart</button>
      </div>
      `;
		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCart.bind(this));
		return prodEl;
	}
}

class ProductList {
	products = [
		new Products(
			'Nike FC Barcelona',
			'https://images-na.ssl-images-amazon.com/images/I/61q1nR13dGL._AC_UX385_.jpg',
			'Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
			59.99,
		),
		new Products(
			'Nike FC Barcelona',
			'https://images.sportsdirect.com/images/products/37606721_l.jpg',
			'2019/2020 Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
			59.99,
		),

		new Products(
			'Atlanta United FC',
			'https://m.media-amazon.com/images/I/61sgeprssvL._AC_UL1500_.jpg',
			'2019/2020 Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
			49.99,
		),

		new Products(
			'Beckham Pillows',
			'https://images-na.ssl-images-amazon.com/images/I/71oo6xUnQrL._AC_SL1500_.jpg',
			'Beckham Hotel Collection Bed Pillows for Sleeping - Queen Size, Set of 2 - Soft Allergy Friendly, Cooling, Luxury Gel Pillow for Back, Stomach or Side Sleepers',
			39.99,
		),
	];

	constructor() {}
	render() {
		// const renderHook = document.getElementById('app');
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';

		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		// renderHook.append(prodList);
		return prodList;
	}
}

class Shop {
	render() {
		const renderHook = document.getElementById('app');
		this.cart = new ShoppingCart();
		const cartEl = this.cart.render();
		const productList = new ProductList();
		const proListEl = productList.render();

		renderHook.append(cartEl);
		renderHook.append(proListEl);
	}
}

class App {
	static cart;

	static init() {
		const shop = new Shop();
		shop.render();
		this.cart = shop.cart;
	}
	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();
