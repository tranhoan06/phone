import { getImageProduct } from "../ultils";

const ProductItem = ({item}) => {
    return (
        <>
            
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                    <img className="img-fluid w-100" src={getImageProduct(item.image)} alt />
                    <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
                        <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
                        <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
                        <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
                    </div>
                    </div>
                    <div className="text-center py-4">
                    <a className="h6 text-decoration-none text-truncate" href>{item.name}</a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>{item.price}</h5><h6 className="text-muted ml-2"><del>{item.price}</del></h6>
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


        </>
    )
}

export default ProductItem;