import React from 'react';
import { Info, Scale, HeartPulse, Landmark, ExternalLink } from 'lucide-react';
import { ALL_SKILLS } from '../../content/skills';
import { DOMAIN_CATALOG, DomainId } from '../../types/skills';

export const AboutView: React.FC = () => {
  const domains = (Object.keys(DOMAIN_CATALOG) as DomainId[])
    .filter((domainId) => DOMAIN_CATALOG[domainId].status === 'aktif');

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><Info className="h-5 w-5" /></div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Tentang & Sumber</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              KantorKu adalah simulasi edukasi untuk berlatih keterampilan kantor. Materi tidak menjamin hasil,
              sertifikasi, atau penerapan hukum di situasi nyata.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <Scale className="mb-2 h-5 w-5" />
            <strong>Bukan nasihat hukum.</strong> Untuk keputusan hukum, konsultasikan ahli atau perangkat hukum yang sah.
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
            <Landmark className="mb-2 h-5 w-5" />
            <strong>Bukan nasihat keuangan.</strong> Contoh angka bersifat edukatif dan tidak menggantikan penasihat keuangan.
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950">
            <HeartPulse className="mb-2 h-5 w-5" />
            <strong>Bukan nasihat medis.</strong> Jangan gunakan konten simulasi sebagai diagnosis atau pengobatan.
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {domains.map((domainId) => {
          const domain = DOMAIN_CATALOG[domainId];
          const skills = ALL_SKILLS.filter((skill) => skill.domain === domainId);
          return (
            <article key={domainId} className="rounded-3xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-black text-slate-900">
                {domain.code} — {domain.name}
              </h2>
              <div className="mt-3 space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm font-bold text-slate-800">{skill.name}</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {skill.sources.map((source, index) => {
                        const match = source.match(/^(.*?),?\s+(https?:\/\/\S+)$/);
                        return (
                          <li key={`${skill.id}-${index}`}>
                            {match ? (
                              <>
                                <span>{match[1].replace(/,\s*$/, '')}</span>
                                {' '}
                                <a
                                  href={match[2]}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 font-semibold text-blue-700 underline"
                                >
                                  Buka rujukan <ExternalLink className="h-3 w-3" />
                                </a>
                              </>
                            ) : (
                              <span>{source}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
