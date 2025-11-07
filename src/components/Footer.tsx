export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to bottom, #111827, #000000)',
      color: 'white',
      padding: '3rem 0',
      marginTop: '4rem'
    }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://static.wixstatic.com/media/c24a60_2b6231b666214539ae22ebd2dffe7a09~mv2.png"
              alt="My College Finance Logo"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h2 className="text-2xl font-black tracking-wide mb-2">MY COLLEGE FINANCE</h2>
              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                Empowering students with financial education and smart tools for a brighter future.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
            <a
              href="https://www.mycollegefinance.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-brand-amber transition-colors hover:underline"
            >
              Main Website
            </a>
            <span className="text-gray-500" aria-hidden="true">•</span>
            <a
              href="https://www.mycollegefinance.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-brand-amber transition-colors hover:underline"
            >
              Privacy Policy
            </a>
            <span className="text-gray-500" aria-hidden="true">•</span>
            <a
              href="https://www.mycollegefinance.com/terms-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-brand-amber transition-colors hover:underline"
            >
              Terms of Service
            </a>
            <span className="text-gray-500" aria-hidden="true">•</span>
            <a
              href="https://linktr.ee/mycollegefinance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-brand-amber transition-colors hover:underline"
            >
              Social Media
            </a>
          </div>

          {/* Tagline */}
          <p className="text-sm font-medium tracking-widest text-brand-amber">
            EDUCATE • MOTIVATE • ELEVATE
          </p>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} My College Finance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
