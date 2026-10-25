"use client";

import { useNPCAFirebase } from "../firebase.js";
import {
  ArrowCounterClockwiseIcon,
  BackspaceIcon,
  ChartBarIcon,
  ChartLineIcon,
  ExportIcon,
  PlusIcon,
  ShieldCheckIcon,
  SignInIcon,
  XIcon,
} from "@phosphor-icons/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref, runTransaction } from "firebase/database";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { auth, database } = useNPCAFirebase();
  if (!database) throw new Error("SARA Navbar requer database no NPCAFirebaseProvider.");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para o Modal de Alinhamento de Código
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCodeNumber, setLastCodeNumber] = useState(0);
  const [tempCodeNumber, setTempCodeNumber] = useState(0);
  const [lastXyzCodeNumber, setLastXyzCodeNumber] = useState(0);
  const [tempXyzCodeNumber, setTempXyzCodeNumber] = useState(0);
  const [loadingCounters, setLoadingCounters] = useState(false);
  const [aligning, setAligning] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = ref(database, `usuarios/${currentUser.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists() && snapshot.val().admin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error(
            "Erro ao verificar permissão de admin na navbar:",
            error,
          );
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, database]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  // Buscar os contadores atuais no Firebase
  const fetchCounters = async () => {
    setLoadingCounters(true);
    try {
      const configRef = ref(database, "config");
      const snapshot = await get(configRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setLastCodeNumber(data.lastCodeNumber || 0);
        setTempCodeNumber(data.tempCodeNumber || 0);
        setLastXyzCodeNumber(data.lastXyzCodeNumber || 0);
        setTempXyzCodeNumber(data.tempXyzCodeNumber || 0);
      } else {
        setLastCodeNumber(0);
        setTempCodeNumber(0);
        setLastXyzCodeNumber(0);
        setTempXyzCodeNumber(0);
      }
    } catch (error) {
      console.error("Erro ao buscar contadores:", error);
      toast.error("Erro ao carregar contadores.");
    } finally {
      setLoadingCounters(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchCounters();
  };

  // Alinhar o contador temporário com o real
  const handleAlign = async () => {
    setAligning(true);
    const toastId = toast.loading("Alinhando contadores...");

    try {
      const configRef = ref(database, "config");

      await runTransaction(configRef, (config) => ({
        ...(config || {}),
        tempCodeNumber: config?.lastCodeNumber || 0,
        tempXyzCodeNumber: config?.lastXyzCodeNumber || 0,
      }));

      setTempCodeNumber(lastCodeNumber);
      setTempXyzCodeNumber(lastXyzCodeNumber);
      toast.success("Contadores alinhados com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Erro ao alinhar contadores:", error);
      toast.error("Erro ao alinhar contadores.", { id: toastId });
    } finally {
      setAligning(false);
    }
  };

  const handleResetCounters = async () => {
    setAligning(true);
    const toastId = toast.loading("Zerando contadores...");

    try {
      const configRef = ref(database, "config");

      await runTransaction(configRef, (config) => ({
        ...(config || {}),
        lastCodeNumber: 0,
        tempCodeNumber: 0,
        lastXyzCodeNumber: 0,
        tempXyzCodeNumber: 0,
      }));

      setLastCodeNumber(0);
      setTempCodeNumber(0);
      setLastXyzCodeNumber(0);
      setTempXyzCodeNumber(0);
      toast.success("Contadores zerados com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Erro ao zerar contadores:", error);
      toast.error("Erro ao zerar contadores.", { id: toastId });
    } finally {
      setAligning(false);
    }
  };

  return (
    <>
      <nav className="site-nav" aria-label="Navegação principal">
        <div className="site-nav-brand">
          <Link href="/" className="site-nav-logo">
            SARA-NPCA
          </Link>
        </div>
        <div className="site-nav-actions">
          {!loading && (
            <>
              {user ? (
                <>
                  {isAdmin && (
                    <>
                      <Link
                        href="/painel"
                        aria-current={pathname === "/painel" ? "page" : undefined}
                        aria-label="Painel"
                        className="btn secondary withicon"
                      >
                        <ChartLineIcon />
                        <span>Painel</span>
                      </Link>
                      <Link
                        href="/membros"
                        aria-current={pathname === "/membros" ? "page" : undefined}
                        aria-label="Membros"
                        className="btn secondary withicon"
                      >
                        <ShieldCheckIcon />
                        <span>Membros</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleOpenModal}
                        className="btn secondary withicon"
                        title="Gerenciar sequências de códigos"
                        aria-label="Gerenciar sequências de códigos"
                      >
                        <ChartBarIcon />
                        <span>Códigos</span>
                      </button>
                    </>
                  )}
                  <Link href="/registrar" aria-label="Registrar" aria-current={pathname === "/registrar" ? "page" : undefined} className="btn withicon">
                    <PlusIcon />
                    <span>Registrar</span>
                  </Link>
                  <Link
                    href="/exportar"
                    aria-current={pathname === "/exportar" ? "page" : undefined}
                    className="btn withicon secondary"
                    title="Exportar relatório"
                    aria-label="Exportar relatório"
                  >
                    <ExportIcon />
                    <span>Exportar</span>
                  </Link>
                  <span className="divider" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="secondary"
                    title="Sair"
                    aria-label="Sair"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link href="/login" aria-label="Entrar" aria-current={pathname === "/login" ? "page" : undefined} className="btn secondary withicon">
                  <SignInIcon />
                  <span>Entrar</span>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
      {isModalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content counter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="counter-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              title="Fechar"
              aria-label="Fechar sequência de códigos"
            >
              <XIcon size={20} />
            </button>

            <h2 id="counter-modal-title">Sequência de Códigos</h2>

            {loadingCounters ? (
              <p className="counter-loading">Carregando dados do servidor...</p>
            ) : (
              <>
                <div className="modal-infos counter-infos">
                  <div className="counter-info">
                    <span>Último NPC registrado:</span>
                    <strong>
                      NPC{String(lastCodeNumber).padStart(4, "0")} (
                      {lastCodeNumber})
                    </strong>
                  </div>

                  <div className="counter-info">
                    <span>Próximo NPC:</span>
                    <strong>
                      NPC{String(tempCodeNumber).padStart(4, "0")} (
                      {tempCodeNumber})
                    </strong>
                  </div>

                  <div className="counter-info">
                    <span>Último XYZ registrado:</span>
                    <strong>
                      XYZ{String(lastXyzCodeNumber).padStart(4, "0")} (
                      {lastXyzCodeNumber})
                    </strong>
                  </div>

                  <div className="counter-info">
                    <span>Próximo XYZ:</span>
                    <strong>
                      XYZ{String(tempXyzCodeNumber).padStart(4, "0")} (
                      {tempXyzCodeNumber})
                    </strong>
                  </div>
                </div>

                <div className="counter-actions">
                  <button
                    type="button"
                    className="btn login-submit-btn icon"
                    onClick={handleResetCounters}
                    disabled={aligning}
                    title="Zerar contadores"
                    aria-label="Zerar contadores"
                  >
                    <BackspaceIcon size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleAlign}
                    disabled={
                      aligning ||
                      (tempCodeNumber === lastCodeNumber &&
                        tempXyzCodeNumber === lastXyzCodeNumber)
                    }
                    className="btn login-submit-btn"
                  >
                    <ArrowCounterClockwiseIcon size={20} />
                    {aligning ? "Alinhando..." : "Alinhar Contadores"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
