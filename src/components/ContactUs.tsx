import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!message.trim()) {
      newErrors.message = 'Please write your message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Submit via FormSubmit.co AJAX endpoint to keep user on the page and trigger popup
      const response = await fetch('https://formsubmit.co/ajax/wk888062@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _captcha: 'false',
          _subject: 'New Contact Form Message from QR Code Generator Website',
          _template: 'table',
        }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setErrors({});
      } else {
        // Fallback to standard form post if AJAX fails
        formRef.current?.submit();
      }
    } catch {
      // If network or CORS blocks fetch, submit standard HTML form to formsubmit.co
      formRef.current?.submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Support &amp; Feedback
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Have questions, suggestions, or feature requests? We’d love to hear from you.
          </p>
        </div>

        {/* White Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10">
          <form
            ref={formRef}
            action="https://formsubmit.co/wk888062@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* FormSubmit.co Configuration Hidden Inputs */}
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="New Contact Form Message from QR Code Generator Website"
            />
            <input type="hidden" name="_template" value="table" />

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.name
                      ? 'border-red-500 ring-1 ring-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.email
                      ? 'border-red-500 ring-1 ring-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Feature Suggestion: Dynamic QR codes or Vector EPS"
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.subject
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-slate-200 dark:border-slate-700'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.subject && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Row 3: Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className={`w-full p-3.5 rounded-xl border ${
                  errors.message
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-slate-200 dark:border-slate-700'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            {/* Row 4: Submit Button (same blue #2563EB) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Beautiful Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            {/* Close icon top-right */}
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Checkmark icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Heading */}
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Message Sent!
            </h3>

            {/* Exact required success message */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Thank you! Your message has been sent successfully. I will reply soon.
            </p>

            {/* Dismiss button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowSuccessPopup(false)}
                className="w-full px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
