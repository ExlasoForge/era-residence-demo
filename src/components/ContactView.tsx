import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Check, Send, ShieldCheck } from 'lucide-react';
import { APARTMENTS } from '../data/apartments';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f3ec] text-[#17233b] pt-28 pb-20">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-[#17233b]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#340c24] font-semibold">
              <span>Sales Office & Showroom</span>
              <span>•</span>
              <span>Estepona, Spain</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight mt-2">
              Contact Us
            </h1>
          </div>
          <div className="text-xs md:text-sm text-[#17233b]/70 max-w-md leading-relaxed">
            Visits to the plot, private consultations, and reservations are handled directly by the official development team.
          </div>
        </div>

        {/* 2 Columns: Contact Information & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white/70 border border-[#17233b]/15 shadow-sm space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#340c24] font-semibold block">
                Office Information
              </span>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-[#340c24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#17233b]/50">Address</div>
                    <p className="text-sm font-medium mt-0.5">
                      Avenida Litoral, 29680 Estepona, Málaga, Spain
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-[#340c24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#17233b]/50">Telephone</div>
                    <a
                      href="tel:+34655408648"
                      className="text-base font-semibold mt-0.5 hover:text-[#340c24] transition-colors block font-mono"
                    >
                      +34 (655) 408-648
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-[#340c24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#17233b]/50">Email</div>
                    <a
                      href="mailto:info@era-residence.com"
                      className="text-sm font-medium mt-0.5 hover:text-[#340c24] transition-colors block"
                    >
                      info@era-residence.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-[#340c24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#17233b]/50">Consultation Hours</div>
                    <p className="text-xs text-[#17233b]/80 mt-0.5">
                      Monday — Saturday: 10:00 – 19:00 CET
                    </p>
                    <p className="text-[11px] text-[#17233b]/50">
                      Sunday: By private prior arrangement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Security Badge */}
            <div className="p-6 rounded-2xl bg-[#17233b] text-[#f3f3ec] space-y-3">
              <div className="flex items-center space-x-2 text-[#b5cedb]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest font-mono">Guaranteed Security</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Era Residence holds a valid building license approved by the Estepona town hall. All contracts are verified under Spanish notary standards.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white/80 p-8 md:p-12 rounded-3xl border border-[#17233b]/15 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#17233b] text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl">Inquiry Submitted</h3>
                <p className="text-sm text-[#17233b]/70 max-w-md mx-auto">
                  Thank you, {name}. Our sales advisory team has received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full border border-[#17233b] text-xs uppercase tracking-widest hover:bg-[#17233b] hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl">
                    Request Information or Site Visit
                  </h2>
                  <p className="text-xs text-[#17233b]/70 mt-1">
                    Please provide your contact information to receive the complete architectural dossier, pricing list, and availability breakdown.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 bg-white border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@example.com"
                      className="w-full px-4 py-3 bg-white border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                      Telephone (with country code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 bg-white border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                      Preferred Residence Type
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                    >
                      <option value="">Any Typology / General Inquiries</option>
                      <option value="ground-floor-basement">Ground Floor + Basement (3 Beds)</option>
                      <option value="ground-floor">Ground Floor (2 Beds)</option>
                      <option value="penthouse-duplex">Penthouse Duplex (2–3 Beds)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Message or Questions
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for, or if you would like to schedule an in-person visit in Estepona..."
                    className="w-full px-4 py-3 bg-white border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-full bg-[#17233b] hover:bg-[#340c24] text-[#f3f3ec] text-xs uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>{loading ? 'Submitting...' : 'Send Inquiry to Sales Office'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
