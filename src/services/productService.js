const STORAGE_KEY = 'manga_products'; 

export const getStoredProducts = () => { 
    const data = localStorage.getItem(STORAGE_KEY); 
    return data ? JSON.parse(data) : [ 
        { 
            id: 1, 
            codigo: 'MNG-001', 
            nombre: 'One Piece Vol. 1', 
            categoria: 'Shonen', 
            precio: 8990, 
            stock: 12, 
            imagen: '' 
        }, 
        { 
            id: 2, 
            codigo: 'MNG-002', 
            nombre: 'Berserk Vol. 1', 
            categoria: 'Seinen', 
            precio: 12990, 
            stock: 3, 
            imagen: '' 
        }, 
    ]; 
}; 

export const saveProductsToStorage = (products) => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); 
};