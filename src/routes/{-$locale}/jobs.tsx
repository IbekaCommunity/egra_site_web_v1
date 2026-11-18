import { useMemo, useState } from 'react';
import PageHero from '#/components/page-hero';
import { useT } from '#/hooks/use-locale';
import { getDictionary, langFromParam } from '#/lib/i18n';
import { createFileRoute, Link, Outlet, useMatchRoute } from '@tanstack/react-router';
import { JOBS, type Job, type JobStatus } from './jobs-data';

// ---------- Route ----------
export const Route = createFileRoute('/{-$locale}/jobs')({
  head: ({ params }) => {
    const t = getDictionary(langFromParam(params.locale)).jobsPage;
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
  loader: async () => {
    const openJobs = JOBS.filter((j) => j.status === 'open').length;
    const closedJobs = JOBS.filter((j) => j.status === 'closed').length;
    return { jobs: JOBS, openJobs, closedJobs };
  },
  component: JobsPage,
});

// ---------- Composant ----------
function JobsPage() {
  const matchRoute = useMatchRoute();
  // true si on est sur /jobs/$jobId (détail), false si on est sur /jobs
  const isDetailRoute = matchRoute({
    to: '/{-$locale}/jobs/$jobId',
    fuzzy: true,
  });

  // Si on est sur une sous-route, on n'affiche que l'Outlet (le détail)
  if (isDetailRoute) {
    return <Outlet />;
  }

  // Sinon, on affiche la liste
  return <JobsList />;
}

function JobsList() {
  const t = useT().jobsPage;
  const { jobs } = Route.useLoaderData() as {
    jobs: Job[];
    openJobs: number;
    closedJobs: number;
  };

  const [statusFilter, setStatusFilter] = useState<'all' | JobStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(jobs.map((j) => j.category)))],
    [jobs],
  );

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (statusFilter !== 'all' && j.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && j.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          j.title.toLowerCase().includes(q) ||
          j.id.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [jobs, statusFilter, categoryFilter, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const job of filtered) {
      if (!map.has(job.category)) map.set(job.category, []);
      map.get(job.category)!.push(job);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* ---------- Barre de filtres ---------- */}
        <div className="mb-8 grid gap-4 rounded-2xl border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            placeholder="Rechercher un poste, un numéro d’offre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | JobStatus)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="open">En cours</option>
            <option value="closed">Terminées</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'Toutes les catégories' : c}
              </option>
            ))}
          </select>
        </div>

        {grouped.length === 0 && (
          <p className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
            Aucune offre ne correspond à vos filtres.
          </p>
        )}

        {/* ---------- Sections par catégorie ---------- */}
        <div className="space-y-12">
          {grouped.map(([category, list]) => (
            <div key={category}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xl font-bold">{category}</h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {list.length}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {list.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ---------- Carte d'offre ----------
function JobCard({ job }: { job: Job }) {
  const isOpen = job.status === 'open';
  return (
    <article className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40">
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
        <span className="text-xs text-muted-foreground">{job.contract}</span>
      </div>

      <h3 className="mt-2 text-lg font-semibold leading-tight">{job.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {job.location} · Publié le {formatDate(job.postedAt)} · Échéance{' '}
        {formatDate(job.deadline)}
      </p>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{job.summary}</p>

      <div className="mt-5 flex gap-2">
        <Link
          to="/{-$locale}/jobs/$jobId"
          params={{ locale: undefined, jobId: job.id }}
          className="inline-flex h-8 flex-1 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Voir plus
        </Link>
        <a
          href={`/api/jobs/${encodeURIComponent(job.id)}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Télécharger le PDF
        </a>
      </div>
    </article>
  );
}

// ---------- Utilitaire ----------
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