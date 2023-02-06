import React, { useEffect, useState } from "react";
import { getProductsCategories, getCategory } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
// import home from '../../../src/pages/Home/home.css'
import cete from '../../../src/pages/Categories/cate.css'
import { ADD_TO_CART } from "../../shared/constants/actionType";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Category = () => {
    const [category, setCategpry] = useState(null);
    const [product, setProduct] = useState([]);
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        // Get Category
        getCategory(id, {}).then(({data}) => {
            // console.log(data.data);
            return setCategpry(data.data);
        })

        // Get Product by Category
        getProductsCategories(id, {}).then(({data}) => {
            // console.log(data);
            return setProduct(data.data.docs)
        })
    }, [id])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = (type, id) => {
        if(product) {
            const addCartProduct = product.find((item) => item.id === id);
            const {_id, name, image, price} = addCartProduct;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id, 
                    name, 
                    image, 
                    price, 
                    qty: 1,
                }
            })
        }
        if(type === 'Mua-ngay') {
            navigate("/Cart")
        }
    } 

    return (
        <>
            <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="#">Home</a>
                    <a className="breadcrumb-item text-dark" href="#">Shop</a>
                    <span className="breadcrumb-item active">{category?.name}</span>
                </nav>
                </div>
            </div>
            </div>

            <div className="container-fluid">
                <div className="row px-xl-5">
                    {/* Shop Sidebar Start */}
                    <div className="col-lg-3 col-md-4">
                    {/* Price Start */}
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                    <div className="bg-light p-4 mb-30">
                        <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" defaultChecked id="price-all" />
                            <label className="custom-control-label" htmlFor="price-all">All Price</label>
                            <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-1" />
                            <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                            <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-2" />
                            <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                            <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-3" />
                            <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                            <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="price-4" />
                            <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                            <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="price-5" />
                            <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                            <span className="badge border font-weight-normal">168</span>
                        </div>
                        </form>
                    </div>
                    {/* Price End */}
                    {/* Color Start */}
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by color</span></h5>
                    <div className="bg-light p-4 mb-30">
                        <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" defaultChecked id="color-all" />
                            <label className="custom-control-label" htmlFor="price-all">All Color</label>
                            <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-1" />
                            <label className="custom-control-label" htmlFor="color-1">Black</label>
                            <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-2" />
                            <label className="custom-control-label" htmlFor="color-2">White</label>
                            <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-3" />
                            <label className="custom-control-label" htmlFor="color-3">Red</label>
                            <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="color-4" />
                            <label className="custom-control-label" htmlFor="color-4">Blue</label>
                            <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="color-5" />
                            <label className="custom-control-label" htmlFor="color-5">Green</label>
                            <span className="badge border font-weight-normal">168</span>
                        </div>
                        </form>
                    </div>
                    {/* Color End */}
                    {/* Size Start */}
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by size</span></h5>
                    <div className="bg-light p-4 mb-30">
                        <form>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" defaultChecked id="size-all" />
                            <label className="custom-control-label" htmlFor="size-all">All Size</label>
                            <span className="badge border font-weight-normal">1000</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-1" />
                            <label className="custom-control-label" htmlFor="size-1">XS</label>
                            <span className="badge border font-weight-normal">150</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-2" />
                            <label className="custom-control-label" htmlFor="size-2">S</label>
                            <span className="badge border font-weight-normal">295</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-3" />
                            <label className="custom-control-label" htmlFor="size-3">M</label>
                            <span className="badge border font-weight-normal">246</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" id="size-4" />
                            <label className="custom-control-label" htmlFor="size-4">L</label>
                            <span className="badge border font-weight-normal">145</span>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" className="custom-control-input" id="size-5" />
                            <label className="custom-control-label" htmlFor="size-5">XL</label>
                            <span className="badge border font-weight-normal">168</span>
                        </div>
                        </form>
                    </div>
                    {/* Size End */}
                    </div>
                    {/* Shop Sidebar End */}
                    {/* Shop Product Start */}
                    <div className="col-lg-9 col-md-8">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div>
                            <button className="btn btn-sm btn-light"><i className="fa fa-th-large" /></button>
                            <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars" /></button>
                            </div>
                            <div className="ml-2">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">Latest</a>
                                <a className="dropdown-item" href="#">Popularity</a>
                                <a className="dropdown-item" href="#">Best Rating</a>
                                </div>
                            </div>
                            <div className="btn-group ml-2">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">10</a>
                                <a className="dropdown-item" href="#">20</a>
                                <a className="dropdown-item" href="#">30</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* Product */}
                        {
                            product.map((value, index) => 
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1 ">
                            <div className="product-item bg-light mb-4 " >
                                <div className="product-img position-relative overflow-hidden cate " >
                                <img className="img-fluid w-100" src={getImageProduct(value.image)}  />
                                <div className="product-action">
                                    <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" onClick={() => addToCart(value._id)} /></a>
                                    <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                                    <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                                    <Link className="btn btn-outline-dark btn-square" to={`/Detail/${value._id}`}><i className="fa fa-search" /></Link>
                                </div>
                                </div>
                                <div className="text-center py-4">
                                <a className="h6 text-decoration-none text-truncate" >{value.name}</a>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price)}</h5><h6 className="text-muted ml-2"><del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price)}</del></h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-1">
                                    <small className="fa fa-star text-primary mr-1" />
                                    <small className="fa fa-star text-primary mr-1" />
                                    <small className="fa fa-star text-primary mr-1" />
                                    <small className="fa fa-star text-primary mr-1" />
                                    <small className="fa fa-star text-primary mr-1" />
                                    <small>(99)</small>
                                </div>
                                </div>
                            </div>
                            </div>
                        )
                        }
                       
                        <div className="col-12">
                        <nav>
                            <ul className="pagination justify-content-center">
                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    </div>
                    {/* Shop Product End */}
                </div>
            </div>
        </>
    )
}

export default Category;