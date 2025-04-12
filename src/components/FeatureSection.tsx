
import { Calendar, Users, MapPin, Bell, CreditCard, Clock } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Planification intuitive",
    description: "Créez des événements adaptés au contexte béninois avec options pour cérémonies traditionnelles et festivals culturels."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Gestion d'invités",
    description: "Envoyez des invitations, suivez les réponses et gérez les participants avec respect des protocoles sociaux."
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Localisation simplifiée",
    description: "Indiquez facilement le lieu même sans adresse formelle, avec des points de repère visuels adaptés."
  },
  {
    icon: <Bell className="h-10 w-10 text-primary" />,
    title: "Notifications adaptées",
    description: "Envoyez des notifications par SMS et messages vocaux pour zones avec accès internet limité."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: "Billetterie flexible",
    description: "Options de paiement adaptées au contexte local et génération de QR codes fonctionnant hors-ligne."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Mode hors-ligne",
    description: "Accédez aux fonctionnalités essentielles même sans connexion internet stable."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Une plateforme conçue pour le Bénin</h2>
          <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
            Festivalis simplifie l'organisation d'événements avec des fonctionnalités adaptées aux réalités béninoises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-dark/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
