import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterLinks } from './constants/RouterLinks';

import Login from './pages/Login';
import Registrarse from './pages/Registrarse';

import Home from './pages/Home';

import HistoriaClinica from './pages/HistoriaClinica';

import InformacionPersonal from './pages/forms/InformacionPersonal';
import Consentimiento from './pages/forms/Consentimiento';
import Antecedentes from './pages/forms/Antecedentes';
import EvaluacionSaludBucal from './pages/forms/EvaluacionSaludBucal';
import PlacaBacteriana from './pages/forms/PlacaBacteriana';
import CariesDental from './pages/forms/CariesDental';
import EvaluacionRiesgo from './pages/forms/EvaluacionRiesgo';
import CarnetFluorizacion from './pages/forms/CarnetFluorizacion';

import './styles/css/App.css';
import AuthContextProvider from './context/authContext';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {

  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path={RouterLinks.Login} element={<PublicRoute />}>
              <Route index element={<Login />} />
              <Route path={RouterLinks.Registrarse} element={<Registrarse />} />
            </Route>

            <Route path={RouterLinks.Home} element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path={RouterLinks.HistoriaClinica} element={<HistoriaClinica />} />
              <Route path={RouterLinks.InformacionPersonal} element={<InformacionPersonal />} />
              <Route path={RouterLinks.Consentimiento} element={<Consentimiento />} />
              <Route path={RouterLinks.Antecedentes} element={<Antecedentes />} />
              <Route path={RouterLinks.EvaluacionSaludBucal} element={<EvaluacionSaludBucal />} />
              <Route path={RouterLinks.PlacaBacteriana} element={<PlacaBacteriana />} />
              <Route path={RouterLinks.CariesDental} element={<CariesDental />} />
              <Route path={RouterLinks.EvaluacionRiesgo} element={<EvaluacionRiesgo />} />
              <Route path={RouterLinks.CarnetFluorizacion} element={<CarnetFluorizacion />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div >
  );
}

export default App;
