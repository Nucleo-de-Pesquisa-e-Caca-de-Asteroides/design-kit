"use client";

import { useNPCAFirebase } from "../firebase.js";
import { ArrowCounterClockwiseIcon, BackspaceIcon, ChartBarIcon, ChartLineIcon, ExportIcon, PlusIcon, ShieldCheckIcon, SignInIcon, XIcon } from "@phosphor-icons/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref, runTransaction } from "firebase/database";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export default function Navbar() {
  const {
    auth,
    database
  } = useNPCAFirebase();
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
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
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
          console.error("Erro ao verificar permissão de admin na navbar:", error);
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
      await runTransaction(configRef, config => ({
        ...(config || {}),
        tempCodeNumber: config?.lastCodeNumber || 0,
        tempXyzCodeNumber: config?.lastXyzCodeNumber || 0
      }));
      setTempCodeNumber(lastCodeNumber);
      setTempXyzCodeNumber(lastXyzCodeNumber);
      toast.success("Contadores alinhados com sucesso!", {
        id: toastId
      });
    } catch (error) {
      console.error("Erro ao alinhar contadores:", error);
      toast.error("Erro ao alinhar contadores.", {
        id: toastId
      });
    } finally {
      setAligning(false);
    }
  };
  const handleResetCounters = async () => {
    setAligning(true);
    const toastId = toast.loading("Zerando contadores...");
    try {
      const configRef = ref(database, "config");
      await runTransaction(configRef, config => ({
        ...(config || {}),
        lastCodeNumber: 0,
        tempCodeNumber: 0,
        lastXyzCodeNumber: 0,
        tempXyzCodeNumber: 0
      }));
      setLastCodeNumber(0);
      setTempCodeNumber(0);
      setLastXyzCodeNumber(0);
      setTempXyzCodeNumber(0);
      toast.success("Contadores zerados com sucesso!", {
        id: toastId
      });
    } catch (error) {
      console.error("Erro ao zerar contadores:", error);
      toast.error("Erro ao zerar contadores.", {
        id: toastId
      });
    } finally {
      setAligning(false);
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("nav", {
      className: "site-nav",
      "aria-label": "Navega\xE7\xE3o principal",
      children: [/*#__PURE__*/_jsx("div", {
        className: "site-nav-brand",
        children: /*#__PURE__*/_jsx(Link, {
          href: "/",
          className: "site-nav-logo",
          children: "SARA-NPCA"
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "site-nav-actions",
        children: !loading && /*#__PURE__*/_jsx(_Fragment, {
          children: user ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [isAdmin && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsxs(Link, {
                href: "/painel",
                "aria-current": pathname === "/painel" ? "page" : undefined,
                "aria-label": "Painel",
                className: "btn secondary withicon",
                children: [/*#__PURE__*/_jsx(ChartLineIcon, {}), /*#__PURE__*/_jsx("span", {
                  children: "Painel"
                })]
              }), /*#__PURE__*/_jsxs(Link, {
                href: "/membros",
                "aria-current": pathname === "/membros" ? "page" : undefined,
                "aria-label": "Membros",
                className: "btn secondary withicon",
                children: [/*#__PURE__*/_jsx(ShieldCheckIcon, {}), /*#__PURE__*/_jsx("span", {
                  children: "Membros"
                })]
              }), /*#__PURE__*/_jsxs("button", {
                type: "button",
                onClick: handleOpenModal,
                className: "btn secondary withicon",
                title: "Gerenciar sequ\xEAncias de c\xF3digos",
                "aria-label": "Gerenciar sequ\xEAncias de c\xF3digos",
                children: [/*#__PURE__*/_jsx(ChartBarIcon, {}), /*#__PURE__*/_jsx("span", {
                  children: "C\xF3digos"
                })]
              })]
            }), /*#__PURE__*/_jsxs(Link, {
              href: "/registrar",
              "aria-label": "Registrar",
              "aria-current": pathname === "/registrar" ? "page" : undefined,
              className: "btn withicon",
              children: [/*#__PURE__*/_jsx(PlusIcon, {}), /*#__PURE__*/_jsx("span", {
                children: "Registrar"
              })]
            }), /*#__PURE__*/_jsxs(Link, {
              href: "/exportar",
              "aria-current": pathname === "/exportar" ? "page" : undefined,
              className: "btn withicon secondary",
              title: "Exportar relat\xF3rio",
              "aria-label": "Exportar relat\xF3rio",
              children: [/*#__PURE__*/_jsx(ExportIcon, {}), /*#__PURE__*/_jsx("span", {
                children: "Exportar"
              })]
            }), /*#__PURE__*/_jsx("span", {
              className: "divider"
            }), /*#__PURE__*/_jsx("button", {
              type: "button",
              onClick: handleLogout,
              className: "secondary",
              title: "Sair",
              "aria-label": "Sair",
              children: "Sair"
            })]
          }) : /*#__PURE__*/_jsxs(Link, {
            href: "/login",
            "aria-label": "Entrar",
            "aria-current": pathname === "/login" ? "page" : undefined,
            className: "btn secondary withicon",
            children: [/*#__PURE__*/_jsx(SignInIcon, {}), /*#__PURE__*/_jsx("span", {
              children: "Entrar"
            })]
          })
        })
      })]
    }), isModalOpen && /*#__PURE__*/_jsx("div", {
      className: "modal-backdrop",
      onMouseDown: () => setIsModalOpen(false),
      children: /*#__PURE__*/_jsxs("div", {
        className: "modal-content counter-modal",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "counter-modal-title",
        onMouseDown: event => event.stopPropagation(),
        children: [/*#__PURE__*/_jsx("button", {
          type: "button",
          className: "modal-close-btn",
          onClick: () => setIsModalOpen(false),
          title: "Fechar",
          "aria-label": "Fechar sequ\xEAncia de c\xF3digos",
          children: /*#__PURE__*/_jsx(XIcon, {
            size: 20
          })
        }), /*#__PURE__*/_jsx("h2", {
          id: "counter-modal-title",
          children: "Sequ\xEAncia de C\xF3digos"
        }), loadingCounters ? /*#__PURE__*/_jsx("p", {
          className: "counter-loading",
          children: "Carregando dados do servidor..."
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "modal-infos counter-infos",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "counter-info",
              children: [/*#__PURE__*/_jsx("span", {
                children: "\xDAltimo NPC registrado:"
              }), /*#__PURE__*/_jsxs("strong", {
                children: ["NPC", String(lastCodeNumber).padStart(4, "0"), " (", lastCodeNumber, ")"]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "counter-info",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Pr\xF3ximo NPC:"
              }), /*#__PURE__*/_jsxs("strong", {
                children: ["NPC", String(tempCodeNumber).padStart(4, "0"), " (", tempCodeNumber, ")"]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "counter-info",
              children: [/*#__PURE__*/_jsx("span", {
                children: "\xDAltimo XYZ registrado:"
              }), /*#__PURE__*/_jsxs("strong", {
                children: ["XYZ", String(lastXyzCodeNumber).padStart(4, "0"), " (", lastXyzCodeNumber, ")"]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "counter-info",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Pr\xF3ximo XYZ:"
              }), /*#__PURE__*/_jsxs("strong", {
                children: ["XYZ", String(tempXyzCodeNumber).padStart(4, "0"), " (", tempXyzCodeNumber, ")"]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "counter-actions",
            children: [/*#__PURE__*/_jsx("button", {
              type: "button",
              className: "btn login-submit-btn icon",
              onClick: handleResetCounters,
              disabled: aligning,
              title: "Zerar contadores",
              "aria-label": "Zerar contadores",
              children: /*#__PURE__*/_jsx(BackspaceIcon, {
                size: 20
              })
            }), /*#__PURE__*/_jsxs("button", {
              type: "button",
              onClick: handleAlign,
              disabled: aligning || tempCodeNumber === lastCodeNumber && tempXyzCodeNumber === lastXyzCodeNumber,
              className: "btn login-submit-btn",
              children: [/*#__PURE__*/_jsx(ArrowCounterClockwiseIcon, {
                size: 20
              }), aligning ? "Alinhando..." : "Alinhar Contadores"]
            })]
          })]
        })]
      })
    })]
  });
}
