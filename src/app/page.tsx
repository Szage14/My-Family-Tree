import FamilyTree from '@/components/FamilyTree'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex flex-col flex-1 w-full p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Family Tree
        </h1>
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
          <FamilyTree />
        </div>
      </main>
    </div>
  )
}
