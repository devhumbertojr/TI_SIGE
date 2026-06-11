import Link from 'next/link';
import Logo from '../components/Logo';
import WorkersIllustration from '../components/WorkersIllustration';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f6ff] px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <Logo variant="dark" className="text-5xl mb-10 mt-6" />

        <div className="w-full max-w-[300px] mb-10">
          <WorkersIllustration />
        </div>

        <div className="text-center w-full flex flex-col items-center">
          <h1 className="text-[#285ebb] text-xl font-bold mb-2">
            Sua nova solução de organização
          </h1>
          <p className="text-[#285ebb] text-sm font-medium mb-8">
            Comece agora
          </p>

          <Link
            href="/login"
            className="w-full max-w-[280px] bg-[#285ebb] text-white font-medium py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-md text-center"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
