import {
  BadgeEuro,
  Gift,
  ShoppingCart,
  UserRound,
  MapPinHouse,
  Scale,
  ShieldCheck,
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
        },
        {
          title: "Avatar",
          url: "/customer/tableau-de-bord/profil/avatar",
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
        },
        {
          title: "Facturation",
          url: "/customer/tableau-de-bord/adresses/facturation",
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
        },
        {
          title: "Liste",
          url: "/customer/tableau-de-bord/avantages/cartes-cadeaux/liste",
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
        },
        {
          title: "Historique",
          url: "/customer/tableau-de-bord/avantages/cashback/historique",
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
        },
        {
          title: "Mentions légales",
          url: "/customer/tableau-de-bord/politique/vente/mentions-legales",
        },
        {
          title: "Livraisons et retours",
          url: "/customer/tableau-de-bord/politique/vente/livraisons-et-retours",
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
        },
        {
          title: "Données personnelles",
          url: "/customer/tableau-de-bord/politique/securite/donnees-personnelles",
        },
      ],
    },
  ],
};
