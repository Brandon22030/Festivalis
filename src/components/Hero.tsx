
import { Search, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-primary py-16 md:py-24">
      {/* Overlay pour texture/pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center text-white mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Découvrez les meilleurs événements au Bénin
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Festivals culturels, cérémonies traditionnelles, mariages et plus encore. Trouvez et créez des événements qui célèbrent notre riche patrimoine.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={20} />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none"
              />
            </div>
            
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={20} />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none appearance-none bg-white"
              >
                <option value="">Toutes les localités</option>
                <option value="cotonou">Cotonou</option>
                <option value="porto-novo">Porto-Novo</option>
                <option value="parakou">Parakou</option>
                <option value="abomey">Abomey</option>
                <option value="ouidah">Ouidah</option>
              </select>
            </div>
            
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={20} />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none appearance-none bg-white"
              >
                <option value="">Tous les types</option>
                <option value="festival">Festivals</option>
                <option value="mariage">Mariages</option>
                <option value="ceremonie">Cérémonies traditionnelles</option>
                <option value="concert">Concerts</option>
                <option value="religieux">Événements religieux</option>
              </select>
            </div>
            
            <button className="btn-secondary w-full md:w-auto whitespace-nowrap">
              Rechercher
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/create-event" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            <Calendar size={20} />
            Créer votre événement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
