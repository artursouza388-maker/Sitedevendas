import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/produtos" className="text-gray-700 hover:text-purple-600 transition-colors">
              Produtos
            </Link>
            <Link to="/produtos?categoria=aneis" className="text-gray-700 hover:text-purple-600 transition-colors">
              Anéis
            </Link>
            <Link to="/produtos?categoria=colares" className="text-gray-700 hover:text-purple-600 transition-colors">
              Colares
            </Link>
            <Link to="/produtos?categoria=brincos" className="text-gray-700 hover:text-purple-600 transition-colors">
              Brincos
            </Link>
            <Link to="/produtos?categoria=pulseiras" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pulseiras
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-gray-700 hover:text-purple-600">
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleAuthAction}
              className="text-gray-700 hover:text-purple-600 flex items-center space-x-1"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:block text-sm">
                {user ? 'Sair' : 'Entrar'}
              </span>
            </button>

            <Link to="/carrinho" className="relative text-gray-700 hover:text-purple-600">
              <ShoppingBag className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/produtos" 
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Todos os Produtos
              </Link>
              <Link 
                to="/produtos?categoria=aneis" 
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Anéis
              </Link>
              <Link 
                to="/produtos?categoria=colares" 
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Colares
              </Link>
              <Link 
                to="/produtos?categoria=brincos" 
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Brincos
              </Link>
              <Link 
                to="/produtos?categoria=pulseiras" 
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Pulseiras
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
