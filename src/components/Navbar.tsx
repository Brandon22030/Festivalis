
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, User, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Festivalis</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-neutral-dark hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/events" className="text-neutral-dark hover:text-primary transition-colors">
              Événements
            </Link>
            <Link to="/create-event" className="text-neutral-dark hover:text-primary transition-colors">
              Créer un événement
            </Link>
          </div>

          {/* Boutons de connexion/inscription pour Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="btn-outline">
              Connexion
            </Link>
            <Link to="/register" className="btn-primary">
              Inscription
            </Link>
          </div>

          {/* Menu Burger pour Mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-neutral-dark"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-neutral-dark hover:text-primary px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/events" 
                className="text-neutral-dark hover:text-primary px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Événements
              </Link>
              <Link 
                to="/create-event" 
                className="text-neutral-dark hover:text-primary px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Créer un événement
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="btn-outline w-full flex justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary w-full flex justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
