interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  birthYear?: number;
  avatar?: string;
}

const previewMembers: FamilyMember[] = [
  { id: "1", name: "Grandpa John", relation: "Grandfather", birthYear: 1942, avatar: "👴" },
  { id: "2", name: "Grandma Mary", relation: "Grandmother", birthYear: 1945, avatar: "👵" },
  { id: "3", name: "Dad Robert", relation: "Father", birthYear: 1970, avatar: "👨" },
  { id: "4", name: "Mom Susan", relation: "Mother", birthYear: 1972, avatar: "👩" },
  { id: "5", name: "You", relation: "Child", birthYear: 1998, avatar: "🧑" },
];

export default function FamilyTree() {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Family Tree Preview</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A glimpse of your family connections. Explore the full tree to discover your roots and
            build your legacy.
          </p>
        </div>

        {/* Simple generational layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Grandparents row */}
          <div className="flex flex-wrap justify-center gap-6">
            {previewMembers.slice(0, 2).map((member) => (
              <MemberNode key={member.id} member={member} />
            ))}
          </div>

          {/* Connector line */}
          <div className="w-px h-8 bg-emerald-400" />

          {/* Parents row */}
          <div className="flex flex-wrap justify-center gap-6">
            {previewMembers.slice(2, 4).map((member) => (
              <MemberNode key={member.id} member={member} />
            ))}
          </div>

          {/* Connector line */}
          <div className="w-px h-8 bg-emerald-400" />

          {/* Current generation */}
          <div className="flex flex-wrap justify-center gap-6">
            {previewMembers.slice(4).map((member) => (
              <MemberNode key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/tree"
            className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-200"
          >
            View Full Tree →
          </a>
        </div>
      </div>
    </section>
  );
}

function MemberNode({ member }: { member: FamilyMember }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-2xl shadow-sm border border-emerald-100 px-6 py-4 w-40 hover:shadow-md transition-shadow duration-200">
      <span className="text-4xl">{member.avatar}</span>
      <p className="font-semibold text-gray-800 text-sm text-center">{member.name}</p>
      <p className="text-emerald-600 text-xs font-medium">{member.relation}</p>
      {member.birthYear && (
        <p className="text-gray-400 text-xs">b. {member.birthYear}</p>
      )}
    </div>
  );
}
