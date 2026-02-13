import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CalendarDays, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Gestion d'état des absences
        </h1>
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="stagiaires" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Stagiaires
            </TabsTrigger>
            <TabsTrigger value="absences" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Absences
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Consultations
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
