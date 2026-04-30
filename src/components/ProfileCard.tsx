interface ProfileCardProps {
  name: string;
  relation: string;
  birthYear?: number;
  birthPlace?: string;
  avatar?: string;
  bio?: string;
}

export default function ProfileCard({
  name,
  relation,
  birthYear,
  birthPlace,
  avatar = "👤",
  bio,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow duration-200 w-full max-w-xs">
      <div className="text-6xl">{avatar}</div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <span className="inline-block mt-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
          {relation}
        </span>
      </div>
      {(birthYear || birthPlace) && (
        <div className="text-sm text-gray-500 text-center space-y-1">
          {birthYear && <p>🎂 Born {birthYear}</p>}
          {birthPlace && <p>📍 {birthPlace}</p>}
        </div>
      )}
      {bio && <p className="text-sm text-gray-600 text-center leading-relaxed">{bio}</p>}
    </div>
  );
}
