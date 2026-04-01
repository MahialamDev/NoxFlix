import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Defined locally to keep the component clean
  const genres = ['Action', 'Sci-Fi', 'Horror', 'Thriller', 'Crime', 'Western'];

  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            {/* Logo */}
          <Logo />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The ultimate destination for cinema. Stream the latest thrillers, 
              dark dramas, and cult classics in stunning 4K quality.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-600 hover:text-red-500 transition-colors text-sm font-medium">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 italic uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/movies" className="text-gray-500 hover:text-white transition-colors">All Movies</Link></li>
              <li><Link href="/trending" className="text-gray-500 hover:text-white transition-colors">Trending Now</Link></li>
              <li><Link href="/top-rated" className="text-gray-500 hover:text-white transition-colors">Top Rated</Link></li>
              <li><Link href="/new" className="text-gray-500 hover:text-white transition-colors">New Releases</Link></li>
            </ul>
          </div>

          {/* Genres Section - FIXED NESTING */}
          <div>
            <h4 className="text-white font-bold mb-6 italic uppercase tracking-wider text-sm">Genres</h4>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {genres.map((g) => (
                <li key={g}>
                  <Link 
                    href={`/movies?genre=${g}`} 
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-white font-bold mb-6 italic uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to get notified about new releases.</p>
            <form className="relative" >
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-red-600 text-white px-4 rounded-md text-xs font-black hover:bg-red-700 transition-colors uppercase"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link href="/dmca" className="hover:text-gray-400 transition-colors">DMCA</Link>
          </div>
          <p className="text-gray-600 text-[10px] font-medium">
            © {currentYear} MOVIEHUB CINEMA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;