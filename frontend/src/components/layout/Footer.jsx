function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Academy */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">
              Codexa Academy
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Where Skills Become Possibilities. Practical, career-focused
              technology education designed to build real-world digital skills.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold transition hover:bg-blue-600"
            >
              F
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold transition hover:bg-purple-600"
            >
              IG
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold transition hover:bg-blue-600"
            >
              in
            </a>

            <a
              href="https://www.youtube.com/@DBUS-b3w"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold transition hover:bg-red-600"
            >
              YT
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-slate-800 pt-5 text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Codexa Academy. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;