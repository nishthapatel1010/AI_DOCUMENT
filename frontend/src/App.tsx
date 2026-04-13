import { Layout, FileText, Activity, Settings } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-purple-500/30">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-neutral-800 bg-neutral-950 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">BaseStack</span>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-neutral-800 text-purple-400 font-medium transition-colors">
            <Activity className="w-4 h-4" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors">
            <FileText className="w-4 h-4" />
            Documents
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 p-8">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-neutral-400 mt-1">Here is a clean base layout for your next project.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Developer Account</p>
              <p className="text-xs text-neutral-500">Connected to Postgres</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700"></div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Component Placeholder */}
          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 transition-colors group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">Frontend Ready</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Vite, React, and Tailwind are now configured and ready for your components.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 transition-colors group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">Connected Backend</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              The FastAPI backend is mapped to handle your business logic and data.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 transition-colors group">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">Docker Ecosystem</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              PostgreSQL is running in isolation, providing secure and persistent storage.
            </p>
          </div>
        </section>

        {/* Empty Content State */}
        <div className="mt-12 p-12 rounded-2xl border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
             <FileText className="w-8 h-8 text-neutral-600" />
          </div>
          <h2 className="text-xl font-medium">No Recent Activity</h2>
          <p className="text-neutral-500 max-w-sm mt-2">
            This is where your dashboard content will live. Start by creating a component in <code>src/components</code>.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
