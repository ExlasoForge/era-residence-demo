import React, { useState } from 'react';
import { X, Check, PhoneCall, Calendar, Clock, Sparkles } from 'lucide-react';
import { APARTMENTS } from '../data/apartments';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApartmentId?: string;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  selectedApartmentId,
}) => {
  const [apartmentId, setApartmentId] = useState(selectedApartmentId || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (10:00 - 13:00)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#17233b]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#f3f3ec] text-[#17233b] rounded-2xl border border-[#17233b]/15 shadow-2xl p-6 md:p-10 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#17233b]/20 hover:border-[#17233b] hover:bg-[#17233b] hover:text-[#f3f3ec] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-10 px-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#17233b] text-[#f3f3ec] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#340c24] font-semibold">
              Reservation Inquiry Received
            </span>
            <h3 className="font-display text-3xl md:text-4xl">
              Thank you, {name || 'valued guest'}
            </h3>
            <p className="text-sm text-[#17233b]/70 max-w-md mx-auto leading-relaxed">
              Our residential specialist has received your request. We will contact you at{' '}
              <span className="font-semibold text-[#17233b]">{phone || email}</span> during your preferred time window.
            </p>
            {apartmentId && (
              <div className="inline-block px-4 py-2 rounded-full border border-[#17233b]/20 text-xs tracking-wider uppercase font-medium bg-white/50">
                Unit Selected: #{apartmentId}
              </div>
            )}
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-[#17233b] text-[#f3f3ec] text-xs uppercase tracking-widest hover:bg-[#340c24] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#340c24] font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Private Consultation</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl">
                Book a call
              </h2>
              <p className="text-xs md:text-sm text-[#17233b]/70 leading-relaxed">
                A short conversation is enough to understand which apartment fits your use case — whether it is a family second home, a longer stay, or a Mediterranean retreat.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexander Wright"
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
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
                    placeholder="alexander@example.com"
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Telephone (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                  />
                </div>

                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Residence of Interest
                  </label>
                  <select
                    value={apartmentId}
                    onChange={(e) => setApartmentId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                  >
                    <option value="">General Inquiry / Any Residence</option>
                    {APARTMENTS.map((apt) => (
                      <option key={apt.id} value={apt.id}>
                        Unit #{apt.number} • {apt.typeTitle} ({apt.beds} bed, {apt.area})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                  />
                </div>

                <div>
                  <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                    Preferred Time Window
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm"
                  >
                    <option value="Morning (10:00 - 13:00)">Morning (10:00 – 13:00 CET)</option>
                    <option value="Afternoon (14:00 - 17:00)">Afternoon (14:00 – 17:00 CET)</option>
                    <option value="Evening (17:00 - 19:00)">Evening (17:00 – 19:00 CET)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block tracking-wider uppercase text-[10px] text-[#17233b]/60 mb-1.5 font-medium">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirements, timeline, or preferred layout..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#17233b]/15 rounded-lg focus:outline-none focus:border-[#17233b] text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#17233b] hover:bg-[#340c24] text-[#f3f3ec] text-xs uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Submitting Request...' : 'Confirm Call Request'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-[#17233b]/50 pt-2">
                By submitting, you agree to our privacy policy. Your information is kept strictly confidential by Swiss Technology S.L. & Unreal Estate Group.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
