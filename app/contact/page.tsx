import { Section, Container, Card, H2, Lead } from "../../components/Blocks";

export default function ContactPage() {
  return (
    <Section className="border-t-0">
      <Container>
        <H2>Talk to Sales</H2>
        <Lead>Tell us about your goals — we’ll follow up with a tailored demo.</Lead>

        <Card className="p-6 mt-8">
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Don’t fill this out: <input name="bot-field" /></label>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input name="name" required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/70">Work Email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">Company</label>
              <input name="company" className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">How can we help?</label>
              <textarea name="message" rows={5} required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
            </div>

            <button className="mt-6 px-6 py-3 rounded-2xl bg-white text-black">Send</button>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
