import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import Button from "../../components/common/Button";

const phoneNumber = "03197226369";
const whatsappNumber = "923197226369";
const mapsUrl = "https://maps.app.goo.gl/JdQ1rVR2NeFnd8HE6";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-600";

const contactCardClass =
  "group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800";

function Contact() {
  return (
    <main className="overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <MessageCircle size={16} aria-hidden="true" />
              Get In Touch
            </span>

            <h1
              id="contact-heading"
              className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Let&apos;s talk about your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                learning journey.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Have a question about our courses or want to learn more?
              Contact Codexa Academy directly.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40"
              >
                <Phone size={17} aria-hidden="true" />
                Call Academy
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-400/20 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-300 transition duration-200 hover:-translate-y-0.5 hover:bg-green-500/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-400/30"
              >
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section
        aria-labelledby="contact-content-heading"
        className="bg-slate-50 py-16 dark:bg-slate-950 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:gap-10 lg:px-8">
          {/* Information */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Contact Information
            </span>

            <h2
              id="contact-content-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              We are here to help.
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Contact us directly for course information, admissions,
              learning guidance, or any other questions about Codexa Academy.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${phoneNumber}`}
                className={contactCardClass}
                aria-label="Call Codexa Academy at 03197226369"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Phone size={20} aria-hidden="true" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Phone
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    0319 7226369
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className={contactCardClass}
                aria-label="Contact Codexa Academy on WhatsApp"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                  <MessageCircle size={20} aria-hidden="true" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    WhatsApp
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    0319 7226369
                  </p>
                </div>
              </a>

              <div className={contactCardClass}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                  <MapPin size={20} aria-hidden="true" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Address
                  </p>
                  <address className="mt-1 not-italic text-sm leading-6 text-slate-500 dark:text-slate-400">
                    ChaseUp, 4th Floor,
                    <br />
                    Office No. 46,
                    <br />
                    Pace and Pace Plaza,
                    <br />
                    Chungi No. 6, Bosan Road,
                    <br />
                    Multan
                  </address>
                </div>
              </div>

              <div className={contactCardClass}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Clock size={20} aria-hidden="true" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Contact Hours
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Contact us by phone or WhatsApp for current availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Send a Message
                </span>

                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  Have a question?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Send us your details and message. The contact form remains
                  ready for backend integration.
                </p>
              </div>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your message..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  aria-label="Send message to Codexa Academy"
                >
                  Send Message
                  <Send size={17} aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Direct contact CTA */}
      <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900/40 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Need a quick answer?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Prefer a direct conversation?
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Call or message Codexa Academy directly.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
            >
              <Phone size={17} aria-hidden="true" />
              Call Now
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/30"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Location */}
      <section
        aria-labelledby="location-heading"
        className="bg-slate-50 py-16 dark:bg-slate-950 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-slate-100 p-8 text-center dark:bg-slate-900">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12),_transparent_55%)]"
              />

              <div className="relative max-w-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-950/50 dark:text-blue-400">
                  <MapPin size={28} aria-hidden="true" />
                </div>

                <h2
                  id="location-heading"
                  className="mt-5 text-2xl font-bold text-slate-900 dark:text-white"
                >
                  Find Codexa Academy
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  ChaseUp, 4th Floor, Office No. 46, Pace and Pace Plaza,
                  Chungi No. 6, Bosan Road, Multan.
                </p>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                >
                  <MapPin size={17} aria-hidden="true" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;