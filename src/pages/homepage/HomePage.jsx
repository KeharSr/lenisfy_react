


// import React, { useEffect, useState } from "react";
// import Navbar from '../../components/navbar/Navbar';
// import Hero from '../../components/Hero/Hero';
// import Products from '../../components/Products/Products';
// import { getAllProductsApi } from "../../apis/Api";

// const HomePage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getAllProductsApi()
//             .then((res) => {
//                 if (res.status === 201) {
//                     setProducts(res.data.products);
//                 }
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <Navbar />
//             <Hero />
//             <h2>Available Products</h2>
//             <div className="row row-cols-1 row-cols-md-4 g-4">
//                 {products.map((singleProduct) => (
//                     <div className="col" key={singleProduct._id}>
//                         <Products productInformation={singleProduct} color={'red'} />
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default HomePage;


import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Products from '../../components/Products/Products';
import { getAllProductsApi } from "../../apis/Api";
import './HomePage.css';
import Banner from "../../components/Banner/Banner";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProductsApi()
            .then((res) => {
                if (res.status === 201) {
                    setProducts(res.data.products);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Hero />
            <div className="container">
                <h2 className="available-products">Available Products</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {products.map((singleProduct) => (
                        <div className="col" key={singleProduct._id}>
                            <Products productInformation={singleProduct} color={'red'} />
                        </div>
                    ))}
                </div>
            </div>
            <Banner/>
        </>
    );
};

export default HomePage;
