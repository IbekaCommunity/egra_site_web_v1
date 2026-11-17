import { useState,useEffect } from 'react';
import PageHero from '#/components/page-hero';
import { Button } from '#/components/ui/button';
import { useT } from '#/hooks/use-locale';
import { getDictionary, langFromParam } from '#/lib/i18n';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod'; 

// ---------- Server Function ----------
const ID_TYPES = ['carte_electeur', 'passeport', 'permis_conduire'] as const;

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Nom complet requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone requis'),
  position: z.string().min(1, 'Poste souhaité requis'),
  idType: z.enum(ID_TYPES, { message: 'Type de pièce d’identité requis' }),
  idNumber: z.string().min(4, 'Numéro de pièce requis'),
  profileFr: z.string().min(20, 'Résumé professionnel (FR) trop court (min. 20 caractères)'),
  profileEn: z.string().min(20, 'Résumé professionnel (EN) trop court (min. 20 caractères)'),
  message: z.string().optional(),
});

const submitApplication = createServerFn({ method: 'POST' })
  .validator((data: FormData) => {
    const cv = data.get('cv') as File | null;
    if (!cv || cv.size === 0) throw new Error('CV requis');
    if (cv.size > 5 * 1024 * 1024) throw new Error('CV trop volumineux (max 5 Mo)');

    const coverLetter = data.get('coverLetter') as File | null;
    if (coverLetter && coverLetter.size > 5 * 1024 * 1024)
      throw new Error('Lettre de motivation trop volumineuse (max 5 Mo)');

    const photo = data.get('photo') as File | null;
    if (!photo || photo.size === 0) throw new Error('Photo de profil requise');
    if (!photo.type.startsWith('image/')) throw new Error('La photo doit être une image');
    if (photo.size > 2 * 1024 * 1024) throw new Error('Photo trop volumineuse (max 2 Mo)');

    return data;
  })
  .handler(async ({ data }) => {
    const raw = {
      fullName: data.get('fullName') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      position: data.get('position') as string,
      idType: data.get('idType') as string,
      idNumber: data.get('idNumber') as string,
      profileFr: data.get('profileFr') as string,
      profileEn: data.get('profileEn') as string,
      message: (data.get('message') as string) || undefined,
    };
    const parsed = applicationSchema.safeParse(raw);
    if (!parsed.success)
      throw new Error(parsed.error.errors[0]?.message ?? 'Données invalides');

    const cv = data.get('cv') as File;
    const coverLetter = data.get('coverLetter') as File | null;
    const photo = data.get('photo') as File;

    // TODO: brancher Resend / stockage fichier ici.
    console.log('Candidature reçue :', {
      ...parsed.data,
      cv: { name: cv.name, size: cv.size },
      coverLetter: coverLetter ? { name: coverLetter.name, size: coverLetter.size } : null,
      photo: { name: photo.name, size: photo.size, type: photo.type },
    });

    return { ok: true };
  });

// ---------- Route ----------
export const Route = createFileRoute('/{-$locale}/career')({
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).careerPage;
    const title = `${t.metaTitle} | EGRA International School`;
    return {
      meta: [
        { title },
        { name: 'description', content: t.metaDescription },
        { property: 'og:title', content: title },
        { property: 'og:description', content: t.metaDescription },
      ],
    };
  },
  component: CareerPage,
});

 



