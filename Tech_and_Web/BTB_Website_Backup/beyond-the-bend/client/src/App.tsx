import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Livestream from "./pages/Livestream";
import Sanctuary from "./pages/Sanctuary";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import FinancialDashboard from "./pages/FinancialDashboard";
import WeeklySchedule from "./pages/WeeklySchedule";

function Router() {
  return (
    <Switch>
      <Route path="/financial-dashboard" component={FinancialDashboard} />
      <Route path="/weekly-schedule" component={WeeklySchedule} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/classes" component={Classes} />
      <Route path="/livestream" component={Livestream} />
      <Route path="/sanctuary" component={Sanctuary} />
      <Route path="/courses" component={Courses} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  const [location] = useLocation();
  const isFullPage = location === "/financial-dashboard" || location === "/weekly-schedule";
  if (isFullPage) return <Router />;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />
      <main style={{ flex: 1 }}>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
