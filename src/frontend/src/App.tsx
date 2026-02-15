import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import PrisonersDilemmaPage from './features/prisonersDilemma/PrisonersDilemmaPage';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <PrisonersDilemmaPage />
      <Toaster />
    </ThemeProvider>
  );
}
