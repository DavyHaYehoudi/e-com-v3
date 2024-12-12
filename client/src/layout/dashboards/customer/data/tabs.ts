import {
  BadgeEuro,
  Gift,
  ShoppingCart,
  UserRound,
  MapPinHouse,
  Scale,
  ShieldCheck
} from "lucide-react";
export const data = {
  account: [
    {
      title: "Profil",
      url: "#",
      icon: UserRound,
      isActive: true,
      items: [
        {
          title: "Identité",
          url: "/customer/tableau-de-bord/profil/identite",
          hidden: false
        },
        {
          title: "Avatar",
          url: "/customer/tableau-de-bord/profil/avatar",
          hidden: false
        },
      ],
    },
    {
      title: "Adresses",
      url: "#",
      icon: MapPinHouse,
      items: [
        {
          title: "Livraison",
          url: "/customer/tableau-de-bord/adresses/livraison",
          hidden: false
        },
        {
          title: "Facturation",
          url: "/customer/tableau-de-bord/adresses/facturation",
          hidden: false
        },
      ],
    },
  ],
  activities: [
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/customer/tableau-de-bord/commandes/liste",
          hidden: false
        },
        {
          title: "",
          url: "/customer/tableau-de-bord/commandes/:id",
          hidden: true
        },
      ],
    },
  ],
  advantages: [
    {
      title: "Cartes cadeaux",
      url: "#",
      icon: Gift,
      isActive: true,
      items: [
        {
          title: "Emploi",
          url: "/customer/tableau-de-bord/avantages/cartes-cadeaux/emploi",
          hidden: false
        },
        {
          title: "Liste",
          url: "/customer/tableau-de-bord/avantages/cartes-cadeaux/liste",
          hidden: false
        },
      ],
    },
    {
      title: "Cashback",
      url: "#",
      icon: BadgeEuro,
      items: [
        {
          title: "Emploi",
          url: "/customer/tableau-de-bord/avantages/cashback/fonctionnement",
          hidden: false
        },
        {
          title: "Historique",
          url: "/customer/tableau-de-bord/avantages/cashback/historique",
          hidden: false
        },
      ],
    },
  ],
  policy: [
    {
      title: "Vente",
      url: "#",
      icon: Scale,
      isActive: true,
      items: [
        {
          title: "Conditions générales",
          url: "/customer/tableau-de-bord/politique/vente/conditions-generales",
          hidden: false
        },
        {
          title: "Mentions légales",
          url: "/customer/tableau-de-bord/politique/vente/mentions-legales",
          hidden: false
        },
        {
          title: "Livraisons et retours",
          url: "/customer/tableau-de-bord/politique/vente/livraisons-et-retours",
          hidden: false
        },
      ],
    },
    {
      title: "Sécurité",
      url: "#",
      icon: ShieldCheck,
      isActive: true,
      items: [
        {
          title: "Paiements",
          url: "/customer/tableau-de-bord/politique/securite/paiements",
          hidden: false
        },
        {
          title: "Données personnelles",
          url: "/customer/tableau-de-bord/politique/securite/donnees-personnelles",
          hidden: false
        },
      ],
    }
  ],
};
