
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Heart, Ticket, Info, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Données d'exemple pour un événement
const eventExample = {
  id: "1",
  title: "Festival International de Vodoun",
  date: "10 Jan 2025",
  time: "08:00 - 22:00",
  location: "Ouidah, Place aux enchères",
  fullAddress: "Place des Enchères, Quartier Zoffoun, Ouidah, Bénin",
  imageUrl: "https://images.unsplash.com/photo-1559534808-9a74343dd419?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1537365587684-f490dff69498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  organizer: "Ministère de la Culture",
  category: "Festival",
  description: "Le Festival International de Vodoun est un événement culturel majeur qui célèbre les traditions vodoun du Bénin. C'est une occasion unique de découvrir les rituels, les danses et les cérémonies traditionnelles qui font partie intégrante du patrimoine béninois.\n\nPendant toute une journée, des troupes venues de tout le pays se produiront sur la place historique des enchères à Ouidah, lieu symbolique chargé d'histoire. Des expositions d'art, des stands de nourriture traditionnelle et des démonstrations artisanales compléteront ce programme riche en découvertes culturelles.",
  attendees: 500,
  ticketTypes: [
    {
      id: "ticket-1",
      name: "Entrée générale",
      price: 5000,
      currency: "FCFA",
      available: true
    },
    {
      id: "ticket-2",
      name: "Pass VIP",
      price: 15000,
      currency: "FCFA",
      available: true
    },
    {
      id: "ticket-3",
      name: "Pass Famille (5 personnes)",
      price: 20000,
      currency: "FCFA",
      available: true
    }
  ],
  schedule: [
    {
      time: "08:00 - 09:30",
      title: "Cérémonie d'ouverture",
      description: "Discours officiels et rituel d'ouverture traditionnel"
    },
    {
      time: "10:00 - 12:00",
      title: "Défilé des troupes vodoun",
      description: "Présentation des différentes communautés vodoun du Bénin"
    },
    {
      time: "12:30 - 14:00",
      title: "Pause déjeuner",
      description: "Dégustation de spécialités culinaires locales"
    },
    {
      time: "14:30 - 16:30",
      title: "Danses rituelles",
      description: "Performances par les meilleurs danseurs traditionnels"
    },
    {
      time: "17:00 - 19:00",
      title: "Conférence sur l'histoire du vodoun",
      description: "Intervention d'experts et de chefs religieux"
    },
    {
      time: "19:30 - 22:00",
      title: "Concert et fête de clôture",
      description: "Musique et festivités finales"
    }
  ]
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  
  // Dans une véritable application, nous récupérerions les détails de l'événement en fonction de l'ID
  // Ici, nous utilisons simplement les données d'exemple
  const event = eventExample;
  
  const handleQuantityChange = (ticketId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      setTicketQuantities({
        ...ticketQuantities,
        [ticketId]: newQuantity
      });
    }
  };
  
  const getTotalAmount = () => {
    return event.ticketTypes.reduce((total, ticket) => {
      const quantity = ticketQuantities[ticket.id] || 0;
      return total + (ticket.price * quantity);
    }, 0);
  };
  
  const handleReservation = () => {
    console.log('Réservation de billets:', ticketQuantities);
    // Ici nous implémenterons la logique de réservation
    alert('Fonctionnalité de réservation à implémenter avec Supabase');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img 
            src={event.coverImageUrl || event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-secondary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-secondary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-secondary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              {/* Description de l'événement */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">À propos de cet événement</h2>
                <div className="prose max-w-none">
                  {event.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                    <Heart size={18} />
                    <span>Ajouter aux favoris</span>
                  </button>
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                    <Share2 size={18} />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
              
              {/* Programme */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Programme</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 py-2">
                      <div className="font-semibold text-primary">{item.time}</div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-neutral-dark/80">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Lieu */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Lieu</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">{event.location}</div>
                    <div className="text-sm text-neutral-dark/80">{event.fullAddress}</div>
                  </div>
                </div>
                
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {/* Ici, nous afficherions idéalement une carte OpenStreetMap */}
                  <div className="flex items-center justify-center h-full text-neutral-dark">
                    Carte OpenStreetMap sera intégrée ici
                  </div>
                </div>
              </div>
              
              {/* Organisateur */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Organisateur</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    {event.organizer.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{event.organizer}</div>
                    <div className="text-sm text-neutral-dark/80">Organisateur d'événements</div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-primary text-sm hover:underline">
                    Voir le profil de l'organisateur
                  </button>
                </div>
              </div>
            </div>
            
            {/* Barre latérale */}
            <div className="lg:col-span-1">
              {/* Carte de réservation */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Ticket size={20} />
                  Billets
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Users size={16} className="text-primary" />
                    <span>{event.attendees} participants</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {event.ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{ticket.name}</div>
                          <div className="text-lg font-semibold">{ticket.price.toLocaleString()} {ticket.currency}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(ticket.id, (ticketQuantities[ticket.id] || 0) - 1)}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{ticketQuantities[ticket.id] || 0}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(ticket.id, (ticketQuantities[ticket.id] || 0) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getTotalAmount() > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-semibold mb-2">
                      <span>Total</span>
                      <span>{getTotalAmount().toLocaleString()} FCFA</span>
                    </div>
                  </div>
                )}
                
                <button 
                  className="btn-primary w-full mb-4"
                  onClick={handleReservation}
                  disabled={getTotalAmount() === 0}
                >
                  Réserver
                </button>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex gap-2 text-sm">
                  <Info size={16} className="text-primary mt-0.5" />
                  <div>
                    <p>Paiement sécurisé disponible via Mobile Money (MTN MoMo, Moov Money) ou en espèces à l'entrée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
