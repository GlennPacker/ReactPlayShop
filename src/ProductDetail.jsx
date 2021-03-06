import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';
import { useState } from 'react';

export default function ProductDetail({addToCart}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState(0);
  const { data: product, loading, error } = useFetch(`products/${ id }`)

  if (loading || !product) return <Spinner />
  if (!product) return <PageNotFound />
  // if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

        <select
            id="size"
            value={sku || 0}
            onChange={ (e) => setSku(e.target.value) }
        >
            { !sku && <option value="0">What Size?</option> }
            {
                product.skus.map(item => (
                    <option
                        key={ item.sku }
                        value={ item.sku }
                    >
                        { item.size }
                    </option>
                ))
            }
        </select>

      <p>
        <button
            disabled={!sku}
            className="btn btn-primary"
            onClick={() => {
                addToCart(id, sku);
                navigate("/cart")
            }}
        >
            Add To Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
