import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getPolicy, policies } from "@/content/legal";

type Params = { slug: string };

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy not found" };
  return { title: policy.title, description: policy.intro.slice(0, 150) };
}

export default async function PolicyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={policy.title}
        body={`Last updated ${policy.updated}`}
        crumbs={[{ label: policy.title }]}
      />
      <section className="section">
        <div className="container">
          <div className="prose">
            <div className="notice" style={{ marginBottom: 32 }}>
              {policy.intro}
            </div>
            {policy.sections.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
