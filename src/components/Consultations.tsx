import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Calendar, Filter, Users, FileText } from 'lucide-react';
import type { Absence, Stagiaire, FiltreJustification } from '@/types';

interface ConsultationsProps {
  absences: Absence[];
  stagiaires: Stagiaire[];
}

export function Consultations({ absences, stagiaires }: ConsultationsProps) {
  const [filtreJustif, setFiltreJustif] = useState<FiltreJustification>('all');
  const [dateRecherche, setDateRecherche] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [stagiaireRecherche, setStagiaireRecherche] = useState<string>('');

  // Filtrer les absences selon le critère de justification
  const absencesFiltrees = useMemo(() => {
    if (filtreJustif === 'all') return absences;
    if (filtreJustif === 'justifie') return absences.filter(a => a.justifie);
    return absences.filter(a => !a.justifie);
  }, [absences, filtreJustif]);

  // Absences par date
  const absencesParDate = useMemo(() => {
    if (!dateRecherche) return [];
    return absences.filter(a => a.date === dateRecherche);
  }, [absences, dateRecherche]);

  // Absences par période
  const absencesParPeriode = useMemo(() => {
    if (!dateDebut || !dateFin) return [];
    return absences.filter(a => a.date >= dateDebut && a.date <= dateFin);
  }, [absences, dateDebut, dateFin]);

  // Absences par stagiaire
  const absencesParStagiaire = useMemo(() => {
    if (!stagiaireRecherche) return [];
    return absences.filter(a => a.idstag === parseInt(stagiaireRecherche));
  }, [absences, stagiaireRecherche]);

  // Récapitulatif
  const recapitulatif = useMemo(() => {
    const justifiees = absences.filter(a => a.justifie);
    const nonJustifiees = absences.filter(a => !a.justifie);
    return {
      totalHeures: absences.reduce((sum, a) => sum + a.nbHeures, 0),
      totalAbsences: absences.length,
      totalJustifiees: justifiees.length,
      totalNonJustifiees: nonJustifiees.length,
      heuresJustifiees: justifiees.reduce((sum, a) => sum + a.nbHeures, 0),
      heuresNonJustifiees: nonJustifiees.reduce((sum, a) => sum + a.nbHeures, 0),
    };
  }, [absences]);

  const getStagiaireName = (idstag: number) => {
    const stagiaire = stagiaires.find(s => s.id === idstag);
    return stagiaire ? stagiaire.nom : 'Inconnu';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  const renderAbsenceTable = (data: Absence[]) => (
    data.length === 0 ? (
      <div className="text-center py-4 text-gray-500">Aucune absence trouvée</div>
    ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Stagiaire</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Heures</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((absence) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="recap" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="recap" className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            Récapitulatif
          </TabsTrigger>
          <TabsTrigger value="filtre" className="flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Par cause
          </TabsTrigger>
          <TabsTrigger value="date" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Par date
          </TabsTrigger>
          <TabsTrigger value="periode" className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Par période
          </TabsTrigger>
          <TabsTrigger value="stagiaire" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Par stagiaire
          </TabsTrigger>
        </TabsList>

        {/* Récapitulatif */}
        <TabsContent value="recap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Récapitulatif des absences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-600">
                      {recapitulatif.totalAbsences}
                    </div>
                    <div className="text-sm text-gray-600">Total absences</div>
                    <div className="text-lg font-semibold text-blue-800">
                      {recapitulatif.totalHeures} heures
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {recapitulatif.totalJustifiees}
                    </div>
                    <div className="text-sm text-gray-600">Absences justifiées</div>
                    <div className="text-lg font-semibold text-green-800">
                      {recapitulatif.heuresJustifiees} heures
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">
                      {recapitulatif.totalNonJustifiees}
                    </div>
                    <div className="text-sm text-gray-600">Absences non justifiées</div>
                    <div className="text-lg font-semibold text-red-800">
                      {recapitulatif.heuresNonJustifiees} heures
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Filtre par cause */}
        <TabsContent value="filtre" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Absences par cause
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full max-w-xs">
                <Label>Filtrer par</Label>
                <Select value={filtreJustif} onValueChange={(v) => setFiltreJustif(v as FiltreJustification)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="justifie">Justifiées</SelectItem>
                    <SelectItem value="non-justifie">Non justifiées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {renderAbsenceTable(absencesFiltrees)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Par date */}
        <TabsContent value="date" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Absences par date
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full max-w-xs">
                <Label>Choisir une date</Label>
                <Input
                  type="date"
                  value={dateRecherche}
                  onChange={(e) => setDateRecherche(e.target.value)}
                />
              </div>
              {renderAbsenceTable(absencesParDate)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Par période */}
        <TabsContent value="periode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Absences par période
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full max-w-xs">
                  <Label>Date début</Label>
                  <Input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
                <div className="w-full max-w-xs">
                  <Label>Date fin</Label>
                  <Input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
              </div>
              {renderAbsenceTable(absencesParPeriode)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Par stagiaire */}
        <TabsContent value="stagiaire" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Absences par stagiaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full max-w-xs">
                <Label>Sélectionner un stagiaire</Label>
                <Select value={stagiaireRecherche} onValueChange={setStagiaireRecherche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un stagiaire" />
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
              {renderAbsenceTable(absencesParStagiaire)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
