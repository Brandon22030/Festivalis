
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Image, Info, Ticket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

interface TicketType {
  name: string;
  price: number;
  currency: string;
}

interface EventFormData {
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  locationName: string;
  address: string;
  city: string;
  reference: string;
  scheduleItems: ScheduleItem[];
  ticketTypes: TicketType[];
  accessibility: boolean;
  transportation: boolean;
  offline: boolean;
  image?: File;
}

const EventForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { time: '', title: '', description: '' }
  ]);
  
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: 'Entrée générale', price: 0, currency: 'FCFA' }
  ]);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    locationName: '',
    address: '',
    city: '',
    reference: '',
    scheduleItems: scheduleItems,
    ticketTypes: ticketTypes,
    accessibility: false,
    transportation: false,
    offline: false
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { time: '', title: '', description: '' }]);
  };
  
  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const newItems = [...scheduleItems];
    newItems[index][field] = value;
    setScheduleItems(newItems);
  };
  
  const removeScheduleItem = (index: number) => {
    const newItems = [...scheduleItems];
    newItems.splice(index, 1);
    setScheduleItems(newItems);
  };
  
  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: 0, currency: 'FCFA' }]);
  };
  
  const updateTicketType = (index: number, field: keyof TicketType, value: string | number) => {
    const newTypes = [...ticketTypes];
    if (field === 'price') {
      newTypes[index][field] = typeof value === 'number' ? value : parseInt(value as string) || 0;
    } else {
      newTypes[index][field as 'name' | 'currency'] = value as string;
    }
    setTicketTypes(newTypes);
  };
  
  const removeTicketType = (index: number) => {
    const newTypes = [...ticketTypes];
    newTypes.splice(index, 1);
    setTicketTypes(newTypes);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [id]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentification requise",
        description: "Vous devez être connecté pour créer un événement.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare event date with time
      const eventDate = formData.date + (formData.startTime ? `T${formData.startTime}:00` : 'T00:00:00');
      const endDate = formData.date + (formData.endTime ? `T${formData.endTime}:00` : '');
      
      // 1. Create the event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          title: formData.title,
          description: formData.description,
          event_date: eventDate,
          end_date: endDate || null,
          location: formData.locationName,
          address: formData.address,
          organizer_id: user.id
        })
        .select()
        .single();
      
      if (eventError) throw eventError;
      
      // 2. Upload image if provided
      let imageUrl = null;
      if (imageFile && eventData) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `event-images/${eventData.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('events')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('events')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
        
        // Update event with image URL
        const { error: updateError } = await supabase
          .from('events')
          .update({ image_url: imageUrl })
          .eq('id', eventData.id);
          
        if (updateError) throw updateError;
      }
      
      // 3. Create tickets for the event
      if (eventData) {
        const ticketsToInsert = ticketTypes.map(ticket => ({
          event_id: eventData.id,
          name: ticket.name,
          price: ticket.price,
          capacity: null
        }));
        
        const { error: ticketsError } = await supabase
          .from('tickets')
          .insert(ticketsToInsert);
          
        if (ticketsError) throw ticketsError;
      }
      
      toast({
        title: "Événement créé",
        description: "Votre événement a été créé avec succès."
      });
      
      // Redirect to the event page
      if (eventData) {
        navigate(`/event/${eventData.id}`);
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'événement.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations de base */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-dark mb-1">
              Titre de l'événement *
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
              placeholder="Ex: Festival culturel de Ouidah"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-neutral-dark mb-1">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={18} />
                <input
                  id="date"
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-dark mb-1">
                Catégorie *
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="festival">Festival</option>
                <option value="ceremonie">Cérémonie traditionnelle</option>
                <option value="mariage">Mariage</option>
                <option value="religieux">Événement religieux</option>
                <option value="concert">Concert</option>
                <option value="sport">Événement sportif</option>
                <option value="business">Business et networking</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-neutral-dark mb-1">
                Heure de début
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={18} />
                <input
                  id="startTime"
                  type="time"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-neutral-dark mb-1">
                Heure de fin
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={18} />
                <input
                  id="endTime"
                  type="time"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-dark mb-1">
              Description *
            </label>
            <textarea
              id="description"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
              placeholder="Décrivez votre événement en détail..."
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      
      {/* Lieu */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Lieu</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="locationName" className="block text-sm font-medium text-neutral-dark mb-1">
              Nom du lieu *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50" size={18} />
              <input
                id="locationName"
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
                placeholder="Ex: Place des Enchères, Ouidah"
                value={formData.locationName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-neutral-dark mb-1">
              Adresse détaillée
            </label>
            <input
              id="address"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Ex: Quartier Zoffoun, à côté de la grande mosquée"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-neutral-dark mb-1">
                Ville *
              </label>
              <input
                id="city"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
                placeholder="Ex: Cotonou"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-neutral-dark mb-1">
                Point de repère
              </label>
              <input
                id="reference"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Ex: En face de l'école primaire"
                value={formData.reference}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex gap-2 text-sm">
            <Info size={16} className="text-primary mt-0.5" />
            <div>
              <p>Soyez le plus précis possible pour que les participants puissent facilement trouver le lieu de l'événement.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Image</h2>
        
        <div className="space-y-4">
          <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${imagePreview ? 'relative' : ''}`}>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Aperçu" className="max-h-64 mx-auto rounded" />
                <button 
                  type="button" 
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image size={48} className="text-gray-400 mb-4" />
                <p className="text-neutral-dark mb-2">Glissez une image ici ou</p>
                <label htmlFor="imageUpload" className="btn-primary cursor-pointer">
                  Parcourir les fichiers
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">JPG ou PNG, 5 MB maximum</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Programme */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Programme</h2>
        
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Élément du programme {index + 1}</h3>
                {scheduleItems.length > 1 && (
                  <button 
                    type="button" 
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removeScheduleItem(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-1">
                    Heure
                  </label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Ex: 14:00 - 16:00"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-dark mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateScheduleItem(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Ex: Danses traditionnelles"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateScheduleItem(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Ex: Performance des meilleurs danseurs du Bénin"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="flex items-center gap-2 text-primary hover:text-primary/80"
            onClick={addScheduleItem}
          >
            <Calendar size={18} />
            <span>Ajouter un élément au programme</span>
          </button>
        </div>
      </div>
      
      {/* Billets */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Billets</h2>
        
        <div className="space-y-4">
          {ticketTypes.map((ticket, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Type de billet {index + 1}</h3>
                {ticketTypes.length > 1 && (
                  <button 
                    type="button" 
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removeTicketType(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-1">
                    Nom du billet
                  </label>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Ex: Entrée générale"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-1">
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => updateTicketType(index, 'price', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    min="0"
                    step="500"
                    placeholder="Ex: 5000"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="flex items-center gap-2 text-primary hover:text-primary/80"
            onClick={addTicketType}
          >
            <Ticket size={18} />
            <span>Ajouter un type de billet</span>
          </button>
        </div>
      </div>
      
      {/* Options supplémentaires */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Options supplémentaires</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              id="accessibility"
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={formData.accessibility}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="accessibility" className="text-sm font-medium text-neutral-dark">
                Accès pour personnes à mobilité réduite
              </label>
              <p className="text-sm text-gray-500">Indiquez si votre lieu est accessible aux personnes à mobilité réduite</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <input
              id="transportation"
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={formData.transportation}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="transportation" className="text-sm font-medium text-neutral-dark">
                Informations de transport
              </label>
              <p className="text-sm text-gray-500">Ajouter des informations sur les options de transport (zémidjans, taxis, etc.)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <input
              id="offline"
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={formData.offline}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="offline" className="text-sm font-medium text-neutral-dark">
                Disponible hors ligne
              </label>
              <p className="text-sm text-gray-500">Permettre aux participants de consulter les détails de l'événement sans connexion internet</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boutons de soumission */}
      <div className="flex justify-end gap-4">
        <button type="button" className="btn-outline">
          Enregistrer comme brouillon
        </button>
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publication en cours...' : 'Publier l\'événement'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
