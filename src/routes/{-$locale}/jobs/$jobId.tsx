import { Button } from '#/components/ui/button';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { JOBS, type Job } from '../jobs-data';

export const Route = createFileRoute('/{-$locale}/jobs/$jobId')({
  loader: async ({ params }) => {
    console.log('[jobId route] params =', params)
    const job = JOBS.find((j) => j.id === params.jobId);
    console.log('[jobId route] found =', job?.id)
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    const job = loaderData?.job;
    return {
      meta: job
        ? [
            { title: `${job.title} — ${job.id} | EGRA International School` },
            { name: 'description', content: job.summary },
          ]
        : [],
    };
  },
  component: JobDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Offre introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        Cette offre n’existe pas ou a été retirée.
      </p>
      <Button asChild className="mt-6">
        <Link to="/{-$locale}/jobs" params={{ locale: undefined }}>
          Retour aux offres
        </Link>
      </Button>
    </div>
  ),
});

function JobDetailPage() {
  const { job } = Route.useLoaderData() as { job: Job }; 
  console.log('[JobDetailPage] rendering job =', job?.id)
  const isOpen = job.status === 'open';

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/{-$locale}/jobs"
        params={{ locale: undefined }}
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Retour aux offres
      </Link>

      <header className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
            {job.id}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isOpen
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOpen ? 'bg-emerald-500' : 'bg-muted-foreground/50'
              }`}
            />
            {isOpen ? 'En cours' : 'Terminée'}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold md:text-3xl">{job.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {job.category} · {job.location} · {job.contract}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Publié le {formatDate(job.postedAt)} · Échéance {formatDate(job.deadline)}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/{-$locale}/career" params={{ locale: undefined }}>
              Postuler à cette offre
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href={`/api/jobs/${encodeURIComponent(job.id)}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Télécharger le PDF
            </a>
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-8">
        <section>
          <h2 className="text-lg font-semibold">Description du poste</h2>
          <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
            {job.description}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Missions</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Profil recherché</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {job.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {job.salary && (
          <section>
            <h2 className="text-lg font-semibold">Rémunération</h2>
            <p className="mt-2 text-sm text-muted-foreground">{job.salary}</p>
          </section>
        )}
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}