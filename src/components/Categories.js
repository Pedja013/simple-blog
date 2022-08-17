import React from "react";

const Categories = (props) => {
    const { categories } = props;
    if (!categories || categories.length === 0) return <p>No categories, sorry</p>;
    return (
        <ul className="ps-0">
            {categories.map((category) => {
                return (
                    <li key={category.id} className='list d-inline d-lg-block me-2 me-lg-0'>
                        <span>{category.name}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default Categories;