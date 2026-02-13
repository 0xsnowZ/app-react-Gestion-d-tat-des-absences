import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Absence, Stagiaire } from '@/types';

interface AbsenceFormProps {
  absence?: Absence | null;
  stagiaires: Stagiaire[];
  onSubmit: (absence: Omit<Absence, 'id'>) => void;
  onCancel: () => void;
}

export function AbsenceForm({ absence, stagiaires, onSubmit, onCancel }: AbsenceFormProps) {
  const [idstag, setIdstag] = useState<string>('');
  const [date, setDate] = useState('');
  const [justifie, setJustifie] = useState(false);
  const [nbHeures, setNbHeures] = useState(2);

  useEffect(() => {
    if (absence) {
      setIdstag(absence.idstag.toString());
      setDate(absence.date);
      setJustifie(absence.justifie);
      setNbHeures(absence.nbHeures);
    } else {
      setIdstag('');
      setDate('');
      setJustifie(false);
      setNbHeures(2);
    }
  }, [absence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      idstag: parseInt(idstag),
      date,
      justifie,
      nbHeures,
    });
    if (!absence) {
      setIdstag('');
      setDate('');
      setJustifie(false);
      setNbHeures(2);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {absence ? 'Modifier l\'absence' : 'Ajouter une absence'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stagiaire">Stagiaire</Label>
            <Select value={idstag} onValueChange={setIdstag} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un stagiaire" />
              </SelectTrigger>
              <SelectContent>
                {stagiaires.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.nom} ({s.filiere})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nbHeures">Nombre d'heures</Label>
            <Input
              id="nbHeures"
              type="number"
              min={1}
              max={8}
              value={nbHeures}
              onChange={(e) => setNbHeures(parseInt(e.target.value) || 0)}
              required
            />
          </div>

          <div className="flex items-center justify-between space-y-0 py-2">
            <Label htmlFor="justifie">Justifiée</Label>
            <Switch
              id="justifie"
              checked={justifie}
              onCheckedChange={setJustifie}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {absence ? 'Modifier' : 'Ajouter'}
            </Button>
            {absence && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
