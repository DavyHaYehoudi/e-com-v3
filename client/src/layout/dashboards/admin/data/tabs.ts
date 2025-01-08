import {
  Gift,
  ShoppingCart,
  UserRound,
  Send,
  Star ,
  Percent,
  Layers,
  Tag,
  ChartColumnDecreasing
} from "lucide-react";
export const data = {
  activity: [
    {
      title: "Clients",
      url: "#",
      icon: UserRound,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/activite/clients/liste",
        },
      ],
    },
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/activite/commandes/liste",
        },
      ],
    },
  ],
  catalogue: [
    {
      title: "Produits",
      url: "#",
      icon: Tag,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/catalogue/produits/liste",
        },
        {
          title: "Ajouter",
          url: "/admin/tableau-de-bord/catalogue/produits/ajouter",
        },
      ],
    },
    {
      title: "Classement",
      url: "#",
      icon: Layers,
      isActive: true,
      items: [
        {
          title: "Collections",
          url: "/admin/tableau-de-bord/catalogue/collections",
        },
        {
          title: "Catégories",
          url: "/admin/tableau-de-bord/catalogue/categories",
        },
        {
          title: "Tags",
          url: "/admin/tableau-de-bord/catalogue/tags",
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
          title: "Liste",
          url: "/admin/tableau-de-bord/avantages/cartes-cadeaux/liste",
        },
      ],
    },
    {
      title: "Codes promos",
      url: "#",
      icon: Percent,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/avantages/code-promo/liste",
        },
      ],
    },
  ],
  marketing: [
    {
      title: "Campagne",
      url: "#",
      icon: Send,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/marketing/liste",
        },
        {
          title: "Ajouter",
          url: "/admin/tableau-de-bord/marketing/ajouter",
        },
      ],
    },
  ],
  review: [
    {
      title: "Avis",
      url: "#",
      icon: Star,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/admin/tableau-de-bord/retours/avis",
        },
      ],
    },
  ],
  stat: [
    {
      title: "Statistiques",
      url: "#",
      icon: ChartColumnDecreasing,
      isActive: true,
      items: [
        {
          title: "Général",
          url: "/admin/tableau-de-bord/chiffres/statistiques/general",
        },
        {
          title: "Stockage",
          url: "/admin/tableau-de-bord/chiffres/statistiques/stockage-images",
        },
      ],
    },
  ],
};
