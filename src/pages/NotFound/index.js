import { Link } from 'react-router-dom';
import style from '../../pages/NotFound/style.css'

const NotFound = () => {
    return (
        <>
            <div>
                <h1>404 Error Page </h1>
                <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <div className="link-container">
                    <Link target="_blank" to= '/' className="more-link">Go Home</Link>
                </div>
            </div>

        </>
    )
}

export default NotFound;