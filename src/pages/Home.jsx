import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { getProducts } from '../utils/db';

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-10 text-center sm:text-left">
    <h2 className="text-3xl font-bold text-gray-100 border-b-2 border-gray-500 inline-block pb-2 mb-4">{title}</h2>
    {subtitle && <p className="text-gray-400 italic">{subtitle}</p>}
  </div>
);

const ProductGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map(product => (
      <Link to={`/product/${product.id}`} key={product.id} className="group block">
        <div className="relative overflow-hidden bg-gray-800 mb-4 rounded shadow-md hover:shadow-xl transition-shadow duration-300">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-[400px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <div>
            <h4 className="text-lg font-bold text-gray-100 group-hover:text-gray-400 transition-colors">{product.name}</h4>
            <p className="text-gray-400 mt-1 font-semibold">₦{product.price.toLocaleString()}</p>
          </div>
          <div className="bg-white text-black px-4 py-2 text-sm font-bold rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            Buy Now
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const TestimonialCard = ({ name, role, content, rating }) => (
  <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-800 to-transparent rounded-bl-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 mr-1 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
        />
      ))}
    </div>
    <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10">"{content}"</p>
    <div className="flex items-center mt-auto border-t border-gray-800 pt-4 relative z-10">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
        {name.charAt(0)}
      </div>
      <div className="ml-3">
        <p className="text-white font-bold tracking-wide text-sm">{name}</p>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-0.5">{role}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const products = getProducts();
  const getCategoryProducts = (category) => products.filter(p => p.category === category);
  const mensLatest = getCategoryProducts('MEN');
  const womensLatest = getCategoryProducts('WOMEN');
  const kidsLatest = getCategoryProducts('KID');


  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Banner Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex items-center">
          <div className="max-w-2xl bg-gray-900/90 p-12 backdrop-blur-md rounded-xl shadow-2xl border-t-4 border-gray-600 transform transition hover:scale-[1.01]">
            <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4 uppercase drop-shadow">We Are DaveKart</h1>
            <p className="text-xl text-gray-300 mb-8 italic font-medium leading-relaxed">Experience premium fashion delivered directly to your doorstep. The latest trends crafted perfectly for you.</p>
            <a href="#men" className="inline-block bg-white shadow-lg border border-transparent py-4 px-10 text-base font-bold text-black hover:bg-gray-200 hover:shadow-xl transition-all uppercase tracking-widest rounded-sm">
              Purchase Now!
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {/* Men's Latest */}
        <section id="men" className="scroll-mt-24">
          <SectionHeading title="Men's Latest" subtitle="Classic fits tailored for the modern gentleman." />
          <ProductGrid items={mensLatest} categoryLink="/category/MEN" />
        </section>

        {/* Women's Latest */}
        <section id="women" className="scroll-mt-24">
          <SectionHeading title="Women's Latest" subtitle="Elegance and comfort combined perfectly." />
          <ProductGrid items={womensLatest} categoryLink="/category/WOMEN" />
        </section>

        {/* Kid's Latest */}
        <section id="kids" className="scroll-mt-24">
          <SectionHeading title="Kid's Latest" subtitle="Stylish everyday wear for the little ones." />
          <ProductGrid items={kidsLatest} categoryLink="/category/KID" />
        </section>

        {/* Customer Reviews / Testimonials */}
        <section className="py-12 border-t border-gray-800">
          <SectionHeading 
            title="What Our Customers Say" 
            subtitle="Don't just take our word for it. Trusted by thousands worldwide." 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <TestimonialCard 
              name="Sarah Jenkins"
              role="Verified Buyer"
              content="The premium feel of the clothes exceeded all my expectations. Fast shipping and the unboxing experience was incredibly luxurious!"
              rating={5}
            />
            <TestimonialCard 
              name="Michael T."
              role="Loyal Customer"
              content="DaveKart has completely elevated my wardrobe. The user interface is so sleek and making purchases through the new cart system is completely frictionless."
              rating={5}
            />
            <TestimonialCard 
              name="Jessica R."
              role="Verified Buyer"
              content="I had a minor issue with sizing, and their support team handled it instantly with a free return. The quality of the denim jacket I bought is top-notch."
              rating={4}
            />
          </div>
        </section>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider mb-2">Stay in the Loop</h3>
              <p className="text-gray-400 text-sm max-w-md">Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration delivered straight to your inbox.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 bg-gray-950 border border-gray-700 text-gray-300 placeholder-gray-500 rounded-l-sm focus:outline-none focus:border-gray-500 text-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-r-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer styled similarly to Hexashop */}
      <footer className="bg-gray-950 text-gray-400 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-white text-2xl font-bold mb-6 tracking-wide drop-shadow">DaveKart</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                16501 Collins Ave, Sunny Isles Beach, FL 33160, USA
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                info@davekart.com
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                010-020-0340
              </li>
            </ul>
            <div className="flex space-x-5 mt-8">
              <span className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer shadow-sm">
                <Facebook className="w-5 h-5" />
              </span>
              <span className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer shadow-sm">
                <Twitter className="w-5 h-5" />
              </span>
              <span className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer shadow-sm">
                <Instagram className="w-5 h-5" />
              </span>
              <span className="bg-gray-900 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer shadow-sm">
                <Youtube className="w-5 h-5" />
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-6 tracking-wide">Shopping & Categories</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/category/MEN" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-gray-500">→</span> Men's Shopping</Link></li>
              <li><Link to="/category/WOMEN" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-gray-500">→</span> Women's Shopping</Link></li>
              <li><Link to="/category/KID" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-gray-500">→</span> Kid's Shopping</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-6 tracking-wide">Useful Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-gray-500">→</span> Homepage</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-gray-500">→</span> About Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-gray-500">→</span> Help / FAQ</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-gray-500">→</span> Contact Us</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-700 text-center text-sm font-medium">
          <p>Copyright © 2026 DaveKart Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
