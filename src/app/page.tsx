import Navbar from "@/components/Navbar";
import FamilyTree from "@/components/FamilyTree";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-7xl mb-6">🌳</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Discover Your <span className="text-emerald-600">Family Story</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Build, explore, and share your family tree. Connect generations, preserve memories, and
            celebrate the people who shaped who you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tree"
              className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-200"
            >
              Explore the Tree
            </a>
            <a
              href="/members"
              className="border border-emerald-600 text-emerald-600 font-semibold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors duration-200"
            >
              View Family Members
            </a>
          </div>
        </div>
      </section>

      {/* Family Tree Preview Section */}
      <FamilyTree />

      {/* Featured Members Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Members</h2>
            <p className="text-gray-500">Meet some of the people who make this family special.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <ProfileCard
              name="Grandpa John"
              relation="Grandfather"
              birthYear={1942}
              birthPlace="Dublin, Ireland"
              avatar="👴"
              bio="A retired carpenter who loved storytelling and Sunday roasts."
            />
            <ProfileCard
              name="Grandma Mary"
              relation="Grandmother"
              birthYear={1945}
              birthPlace="Cork, Ireland"
              avatar="👵"
              bio="Avid gardener and the best baker in three counties."
            />
            <ProfileCard
              name="Dad Robert"
              relation="Father"
              birthYear={1970}
              birthPlace="Galway, Ireland"
              avatar="👨"
              bio="Software engineer and weekend cyclist."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl mb-2">🌳</p>
          <p className="font-semibold text-white text-lg mb-1">My Family Tree</p>
          <p className="text-sm mb-6">Preserving memories, connecting generations.</p>
          <div className="flex justify-center gap-8 text-sm mb-6">
            <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="/tree" className="hover:text-emerald-400 transition-colors">Tree View</a>
            <a href="/members" className="hover:text-emerald-400 transition-colors">Family Members</a>
            <a href="/about" className="hover:text-emerald-400 transition-colors">About</a>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} My Family Tree. Built with ❤️ and Next.js.
          </p>
        </div>
      </footer>
    </>
  );
}
