const Pagination = ({currentPage, onPageChange, itemsPerPage, length }) => {
    //const pagesCount = Math.ceil(length / itemsPerPage);

    
    return (
        <ul className="pagination mb-3" style={{margin: `0 auto`, width: `300px`, display: `flex`, justifyContent: `center`}}>
            <li className="page-item">
                <button className="page-link"
                    style={{border: `1px solid`, borderRight: 'none'}}
                    onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 ? true : false}
                >«</button>
            </li>
            <li className="page-item"><span className="page-link">{currentPage}</span></li>
            <li className="page-item"><span className="page-link"> Sur </span></li>
            <li className="page-item"><span className="page-link">{length === 0 ? 1 : length}</span></li>
            <li className="page-item"> 
                <button className="page-link"
                    style={{border: `1px solid`, borderLeft: `none`}}
                    onClick={() => {
                        onPageChange(currentPage + 1);
                    }} disabled={currentPage === length || length === 0 ? true : false}
                >»</button>
            </li>
        </ul>
    );
}

export default Pagination;