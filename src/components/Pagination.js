import React from "react";

const Pagination = ({accommodationsPerPage, totalAccommodations, paginate}) => {
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(totalAccommodations/accommodationsPerPage); i++){
        pageNumbers.push(i);
    }
    return ( 
        <nav style={{backgroundColor:'red'}}>
            <ul className="pagination">
                {pageNumbers.map((number)=>{
                    <li key={number} className="page-item">
                        <a href="" onClick={()=>paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                })}
            </ul>
        </nav>
     );
}
 
export default Pagination;