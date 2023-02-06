 import { Link } from "react-router-dom";
 import { useSelector } from "react-redux";

const NavBar = ({item}) => {
    const totalCart = useSelector(({Cart}) => {
        return Cart.items.reduce((total, item) => total= total + item.qty ,0)
    })

    return (
        <>
        <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
            <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: 65, padding: '0 30px'}}>
                <h6 className="text-dark m-0"><i className="fa fa-bars mr-2" />Danh Mục</h6>
                <i className="fa fa-angle-down text-dark" />
            </a>
            <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{width: 'calc(100% - 30px)', zIndex: 999}}>
                <div className="navbar-nav w-100">
                    {
                        item.map((value, index) => 
                            <Link key={index} to={`/Category/${value._id}`} className="nav-item nav-link">{value.name}</Link>
                        )
                    }
                </div>
            </nav>
            </div>
            <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                <Link to="/" className="text-decoration-none d-block d-lg-none">
                    <span className="h1 text-uppercase text-dark bg-light px-2">My</span>
                    <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Phone</span>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link ">Home</Link>
                    <Link to="/shop" className="nav-item nav-link ">Shop</Link>
                    
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                    <a className="btn px-0">
                    <i className="fas fa-heart text-primary" />
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: 2}}>0</span>
                    </a>
                    <Link to="/Cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary" />
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: 2}}>{totalCart}</span>
                    </Link>
                </div>
                </div>
            </nav>
            </div>
        </div>
        </div>

        </>
    )
}

export default NavBar;