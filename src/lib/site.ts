const CDN = "https://hercules-cdn.com";
import science_g from '../assets/science_g3.jpg';
import science_g_2 from '../assets/science_g_2.jpg';

export const site = {
  name: "EGRA International School",
  tagline: "Think Global, Learn Local",
  // External parents dashboard (hosted on another domain).
  parentPortalUrl: "http://localhost:4026/parents/portal/auth/get-started/login",
  logo: `${CDN}/file_6elVfeocWAVM8nY5tGAVklOw`,
  // Placeholder contact details until the school confirms the real ones.
  contact: {
    phone: "+243998233338",
    email: "info@egrainternationalschool.com",
  },
  images: {
    hero: `${CDN}/file_SqBbXdgcSnJkpXbsG15xpaQM`,
    celebration: `${CDN}/file_qjwXF0YiQ4UJEVLP94Rf5kjd`,
    conference: `${CDN}/file_l1myy73eRYPq0Ji55VmTESKk`,
    contact_image:science_g_2,
    uniforms: `${CDN}/file_3wXx0EFP0rTDFsMbRxONbFeY`,
    // Stock photos until the school sends its own.
    sport: "https://images.unsplash.com/photo-1510597026538-da2e86b8588a?auto=format&fit=crop&w=1200&q=80",
    lab: science_g,
    lab1:"https://images.unsplash.com/photo-1758685734030-a31d96462eec?auto=format&fit=crop&w=1200&q=80",
    computers: "https://images.unsplash.com/photo-1778489769184-45868633c527?auto=format&fit=crop&w=1200&q=80",
  },
};
