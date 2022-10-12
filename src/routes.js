import { lazy } from "react";
import { ADMIN, AGENT, AGENT_CONSTAT, AGENT_SECTEUR, AUDIT_PLANNEUR, CLIENT, CLIENT_PARTICULIER, CLIENT_PROFESSIONEL, SALARIE } from "./utils/constant";

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
const ShowUser = lazy(() => import("./views/pages/users/ShowUsers"));
const ShowAppointment = lazy(() => import("./views/pages/appointments/ShowAppointment"));

const NewEmployee = lazy(() => import("./views/pages/salarie/NewSalarie"));
const EditEmployee = lazy(() => import("./views/pages/salarie/EditSalarie"));
const ListOfEmployee = lazy(() => import("./views/pages/salarie/ListOfSalarie"));

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
    roles: [ADMIN, AGENT, AGENT_CONSTAT, AGENT_SECTEUR],
  },
  {
    path: "/rendez-vous",
    auth: true,
    name: "List des Rendez-vous",
    element: ListOfAppointment,
    roles: [ADMIN, AGENT_SECTEUR, AGENT_CONSTAT, CLIENT_PROFESSIONEL, CLIENT_PARTICULIER, SALARIE, AUDIT_PLANNEUR     ]
  },
  {
    path: "/interventions",
    auth: true,
    name: "interventions",
    element: Intervention,
    roles: [ADMIN],
  },
  {
    path: "/nature-des-biens",
    auth: true,
    name: "Nature du bien",
    element: HousingType,
    roles: [ADMIN, AGENT],
  },
  {
    path: "/ajouter/utilisateur",
    auth: true,
    name: "Ajouter un utilisateur",
    element: NewUser,
    roles: [ADMIN, AGENT, AGENT_CONSTAT, AGENT_SECTEUR],
  },
  {
    path: "/modifier/:uuid/administrateur/utilisateur",
    auth: true,
    name: "Modifier un administrateur",
    element: EditAdministrator,
    roles: [ADMIN],
  },
  {
    path: "/modifier/:uuid/agent/utilisateur",
    auth: true,
    name: "Modifier un agent",
    element: EditAgent,
    roles: [ADMIN, AGENT, AGENT_CONSTAT, AGENT_SECTEUR],
  },
  {
    path: "/modifier/:uuid/client/utilisateur",
    auth: true,
    name: "Modifier un client",
    element: EditClient,
    roles: [ADMIN, AGENT, AGENT_SECTEUR],
  },
  {
    path: "/voir/:uuid/:role/utilisateur",
    auth: true,
    name: "Voir un utilisateur",
    element: ShowUser,
    roles: [ADMIN, AGENT, AGENT_SECTEUR]
  },
  {
    path: "/modifier/:uuid/salarie/utilisateur",
    auth: true,
    name: "Modifier un Salarié",
    element: EditSalarie,
    roles: [ADMIN, AGENT, AGENT_SECTEUR],
  },
  {
    path: "/ajouter/un/rendez-vous",
    auth: true,
    name: "Ajouter un rendez-vous",
    element: NewAppointment,
    roles: [ADMIN, AGENT_SECTEUR, CLIENT_PROFESSIONEL, CLIENT_PARTICULIER, SALARIE, AUDIT_PLANNEUR],
  },
  {
    path: "/voir/:uuid/rendez-vous",
    auth: true,
    name: "voir un rendez-vous",
    element: ShowAppointment,
    roles: [ADMIN, AGENT, AGENT_SECTEUR, AGENT_CONSTAT, CLIENT_PROFESSIONEL, CLIENT_PARTICULIER, AUDIT_PLANNEUR],
  },
  {
    path: "/modifier/:uuid/rendez-vous",
    auth: true,
    name: "modifier le rendez-vous",
    element: EditAppointment,
    roles: [ADMIN, AGENT_SECTEUR, AGENT_CONSTAT, CLIENT_PROFESSIONEL, CLIENT_PARTICULIER, AUDIT_PLANNEUR],
  },
  {
    path: "/exporter",
    auth: true,
    name: "exporter",
    element: Exporter,
    roles: [ADMIN, AGENT, AGENT_SECTEUR],
  },
  {
    path: "/profil",
    auth: true,
    name: "profil",
    element: Profile,
    roles: [ADMIN, AGENT, AGENT_SECTEUR, CLIENT, SALARIE],
  },
  {
    path: "salarie",
    auth: true,
    name: "ajoutez un salarie",
    element: ListOfEmployee,
    roles: [CLIENT_PROFESSIONEL],
  },
  {
    path: "ajoutez/un/salarie",
    auth: true,
    name: "ajoutez un salarie",
    element: NewEmployee,
    roles: [CLIENT_PROFESSIONEL],
  },
  {
    path: "modifier/:uuid/salarie",
    auth: true,
    name: "modifiez un salarie",
    element: EditEmployee,
    roles: [CLIENT_PROFESSIONEL],
  },
  { path: "/not-allowed", name: "not allowed", element: NotAllowed },
  { path: "*", name: "Page not Found", element: PageNotFound },
];

export default routes;
