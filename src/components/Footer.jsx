import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Footer() {
  const position = [41.2779, 69.2185]; 

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 mt-16 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
        
        <div className="space-y-3">
          <h3 className="text-sm font-black text-violet-600 dark:text-violet-400 tracking-wider">E-STORE</h3>
          <p className="text-slate-400 dark:text-slate-500 leading-relaxed max-w-sm">
            Zamonaviy interfeys va eng sifatli premium mahsulotlarni taqdim etuvchi onlayn platforma. Biz bilan xavfsiz va kafolatlangan xaridlardan zavqlaning.
          </p>
          <div className="space-y-2 pt-2 text-slate-500 dark:text-slate-400">
            <p className="flex items-center gap-2"><FiPhone size={14} className="text-violet-500" /> +998 (90) 123-4567</p>
            <p className="flex items-center gap-2"><FiMail size={14} className="text-violet-500" /> support@e-store.uz</p>
            <p className="flex items-center gap-2"><FiClock size={14} className="text-violet-500" /> Har kuni: 09:00 - 21:00</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <FiMapPin className="text-violet-600 dark:text-violet-400" size={16} /> Bizning Manzil
          </h3>
          <p className="text-slate-400 dark:text-slate-500 leading-relaxed">
            Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi, 42-bino.<br />
            <span className="text-[11px] text-violet-500 dark:text-violet-400 font-bold">Mo'ljal: Chilonzor metro bekati</span>
          </p>
        </div>

        <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md z-0 bg-slate-100 dark:bg-slate-950 sm:col-span-2 md:col-span-1">
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span className="font-bold text-xs text-violet-600">E-STORE Do'koni</span> <br /> Shu yerdamiz!
              </Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>

      <div className="border-t border-slate-50 dark:border-slate-800/40 py-4 text-center text-[11px] text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} E-STORE. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}