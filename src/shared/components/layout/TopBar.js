import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState(null);
    const onChangeInput = (e) => {
        return setKeywords(e.target.value)
    }

    const onClickSubmit = (e) => {
        e.preventDefault();
        return navigate(`/Search?keyword=${keywords}`)
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row bg-secondary py-1 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                <div className="d-inline-flex align-items-center h-100">
                    <a className="text-body mr-3" >About</a>
                    <a className="text-body mr-3" >Contact</a>
                    <a className="text-body mr-3" >Help</a>
                    <a className="text-body mr-3" >FAQs</a>
                </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">Sign in</button>
                        <button className="dropdown-item" type="button">Sign up</button>
                    </div>
                    </div>
                    <div className="btn-group mx-2">
                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">USD</button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">EUR</button>
                        <button className="dropdown-item" type="button">GBP</button>
                        <button className="dropdown-item" type="button">CAD</button>
                    </div>
                    </div>
                    <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">FR</button>
                        <button className="dropdown-item" type="button">AR</button>
                        <button className="dropdown-item" type="button">RU</button>
                    </div>
                    </div>
                </div>
                <div className="d-inline-flex align-items-center d-block d-lg-none">
                    <a  className="btn px-0 ml-2">
                    <i className="fas fa-heart text-dark" />
                    <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: 2}}>0</span>
                    </a>
                    <a  className="btn px-0 ml-2">
                    <i className="fas fa-shopping-cart text-dark" />
                    <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: 2}}>0</span>
                    </a>
                </div>
                </div>
            </div>
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                <a className="text-decoration-none">
                    <span className="h1 text-uppercase text-primary bg-dark px-2">My</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Phone</span>
                </a>
                </div>
                <div className="col-lg-4 col-6 text-left">
                <form >
                    <div className="input-group">
                    <input onChange={onChangeInput} type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" value={keywords} />
                    <div className="input-group-append" >
                        <span className="input-group-text bg-transparent text-primary" >
                        <button onClick={onClickSubmit} type="submit" className="fa fa-search" />
                        </span>
                    </div>
                    </div>
                </form>
                </div>
                <div className="col-lg-4 col-6 text-right">
                <p className="m-0">Liên hệ tôi</p>
                <h5 className="m-0">0833529833</h5>
                </div>
            </div>
        </div>
        </>
    )
}

export default TopBar;