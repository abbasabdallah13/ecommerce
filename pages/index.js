import React from "react";
import {Products, FooterBanner, HeroBanner} from '../components'
import {client} from '../lib/client';

const Home = ({products, bannerData}) => {
  return <>
    <HeroBanner HeroBanner={bannerData && bannerData[0]}  />
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {
        products?.map(el => (
         <Products key={el._id} product={el} />
         ))
      }
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </>;
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props:{products, bannerData}
  }
}

export default Home;
