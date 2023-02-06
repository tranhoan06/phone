import { useLocation, useSearchParams, Link } from "react-router-dom";

const Pagination = ({pages}) => {
    const {total, currentPage, next, prev, hasNext, hasPrev, limit} = pages;
    const [searchParams, setSearchParams] = useSearchParams();
    const {pathname, search} = useLocation();
  
    const formatUrl = (page) => {
        return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
    }
    const totalPages = Math.ceil(total / limit);

    const renderPagesHTML = (delta=2) => {
        const pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for(let i=1; i<=totalPages; i++) {
            if(
                i === 1 || 
                i === totalPages || 
                i === currentPage ||
                (i>= left && i<= right)
            ){
                pagesHtml.push(i);
            }
        }
        return pagesHtml;
    }

    return (
        <>
            <ul className="pagination justify-content-center">
                {
                    hasPrev
                        ? <li className="page-item disabled"><Link className="page-link" to={formatUrl(prev)}>Previous</Link></li>
                        : null
                }

                {
                    renderPagesHTML().map((pageVal, index) =>
                        <li key={index} className={`page-item ${pageVal === currentPage && "active"}`}><Link className="page-link" to={formatUrl(pageVal)}>{pageVal}</Link></li>
                    )
                }
                
                {
                    hasNext
                        ? <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Next</Link></li>
                        : null
                }
            </ul>
        </>
    )
}

export default Pagination;