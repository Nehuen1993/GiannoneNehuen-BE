class ProductManager {
    constructor() {
        this.productos = [];
    }

    getProducts() {
        return this.productos;
    }

    addProduct(nombre, descripcion, precio, img, stock) {
        const producto_id = this.productos.length + 1;
        const producto= {
            nombre,
            descripcion,
            precio,
            img,
            id: producto_id,
            stock
        }
        this.productos.push(producto);

        const producto_existente = this.productos.find((producto) => producto.nombre === nombre);
        if(!producto_existente) {
            console.log ("Producto existente");
     
            return;
        } else {
            
       
            console.log ("Producto Agregado");
            
            return;
        }  
        }
        getById (producto_id){
        const producto_existe = this.productos.find(producto => producto.id === producto_id);
        if(!producto_existe) {
            console.log ("getByid - Producto no existe");
            return;
        } else {
            console.log ("getByid - Producto existente");
            return; 
        }
    }
}
    const productManager = new ProductManager();

    productManager.addProduct("Producto1", "Descripcion1", 100, "img1", 10);
    productManager.addProduct("Producto2", "Descripcion2", 200, "img2", 20);
    productManager.addProduct("Producto3", "Descripcion3", 300, "img3", 30);
    
    productManager.getById(1);
    productManager.getById(15);


    const productos = productManager.getProducts();
    console.log ("los productos son: ",productos);


