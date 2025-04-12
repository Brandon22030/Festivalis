
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  organizer: string;
  category: string;
  attendees?: number;
  time?: string;
}

const EventCard = ({ 
  id, 
  title, 
  date, 
  location, 
  imageUrl, 
  organizer, 
  category,
  attendees,
  time
}: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-dark">
            <Calendar size={16} className="text-primary" />
            <span>{date}</span>
            {time && (
              <>
                <Clock size={16} className="text-primary ml-2" />
                <span>{time}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-dark">
            <MapPin size={16} className="text-primary" />
            <span className="truncate">{location}</span>
          </div>
          {attendees && (
            <div className="flex items-center gap-2 text-sm text-neutral-dark">
              <Users size={16} className="text-primary" />
              <span>{attendees} participants</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-dark">Par {organizer}</span>
          <Link 
            to={`/event/${id}`} 
            className="text-primary text-sm font-medium hover:text-primary/80"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
