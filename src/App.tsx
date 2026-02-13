import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { StagiaireForm } from '@/components/StagiaireForm';
import { StagiaireList } from '@/components/StagiaireList';
import { AbsenceForm } from '@/components/AbsenceForm';
import { AbsenceList } from '@/components/AbsenceList';
import { Consultations } from '@/components/Consultations';
import { dataService } from '@/services/dataService';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import type { Stagiaire, Absence } from '@/types';

function App() {
  const [activeTab, setActiveTab] = useState('stagiaires');
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [editingStagiaire, setEditingStagiaire] = useState<Stagiaire | null>(null);
  const [editingAbsence, setEditingAbsence] = useState<Absence | null>(null);

  // Charger les données au démarrage
  useEffect(() => {
    setStagiaires(dataService.getStagiaires());
    setAbsences(dataService.getAbsences());
  }, []);

  // Rafraîchir les données
  const refreshData = useCallback(() => {
    setStagiaires(dataService.getStagiaires());
    setAbsences(dataService.getAbsences());
  }, []);

  // Stagiaires - CRUD
  const handleAddStagiaire = (stagiaire: Omit<Stagiaire, 'id'>) => {
    dataService.addStagiaire(stagiaire);
    refreshData();
    toast.success('Stagiaire ajouté avec succès');
  };

  const handleUpdateStagiaire = (stagiaire: Omit<Stagiaire, 'id'>) => {
    if (editingStagiaire) {
      dataService.updateStagiaire({ ...stagiaire, id: editingStagiaire.id });
      setEditingStagiaire(null);
      refreshData();
      toast.success('Stagiaire modifié avec succès');
    }
  };

  const handleDeleteStagiaire = (id: number) => {
    dataService.deleteStagiaire(id);
    refreshData();
    toast.success('Stagiaire supprimé avec succès');
  };

  // Absences - CRUD
  const handleAddAbsence = (absence: Omit<Absence, 'id'>) => {
    dataService.addAbsence(absence);
    refreshData();
    toast.success('Absence ajoutée avec succès');
  };

  const handleUpdateAbsence = (absence: Omit<Absence, 'id'>) => {
    if (editingAbsence) {
      dataService.updateAbsence({ ...absence, id: editingAbsence.id });
      setEditingAbsence(null);
      refreshData();
      toast.success('Absence modifiée avec succès');
    }
  };

  const handleDeleteAbsence = (id: number) => {
    dataService.deleteAbsence(id);
    refreshData();
    toast.success('Absence supprimée avec succès');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'stagiaires' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StagiaireForm
                stagiaire={editingStagiaire}
                onSubmit={editingStagiaire ? handleUpdateStagiaire : handleAddStagiaire}
                onCancel={() => setEditingStagiaire(null)}
              />
            </div>
            <div className="lg:col-span-2">
              <StagiaireList
                stagiaires={stagiaires}
                onEdit={setEditingStagiaire}
                onDelete={handleDeleteStagiaire}
              />
            </div>
          </div>
        )}

        {activeTab === 'absences' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AbsenceForm
                absence={editingAbsence}
                stagiaires={stagiaires}
                onSubmit={editingAbsence ? handleUpdateAbsence : handleAddAbsence}
                onCancel={() => setEditingAbsence(null)}
              />
            </div>
            <div className="lg:col-span-2">
              <AbsenceList
                absences={absences}
                stagiaires={stagiaires}
                onEdit={setEditingAbsence}
                onDelete={handleDeleteAbsence}
              />
            </div>
          </div>
        )}

        {activeTab === 'consultations' && (
          <Consultations absences={absences} stagiaires={stagiaires} />
        )}
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
