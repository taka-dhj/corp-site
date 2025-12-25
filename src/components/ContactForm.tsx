import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Mail, Phone, User, Building, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // バリデーション
    if (!formData.name.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    if (!formData.subject.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    if (!formData.message.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(t('contactForm.error'));
      }

      if (response.ok && result.success) {
        setSubmitStatus('success');

        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            subject: '',
            message: ''
          });
          setSubmitStatus('idle');
          onClose();
        }, 3000);
      } else {
        throw new Error(result.error || t('contactForm.error'));
      }

    } catch (error) {
      console.error('Email sending error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-2">{t('contactForm.title')}</h2>
              <p className="text-gray-600">{t('contactForm.subtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800">{t('contactForm.success')}</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{t('contactForm.error')}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contactForm.name')} <span className="text-red-500">{t('contactForm.required')}</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={t('contactForm.placeholder.name')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contactForm.email')} <span className="text-red-500">{t('contactForm.required')}</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={t('contactForm.placeholder.email')}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contactForm.company')}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={t('contactForm.placeholder.company')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contactForm.phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={t('contactForm.placeholder.phone')}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contactForm.subject')} <span className="text-red-500">{t('contactForm.required')}</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">{t('contactForm.selectSubject')}</option>
                <option value={t('contactForm.subjects.inboundTour')}>{t('contactForm.subjects.inboundTour')}</option>
                <option value={t('contactForm.subjects.consulting')}>{t('contactForm.subjects.consulting')}</option>
                <option value={t('contactForm.subjects.dxSolution')}>{t('contactForm.subjects.dxSolution')}</option>
                <option value={t('contactForm.subjects.customTravel')}>{t('contactForm.subjects.customTravel')}</option>
                <option value={t('contactForm.subjects.vacationRental')}>{t('contactForm.subjects.vacationRental')}</option>
                <option value={t('contactForm.subjects.documentRequest')}>{t('contactForm.subjects.documentRequest')}</option>
                <option value={t('contactForm.subjects.other')}>{t('contactForm.subjects.other')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contactForm.message')} <span className="text-red-500">{t('contactForm.required')}</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder={t('contactForm.placeholder.message')}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contactForm.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contactForm.submit')}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg transition-all duration-300"
              >
                {t('contactForm.cancel')}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              <Trans i18nKey="contactForm.footer" components={{ 0: <br /> }} />
              <br />
              <span className="font-medium">info@discoveryhiddenjapan.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}