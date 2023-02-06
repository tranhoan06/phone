import React, { Children, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDetail, getCommentsProduct, createCommentProduct } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import moment from "moment/moment";
import detail from '../../../src/pages/ProductDetail/detail.css'
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/actionType";

const ProductDetail = () => {
    // Bình luận
    const [comments, setComments] = useState([]);

    // Thêm cmt
    const [data, setData] = useState([]);

    // Product
    const [product, setProduct] = useState({});
    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getComments = (id) => {
        getCommentsProduct(id, {}).then(({data}) => {
            return setComments(data.data.docs);
        })
    }

    useEffect(() => {
        // product
        getDetail(id, {}).then(({data}) => {
            return setProduct(data.data); 
        })

        // commnents
        getComments(id);
    }, [id])

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        return setData({
            ...data, [name]: value
        });

    };

    const clickSubmitCmt = (e) => {
        e.preventDefault();
        createCommentProduct(id, data, {}).then(({data}) => {
            if (data.status === 'success') {
                getComments(id);
                return setData({})
            }
        })
    }

    const addToCart = (type) => {
        if(product) {
            const {_id, name, image, price} = product;
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
                    <a className="breadcrumb-item text-dark" >Home</a>
                    <a className="breadcrumb-item text-dark" >Shop</a>
                    <span className="breadcrumb-item active">Shop Detail</span>
                </nav>
                </div>
            </div>
            </div>

            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner bg-light">
                        <div className="carousel-item active">
                            <img className=" h-100" src={getImageProduct(product.image)} style={{width: '80%'}}  />
                        </div>
                        
                        </div>
                        <a className="carousel-control-prev" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark" />
                        </a>
                        <a className="carousel-control-next" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark" />
                        </a>
                    </div>
                    </div>
                    <div className="col-lg-7 h-auto mb-30">
                    <div className="h-100 bg-light p-30">
                        <h3>{product.name}</h3>
                        <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                            <small className="fas fa-star" />
                            <small className="fas fa-star" />
                            <small className="fas fa-star" />
                            <small className="fas fa-star-half-alt" />
                            <small className="far fa-star" />
                        </div>
                        <small className="pt-1">(99 Reviews)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</h3>
                        
                        <div className="d-flex align-items-center mb-4 pt-2">
                        
                        <button className="btn btn-primary px-3" onClick={addToCart}>
                            <i className="fa fa-shopping-cart mr-1" /> Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                        <button className="color " onClick={() => addToCart("Mua-ngay")}>Mua ngay </button>

                        <div className="d-flex pt-2">
                        <strong className="text-dark mr-2">Share on:</strong>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2" >
                            <i className="fab fa-facebook-f" />
                            </a>
                            <a className="text-dark px-2" >
                            <i className="fab fa-twitter" />
                            </a>
                            <a className="text-dark px-2" >
                            <i className="fab fa-linkedin-in" />
                            </a>
                            <a className="text-dark px-2" >
                            <i className="fab fa-pinterest" />
                            </a>
                        </div>
                        </div>

                        <p className="mb-4">{product.status}</p>
                        <p className="mb-4">{product.accessories}</p>
                        <p className="mb-4">{product.promotion}</p>
                        {
                            product?.is_stock 
                                ? <p className="mb-4" style={{color:'green'}}>Còn hàng</p> 
                                : <p className="mb-4" style={{color:'red'}}>Hết hàng</p>
                        }
                    </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                    <div className="bg-light p-30">
                        <div className="nav nav-tabs mb-4">
                        <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1" >Mô tả</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3" >Bình luận</a>
                        </div>
                        <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Mô tả sản phẩm</h4>
                            <p>{product.details}</p>
                        </div>
                        
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                            <div className="col-md-6">
                                <h4 className="mb-4">{comments.length} bình luận cho {product.name}</h4>
                                <div className=" mb-4">
                                    {
                                        comments?.map((comment, index) => {
                                            const m = moment(comment.createdAt);

                                            return (
                                                <div key={index} className="media-body" >
                                                    <h6>{comment.name}<small> - <i>{m.fromNow()}</i></small></h6>
                                                    <div className="text-primary mb-2">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star-half-alt" />
                                                    <i className="far fa-star" />
                                                    </div>
                                                    <p>{comment.content}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="mb-4">Để lại bình luận</h4>
                                <small>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *</small>
                                <div className="d-flex my-3">
                                <p className="mb-0 mr-2">Đánh giá * :</p>
                                <div className="text-primary">
                                    <i className="far fa-star" />
                                    <i className="far fa-star" />
                                    <i className="far fa-star" />
                                    <i className="far fa-star" />
                                    <i className="far fa-star" />
                                </div>
                                </div>
                                <form>
                                <div className="form-group">
                                    <label htmlFor="message">Nội Dung</label>
                                    <textarea id="message" cols={30} rows={5} 
                                    onChange={onChangeInput}
                                    className="form-control" name="content" 
                                    placeholder= "Bình luận"
                                    value={data.content || ""} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Tên hiển thị</label>
                                    <input type="text" 
                                    onChange={onChangeInput}
                                    className="form-control" 
                                    name="name" id="name" 
                                    value={data.name || ""}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Địa chỉ Email</label>
                                    <input type="email" 
                                    onChange={onChangeInput}
                                    className="form-control" 
                                    name="email" id="email"
                                    value={data.email || ""} />
                                </div>
                                <div className="form-group mb-0">
                                    <input onClick={clickSubmitCmt} type="submit" defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
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

            </div>

            {/* <div className="container-fluid py-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">You May Also Like</span></h2>
                <div className="row px-xl-5">
                    <div className="col">
                    <div className="owl-carousel related-carousel">
                        <div className="product-item bg-light">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="img/product-1.jpg"  />
                            <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-search" /></a>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" >Product Name Goes Here</a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
                        <div className="product-item bg-light">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="img/product-2.jpg"  />
                            <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-search" /></a>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" >Product Name Goes Here</a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
                        <div className="product-item bg-light">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="img/product-3.jpg"  />
                            <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-search" /></a>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" >Product Name Goes Here</a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
                        <div className="product-item bg-light">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="img/product-4.jpg"  />
                            <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-search" /></a>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" >Product Name Goes Here</a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
                        <div className="product-item bg-light">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="img/product-5.jpg"  />
                            <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-search" /></a>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" >Product Name Goes Here</a>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ProductDetail;