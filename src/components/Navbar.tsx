import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Users, 
  School, 
  Briefcase, 
  Menu, 
  X,
  Settings,
  Rss,
  ChevronDown
} from 'lucide-react';
import { CaseCategory } from '../types';

interface NavbarProps {
  onNavigate: (category: CaseCategory | null) => void;
  currentCategory: CaseCategory | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Anasayfa', value: null, path: '/' },
    { icon: <User className="w-5 h-5" />, label: 'Bireysel Danışmanlık', value: 'bireysel' as CaseCategory },
    { icon: <Users className="w-5 h-5" />, label: 'Aile Danışmanlığı', value: 'aile' as CaseCategory },
    { icon: <School className="w-5 h-5" />, label: 'Okul Psikolojik Danışmanlığı', value: 'okul' as CaseCategory },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Kariyer Danışmanlığı', value: 'kariyer' as CaseCategory },
  ];

  const handleNavigation = (category: CaseCategory | null, path?: string) => {
    if (path) {
      navigate(path);
    }
    onNavigate(category);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">PDR Portal</Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link 
              to="/"
              className="flex items-center gap-2 px-4 py-4 text-gray-800 font-bold hover:text-blue-600"
            >
              <School className="w-6 h-6" />
              <span>PDR Portal</span>
            </Link>

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.value, item.path)}
                className={`flex items-center px-4 py-4 text-sm font-medium transition-all duration-300
                  ${(item.path ? isActive(item.path) : currentCategory === item.value)
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              to="/rss"
              className={`flex items-center px-4 py-4 text-sm font-medium transition-colors ${
                isActive('/rss') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Rss className="w-5 h-5 mr-2" />
              <span>RSS</span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center px-4 py-4 text-sm font-medium transition-colors ${
                isActive('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              <span>Yönetim</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-2 pb-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.value, item.path)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                  ${(item.path ? isActive(item.path) : currentCategory === item.value)
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <Link
              to="/rss"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/rss') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Rss className="w-5 h-5 mr-2" />
              <span>RSS</span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              <span>Yönetim</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};