
import { createFileRoute } from '@tanstack/react-router';
import {
  useTable,
  tableFeatures,
  columnVisibilityFeature,
  type ColumnDef,
} from '@tanstack/react-table';

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

// Configuration des fonctionnalités
const features = tableFeatures({
  columnVisibilityFeature,
});

// Définition des colonnes
const columns: ColumnDef<typeof features, User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'company.name',
    header: 'Entreprise',
  },
];

// Route
export const Route = createFileRoute('/{-$locale}/users')({
  loader: async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    if (!res.ok) {
      throw new Error('Erreur de chargement des utilisateurs');
    }

    const users: User[] = await res.json();

    return { users };
  },

  component: UsersPage,
});

function UsersPage() {
  const { users } = Route.useLoaderData();

  const table = useTable({
    features,
    columns,
    data: users,
  });

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Liste des utilisateurs
        </h1>

        <p className="text-sm text-muted-foreground">
          {users.length} utilisateurs enregistrés
        </p>
      </div>

      {/* Gestion de la visibilité des colonnes */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium">
          Colonnes :
        </span>

        {table.getAllLeafColumns().map((column) => (
          <label
            key={column.id}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              disabled={!column.getCanHide()}
              onChange={column.getToggleVisibilityHandler()}
            />

            {column.columnDef.header as string}
          </label>
        ))}
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-3 text-left font-medium"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  className="p-6 text-center text-muted-foreground"
                >
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
