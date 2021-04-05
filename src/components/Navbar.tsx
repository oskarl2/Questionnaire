import React from 'react';
import styled from 'styled-components';

import { IPage } from '../interfaces/interfaces';

import { NavLink } from 'react-router-dom';

type NavbarProps = {
  pages: IPage[];
}

const Navbar: React.FC<NavbarProps> = ({ pages }) => (
  <NavbarWrapper>
    {
      pages.map(page => {
        return (
          <div key={page.route} className="nav-item">
            <NavLink
              exact
              to={page.route}
              className="nav-link"
              activeClassName="active-link"
            >
              <div className="nav-title">
                { page.title }
              </div>
            </NavLink>
          </div>
        );
      })
    }
  </NavbarWrapper>
);

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #24292e;

  .nav-item {
    color: #fff;
    
    &:hover {
      background: #30353a;
    }
    
    .nav-link {
      color: inherit;
      text-decoration: none;
      
      &.active-link {
        .nav-title {
          box-shadow: inset 0px -7px 0px #d3e2df;
        }
      }
    }
    
    .nav-title {
      padding: 25px;
      font-size: 22px;
    }
  }
`;

export default Navbar;
