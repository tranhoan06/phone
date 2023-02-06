import React, { useEffect, useState } from 'react';
import { getProducts, getDetail } from '../../services/Api';
import { getImageProduct } from '../../shared/ultils';
import home from '../../../src/pages/Home/home.css'
import { getProductsCategories } from '../../services/Api';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../../shared/constants/actionType';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Home = () => {
    // Lấy danh sách sản phẩm
    const [newProduct, setNewProduct] = useState([]);
    const [listProduct, setlistProduct] = useState([]);
    const [product, setproduct] = useState([]);
    
    useEffect(() => {
        getProducts({
            params: {
                limit: 8
            }
        }).then(({data}) => {
            return setNewProduct(data.data.docs);
        })

        getProducts({
            params: {
                limit: 8
            }
        }).then(({data}) => {
            return setlistProduct(data.data.docs);
        })
    }, [])

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const addToCart = (id) => {
        if(newProduct) {
            const addedProduct = newProduct.find((product) => product._id === id)
            const {_id, name, image, price} = addedProduct;
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
        // if(type === 'Mua-ngay') {
        //     navigate("/Cart")
        // }
    }   

    return (
        <>
        {/* Slider start */}
        <div className="container-fluid mb-3">
        <div className="row px-xl-5">
            <div className="col-lg-8">
            <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                <ol className="carousel-indicators">
                <li data-target="#header-carousel" data-slide-to={0} className="active" />
                <li data-target="#header-carousel" data-slide-to={1} />
                <li data-target="#header-carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                <div className="carousel-item position-relative active" style={{height: 430}}>
                    <img className="position-absolute w-100 h-100" src="img/banner1.jpeg" style={{objectFit: 'cover'}} />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: 700}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Iphone 14 Pro Max</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">iPhone 14 Pro Max đem đến những trải nghiệm không thể tìm thấy trên mọi thế hệ iPhone trước đó với màu Tím Deep Purple sang trọng, camera 48MP lần đầu xuất hiện, chip A16 Bionic và màn hình “viên thuốc” Dynamic Island linh hoạt, nịnh mắt.</p>
                        <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" >Shop Now</a>
                    </div>
                    </div>
                </div>
                <div className="carousel-item position-relative" style={{height: 430}}>
                    <img className="position-absolute w-100 h-100" src="img/banner2.jpg" style={{objectFit: 'cover'}} />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: 700}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Samsung Galaxy Z Fold4 512GB</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Với Samsung Galaxy Z Fold4, smartphone màn hình gập đã trở nên thân thiện, tiện dụng và bền bỉ hơn rất nhiều. Những cải tiến thiết thực trong từng khía cạnh giúp sản phẩm biến hóa linh hoạt hơn và đem lại những trải nghiệm không thể tìm thấy ở đâu khác.</p>
                        <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" >Shop Now</a>
                    </div>
                    </div>
                </div>
                <div className="carousel-item position-relative" style={{height: 430}}>
                    <img className="position-absolute w-100 h-100" src="img/banner3.jpg" style={{objectFit: 'cover'}} />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: 700}}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Xiaomi 12 Pro (5G)</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Là một trong những dòng smartphone chủ lực của hãng, Xiaomi 12 Pro sở hữu một thiết kế ấn tượng cùng hiệu năng vượt trội mang lại trải nghiệm dùng mượt mà. Bên cạnh đó, máy còn được trang bị hệ thống camera vô cùng chất lượng cho ra những bức ảnh chuyên nghiệp.</p>
                        <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" >Shop Now</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="product-offer mb-30" style={{height: 200}}>
                <img className="img-fluid" src="img/banner4.jpg"  />
                <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a  className="btn btn-primary">Shop Now</a>
                </div>
            </div>
            <div className="product-offer mb-30" style={{height: 200}}>
                <img className="img-fluid" src="img/banner5.jpg"  />
                <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a  className="btn btn-primary">Shop Now</a>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Slider end */}

        {/* Featured start */}
        <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center bg-light mb-4" style={{padding: 30}}>
                <h1 className="fa fa-check text-primary m-0 mr-3" />
                <h5 className="font-weight-semi-bold m-0">Sản phẩm chất lượng</h5>
            </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center bg-light mb-4" style={{padding: 30}}>
                <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
                <h5 className="font-weight-semi-bold m-0">Miễn phí vận chuyển</h5>
            </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center bg-light mb-4" style={{padding: 30}}>
                <h1 className="fas fa-exchange- text-primary m-0 mr-3" />
                <h5 className="font-weight-semi-bold m-0">Hỗ trợ đổi trả trong 14 ngày</h5>
            </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center bg-light mb-4" style={{padding: 30}}>
                <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
                <h5 className="font-weight-semi-bold m-0">Hỗ trợ 24/7</h5>
            </div>
            </div>
        </div>
        </div>
        {/* Featured end */}

        {/* List Product Home Start */}
        <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Danh sách sản phẩm</span></h2>
        <div className="row px-xl-5 pb-3">
            {
                listProduct.map((value, index) => 
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <a className="text-decoration-none" >
                        <div className="cat-item d-flex align-items-center mb-4" style={{cursor:'pointer'}}>
                        <div className="overflow-hidden" style={{width: 100, height: 100, cursor:'pointer'}}>
                            <img className="img-fluid" src={getImageProduct(value.image)}  />
                        </div>
                        <div className="flex-fill pl-3">
                            <h6>{value.name}</h6>
                            <small className="text-body">100 Products</small>
                        </div>
                        </div>
                    </a>
                    </div>
                )
            }
        </div>
        </div>
        {/* Lisr Product Home End */}

            <div className="container-fluid pt-5 pb-3">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Sản phẩm gần đây</span></h2>
            <div className="row px-xl-5">
                {
                    newProduct.map((value, index) => 
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1 ">
                        <div className="product-item bg-light mb-4 ">
                            <div className="product-img position-relative overflow-hidden test "  >
                            <img className="img-fluid w-100" src={getImageProduct(value.image)}  />
                            <div className="product-action">
                                <a className="btn btn-outline-dark btn-square"  ><i className="fa fa-shopping-cart" onClick={() => addToCart(value._id)}  /></a>
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
                
            </div>
        </div>
        </>
    )
}

export default Home;