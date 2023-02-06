import Http from "./Http";

// API lấy sản phẩm gần đây trang Home/index.js
export const getProducts = (config) => {
    return Http.get("/products", config);
}

// API lấy danh muc san pham
export const getCategories = (config) => {
    return Http.get("/categories", config);
}

// Lấy danh sách sản phẩm theo ID danh mục: 
export const getProductsCategories = (id, config) => {
    return Http.get(`/categories/${id}/products`, config);
}

// Lấy thông tin danh mục sản phẩm theo ID: 
export const getCategory = (id, config) => {
    return Http.get(`/categories/${id}`, config);
}

// Lấy chi tiết sản phẩm theo ID: 
export const getDetail = (id, config) => {
    return Http.get(`/products/${id}`, config);
}

// Lấy bình luận theo ID sản phẩm: 
export const getCommentsProduct = (id, config) => {
    return Http.get(`/products/${id}/comments`, config);
}

// Thêm bình luận theo ID sản phẩm method POST: 
export const createCommentProduct = (id, data, config) => {
    return Http.post(`/products/${id}/comments`, data, config);
}

// Đặt hàng
export const order = (data, config) => {
    return Http.post(`/order`, data, config);
}