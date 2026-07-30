import { useEffect, useState } from 'react';

import { siteContent } from './data/site-content';
import { applySeo } from './lib/seo';
import { CoverageSection } from './components/landing/coverage-section';
import { FaqSection } from './components/landing/faq-section';
import { FloatingActions } from './components/landing/floating-actions';
import { HeroSection } from './components/landing/hero-section';
import type { LeadRequest } from './components/landing/hero-section';
import { LeadFormDialog } from './components/landing/lead-form-dialog';
import { PlanSection } from './components/landing/plan-section';
import { ProofSection } from './components/landing/proof-section';
import { SiteFooter } from './components/landing/site-footer';
import { SiteHeader } from './components/landing/site-header';

export function App() {
  const [leadRequest, setLeadRequest] = useState<LeadRequest | null>(null);

  useEffect(() => {
    applySeo(siteContent);
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <SiteHeader contact={siteContent.contact} />
      <main>
        <HeroSection contact={siteContent.contact} content={siteContent} />
        <ProofSection content={siteContent} />
        <PlanSection content={siteContent} onOpenLead={setLeadRequest} />
        <CoverageSection content={siteContent} onOpenLead={setLeadRequest} />
        <FaqSection content={siteContent} />
      </main>
      <SiteFooter content={siteContent} />
      <FloatingActions contact={siteContent.contact} onOpenLead={setLeadRequest} />
      <LeadFormDialog
        areas={siteContent.areas}
        contactPhoneDisplay={siteContent.contact.phoneDisplay}
        contactPhoneHref={siteContent.contact.phoneHref}
        emailAddress={siteContent.contact.email}
        endpoint={import.meta.env.VITE_LEAD_ENDPOINT}
        isOpen={leadRequest !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setLeadRequest(null);
          }
        }}
        request={leadRequest}
      />
    </div>
  );
}
