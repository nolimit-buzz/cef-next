"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Building2, TrendingUp, Handshake, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import { cn } from "../lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  message: string;
};

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const ContactPage = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <ContactStatementSection />
      <ContactBodySection />
    </main>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-[var(--color-background)] flex flex-col lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
      {/* Top Tier: Split Hero */}
      <div className="flex flex-col lg:flex-row w-full lg:flex-1 pt-24 lg:pt-28">
        {/* Left Column: Dark Background */}
        <div className="w-full lg:w-[55%] bg-[var(--color-background)] flex flex-col justify-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 py-12 lg:py-0 relative z-20">
          <div className="mb-8 hidden lg:block">
            <Breadcrumbs />
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full pr-4"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full"
            >
              <span className="text-base text-[var(--color-accent-green)]">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight"
            >
              <span className="text-white">Partnering for</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-white/50">Real Change.</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          <img
            src="https://images.unsplash.com/photo-1497215848520-22c603a113ee?q=80&w=2670&auto=format&fit=crop"
            alt="Contact CEF Office"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom Tier: 3-Column Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 z-20 relative shrink-0">
        {/* Column 1: Sub-headline */}
        <div className="lg:col-span-2 bg-white p-8 lg:py-12 xl:py-14 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 border-t border-r border-gray-200 flex items-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[#0A1224] text-lg leading-relaxed font-light"
          >
            Connect directly with our specialized teams across Nigeria. Our management office in Lagos serves as the central hub for investor relations and national project coordination.
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">Developer Inquiries<br />& Project Funding</span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">Investor Relations<br />& Institutional Capital</span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#50B848] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#50B848]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Handshake className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Media & Partnerships</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">Strategic Synergy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactStatementSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h2 className="text-[32px] md:text-4xl lg:text-[40px] font-medium leading-[1.15] tracking-tight mb-8">
              <span className="text-[#0A1224]">Let&apos;s Connect and</span><br />
              <span className="text-gray-400">Scale Impact.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-10">
              Whether you are an institutional investor exploring our fund, a developer with pipeline projects, or seeking press resources, our team is ready to connect and explore strategic engagements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#form"
                className="bg-[#0A1224] text-white hover:bg-[#0094da] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-max"
              >
                Send a Message <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#locations"
                className="border border-gray-200 text-[#0A1224] hover:bg-gray-50 px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-max"
              >
                Our Offices
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactBodySection = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    department: "Investor Relations",
    message: "",
  });
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmission({ status: "loading", message: "Sending your inquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "We could not send your inquiry right now.");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "Investor Relations",
        message: "",
      });
      setSubmission({
        status: "success",
        message: payload?.message ?? "Thanks for reaching out. We will get back to you shortly.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong while sending your message.";

      setSubmission({
        status: "error",
        message,
      });
    }
  };

  return (
    <section id="form" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Message Us
              </div>
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight">
                Send an Inquiry.
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider text-xs">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider text-xs">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider text-xs">Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider text-xs">Inquiry Type</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-600"
                >
                  <option>Investor Relations</option>
                  <option>Project Funding & Developer Pipeline</option>
                  <option>Media & Press</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider text-xs">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="How can we partner with you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submission.status === "loading"}
                className="w-full bg-[#0A1224] text-white hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {submission.status === "loading" ? "Sending..." : "Submit Inquiry"} <ArrowUpRight className="w-4 h-4" />
              </button>

              <div
                aria-live="polite"
                className={cn(
                  "min-h-6 text-sm font-medium",
                  submission.status === "success" && "text-green-600",
                  submission.status === "error" && "text-red-600",
                  submission.status === "loading" && "text-gray-500",
                )}
              >
                {submission.message}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div id="locations" className="mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Global Network
              </div>
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-8">
                Our Offices.
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                Operating directly from Nigeria&apos;s commercial capital to efficiently manage, evaluate, and fund clean infrastructure nationwide.
              </p>

              {/* Lagos Office */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Lagos Hub
                </h3>
                <address className="not-italic text-gray-600 leading-relaxed pl-7">
                  Plot 1610 Adeola Hopewell street,<br />
                  Victoria Island
                </address>
              </div>

              <div className="space-y-6 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800">
                  Direct Lines
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Card 1 */}
                  <div className="p-6 bg-[#F8FAFC] border border-gray-200/60 rounded-xl hover:border-blue-200/60 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                      <TrendingUp className="w-5 h-5 text-[#0094da]" />
                    </div>
                    <h4 className="font-bold text-[#0A1224] mb-2">Investor Relations</h4>
                    <a href="mailto:investors@cef.ng" className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">investors@cef.ng</a>
                  </div>

                  {/* Contact Card 2 */}
                  <div className="p-6 bg-[#F8FAFC] border border-gray-200/60 rounded-xl hover:border-blue-200/60 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                      <Building2 className="w-5 h-5 text-[#50B848]" />
                    </div>
                    <h4 className="font-bold text-[#0A1224] mb-2">Project Funding</h4>
                    <a href="mailto:projects@cef.ng" className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">projects@cef.ng</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
