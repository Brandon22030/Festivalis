
import { Calendar, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-secondary" />
              <span className="text-xl font-bold">Festivalis</span>
            </div>
            <p className="text-gray-300 mb-4">
              La plateforme d'événements communautaires adaptée au contexte béninois.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">Événements</Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-300 hover:text-white transition-colors">Créer un événement</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Connexion</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Inscription</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=festival" className="text-gray-300 hover:text-white transition-colors">Festivals</Link>
              </li>
              <li>
                <Link to="/events?category=ceremonies" className="text-gray-300 hover:text-white transition-colors">Cérémonies traditionnelles</Link>
              </li>
              <li>
                <Link to="/events?category=mariage" className="text-gray-300 hover:text-white transition-colors">Mariages</Link>
              </li>
              <li>
                <Link to="/events?category=religieux" className="text-gray-300 hover:text-white transition-colors">Événements religieux</Link>
              </li>
              <li>
                <Link to="/events?category=concert" className="text-gray-300 hover:text-white transition-colors">Concerts</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-secondary" />
                <span className="text-gray-300">Cotonou, Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary" />
                <a href="mailto:contact@festivalis.bj" className="text-gray-300 hover:text-white transition-colors">
                  contact@festivalis.bj
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary" />
                <a href="tel:+22900000000" className="text-gray-300 hover:text-white transition-colors">
                  +229 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Festivalis. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
