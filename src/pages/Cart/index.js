import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getImageProduct } from "../../shared/ultils"
import { UPDATE_CART, DELETE_ITEM_CART } from "../../shared/constants/actionType"
import { order } from "../../services/Api"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const carts = useSelector(({Cart}) => {
        return Cart.items;
    })

    const dispathch = useDispatch();
    const onUpdateInput = (e, id) => {
        const qty = parseInt(e.target.value);
        if(qty <=0) {
            const isConfirm = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
            return isConfirm 
                ? dispathch({
                    type: DELETE_ITEM_CART,
                    payload: {
                        id,
                    }
                })
                : dispathch({
                    type: UPDATE_CART,
                    payload: {
                        id, 
                        qty: 1
                    }
                })
        }
        dispathch({
            type:UPDATE_CART,
            payload: {
                id,
                qty
            }
        });
    }

    const onDeleteInput = (e, id) => {
        dispathch({
            type: DELETE_ITEM_CART,
            payload: {
                id
            }
        })
    }

    // Đặt hàng
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()
    const onChangeInput = (e) => {
        const {name, value} = e.target;
        console.log(inputs);
        return setInputs({...inputs, [name]:value});
    }

    const clickOrder = (e) => {
        e.preventDefault();
        const items = carts.map((item, index) => ({
            prd_id: item._id,
            qty: item.qty
        }))
        return order({
            items,
            ...inputs
        }).then(({data}) => {
            if(data.status === "success") {
                navigate('/success');
            }
        })
    }

    return (
        <>
        <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
                <a className="breadcrumb-item text-dark" href="#">Home</a>
                <a className="breadcrumb-item text-dark" href="#">Shop</a>
                <span className="breadcrumb-item active">Shopping Cart</span>
            </nav>
            </div>
        </div>
        </div>


        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover text-center mb-0">
                    <thead className="thead-dark">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Xóa</th>
                    </tr>
                    </thead>
                    <tbody className="align-middle">
                        {
                            carts?.map((item, index) => 
                                <tr key={index}>
                                    <td className="align-middle"><img src={getImageProduct(item.image)}  style={{width: 50}} /> {item.name}</td>
                                    <td className="align-middle">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                                    <td className="align-middle">
                                    <div className="input-group quantity mx-auto" style={{width: 100}}>
                                        <div className="input-group-btn">
                                            <input type="number" name="quantity" value={item.qty} style={{ display: 'flex', justifyContent: 'center',
                                            color: 'black', alignItems: 'center', width: '90px'}}
                                            onChange={(e) => onUpdateInput(e, item._id)}
                                            />
                                        </div>
                                    </div>
                                    </td>
                                    <td className="align-middle">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.qty*item.price)}</td>
                                    <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" onClick={(e) => onDeleteInput(e, item._id)} /></button></td>
                                </tr>
                            )
                        }
                    
                    </tbody>
                </table>
                </div>
                <div className="col-lg-4">
                <form className="mb-30" >
                    <div className="input-group">
                    <div className="input-group-append">
                       
                    </div>
                    </div>
                </form>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                    <div className="d-flex justify-content-between mb-3">
                        <h6>Thanh toán</h6>
                        <h6>{
                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carts?.reduce((total,item) => total + item.qty*item.price  ,0))  
                          }</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h6 className="font-weight-medium">Phí vận chuyển</h6>
                        <h6 className="font-weight-medium">0.đ</h6>
                    </div>
                    </div>
                    <div className="pt-2">
                    <div className="d-flex justify-content-between mt-2">
                        <h5>Tổng</h5>
                        <h5>{
                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carts?.reduce((total,item) => total + item.qty*item.price  ,0))  
                            }</h5>
                    </div>
                    <button onClick={clickOrder} className="btn btn-block btn-primary font-weight-bold my-3 py-3" style={{fontSize:'25px'}}>Tiến hành thanh toán</button>
                    </div>
                </div>
                </div>
                <div className="container-input">
                    <div className="container-input-1"> 
                        <input onChange={onChangeInput} type='text'placeholder="Họ và tên (bắt buộc)" name="name" value={inputs?.name}/>
                        <input onChange={onChangeInput} type='text'placeholder="Số điện thoại (bắt buộc)" name="phone" value={inputs?.phone}/>
                        <input onChange={onChangeInput} type='email'placeholder="Email (bắt buộc)" name="email" value={inputs?.email}/>
                    </div>

                    <div className="inputAddress-box">
                        <input onChange={onChangeInput} className="inputAddress" type='text'placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" name="address" value={inputs?.address}/>
                    </div>

                </div>
            </div>
        </div>


        </>
    )
}

export default Cart