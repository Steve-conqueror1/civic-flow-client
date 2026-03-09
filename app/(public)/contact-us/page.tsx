import { MapPin, Phone, Mail } from "lucide-react";
import {
  ContactInfoItem,
  ContactForm,
  ContactMapCard,
} from "@/components/Contact";

const ContactUsPage = () => {
  return (
    <main className="flex-1 w-full px-4 md:px-10 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Contact Our Team
          </span>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Secure Civic Support
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Connect with our government-grade AI specialists for technical
            assistance, partnerships, or security consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <ContactForm />

          {/* Contact info + map */}
          <div className="flex flex-col gap-10">
            <div className="space-y-8">
              <ContactInfoItem
                icon={<MapPin className="size-6" />}
                title="Main Office"
              >
                <p>
                  10235 101 St NW, Suite 1500
                  <br />
                  Edmonton, AB T5J 3G1, Canada
                </p>
              </ContactInfoItem>

              <ContactInfoItem
                icon={<Phone className="size-6" />}
                title="Phone Support"
              >
                <p>+1 (800) 555-0199</p>
                <p className="text-slate-500 text-sm">Mon–Fri: 8AM – 6PM MST</p>
              </ContactInfoItem>

              <ContactInfoItem
                icon={<Mail className="size-6" />}
                title="Email Inquiry"
              >
                <p>support@civicflow.gov.ca</p>
                <p>security@civicflow.gov.ca</p>
              </ContactInfoItem>
            </div>

            <ContactMapCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
