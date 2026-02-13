import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Users } from 'lucide-react';
import type { Stagiaire } from '@/types';

interface StagiaireListProps {
  stagiaires: Stagiaire[];
  onEdit: (stagiaire: Stagiaire) => void;
  onDelete: (id: number) => void;
}

export function StagiaireList({ stagiaires, onEdit, onDelete }: StagiaireListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5" />
          Liste des stagiaires ({stagiaires.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stagiaires.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun stagiaire enregistré
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Filière</TableHead>
                  <TableHead>Sexe</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stagiaires.map((stagiaire) => (
                  <TableRow key={stagiaire.id}>
                    <TableCell className="font-medium">{stagiaire.id}</TableCell>
                    <TableCell>{stagiaire.nom}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{stagiaire.filiere}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stagiaire.sexe === 'm' ? 'default' : 'outline'}>
                        {stagiaire.sexe === 'm' ? 'Masculin' : 'Féminin'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(stagiaire)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={deleteConfirm === stagiaire.id ? 'destructive' : 'ghost'}
                          size="sm"
                          onClick={() => handleDelete(stagiaire.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
