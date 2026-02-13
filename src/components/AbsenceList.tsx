import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, CalendarDays } from 'lucide-react';
import type { Absence, Stagiaire } from '@/types';

interface AbsenceListProps {
  absences: Absence[];
  stagiaires: Stagiaire[];
  onEdit: (absence: Absence) => void;
  onDelete: (id: number) => void;
}

export function AbsenceList({ absences, stagiaires, onEdit, onDelete }: AbsenceListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const getStagiaireName = (idstag: number) => {
    const stagiaire = stagiaires.find(s => s.id === idstag);
    return stagiaire ? stagiaire.nom : 'Inconnu';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

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
          <CalendarDays className="w-5 h-5" />
          Liste des absences ({absences.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {absences.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune absence enregistrée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heures</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {absences.map((absence) => (
                  <TableRow key={absence.id}>
                    <TableCell className="font-medium">{absence.id}</TableCell>
                    <TableCell>{getStagiaireName(absence.idstag)}</TableCell>
                    <TableCell>{formatDate(absence.date)}</TableCell>
                    <TableCell>{absence.nbHeures}h</TableCell>
                    <TableCell>
                      <Badge variant={absence.justifie ? 'default' : 'destructive'}>
                        {absence.justifie ? 'Justifiée' : 'Non justifiée'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(absence)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={deleteConfirm === absence.id ? 'destructive' : 'ghost'}
                          size="sm"
                          onClick={() => handleDelete(absence.id)}
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
