import React, { useContext } from 'react'
import { GlobalState } from '../../../../globalState'

export default function Load() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;
    return (
        <div className="load_more">
          {result < (page * 9) ? (
            ""
          ) : (
            <button onClick={(e) => setPage(page + 1)}>Load More</button>
          )}
        </div>
    );
}
