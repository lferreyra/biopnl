import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserProfile, UserRole } from '../types';
import { AdminService, AdminAnalyticsSummary } from '../services/adminService';
import {
  Users,
  Search,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Download,
  RefreshCw,
  Clock,
  Sparkles,
  CheckCircle2,
  Trash2,
  UserCheck,
  ShieldAlert,
  Compass,
  ArrowUpRight,
  Filter,
  BarChart3,
  Activity
} from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface AdminDashboardPageProps {
  currentUser: UserProfile;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ currentUser }) => {
  const [analytics, setAnalytics] = useState<AdminAnalyticsSummary>(() => AdminService.getAnalyticsSummary());
  const [users, setUsers] = useState<UserProfile[]>(() => AdminService.getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    AdminService.syncUsersFromFirestore().then((synced) => {
      setUsers(synced);
      setAnalytics(AdminService.getAnalyticsSummary());
    });
  }, []);

  const refreshData = async () => {
    const synced = await AdminService.syncUsersFromFirestore();
    setUsers(synced);
    setAnalytics(AdminService.getAnalyticsSummary());
  };

  const handleRoleToggle = async (userId: string, currentRole?: UserRole) => {
    const newRole: UserRole = currentRole === 'admin' ? 'user' : 'admin';
    const success = await AdminService.updateUserRole(userId, newRole);
    if (success) {
      await refreshData();
      showTemporaryStatus(`Rol actualizado correctamente a "${newRole}".`);
    } else {
      showTemporaryStatus('No es posible modificar el rol del Administrador Principal.');
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (email.toLowerCase() === 'lucas.ferreyra@gmail.com') {
      showTemporaryStatus('No podés eliminar la cuenta del Administrador Principal.');
      return;
    }
    if (window.confirm(`¿Estás seguro de que querés eliminar el usuario "${email}"?`)) {
      await AdminService.deleteUser(userId);
      await refreshData();
      showTemporaryStatus('Usuario eliminado del registro.');
    }
  };

  const handleExportCSV = () => {
    const csvContent = AdminService.exportUsersToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `biopnl_usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showTemporaryStatus('Exportación CSV descargada exitosamente.');
  };

  const showTemporaryStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchQuery =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole =
      roleFilter === 'all' ? true : roleFilter === 'admin' ? u.role === 'admin' : u.role !== 'admin';
    return matchQuery && matchRole;
  });

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* Top Banner: Admin Header & Status Notification */}
      <motion.section variants={fadeInUpVariants} className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F3722]/15 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Panel Exclusivo de Administrador</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#FFF4ED]">
              Métricas & Usuarios de BioPNL
            </h1>
            <p className="text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] mt-1 max-w-2xl font-normal">
              Vista administrativa general de usuarios registrados, correos electrónicos, síntomas más consultados y actividad de la plataforma.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-full bio-pill-capsule text-xs font-bold text-[#111111] dark:text-white flex items-center gap-1.5 hover:border-[#8F3722]/40 transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={refreshData}
              className="p-2 rounded-full bio-pill-capsule text-[#111111] dark:text-white hover:border-[#8F3722]/40 transition-colors cursor-pointer shadow-2xs"
              title="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Temporary Feedback Notification */}
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </motion.section>

      {/* KPI Cards Grid */}
      <motion.section variants={fadeInUpVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="bio-glass-card rounded-[28px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Usuarios Registrados
            </span>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold">
              +{analytics.activeTodayCount} activos hoy
            </span>
          </div>
          <div className="my-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#111111] dark:text-[#FFF4ED]">
              {analytics.totalUsers}
            </h2>
            <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">
              {analytics.adminCount} administrador{analytics.adminCount > 1 ? 'es' : ''} · {analytics.totalUsers - analytics.adminCount} usuarios estándar
            </p>
          </div>
          <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-4/5" />
          </div>
        </div>

        {/* Total Searches */}
        <div className="bio-glass-card rounded-[28px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
            <span className="flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              Consultas Totales
            </span>
            <span className="text-[10px] text-[#8F3722] dark:text-[#E07853] bg-[#8F3722]/10 px-2 py-0.5 rounded-full font-bold">
              Biblioteca
            </span>
          </div>
          <div className="my-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#111111] dark:text-[#FFF4ED]">
              {analytics.totalSearches}
            </h2>
            <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">
              Búsquedas de síntomas y decodificaciones
            </p>
          </div>
          <div className="h-1 w-full bg-[#8F3722]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#8F3722] rounded-full w-3/4" />
          </div>
        </div>

        {/* Total Protocols Completed */}
        <div className="bio-glass-card rounded-[28px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Protocolos PNL
            </span>
            <span className="text-[10px] text-teal-800 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/60 px-2 py-0.5 rounded-full font-bold">
              Ejercicios
            </span>
          </div>
          <div className="my-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#111111] dark:text-[#FFF4ED]">
              {analytics.totalProtocolsRun}
            </h2>
            <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">
              Sesiones de respiración y reencuadres
            </p>
          </div>
          <div className="h-1 w-full bg-teal-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-teal-600 rounded-full w-2/3" />
          </div>
        </div>

        {/* Service Cost / Free Guarantee */}
        <div className="bio-glass-card rounded-[28px] p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Modelo Libre
            </span>
            <span className="text-[10px] text-purple-800 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded-full font-bold">
              100% Gratis
            </span>
          </div>
          <div className="my-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#111111] dark:text-[#FFF4ED]">
              $0
            </h2>
            <p className="text-[11px] text-[#374151] dark:text-[#BDB0A8] mt-0.5">
              Sin costo para usuarios ni muros de pago
            </p>
          </div>
          <div className="h-1 w-full bg-purple-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full w-full" />
          </div>
        </div>
      </motion.section>

      {/* Middle Row: Top Consulted Symptoms + Most Used Protocols */}
      <motion.section variants={fadeInUpVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Searched Symptoms */}
        <div className="lg:col-span-6 bio-glass-card rounded-[32px] p-6 border border-white/95 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
              <h2 className="font-heading text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
                Síntomas Más Consultados por la Comunidad
              </h2>
            </div>
            <span className="text-xs text-[#374151] dark:text-[#BDB0A8] font-semibold">
              Ranking
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.topSymptoms.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#374151] dark:text-[#BDB0A8]">
                Aún no hay búsquedas registradas en la biblioteca. A medida que los usuarios consulten síntomas somáticos, aparecerán clasificados aquí en tiempo real.
              </div>
            ) : (
              analytics.topSymptoms.map((symptom, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#111111] dark:text-[#FFF4ED] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 text-[10px] flex items-center justify-center font-bold text-[#8F3722]">
                        {idx + 1}
                      </span>
                      {symptom.term}
                    </span>
                    <span className="font-bold text-[#8F3722] dark:text-[#E07853] text-[11px]">
                      {symptom.count} consultas ({symptom.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D96C45] to-[#8F3722] rounded-full transition-all duration-500"
                      style={{ width: `${symptom.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Protocols Run */}
        <div className="lg:col-span-6 bio-glass-card rounded-[32px] p-6 border border-white/95 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
              <h2 className="font-heading text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
                Protocolos de PNL Más Frecuentes
              </h2>
            </div>
            <span className="text-xs text-[#374151] dark:text-[#BDB0A8] font-semibold">
              Herramientas
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.topProtocols.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#374151] dark:text-[#BDB0A8]">
                Aún no se han completado protocolos. Las sesiones de respiración y PNL realizadas por los usuarios se contabilizarán automáticamente aquí.
              </div>
            ) : (
              analytics.topProtocols.map((protocol, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/80 dark:border-white/10 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#FFF4ED]">
                      {protocol.name}
                    </p>
                    <p className="text-[10px] text-[#374151] dark:text-[#BDB0A8]">
                      {protocol.category}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    {protocol.count} sesiones
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Directory of Registered Users (Main User Table with Search & Role Management) */}
      <motion.section variants={fadeInUpVariants} className="bio-glass-card rounded-[32px] p-6 sm:p-7 border border-white/95 dark:border-white/10 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8F3722] dark:text-[#E07853]" />
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FFF4ED]">
                Directorio de Usuarios ({filteredUsers.length})
              </h2>
            </div>
            <p className="text-xs text-[#374151] dark:text-[#BDB0A8] mt-0.5">
              Gestión de cuentas, correos de acceso, roles administrativos y nivel de participación.
            </p>
          </div>

          {/* Filters: Search & Role Select */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-3 text-[#374151] dark:text-[#BDB0A8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o correo..."
                className="pl-9 pr-3 py-1.5 rounded-full bio-pill-capsule text-xs outline-none focus:border-[#8F3722] text-[#111111] dark:text-[#FFF4ED] w-56 sm:w-64 border border-[#E8B8A6]/40"
              />
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-full bg-white/70 dark:bg-white/10 border border-[#E8B8A6]/40 dark:border-white/10 text-xs">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  roleFilter === 'all'
                    ? 'bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311]'
                    : 'text-[#374151] dark:text-[#BDB0A8]'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  roleFilter === 'admin'
                    ? 'bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311]'
                    : 'text-[#374151] dark:text-[#BDB0A8]'
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => setRoleFilter('user')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  roleFilter === 'user'
                    ? 'bg-[#181311] dark:bg-[#FAF0EA] text-white dark:text-[#181311]'
                    : 'text-[#374151] dark:text-[#BDB0A8]'
                }`}
              >
                Usuarios
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E8B8A6]/30 dark:border-white/10">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-[#E8B8A6]/30 dark:border-white/10 text-[#111111] dark:text-[#FFF4ED] font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Usuario</th>
                <th className="py-3 px-4">Correo Electrónico</th>
                <th className="py-3 px-4">Rol</th>
                <th className="py-3 px-4">Búsquedas</th>
                <th className="py-3 px-4">Protocolos</th>
                <th className="py-3 px-4">Última Actividad</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8B8A6]/20 dark:divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#374151] dark:text-[#BDB0A8]">
                    No se encontraron usuarios coincidentes con "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isMainAdmin = u.email.toLowerCase() === 'lucas.ferreyra@gmail.com';
                  const isAdmin = u.role === 'admin';

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#111111] dark:text-[#FFF4ED]"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                            isAdmin ? 'bg-[#8F3722]' : 'bg-[#5A4D48]'
                          }`}>
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold block text-xs">{u.name}</span>
                            {isMainAdmin && (
                              <span className="text-[9px] text-[#8F3722] dark:text-[#E07853] font-bold uppercase">
                                Propietario / Creador
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 font-mono text-[11px] text-[#262626] dark:text-[#D1C7BD]">
                        {u.email}
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isAdmin
                              ? 'bg-[#8F3722]/15 text-[#8F3722] dark:text-[#E07853] border border-[#8F3722]/30'
                              : 'bg-black/5 dark:bg-white/10 text-[#374151] dark:text-[#BDB0A8]'
                          }`}
                        >
                          {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                          {isAdmin ? 'Administrador' : 'Usuario'}
                        </span>
                      </td>

                      {/* Searches Count */}
                      <td className="py-3 px-4 font-bold text-[#111111] dark:text-white">
                        {u.searchesCount || 0}
                      </td>

                      {/* Protocols Count */}
                      <td className="py-3 px-4 font-bold text-[#111111] dark:text-white">
                        {u.protocolsCount || 0}
                      </td>

                      {/* Last Active */}
                      <td className="py-3 px-4 text-[11px] text-[#374151] dark:text-[#BDB0A8]">
                        {u.lastActiveAt
                          ? new Date(u.lastActiveAt).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Reciente'}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isMainAdmin && (
                            <button
                              type="button"
                              onClick={() => handleRoleToggle(u.id, u.role)}
                              className="px-2.5 py-1 rounded-full bio-pill-capsule text-[10px] font-bold text-[#8F3722] dark:text-[#E07853] hover:border-[#8F3722]/50 transition-colors cursor-pointer"
                              title={isAdmin ? 'Degradar a usuario normal' : 'Ascender a administrador'}
                            >
                              {isAdmin ? 'Hacer Usuario' : 'Hacer Admin'}
                            </button>
                          )}

                          {!isMainAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id, u.email)}
                              className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-700 dark:text-rose-400 transition-colors cursor-pointer"
                              title="Eliminar usuario"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {isMainAdmin && (
                            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold">
                              Cuenta Activa
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Real-time Activity Feed */}
      <motion.section variants={fadeInUpVariants} className="bio-glass-card rounded-[32px] p-6 border border-white/95 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
            <h2 className="font-heading text-lg font-bold text-[#111111] dark:text-[#FFF4ED]">
              Registro Reciente de Actividad en la Plataforma
            </h2>
          </div>
          <span className="text-xs text-[#374151] dark:text-[#BDB0A8]">
            Últimas acciones
          </span>
        </div>

        <div className="divide-y divide-[#E8B8A6]/20 dark:divide-white/5 text-xs">
          {analytics.recentActivity.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#374151] dark:text-[#BDB0A8]">
              No hay acciones registradas recientemente. Las búsquedas de síntomas y protocolos ejecutados se registrarán aquí en tiempo real.
            </div>
          ) : (
            analytics.recentActivity.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.action === 'search'
                        ? 'bg-[#8F3722]'
                        : item.action === 'protocol'
                        ? 'bg-teal-600'
                        : 'bg-emerald-600'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-[#111111] dark:text-[#FFF4ED]">{item.userName}</span>{' '}
                    <span className="text-[#374151] dark:text-[#BDB0A8] font-mono text-[11px]">({item.userEmail})</span>
                    <p className="text-[11px] text-[#262626] dark:text-[#D1C7BD] mt-0.5">{item.detail}</p>
                  </div>
                </div>

                <span className="text-[10px] text-[#374151] dark:text-[#BDB0A8] shrink-0 font-medium">
                  {new Date(item.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};
