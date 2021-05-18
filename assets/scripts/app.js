/** @format */

class Product {
	// title = 'DEFAULT';
	// imageUrl;
	// description;
	// price;

	constructor(title, image, desc, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = desc;
		this.price = price;
	}
}

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	constructor(renderHookId, shouldRender = true) {
		this.hookId = renderHookId;
		if (shouldRender) {
			this.render();
		}
	}

	render() {}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
			2,
		)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, curItem) => prevValue + curItem.price,
			0,
		);
		return sum;
	}

	constructor(renderHookId) {
		super(renderHookId, false);
		this.orderProducts = () => {
			console.log('Ordering...');
			console.log(this.items);
		};
		this.render();
	}

	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}

	render() {
		const cartEl = this.createRootElement('section', 'cart');
		cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
		this.totalOutput = cartEl.querySelector('h2');
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId, false);
		this.product = product;
		this.render();
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = this.createRootElement('li', 'product-item');
		prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCart.bind(this));
	}
}

class ProductList extends Component {
	products = [];

	constructor(renderHookId) {
		super(renderHookId);
		this.fetchProducts();
	}

	fetchProducts() {
		this.products = [
			new Product(
				'Nike FC Barcelona',
				'https://images-na.ssl-images-amazon.com/images/I/61q1nR13dGL._AC_UX385_.jpg',
				'Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
				59.99,
			),
			new Product(
				'Nike FC Barcelona',
				'https://images.sportsdirect.com/images/products/37606721_l.jpg',
				'2019/2020 Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
				59.99,
			),

			new Product(
				'Atlanta United FC',
				'https://m.media-amazon.com/images/I/61sgeprssvL._AC_UL1500_.jpg',
				'2019/2020 Soccer Jersey is made with breathable, sweat-wicking fabric to help keep you cool, dry and comfortable',
				49.99,
			),

			new Product(
				'Beckham Pillows',
				'https://images-na.ssl-images-amazon.com/images/I/71oo6xUnQrL._AC_SL1500_.jpg',
				'Beckham Hotel Collection Bed Pillows for Sleeping - Queen Size, Set of 2 - Soft Allergy Friendly, Cooling, Luxury Gel Pillow for Back, Stomach or Side Sleepers',
				39.99,
			),
		];
		this.renderProducts();
	}

	renderProducts() {
		for (const prod of this.products) {
			new ProductItem(prod, 'prod-list');
		}
	}

	render() {
		this.createRootElement('ul', 'product-list', [
			new ElementAttribute('id', 'prod-list'),
		]);
		if (this.products && this.products.length > 0) {
			this.renderProducts();
		}
	}
}

class Shop {
	constructor() {
		this.render();
	}

	render() {
		this.cart = new ShoppingCart('app');
		new ProductList('app');
	}
}

class App {
	static cart;

	static init() {
		const shop = new Shop();
		this.cart = shop.cart;
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();
