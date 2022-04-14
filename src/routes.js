import {lazy} from 'react';

const Dashboard = lazy(() => import('./views/pages/dashboard/Dashboard'));
const ListOfUsers = lazy(() => import('../src/views/pages/users/ListOfUsers'));
const ListOfAppointment = lazy(() => import('../src/views/pages/appointments/ListOfAppointments'));
const NewUser = lazy(() => import('../src/views/pages/users/NewUser'));
const NewAppointment = lazy(() => import('../src/views/pages/appointments/NewAppointment'));
const PageNotFound = lazy(() => import('./views/pages/pageNotFound/PageNotFound'));
const EditUser = lazy(() => import('./views/pages/users/EditUser'));
const EditAppointment = lazy(() => import('./views/pages/appointments/EditAppointment'));
const Exporter = lazy(() => import('./views/pages/exporter/exporter'));
const Profile = lazy(() => import('./views/pages/profile/profile'));

const routes = [
    {
        path: '/', 
        auth: true,
        exact: true, 
        name: 'Tableau de Bord', 
        element: Dashboard
    },
    {path: '/utilisateurs', auth: true, name:'List des utilisateurs', element: ListOfUsers},
    {path: '/rendez-vous', auth: true, name:'List des Rendez-vous', element: ListOfAppointment},
    {path: '/ajouter/utilisateur', auth: true, name:'Ajouter un utilisateur', element: NewUser},
    {path: '/modifier/:uuid/utilisateur', auth: true, name: 'Modifier un utilisateur', element: EditUser},
    {path: '/ajouter/un/rendez-vous', auth: true, name: 'Ajouter un rendez-vous', element: NewAppointment},
    {path: '/modifier/:uuid/rendez-vous', auth: true, name: 'modifier le rendez-vous', element: EditAppointment},
    {path: '/exporter', auth: true, name: 'exporter', element: Exporter},
    {path: '/profil', auth: true, name: 'profil', element: Profile},
    {path:'*', name: 'Page not Found', element: PageNotFound}
];

export  default routes;