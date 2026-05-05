import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      
      <h1>Explore Our Menu</h1>

      <div className='explore-menu-list'>
        {menu_list.map((item) => (
          <div 
            key={item.menu_name}
            className='explore-menu-list-item'
            onClick={() => setCategory(item.menu_name)}
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExploreMenu;