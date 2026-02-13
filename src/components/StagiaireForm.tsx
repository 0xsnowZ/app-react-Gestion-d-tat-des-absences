import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Stagiaire } from '@/types';

interface StagiaireFormProps {
  stagiaire?: Stagiaire | null;
  onSubmit: (stagiaire: Omit<Stagiaire, 'id'>) => void;
  onCancel: () => void;
}

export function StagiaireForm({ stagiaire, onSubmit, onCancel }: StagiaireFormProps) {
  const [nom, setNom] = useState('');
  const [filiere, setFiliere] = useState('');
  const [sexe, setSexe] = useState<'m' | 'f'>('m');

  useEffect(() => {
    if (stagiaire) {
      setNom(stagiaire.nom);
      setFiliere(stagiaire.filiere);
      setSexe(stagiaire.sexe);
    } else {
      setNom('');
      setFiliere('');
      setSexe('m');
    }
  }, [stagiaire]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nom, filiere, sexe });
    if (!stagiaire) {
      setNom('');
      setFiliere('');
      setSexe('m');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {stagiaire ? 'Modifier le stagiaire' : 'Ajouter un stagiaire'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du stagiaire"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filiere">Filière</Label>
            <Input
              id="filiere"
              value={filiere}
              onChange={(e) => setFiliere(e.target.value)}
              placeholder="Ex: DD101"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Sexe</Label>
            <RadioGroup value={sexe} onValueChange={(v) => setSexe(v as 'm' | 'f')}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="m" id="m" />
                  <Label htmlFor="m" className="cursor-pointer">Masculin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="f" id="f" />
                  <Label htmlFor="f" className="cursor-pointer">Féminin</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {stagiaire ? 'Modifier' : 'Ajouter'}
            </Button>
            {stagiaire && (
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
