import { MapPin } from "lucide-react";
import {
  ContactInfoItem,
  ContactForm,
  ContactMapCard,
} from "@/components/Contact";

const PreviewPage = () => {
  return (
    <div className="p-8 space-y-16 max-w-4xl mx-auto">
      {/* ContactInfoItem */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactInfoItem
        </h2>
        <ContactInfoItem
          icon={<MapPin className="size-6" />}
          title="Main Office"
        >
          <p>10235 101 St NW, Suite 1500</p>
          <p>Edmonton, AB T5J 3G1, Canada</p>
        </ContactInfoItem>
      </section>

      {/* ContactMapCard */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactMapCard
        </h2>
        <ContactMapCard />
      </section>

      {/* ContactForm */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 border-b pb-2">
          ContactForm
        </h2>
        <ContactForm />
      </section>
    </div>
  );
};

export default PreviewPage;
