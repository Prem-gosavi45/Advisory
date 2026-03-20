import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, MapPin, Building2, GraduationCap, Navigation, 
  Phone, Globe, Star, ChevronRight, Layers
} from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon
const icon = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconShadow = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface College {
  id: number;
  name: string;
  type: 'Government' | 'Private';
  category: string;
  address: string;
  rating: number;
  distance: string;
  lat: number;
  lng: number;
  image: string;
}

// Component to update map center
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function CollegesNearby() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.5204, 73.8567]); // Pune coordinates

  const colleges: College[] = [
  // ==========================================
  // 1. UNIVERSITIES (STATE, DEEMED, PRIVATE)
  // ==========================================
  { id: 1, name: 'Savitribai Phule Pune University', type: 'Government', category: 'State University', address: 'Ganeshkhind, Pune', rating: 4.7, distance: '4.5 km', lat: 18.5531, lng: 73.8245, image: 'https://picsum.photos/seed/sppu/100/100' },
  { id: 2, name: 'Bharati Vidyapeeth', type: 'Private', category: 'Deemed University', address: 'LBS Road, Pune', rating: 4.3, distance: '9.2 km', lat: 18.4575, lng: 73.8508, image: 'https://picsum.photos/seed/bharati/100/100' },
  { id: 3, name: 'Deccan College Post-Graduate and Research Institute', type: 'Government', category: 'Deemed University', address: 'Yerawada, Pune', rating: 4.5, distance: '6.0 km', lat: 18.5417, lng: 73.8767, image: 'https://picsum.photos/seed/deccan/100/100' },
  { id: 4, name: 'Defence Institute of Advanced Technology', type: 'Government', category: 'Deemed University', address: 'Girinagar, Pune', rating: 4.6, distance: '14.0 km', lat: 18.4417, lng: 73.7667, image: 'https://picsum.photos/seed/diat/100/100' },
  { id: 5, name: 'Dnyaneshwar Vidyapeeth', type: 'Private', category: 'Deemed University', address: 'Pune', rating: 4.0, distance: '5.0 km', lat: 18.5204, lng: 73.8567, image: 'https://picsum.photos/seed/dnyan/100/100' },
  { id: 6, name: 'Gokhale Institute of Politics and Economics', type: 'Private', category: 'Deemed University', address: 'BMCC Road, Pune', rating: 4.6, distance: '3.5 km', lat: 18.5230, lng: 73.8340, image: 'https://picsum.photos/seed/gokhale/100/100' },
  { id: 7, name: 'Indian Institute of Information Technology (IIIT), Pune', type: 'Government', category: 'Deemed University', address: 'Ambegaon, Pune', rating: 4.4, distance: '11.0 km', lat: 18.4500, lng: 73.8500, image: 'https://picsum.photos/seed/iiit/100/100' },
  { id: 8, name: 'Indian Institute of Science Education and Research (IISER)', type: 'Government', category: 'Deemed University', address: 'Pashan, Pune', rating: 4.8, distance: '7.5 km', lat: 18.5480, lng: 73.8050, image: 'https://picsum.photos/seed/iiser/100/100' },
  { id: 9, name: 'Christ University Pune Lavasa Campus', type: 'Private', category: 'Private University', address: 'Lavasa, Pune', rating: 4.5, distance: '55.0 km', lat: 18.4110, lng: 73.5070, image: 'https://picsum.photos/seed/christ/100/100' },
  { id: 10, name: 'National Institute of Construction Management and Research', type: 'Private', category: 'Deemed University', address: 'Balewadi, Pune', rating: 4.4, distance: '10.2 km', lat: 18.5660, lng: 73.7780, image: 'https://picsum.photos/seed/nicmar/100/100' },
  { id: 11, name: 'National Defence Academy (NDA)', type: 'Government', category: 'Defence', address: 'Khadakwasla, Pune', rating: 4.9, distance: '15.0 km', lat: 18.4328, lng: 73.7431, image: 'https://picsum.photos/seed/nda/100/100' },
  { id: 12, name: 'Tilak Maharashtra University', type: 'Private', category: 'Deemed University', address: 'Gultekdi, Pune', rating: 4.1, distance: '5.5 km', lat: 18.4980, lng: 73.8650, image: 'https://picsum.photos/seed/tmu/100/100' },
  { id: 13, name: 'Spicer Adventist University', type: 'Private', category: 'Private University', address: 'Aundh, Pune', rating: 4.2, distance: '6.8 km', lat: 18.5600, lng: 73.8100, image: 'https://picsum.photos/seed/spicer/100/100' },
  { id: 14, name: 'Symbiosis International University', type: 'Private', category: 'Private University', address: 'Lavale, Pune', rating: 4.6, distance: '14.2 km', lat: 18.5492, lng: 73.9261, image: 'https://picsum.photos/seed/symbiosis/100/100' },
  { id: 15, name: 'Ajeenkya DY Patil University', type: 'Private', category: 'Private University', address: 'Lohegaon, Pune', rating: 4.2, distance: '16.5 km', lat: 18.6180, lng: 73.9180, image: 'https://picsum.photos/seed/adypu/100/100' },
  { id: 16, name: 'Dr. D Y Patil Dnyan Prasad University', type: 'Private', category: 'Private University', address: 'Pimpri, Pune', rating: 4.3, distance: '14.0 km', lat: 18.6210, lng: 73.8150, image: 'https://picsum.photos/seed/dypu/100/100' },
  { id: 17, name: 'Dr. P.A. Inamdar University', type: 'Private', category: 'Private University', address: 'Camp, Pune', rating: 4.2, distance: '3.0 km', lat: 18.5100, lng: 73.8800, image: 'https://picsum.photos/seed/inamdar/100/100' },
  { id: 18, name: 'MIT World Peace University', type: 'Private', category: 'Private University', address: 'Kothrud, Pune', rating: 4.4, distance: '6.5 km', lat: 18.5186, lng: 73.8151, image: 'https://picsum.photos/seed/mitwpu/100/100' },
  { id: 19, name: 'MIT Art, Design and Technology University', type: 'Private', category: 'Private University', address: 'Loni Kalbhor, Pune', rating: 4.5, distance: '22.0 km', lat: 18.4900, lng: 74.0200, image: 'https://picsum.photos/seed/mitadt/100/100' },
  { id: 20, name: 'Symbiosis Skills and Professional University', type: 'Private', category: 'Private University', address: 'Kiwale, Pune', rating: 4.3, distance: '24.0 km', lat: 18.6400, lng: 73.7400, image: 'https://picsum.photos/seed/sspu/100/100' },
  { id: 21, name: 'Vishwakarma University', type: 'Private', category: 'Private University', address: 'Kondhwa, Pune', rating: 4.2, distance: '10.5 km', lat: 18.4550, lng: 73.8850, image: 'https://picsum.photos/seed/vu/100/100' },
  { id: 22, name: 'G H Raisoni International Skill Tech University', type: 'Private', category: 'Private University', address: 'Wagholi, Pune', rating: 4.1, distance: '18.0 km', lat: 18.5800, lng: 73.9800, image: 'https://picsum.photos/seed/raisoni/100/100' },
  { id: 23, name: 'ALARD University Pune', type: 'Private', category: 'Private University', address: 'Hinjewadi, Pune', rating: 4.0, distance: '19.5 km', lat: 18.5900, lng: 73.7200, image: 'https://picsum.photos/seed/alard/100/100' },

  // ==========================================
  // 2. ENGINEERING & TECHNOLOGY
  // ==========================================
  { id: 24, name: 'Indian Institute of Tropical Meteorology', type: 'Government', category: 'Research/Tech', address: 'Pashan, Pune', rating: 4.8, distance: '7.8 km', lat: 18.5400, lng: 73.8050, image: 'https://picsum.photos/seed/iitm/100/100' },
  { id: 25, name: 'College of Agriculture Pune', type: 'Government', category: 'Agriculture', address: 'Shivajinagar, Pune', rating: 4.5, distance: '1.8 km', lat: 18.5306, lng: 73.8490, image: 'https://picsum.photos/seed/agri/100/100' },
  { id: 26, name: 'College of Engineering Pune (COEP)', type: 'Government', category: 'Engineering', address: 'Shivajinagar, Pune', rating: 4.8, distance: '2.5 km', lat: 18.5293, lng: 73.8565, image: 'https://picsum.photos/seed/coep/100/100' },
  { id: 27, name: 'Government College of Eng. & Research, Avasari', type: 'Government', category: 'Engineering', address: 'Avasari Khurd, Pune', rating: 4.1, distance: '45.0 km', lat: 18.9900, lng: 73.9600, image: 'https://picsum.photos/seed/gcoea/100/100' },
  { id: 28, name: 'Government Polytechnic Pune', type: 'Government', category: 'Polytechnic', address: 'Shivajinagar, Pune', rating: 4.4, distance: '2.1 km', lat: 18.5323, lng: 73.8437, image: 'https://picsum.photos/seed/gpp/100/100' },
  { id: 29, name: 'Abeda Inamdar Senior College (AISC)', type: 'Private', category: 'Autonomous', address: 'Camp, Pune', rating: 4.3, distance: '3.2 km', lat: 18.5100, lng: 73.8810, image: 'https://picsum.photos/seed/aisc/100/100' },
  { id: 30, name: 'Maharashtra Academy of Engineering', type: 'Private', category: 'Autonomous', address: 'Alandi, Pune', rating: 4.2, distance: '21.0 km', lat: 18.6750, lng: 73.8900, image: 'https://picsum.photos/seed/mae/100/100' },
  { id: 31, name: 'MKSSS Cummins College of Engineering for Women', type: 'Private', category: 'Autonomous', address: 'Karve Nagar, Pune', rating: 4.6, distance: '7.1 km', lat: 18.4897, lng: 73.8143, image: 'https://picsum.photos/seed/cummins/100/100' },
  { id: 32, name: 'Pimpri Chinchwad College of Engineering (PCCOE)', type: 'Private', category: 'Autonomous', address: 'Nigdi, Pune', rating: 4.6, distance: '18.5 km', lat: 18.6508, lng: 73.7634, image: 'https://picsum.photos/seed/pccoe/100/100' },
  { id: 33, name: 'Vishwakarma Institute of Information Technology (VIIT)', type: 'Private', category: 'Autonomous', address: 'Kondhwa, Pune', rating: 4.4, distance: '11.2 km', lat: 18.4600, lng: 73.8800, image: 'https://picsum.photos/seed/viit/100/100' },
  { id: 34, name: 'Vishwakarma Institute of Technology (VIT)', type: 'Private', category: 'Autonomous', address: 'Bibwewadi, Pune', rating: 4.5, distance: '8.1 km', lat: 18.4700, lng: 73.8600, image: 'https://picsum.photos/seed/vit/100/100' },
  { id: 35, name: 'Sanjeevani Group of Institutes', type: 'Private', category: 'Engineering', address: 'Pune', rating: 4.1, distance: '10.0 km', lat: 18.5200, lng: 73.8500, image: 'https://picsum.photos/seed/sanjeevani/100/100' },
  { id: 36, name: 'AISSMS College of Engineering', type: 'Private', category: 'Engineering', address: 'Kennedy Road, Pune', rating: 4.2, distance: '2.8 km', lat: 18.5300, lng: 73.8600, image: 'https://picsum.photos/seed/aissms/100/100' },
  { id: 37, name: 'Army Institute of Technology (AIT)', type: 'Private', category: 'Engineering', address: 'Dighi Hills, Pune', rating: 4.7, distance: '12.5 km', lat: 18.6068, lng: 73.9131, image: 'https://picsum.photos/seed/ait/100/100' },
  { id: 38, name: 'College of Military Engineering (CME)', type: 'Government', category: 'Engineering', address: 'Dapodi, Pune', rating: 4.8, distance: '8.5 km', lat: 18.5800, lng: 73.8300, image: 'https://picsum.photos/seed/cme/100/100' },
  { id: 39, name: 'Dhole Patil College of Engineering', type: 'Private', category: 'Engineering', address: 'Wagholi, Pune', rating: 4.0, distance: '16.2 km', lat: 18.5700, lng: 73.9700, image: 'https://picsum.photos/seed/dhole/100/100' },
  { id: 40, name: 'International Institute of Information Technology (I2IT)', type: 'Private', category: 'Engineering', address: 'Hinjewadi, Pune', rating: 4.3, distance: '19.0 km', lat: 18.5900, lng: 73.7400, image: 'https://picsum.photos/seed/i2it/100/100' },
  { id: 41, name: 'Pune Institute of Computer Technology (PICT)', type: 'Private', category: 'Engineering', address: 'Dhankawadi, Pune', rating: 4.7, distance: '8.4 km', lat: 18.4604, lng: 73.8580, image: 'https://picsum.photos/seed/pict/100/100' },
  { id: 42, name: 'Trinity Academy of Engineering', type: 'Private', category: 'Engineering', address: 'Kondhwa, Pune', rating: 4.1, distance: '12.0 km', lat: 18.4400, lng: 73.8900, image: 'https://picsum.photos/seed/trinity/100/100' },

  // ==========================================
  // 3. MANAGEMENT & COMMERCE
  // ==========================================
  { id: 43, name: 'PUMBA (Dept of Management Sciences)', type: 'Government', category: 'Management', address: 'SPPU Campus, Pune', rating: 4.5, distance: '4.5 km', lat: 18.5531, lng: 73.8245, image: 'https://picsum.photos/seed/pumba/100/100' },
  { id: 44, name: 'Institute of Management Development and Research', type: 'Private', category: 'Management', address: 'BMCC Road, Pune', rating: 4.4, distance: '3.6 km', lat: 18.5200, lng: 73.8350, image: 'https://picsum.photos/seed/imdr/100/100' },
  { id: 45, name: 'National Institute of Bank Management (NIBM)', type: 'Government', category: 'Management', address: 'Kondhwa, Pune', rating: 4.6, distance: '10.8 km', lat: 18.4636, lng: 73.9038, image: 'https://picsum.photos/seed/nibm/100/100' },
  { id: 46, name: 'National Insurance Academy (NIA)', type: 'Government', category: 'Management', address: 'Balewadi, Pune', rating: 4.5, distance: '10.5 km', lat: 18.5567, lng: 73.7915, image: 'https://picsum.photos/seed/nia/100/100' },
  { id: 47, name: 'Symbiosis Institute of Management Studies', type: 'Private', category: 'Management', address: 'Khadki, Pune', rating: 4.5, distance: '5.0 km', lat: 18.5440, lng: 73.8440, image: 'https://picsum.photos/seed/sims/100/100' },
  { id: 48, name: 'MES Garware College of Commerce', type: 'Private', category: 'Commerce', address: 'Karve Road, Pune', rating: 4.4, distance: '2.5 km', lat: 18.5100, lng: 73.8300, image: 'https://picsum.photos/seed/garware/100/100' },
  { id: 49, name: 'BMCC Pune', type: 'Private', category: 'Commerce', address: 'Shivajinagar, Pune', rating: 4.6, distance: '3.2 km', lat: 18.5240, lng: 73.8350, image: 'https://picsum.photos/seed/bmcc/100/100' },

  // ==========================================
  // 4. MEDICAL
  // ==========================================
  { id: 50, name: 'Armed Forces Medical College (AFMC)', type: 'Government', category: 'Medical', address: 'Wanowrie, Pune', rating: 4.8, distance: '6.2 km', lat: 18.5034, lng: 73.8965, image: 'https://picsum.photos/seed/afmc/100/100' },
  { id: 51, name: 'B. J. Medical College (BJMC)', type: 'Government', category: 'Medical', address: 'Pune Station, Pune', rating: 4.7, distance: '1.2 km', lat: 18.5284, lng: 73.8739, image: 'https://picsum.photos/seed/bjmc/100/100' },
  { id: 52, name: 'Bharati Vidyapeeth Medical College', type: 'Private', category: 'Medical', address: 'Katraj, Pune', rating: 4.4, distance: '9.5 km', lat: 18.4500, lng: 73.8500, image: 'https://picsum.photos/seed/bvmc/100/100' },
  { id: 53, name: 'Smt. Kashibai Navale Medical College', type: 'Private', category: 'Medical', address: 'Narhe, Pune', rating: 4.2, distance: '12.0 km', lat: 18.4400, lng: 73.8200, image: 'https://picsum.photos/seed/sknmc/100/100' },

  // ==========================================
  // 5. ARTS, SCIENCE, LAW & OTHERS
  // ==========================================
  { id: 54, name: 'Fergusson College', type: 'Private', category: 'Arts & Science', address: 'FC Road, Pune', rating: 4.6, distance: '3.1 km', lat: 18.5236, lng: 73.8411, image: 'https://picsum.photos/seed/fergusson/100/100' },
  { id: 55, name: 'ILS Law College', type: 'Private', category: 'Law', address: 'Law College Road, Pune', rating: 4.7, distance: '4.0 km', lat: 18.5218, lng: 73.8300, image: 'https://picsum.photos/seed/ils/100/100' },
  { id: 56, name: 'Symbiosis Law School', type: 'Private', category: 'Law', address: 'Viman Nagar, Pune', rating: 4.6, distance: '8.8 km', lat: 18.5600, lng: 73.9100, image: 'https://picsum.photos/seed/sls/100/100' },
  { id: 57, name: 'Film and Television Institute of India (FTII)', type: 'Government', category: 'Media/Film', address: 'Law College Road, Pune', rating: 4.7, distance: '3.8 km', lat: 18.5140, lng: 73.8320, image: 'https://picsum.photos/seed/ftii/100/100' },
  { id: 58, name: 'Nowrosjee Wadia College', type: 'Private', category: 'Arts & Science', address: 'V.K. Joag Path, Pune', rating: 4.3, distance: '1.5 km', lat: 18.5300, lng: 73.8800, image: 'https://picsum.photos/seed/wadia/100/100' },

  // ==========================================
  // 6. RESEARCH INSTITUTES
  // ==========================================
  { id: 59, name: 'Centre for Development of Advanced Computing (C-DAC)', type: 'Government', category: 'Research', address: 'Pashan Road, Pune', rating: 4.7, distance: '7.8 km', lat: 18.5520, lng: 73.8130, image: 'https://picsum.photos/seed/cdac/100/100' },
  { id: 60, name: 'National Chemical Laboratory (NCL)', type: 'Government', category: 'Research', address: 'Pashan, Pune', rating: 4.8, distance: '7.2 km', lat: 18.5430, lng: 73.8120, image: 'https://picsum.photos/seed/ncl/100/100' },
  { id: 61, name: 'National Institute of Virology (NIV)', type: 'Government', category: 'Research', address: 'Ambedkar Road, Pune', rating: 4.8, distance: '1.5 km', lat: 18.5280, lng: 73.8780, image: 'https://picsum.photos/seed/niv/100/100' },

  // ==========================================
  // 7. SCHOOLS (VARIOUS CITIES)
  // ==========================================
  { id: 62, name: 'Mount Carmel High School', type: 'Private', category: 'School', address: 'Akola', rating: 4.5, distance: '600 km', lat: 20.7002, lng: 77.0082, image: 'https://picsum.photos/seed/akola-s/100/100' },
  { id: 63, name: 'Nath Valley School', type: 'Private', category: 'School', address: 'Aurangabad', rating: 4.7, distance: '235 km', lat: 19.8347, lng: 75.2811, image: 'https://picsum.photos/seed/aurang-s/100/100' },
  { id: 64, name: 'Dhirubhai Ambani International School', type: 'Private', category: 'School', address: 'BKC, Mumbai', rating: 4.9, distance: '155 km', lat: 19.0660, lng: 72.8631, image: 'https://picsum.photos/seed/mumbai-s/100/100' },
  { id: 65, name: 'The Bishop\'s School', type: 'Private', category: 'School', address: 'Camp, Pune', rating: 4.8, distance: '2.8 km', lat: 18.5130, lng: 73.8780, image: 'https://picsum.photos/seed/bishop-s/100/100' },
  { id: 66, name: 'Delhi Public School', type: 'Private', category: 'School', address: 'Mohammadwadi, Pune', rating: 4.6, distance: '10.5 km', lat: 18.4680, lng: 73.9180, image: 'https://picsum.photos/seed/dps-s/100/100' },
  { id: 67, name: 'Army Public School', type: 'Government', category: 'School', address: 'Camp, Pune', rating: 4.6, distance: '3.5 km', lat: 18.5200, lng: 73.8800, image: 'https://picsum.photos/seed/army-s/100/100' },
  { id: 68, name: 'St. Mary\'s School', type: 'Private', category: 'School', address: 'Camp, Pune', rating: 4.7, distance: '3.0 km', lat: 18.5110, lng: 73.8760, image: 'https://picsum.photos/seed/stmary-s/100/100' },
  { id: 69, name: 'Loyola High School', type: 'Private', category: 'School', address: 'Pashan, Pune', rating: 4.7, distance: '6.2 km', lat: 18.5440, lng: 73.8180, image: 'https://picsum.photos/seed/loyola-s/100/100' },
  { id: 70, name: 'Smt. Sulochanadevi Singhania School', type: 'Private', category: 'School', address: 'Thane', rating: 4.9, distance: '140 km', lat: 19.2000, lng: 72.9700, image: 'https://picsum.photos/seed/thane-s/100/100' }
];

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const governmentColleges = filteredColleges.filter(c => c.type === 'Government');
  const privateColleges = filteredColleges.filter(c => c.type === 'Private');

  const handleCollegeClick = (college: College) => {
    setSelectedCollege(college);
    setMapCenter([college.lat, college.lng]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <MapPin size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Live Map</h1>
            <p className="text-xs text-gray-500">Find top-rated institutes near you</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors text-sm">
          <Layers size={16} />
          Map Layers
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Search Location</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g., Pune, Engineering..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {selectedCollege ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-gray-900 text-lg leading-tight">{selectedCollege.name}</h2>
                <button onClick={() => setSelectedCollege(null)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative">
                <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {selectedCollege.category}
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <p>{selectedCollege.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900">{selectedCollege.rating}</span>
                  <span className="text-gray-400">• {selectedCollege.distance} away</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">View Courses</button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <Navigation size={16} /> Navigate
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Select a College</h3>
              <p className="text-gray-500 text-sm">Click on any college card or map marker to see detailed information.</p>
            </div>
          )}

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="text-orange-500" size={20} />
              Government Institutes
            </h2>
            {governmentColleges.length > 0 ? (
              <div className="space-y-3">
                {governmentColleges.map(college => (
                  <div key={college.id} onClick={() => handleCollegeClick(college)} className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${selectedCollege?.id === college.id ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200 hover:bg-gray-50'}`}>
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                      <img src={college.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{college.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{college.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500 text-center py-4">No colleges found.</p>}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={20} />
              Private Colleges
            </h2>
            {privateColleges.length > 0 ? (
              <div className="space-y-3">
                {privateColleges.map(college => (
                  <div key={college.id} onClick={() => handleCollegeClick(college)} className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${selectedCollege?.id === college.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}>
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                      <img src={college.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{college.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{college.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500 text-center py-4">No colleges found.</p>}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-gray-200 font-bold text-xs text-gray-700">Government Institutes</div>
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapUpdater center={mapCenter} />
              {governmentColleges.map(college => (
                <Marker key={college.id} position={[college.lat, college.lng]} eventHandlers={{ click: () => handleCollegeClick(college) }}>
                  <Popup><div className="text-center"><h3 className="font-bold text-sm">{college.name}</h3><p className="text-xs text-gray-500">{college.category}</p></div></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-gray-200 font-bold text-xs text-gray-700">Private Institutes</div>
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapUpdater center={mapCenter} />
              {privateColleges.map(college => (
                <Marker key={college.id} position={[college.lat, college.lng]} eventHandlers={{ click: () => handleCollegeClick(college) }}>
                  <Popup><div className="text-center"><h3 className="font-bold text-sm">{college.name}</h3><p className="text-xs text-gray-500">{college.category}</p></div></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}