function CareerPage() {
  const t = useT().careerPage;
  const STEPS = [
    { id: 1 as const, label: t.form.wizard.identity },
    { id: 2 as const, label: t.form.wizard.identityCard },
    { id: 3 as const, label: t.form.wizard.profile },
    { id: 4 as const, label: t.form.wizard.documents },
  ];
  
  type StepId = (typeof STEPS)[number]['id'];
  const [step, setStep] = useState<StepId>(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');


 
 


 // ✅ Fetch avec gestion d'erreur + abort
  useEffect(() => {
    const controller = new AbortController();

    async function fetchR() {
      try {
        const resp = await fetch('http://localhost/mon-app/school_api/v.1/index.php', {
          method: 'GET',
          signal: controller.signal,
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        console.log('API response:', data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Fetch failed:', err);
        console.log(err);
      }
    }

    void fetchR();
    return () => controller.abort();
  }, []);

  

  function getField(form: HTMLFormElement, name: string) {
    return (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? '';
  }

  function validateStep(current: StepId, form: HTMLFormElement): string | null {
    if (current === 1) {
      if (getField(form, 'fullName').trim().length < 2) return  t.form.error.fullname;
      const email = getField(form, 'email').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t.form.error.email;
      if (getField(form, 'phone').trim().length < 6) return  t.form.error.phone;
    }
    if (current === 2) {
      if (!getField(form, 'idType')) return  t.form.error.idType;
      if (getField(form, 'idNumber').trim().length < 4) return  t.form.error.idNumber;
    }
    if (current === 3) {
      const photo = form.elements.namedItem('photo') as HTMLInputElement | null;
      if (!photo?.files?.length) return  t.form.error.profilePhoto;
      if (!photo.files[0].type.startsWith('image/')) return t.form.error.profilePhotoType;
      if (photo.files[0].size > 2 * 1024 * 1024) return t.form.error.profilePhotoSize;
      if (getField(form, 'profileFr').trim().length < 20)
        return t.form.error.profileFr;
      if (getField(form, 'profileEn').trim().length < 20)
        return t.form.profileEn;
    }
    if (current === 4) {
      const cv = form.elements.namedItem('cv') as HTMLInputElement | null;
      if (!cv?.files?.length) return t,form.error.cvRequired;
      if (cv.files[0].size > 5 * 1024 * 1024) return t.form.error.CvFileSize;
      const cl = form.elements.namedItem('coverLetter') as HTMLInputElement | null;
      if (cl?.files?.length && cl.files[0].size > 5 * 1024 * 1024)
        return t.form.error.CvFileSize;
    }
    return null;
  }

  function handleNext(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const err = validateStep(step, form);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setStep((s) => (s < 4 ? ((s + 1) as StepId) : s));
  }

  function handlePrev(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setErrorMsg('');
    setStep((s) => (s > 1 ? ((s - 1) as StepId) : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step !== 4) return;
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitApplication({ data: formData });
      setStatus('success');
      form.reset();
      setStep(1);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_1.6fr]">
        {/* ---------- Colonne gauche : instructions ---------- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold">Comment postuler</h2>
            <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
              {[
                ['Renseignez vos coordonnées', 'nom complet, email valide et numéro de téléphone joignable.'],
                ['Fournissez une pièce d’identité', 'carte d’électeur, passeport ou permis de conduire, avec son numéro.'],
                ['Complétez votre profil', 'photo de profil et résumé professionnel en français et en anglais.'],
                ['Joignez vos documents', 'CV obligatoire et, si possible, une lettre de motivation (PDF, max 5 Mo).'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-foreground">{title}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-lg bg-muted p-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Conseils</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Documents : PDF, DOC, DOCX — max 5 Mo.</li>
                <li>Photo de profil : JPG/PNG — max 2 Mo.</li>
                <li>Les champs marqués d'un astérisque (*) sont obligatoires.</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* ---------- Colonne droite : wizard ---------- */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          {/* Indicateur d'étapes */}
          <div className="mb-8 flex items-center justify-between">
            {STEPS.map((s, i) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <div key={s.id} className="flex flex-1 items-center last:flex-none">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : done
                            ? 'bg-primary/80 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {done ? '✓' : s.id}
                    </span>
                    <span
                      className={`hidden text-sm font-medium md:inline ${
                        active ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-2 h-px flex-1 ${step > s.id ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {status === 'success' && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
              Votre candidature a bien été envoyée. Nous vous contacterons prochainement.
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-5">
            {/* ÉTAPE 1 — Identité */}
            <div className={step === 1 ? 'grid gap-5' : 'hidden'}>
              <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium">{t.form.wizard.fullname} *</label>
                <input id="fullName" name="fullName" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">Email *</label>
                  <input id="email" name="email" type="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">{t.form.wizard.phone} *</label>
                  <input id="phone" name="phone" type="tel" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </div>

            {/* ÉTAPE 2 — Pièce d'identité */}
            <div className={step === 2 ? 'grid gap-5' : 'hidden'}>
              <div>
                <label htmlFor="idType" className="mb-1 block text-sm font-medium">{t.form.wizard.idType} *</label>
                <select id="idType" name="idType" defaultValue="" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="" disabled>Sélectionnez…</option>
                  <option value="carte_electeur">Carte d’électeur</option>
                  <option value="passeport">Passeport</option>
                  <option value="permis_conduire">Permis de conduire</option>
                </select>
              </div>
              <div>
                <label htmlFor="idNumber" className="mb-1 block text-sm font-medium">{t.form.wizard.idNumber} *</label>
                <input id="idNumber" name="idNumber" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Ex. 1234-5678-9012" />
              </div>
              <div>
                <label htmlFor="position" className="mb-1 block text-sm font-medium">{t.form.wizard.position} *</label>
                <input id="position" name="position" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Ex. Enseignant de mathématiques" />
              </div>
            </div>

            {/* ÉTAPE 3 — Profil */}
            <div className={step === 3 ? 'grid gap-5' : 'hidden'}>
              <div>
                <label htmlFor="photo" className="mb-1 block text-sm font-medium">{t.form.wizard.photo} (JPG/PNG — max 2 Mo) *</label>
                <input id="photo" name="photo" type="file" accept="image/*" className="w-full rounded-md border bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm" />
              </div>
              <div>
                <label htmlFor="profileFr" className="mb-1 block text-sm font-medium">{t.form.wizard.resumeProfessionalFr} *</label>
                <textarea id="profileFr" name="profileFr" rows={4} placeholder="Décrivez en quelques phrases votre parcours, vos compétences et vos motivations…" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label htmlFor="profileEn" className="mb-1 block text-sm font-medium">{t.form.wizard.resumeProfessionalEn} *</label>
                <textarea id="profileEn" name="profileEn" rows={4} placeholder="Describe in a few sentences your background, skills and motivation…" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium">{t.form.wizard.message}</label>
                <textarea id="message" name="message" rows={3} placeholder="Quelques mots sur votre motivation…" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* ÉTAPE 4 — Documents */}
            <div className={step === 4 ? 'grid gap-5' : 'hidden'}>
              <div>
                <label htmlFor="cv" className="mb-1 block text-sm font-medium">{t.form.wizard.cvFile} (PDF, DOC, DOCX — max 5 Mo) *</label>
                <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="w-full rounded-md border bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm" />
              </div>
              <div>
                <label htmlFor="coverLetter" className="mb-1 block text-sm font-medium">{t.form.wizard.coverLetterFile} (PDF, DOC, DOCX — max 5 Mo)</label>
                <input id="coverLetter" name="coverLetter" type="file" accept=".pdf,.doc,.docx" className="w-full rounded-md border bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm" />
              </div>
              <p className="text-xs text-muted-foreground">
                 {t.form.wizard.politic}
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-2 flex items-center justify-between gap-3 border-t pt-5">
              <Button type="button" variant="outline" onClick={handlePrev} disabled={step === 1 || status === 'submitting'}>
                {t.form.wizard.previous}
              </Button>

              {step < 4 ? (
                <Button type="button" onClick={handleNext}>{t.form.wizard.next}</Button>
              ) : (
                <Button type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma candidature'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}