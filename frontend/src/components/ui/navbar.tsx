// src/Navbar.js
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-2" />
        <span className="text-white text-xl font-semibold">DNAlytics</span>
      </div>
      {/* <div className="space-x-4">
        <a href="#home" className="text-gray-300 hover:text-white">Home</a>
        <a href="#about" className="text-gray-300 hover:text-white">About</a>
        <a href="#services" className="text-gray-300 hover:text-white">Services</a>
        <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
      </div> */}
    </nav>
  );
};

export default Navbar;
