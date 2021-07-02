import React, { useContext } from 'react'
import { GlobalState } from '../../../../globalState';
import './Load.css'

export default function Load() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;
    return (
        <div className="load-more">
          {result < (page * 8) ? (
            ""
          ) : (
            <button onClick={(e) => setPage(page + 1)}>Load More</button>
          )}
        </div>
    );
}
