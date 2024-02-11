import fs from "fs";

class Product {
    constructor(
        code,
        title,
        description,
        price,
        thumbnail,
        stock
    ) {
        if (!(code && title && description && price && thumbnail && stock)) {
            throw new Error(
                "Los parámetros del constructor de Product son obligatorios."
            );
        }

        this.code = code;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }

    addId(id) {
        const idProduct = {
            id, // Equal to: id: id
            code: this.code,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            stock: this.stock,
        };
        return idProduct;
    }
}

class ProductManager {
    constructor(path, products = []) {
        this.path = path;
        this.products = products;
    }

    static codeBase = 0;

    generateId() {
        let maxId = 0;

        const ids = this.products.map((product) => product.id);

        if (ids.length !== 0) maxId = Math.max(...ids);

        return maxId;
    }

    async readProductsFromFileAsyncPromises() {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
            ProductManager.codeBase = this.generateId();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error al cargar los productos desde el archivo: ${error.message}`
                );
            } else {
                throw error;
            }
        }
    }

    async writeProductsIntoFileAsyncPromises() {
        try {
            const productsJson = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, productsJson, "utf8");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error al guardar productos en el archivo: ${error.message}`
                );
            } else {
                throw error;
            }
        }
    }

    async addProduct(
        code,
        title,
        description,
        price,
        thumbnail,
        stock
    ) {
        // Check for repeated code
        if (this.products.some((element) => code === element.code)) {
            throw new Error(
                "El código del producto que está intentando agregar ya existe. Utilice otro código."
            );
        }

        // Read data from file
        await this.readProductsFromFileAsyncPromises();

        // Create new product
        const product = new Product(
            code,
            title,
            description,
            price,
            thumbnail,
            stock
        );

        // Add an id to product and update products array
        this.products.push(product.addId(++ProductManager.codeBase));

        // Save products array into file
        await this.writeProductsIntoFileAsyncPromises();
    }

    async getProducts() {
        // Load produts from file
        await this.readProductsFromFileAsyncPromises();
        return this.products;
    }

    async getProductById(id) {
        // Load product from file
        await this.readProductsFromFileAsyncPromises();
        const idProduct = this.products.find((product) => product.id === id);
        return idProduct;
    }

    async updateProduct(id, field, value) {
        // Load products from file
        await this.readProductsFromFileAsyncPromises();

        let existProduct = false;

        const productsUpdated = this.products.map((product) => {
            if (product.id === id) {
                if (field in product) {
                    product[field] = value;
                    existProduct = true;
                } else {
                    throw new Error(`Los productos no cuentan con el campo ${field}.`);
                }
            }
            return product;
        });

        if (!existProduct) {
            throw new Error(`El producto con id igual a ${id} no fue encontrado.`);
        }

        this.products = productsUpdated;

        // Save products into file
        await this.writeProductsIntoFileAsyncPromises();
    }

    async deleteProduct(id) {
        // Load products from file
        await this.readProductsFromFileAsyncPromises();

        const productsUpdated = [];
        let existProduct = false;

        this.products.forEach((product) => {
            if (product.id !== id) {
                productsUpdated.push(product);
            } else {
                existProduct = true;
            }
        });

        if (!existProduct) {
            throw new Error(`El producto con id igual a ${id} no fue encontrado.`);
        }

        this.products = productsUpdated;

        // Save products into file
        await this.writeProductsIntoFileAsyncPromises();
    }
}

export default ProductManager;
