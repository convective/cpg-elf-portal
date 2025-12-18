import Link from "next/link";

export default function RepoPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-red-800 text-white py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-yellow-400">CPG</span> | Christmas Present Group
          </h1>
          <p className="text-red-200 mt-1">Custom Gift Wrapping Service</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="festive-border rounded-lg">
          <div className="bg-white rounded-md p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Explore the Code</h2>
            <p className="text-slate-600 mb-8">Scan to visit the GitHub repository</p>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-200">
                <img
                  src="/qr-code.png"
                  alt="QR code to GitHub repository"
                  className="w-64 h-64"
                />
              </div>
            </div>

            {/* Repo URL */}
            <div className="mb-8">
              <p className="text-sm text-slate-500 mb-2">Or visit directly:</p>
              <a
                href="https://github.com/convective/cpg-elf-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-900 font-mono text-lg underline underline-offset-4"
              >
                github.com/convective/cpg-elf-portal
              </a>
            </div>

            {/* Back Link */}
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              Back to Calculator
            </Link>

            {/* Convective Link */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Demo by{" "}
                <a
                  href="https://convective.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 font-semibold"
                >
                  Convective.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-800 text-red-200 py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          CPG is a wholly owned subsidiary of North Pole Industries.
        </div>
      </footer>
    </>
  );
}
