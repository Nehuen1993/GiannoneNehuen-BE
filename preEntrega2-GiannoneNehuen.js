const fs = require('fs');


class ProductManager {
    constructor(productos) {
        this.productos = productos;
    }

async getProducts() {
        try {
            const products = await this.readProducts();
            return products;
        }
        catch (error) {
            throw new error ("getProducts - Error");
        }
   
    }

    async addProduct(nombre, descripcion, precio, img, code, stock) {
        try{
        const productos = await this.readProducts();
        const producto_id = productos.length > 0 ? productos [productos.length -1].id : 0
        const nuevoProducto_id = producto_id + 1
        const producto= {
           id: nuevoProducto_id,
           nombre,
           descripcion,
           precio,
           img,
           code,
           stock
        }
        productos.push(producto);
        await this.writeProducts(producto)
        return nuevoProducto_id
        
    } catch (error) {
        console.error("Error en addProduct:", error);
        throw new Error ("addProduct - Error")
    }
    }
    async getById (producto_id){
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.id === producto_id);
        if(!producto_existe) {
            
            console.log (producto_existe, "getByid - Producto no existe");
            return;
        } else {
            console.log ("getByid - Producto existente");
            return; 
        }
    }
    catch (error) {
        throw new Error ("getById - Error");
    }
    }

    async updateProduct(producto_id, nombre, descripcion, precio, img, code, stock) {
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.id === producto_id);
        if(!producto_existe) {
            console.log ("updateProduct - Producto no existe");
            return;
        } else {
            producto_existe.nombre = nombre;
            producto_existe.descripcion = descripcion;
            producto_existe.precio = precio;
            producto_existe.img = img;
            producto_existe.code = code;
            producto_existe.stock = stock;
            await this.writeProducts(productos)
        }
    }
    catch (error) {
        throw new Error ("updateProduct- Error");
    }
}
async deleteProductById(producto_id) {
    try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.id === producto_id);
        await this.writeProducts(producto_existe)}
    catch (error) {
        throw new Error ("deleteProductById -Error");
    }    
}
async readProducts() {
    try {
        const products = await fs.promises.readFile('this.productos', 'utf8');
        return products ? JSON.parse(productos) : [];
    }
    catch (error) {
        
        return [];
}
}
async writeProducts(productos) {
    try {
        await fs.promises.writeFile('this.productos', JSON.stringify(productos,null, 2));
    }
    catch (error) {
        throw new Error ("writeProducts - Error");
    
}
}
}

const prueba = async () => {
    const productos = new ProductManager("archivo.txt");
    const produ = await productos.addProduct("Producto1", "Descripcion1", 100, "img1", "a1", 10)
    console.log(produ);
    const mostrarProductos = await productos.getProducts();
    console.log (mostrarProductos);
}

prueba();



    // const eliminarProducto = await productos.deleteProductById(1);

    // productManager.addProduct("Producto1", "Descripcion1", 100, "img1", "a1", 10);
    // productManager.addProduct("Producto2", "Descripcion2", 200, "img2", "a2", 20);
    // productManager.addProduct("Producto3", "Descripcion3", 300, "img3", "a3", 30);
    
    // productManager.getById(1);
    // productManager.getById(15);


    // const productos = productManager.getProducts();
    // console.log ("los productos son: ",productos)
