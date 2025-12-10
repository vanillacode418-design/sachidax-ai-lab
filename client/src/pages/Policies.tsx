import { Layout } from "@/components/layout/Layout";

export default function Policies() {
  return (
    <Layout title="Policies" subtitle="Legal information and terms of service.">
      <div className="max-w-3xl mx-auto mt-8 space-y-8 text-muted-foreground">
        <section>
          <h3 className="font-heading font-bold text-xl text-white mb-4">Privacy Policy</h3>
          <p className="mb-4">
            At SACHIDAX, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
          </p>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
          </p>
        </section>

        <section>
          <h3 className="font-heading font-bold text-xl text-white mb-4">Terms of Service</h3>
          <p className="mb-4">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>
          <p>
            Our services are provided "as is" without warranty of any kind, express or implied.
          </p>
        </section>

        <section>
          <h3 className="font-heading font-bold text-xl text-white mb-4">Data Processing</h3>
          <p>
            We process data in accordance with GDPR and CCPA regulations. Voice data is retained only for the duration specified in your retention settings.
          </p>
        </section>
      </div>
    </Layout>
  );
}
