import { lazy } from "react";

const Dashboard = lazy(() => import("./views/pages/dashboard/Dashboard"));
const ListOfUsers = lazy(() => import("../src/views/pages/users/ListOfUsers"));
const ListOfAppointment = lazy(() =>
  import("../src/views/pages/appointments/ListOfAppointments")
);
const NewUser = lazy(() => import("../src/views/pages/users/NewUser"));
const NewAppointment = lazy(() =>
  import("../src/views/pages/appointments/NewAppointment")
);
const PageNotFound = lazy(() =>
  import("./views/pages/pageNotFound/PageNotFound")
);
const EditAdministrator = lazy(() =>
  import("./views/pages/users/EditAdministrator")
);
const EditAgent = lazy(() => import("./views/pages/users/EditAgent"));
const EditClient = lazy(() => import("./views/pages/users/EditClient"));
const EditSalarie = lazy(() => import("./views/pages/users/EditSalarie"));
const EditAppointment = lazy(() =>
  import("./views/pages/appointments/EditAppointment")
);
const Exporter = lazy(() => import("./views/pages/exporter/exporter"));
const Profile = lazy(() => import("./views/pages/profile/profile"));

const Intervention = lazy(() =>
  import("./views/pages/parametres/interventions")
);
const HousingType = lazy(() => import("./views/pages/parametres/natureDuBien"));

const NotAllowed = lazy(() => import("./views/pages/notAllowed"));

const routes = [
  {
    path: "/",
    auth: true,
    exact: true,
    name: "Tableau de Bord",
    element: Dashboard,
  },
  {
    path: "/utilisateurs",
    auth: true,
    name: "List des utilisateurs",
    element: ListOfUsers,
    roles: ['admin', 'agent']
  },
  {
    path: "/rendez-vous",
    auth: true,
    name: "List des Rendez-vous",
    element: ListOfAppointment,
    roles: ['admin', 'agent']
  },
  {
    path: "/interventions",
    auth: true,
    name: "interventions",
    element: Intervention,
    roles: ['admin', 'agent']
  },
  {
    path: "/nature-des-biens",
    auth: true,
    name: "Nature du bien",
    element: HousingType,
    roles: ['admin', 'agent']
  },
  {
    path: "/ajouter/utilisateur",
    auth: true,
    name: "Ajouter un utilisateur",
    element: NewUser,
    roles: ['admin', 'agent']
  },
  {
    path: "/modifier/:uuid/administrateur/utilisateur",
    auth: true,
    name: "Modifier un administrateur",
    element: EditAdministrator,
    roles: ['admin', 'agent']
  },
  {
    path: "/modifier/:uuid/agent/utilisateur",
    auth: true,
    name: "Modifier un agent",
    element: EditAgent,
    roles: ['admin', 'agent']
  },
  {
    path: "/modifier/:uuid/client/utilisateur",
    auth: true,
    name: "Modifier un client",
    element: EditClient,
    roles: ['admin', 'agent']
  },
  {
    path: "/modifier/:uuid/salarie/utilisateur",
    auth: true,
    name: "Modifier un Salarié",
    element: EditSalarie,
    roles: ['admin', 'agent']
  },
  {
    path: "/ajouter/un/rendez-vous",
    auth: true,
    name: "Ajouter un rendez-vous",
    element: NewAppointment,
    roles: ['admin', 'agent', 'client', 'salarie']
  },
  {
    path: "/modifier/:uuid/rendez-vous",
    auth: true,
    name: "modifier le rendez-vous",
    element: EditAppointment,
    roles: ['admin', 'agent']
  },
  { path: "/exporter", auth: true, name: "exporter", element: Exporter, roles: ['admin', 'agent'] },
  { path: "/profil", auth: true, name: "profil", element: Profile, roles: ['admin', 'agent', 'client', 'salarie']},
  { path: "/not-allowed", name: "not allowed", element: NotAllowed },
  { path: "*", name: "Page not Found", element: PageNotFound },
];

export default routes;
