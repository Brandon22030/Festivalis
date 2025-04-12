
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Calendar, MapPin, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Event = {
  id: string;
  title: string;
  event_date: string;
  location: string;
  image_url: string;
  organizer: {
    first_name: string;
    last_name: string;
  };
  category?: string;
  attendees?: number;
  time?: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "All",
    "Festival", 
    "Concert", 
    "Ceremony", 
    "Business", 
    "Sport", 
    "Exposition", 
    "Wedding"
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          title,
          event_date,
          location,
          image_url,
          organizer_id (
            id
          ),
          profiles (
            first_name,
            last_name
          )
        `)
        .order('event_date', { ascending: true });

      if (error) {
        throw error;
      }

      // Transform data to match EventCard props
      const formattedEvents = data.map(event => {
        const formattedDate = new Date(event.event_date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        
        const formattedTime = new Date(event.event_date).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        // For demo purposes, assign random categories and attendees
        const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
        const randomAttendees = Math.floor(Math.random() * 1000) + 50;
        
        // Default image if none provided
        const imageUrl = event.image_url || "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3";

        // Organizer name (using first and last name from profiles)
        const organizerFirstName = event.profiles?.first_name || "Unknown";
        const organizerLastName = event.profiles?.last_name || "Organizer";
        const organizer = `${organizerFirstName} ${organizerLastName}`;

        return {
          id: event.id,
          title: event.title,
          date: formattedDate,
          location: event.location || "Location to be announced",
          imageUrl: imageUrl,
          organizer: organizer,
          category: randomCategory,
          attendees: randomAttendees,
          time: formattedTime
        };
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les événements. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "" || category === "All" || event.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-gradient-to-r from-primary to-accent py-12 text-white">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Découvrez nos événements</h1>
            <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl">
              Explorez les événements culturels, festifs et traditionnels. Trouvez celui qui vous convient et rejoignez la célébration.
            </p>
          </div>
        </section>
        
        {/* Search and filters */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Rechercher un événement ou un lieu..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground hidden md:inline">Catégorie:</span>
              </div>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="hidden md:flex">
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Events grid */}
        <section className="py-12 bg-neutral-light">
          <div className="container-custom">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            ) : filteredEvents.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} onClick={() => navigate(`/event/${event.id}`)} className="cursor-pointer">
                      <EventCard {...event} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="mb-4 text-neutral-dark opacity-50">
                  <Calendar className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun événement trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche ou consultez plus tard pour de nouveaux événements.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setCategory('');
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
