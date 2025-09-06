import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo className="text-white" size="lg" />
            <p className="text-gray-300 text-sm">
              Joias exclusivas e elegantes para momentos especiais. 
              Qualidade e design únicos para realçar sua beleza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?categoria=aneis" className="text-gray-300 hover:text-white transition-colors">
                  Anéis
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=colares" className="text-gray-300 hover:text-white transition-colors">
                  Colares
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=brincos" className="text-gray-300 hover:text-white transition-colors">
                  Brincos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=pulseiras" className="text-gray-300 hover:text-white transition-colors">
                  Pulseiras
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link to="/politica-troca" className="text-gray-300 hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/entrega" className="text-gray-300 hover:text-white transition-colors">
                  Entrega
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="text-gray-300 hover:text-white transition-colors">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">(11) 9 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">contato@ayvi.com.br</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-gray-300">
                  Rua das Joias, 123<br />
                  São Paulo, SP - 01234-567
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AYVI Joias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
