import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'combos',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/combos/combos.module').then(m => m.CombosModule)
          }
        ]
    },
    {
        path: 'cuota',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/cuotas/cuotas-routing.module').then(m => m.CuotasRoutingModule)
          }
        ]
    },
    {
        path: 'chatmensaje',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/chatmensaje/chatsmensajemodule').then(m => m.ChatsModule)
          }
        ]
    },
    {
        path: 'especialdiad-operario',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/especialdiad-operario/especialdiad-operario.module').then(m => m.EspecialdiadOperarioModule)
          }
        ]
    },
    {
        path: 'especialidad',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/especialidad/especialidades.module').then(m => m.EspecialidadesModule)
          }
        ]
    },
    {
        path: 'especialidad-maquina',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/especialidad-maquinaria/especialidadmaquinaria.module').then(m => m.EspecialidadMaquinariaModule)
          }
        ]
    },
    {
        path: 'factura',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/factura/factura.module').then(m => m.FacturaModule)
          }
        ]
    },
    {
        path: 'evidencia',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/evidencia/evidencia.module').then(m => m.EvidenciaModule)
          }
        ]
    },

    {
        path: 'gobernante',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/gobernante/gobernante.module').then(m => m.GobernanteModule)
          }
        ]
    },
    {
        path: 'gobernantedepartamento',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/gobernantedepartamento/gobernantedepartamento.module').then(m => m.GobernanteDepartamentoModule)
          }
        ]
    },
     {
        path: 'departamento',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/departamento/departamento.module').then(m => m.DepartamentoModule)
          }
        ]
    },
    {
        path: 'gobernantemunicipio',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/gobernantemunicipio/gobernantemunicipio.module').then(m => m.GobernanteMunicipioModule)
          }
        ]
    },
    {
        path: 'gps',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/gps/gps.module').then(m => m.GpsModule)
          }
        ]
    },
 
     {
         path: 'mantenimiento',
         children: [
           {
             path: '',
            loadChildren: () => import('src/app/pages/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
           }
         ]
     },
    {
        path: 'maquina',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/maquina/maquina.module').then(m => m.MaquinaModule)
          }
        ]
    },
    {
        path: 'municipio',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/municipio/municipio.module').then(m => m.MunicipioModule)
          }
        ]
    },
    {
        path: 'novedad',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/novedad/novedad.module').then(m => m.NovedadModule)
          }
        ]
    },
    {
        path: 'obra',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/obra/obra.module').then(m => m.ObraModule)
          }
        ]
    },
    {
        path: 'obra-municipal',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/obra-municipal/obra-municipal.module').then(m => m.ObraMunicipioModule)
          }
        ]
    },
    {
        path: 'operario',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/operario/operario.module').then(m => m.OperarioModule)
          }
        ]
    },
    {
        path: 'poliza',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/poliza/poliza.module').then(m => m.PolizaModule)
          }
        ]
    },
    {
        path: 'procedimiento',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/procedimiento/procedimiento.module').then(m => m.ProcedimientoModule)
          }
        ]
    },
     {
         path: 'procedimientomantenimiento',
         children: [
           {
             path: '',
             loadChildren: () => import('src/app/pages/procedimientomantenimiento/procedimientomantenimiento.module').then(m => m.ProcedimientoMantenimientoModule)
           }
         ]
     },
 
    {
        path: 'seguro',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/seguro/seguro.module').then(m => m.SeguroModule)
          }
        ]
    },
    {
        path: 'servicio',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/servicio/servicio.module').then(m => m.ServicioModule)
          }
        ]
    },
    {
        path: 'tipo-servicio',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/tiposervicio/tiposervicio.module').then(m => m.TipoServicioModule)
          }
        ]
    },
    {
        path: 'turno',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/turno/turno.module').then(m => m.TurnoModule)
          }
        ]
    },
    {
        path: 'usuario',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/usuario/usuario.module').then(m => m.UsuarioModule)
          }
        ]
    },
];
