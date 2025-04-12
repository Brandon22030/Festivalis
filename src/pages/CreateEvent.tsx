
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventForm from '@/components/EventForm';

const CreateEvent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-neutral-light">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Créer un événement</h1>
            <p className="text-neutral-dark/80">
              Remplissez le formulaire ci-dessous pour créer votre événement. Les champs marqués d'un * sont obligatoires.
            </p>
          </div>
          
          <EventForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
