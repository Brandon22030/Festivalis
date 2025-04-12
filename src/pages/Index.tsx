
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Données d'exemple pour les événements à l'affiche
const featuredEvents = [
  {
    id: "1",
    title: "Festival International de Vodoun",
    date: "10 Jan 2025",
    location: "Ouidah, Place aux enchères",
    imageUrl: "https://images.unsplash.com/photo-1559534808-9a74343dd419?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Ministère de la Culture",
    category: "Festival",
    attendees: 500,
    time: "08:00"
  },
  {
    id: "2",
    title: "Mariage Traditionnel Fon",
    date: "15 Fév 2025",
    location: "Abomey, Palais royal",
    imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    organizer: "Famille Adéchina",
    category: "Mariage",
    attendees: 250,
    time: "10:00"
  },
  {
    id: "3",
    title: "Concert de Gospel - Louange Éternelle",
    date: "20 Mar 2025",
    location: "Cotonou, Stade de l'Amitié",
    imageUrl: "https://images.unsplash.com/photo-1600095178977-8a8c8afa0d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Association des Chorales",
    category: "Concert",
    attendees: 1000,
    time: "18:00"
  },
  {
    id: "4",
    title: "Célébration de la Gaani",
    date: "05 Avr 2025",
    location: "Parakou, Place publique",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Communauté Baatonu",
    category: "Cérémonie",
    attendees: 800,
    time: "09:00"
  }
];

// Données d'exemple pour les événements populaires
const popularEvents = [
  {
    id: "5",
    title: "Forum des Jeunes Entrepreneurs",
    date: "12 Mai 2025",
    location: "Cotonou, Palais des Congrès",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Association StartUp Bénin",
    category: "Business",
    attendees: 350,
    time: "09:00"
  },
  {
    id: "6",
    title: "Festival des Arts Culinaires Béninois",
    date: "18 Juin 2025",
    location: "Porto-Novo, Place Bayol",
    imageUrl: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Association des Chefs Cuisiniers",
    category: "Festival",
    attendees: 450,
    time: "11:00"
  },
  {
    id: "7",
    title: "Tournoi de Football Communautaire",
    date: "22 Juil 2025",
    location: "Bohicon, Stade municipal",
    imageUrl: "https://images.unsplash.com/photo-1559156280-001c8c8e12bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    organizer: "Jeunesse Sportive de Bohicon",
    category: "Sport",
    attendees: 600,
    time: "15:00"
  },
  {
    id: "8",
    title: "Exposition d'Art Contemporain",
    date: "30 Août 2025",
    location: "Cotonou, Fondation Zinsou",
    imageUrl: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    organizer: "Collectif d'Artistes du Bénin",
    category: "Exposition",
    attendees: 200,
    time: "10:00"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main>
        {/* Section Événements à l'affiche */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Événements à l'affiche</h2>
              <Link to="/events" className="text-primary flex items-center hover:underline">
                Voir tous <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
        
        <FeatureSection />
        
        {/* Section Événements populaires */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Événements populaires</h2>
              <Link to="/events" className="text-primary flex items-center hover:underline">
                Voir tous <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Section CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Prêt à créer votre propre événement?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Que ce soit un mariage, un festival culturel ou une cérémonie traditionnelle, 
                Festivalis vous aide à organiser des événements mémorables.
              </p>
              <Link to="/create-event" className="btn-secondary inline-block">
                Créer mon événement
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
