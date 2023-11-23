import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import { Wrapper } from './Filters';

export const Filters = () => {
    const {
        filters: {
            text,
            category,
            company,
            color,
            min_price,
            max_price,
            price,
            shipping,
        },
        updateFilters,
        clearFilters,
        all_products,
    } = useFilterContext();
    const categories = getUniqueValues(all_products, 'category');
    const companies = getUniqueValues(all_products, 'company');
    const colors = getUniqueValues(all_products, 'colors');
    return (
        <Wrapper>
            <div className="content">
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* search input */}
                    <div className="form-control">
                        <input
                            type="text"
                            name="text"
                            placeholder="search"
                            className="search-input"
                            value={text}
                            onChange={updateFilters}
                        />
                    </div>
                    {/* end search input */}
                    {/* begin category */}
                    <div className="form-control">
                        <h5>Category</h5>
                        <div>
                            {categories.map((c, index) => (
                                <button
                                    key={index}
                                    onClick={updateFilters}
                                    type="button"
                                    name="category"
                                    className={`${
                                        category === c.toLowerCase()
                                            ? 'active'
                                            : null
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* end category */}
                    {/* companies */}
                    <div className="form-control">
                        <h5>Company</h5>
                        <select
                            name="company"
                            value="company"
                            onChange={updateFilters}
                            className="company"
                        >
                            {companies.map((c, index) => {
                                return (
                                    <option key={index} value={c}>
                                        {c}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* end companies */}
                    {/* colors */}
                    <div className="form-control">
                        <h5> colors </h5>
                        <div className="colors">
                            {colors.map((c, index) => {
                                if (c === 'all') {
                                    return (
                                        <button
                                            name="color"
                                            onClick={updateFilters}
                                            data-color="all"
                                            className={`${
                                                color === 'all'
                                                    ? 'all-btn active'
                                                    : 'all-btn'
                                            }`}
                                            key={index}
                                        >
                                            All
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        key={index}
                                        name="color"
                                        style={{ background: c }}
                                        className={`${
                                            color === c
                                                ? 'color-btn active'
                                                : 'color-btn'
                                        }`}
                                        data-color={c}
                                        onClick={updateFilters}
                                    >
                                        {color === c ? <FaCheck /> : null}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* end colors */}
                    {/* price */}
                    <div className="form-control">
                        <h5> price</h5>
                        <p className="price"> {formatPrice(price)}</p>
                        <input
                            type="range"
                            name="price"
                            onChange={updateFilters}
                            min={min_price}
                            max={max_price}
                        />
                    </div>
                    {/* end price */}
                </form>
            </div>
        </Wrapper>
    );
};
