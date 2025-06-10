import Navbar from "@/components/sections/Navbar";
import HeroBanner from "@/components/sections/HeroBanner";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import StickyContactBar from "@/components/sections/StickyContactBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Services Section */}
      <Services />
      
      {/* Gallery Section */}
      <Gallery />
      
      {/* About Section */}
      <About />
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
      
      {/* Sticky Contact Bar (Mobile Only) */}
      <StickyContactBar />
    </main>
  );
}
