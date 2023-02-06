import { Link } from 'react-router-dom';
import success from '../../pages/Success/success.css'

const Success = () => {
    return (
        <>
            <div className="card">
                <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Bạn đã đặt hàng thành công</h1> 
                <Link to={'/'}>Quay trở lại trang chủ</Link>
            </div>

        </>
    )
}

export default Success;