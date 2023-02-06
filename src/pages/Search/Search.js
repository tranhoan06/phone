import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    // Pagination
    const page = searchParams.get("page") || 1;
    const [pages, setPages] = useState({
        // total: 0, 
        // currentPage: page, 
        limit: 12,
    });

    useEffect(() => {
        getProducts({
            params: {
                name: keyword,
                limit: 12,
                page: page,
            }
        }).then(({data}) => {
            setPages({
                ...pages, ...data.data.pages
            });
            setProducts(data.data.docs);
        })
    }, [keyword, page])

    return (
        <>
        
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to={"/"}>Home</Link>
                    <span className="breadcrumb-item active">Search</span>
                    <span className="breadcrumb-item active">{keyword}</span>
                </nav>
                </div>
            </div>
        </div>

        <div className="container-fluid">
                <div className="row px-xl-5">
                    {/* Shop Sidebar Start */}
                    
                    <h5 style={{marginLeft: '20px'}}>Tìm kiếm với từ khóa:<p style={{color: 'red'}}>{keyword}</p></h5>
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
                
                {
                    products.map((value, index) => 
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1 ">
                    <div className="product-item bg-light mb-4 " >
                        <div className="product-img position-relative overflow-hidden cate " >
                        <img className="img-fluid w-100" src={getImageProduct(value.image)}  />
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-shopping-cart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="far fa-heart" /></a>
                            <a className="btn btn-outline-dark btn-square" ><i className="fa fa-sync-alt" /></a>
                            <Link className="btn btn-outline-dark btn-square" to={`/Detail/${value._id}`}><i className="fa fa-search" /></Link>
                        </div>
                        </div>
                        <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" >{value.name}</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price)}.đ</h5><h6 className="text-muted ml-2"><del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price)}</del></h6>
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
                    <Pagination pages = {pages}/>
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

export default Search;