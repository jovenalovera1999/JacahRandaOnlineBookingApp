import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section className="w-full px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <MapPin className="mx-auto mb-4 text-blue-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-600">
                Brgy. San Ramon, Sitio Bat-Os, Pilar, Capiz
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <Phone className="mx-auto mb-4 text-blue-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">+63 9XX XXX XXXX</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <Mail className="mx-auto mb-4 text-blue-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600">info@jacahranda.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
