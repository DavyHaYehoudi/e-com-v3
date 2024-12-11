import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/hooks/usePathname"; // Chemin vers votre hook personnalisé
import { data } from "./data/tabs";

const flattenNavigation = (data: any[]): any[] => {
  return data.flatMap((node) => {
    // Inclure le nœud actuel
    const currentNode = { ...node };
    delete currentNode.items; // Retirer les sous-items pour éviter la duplication

    // Récupérer les sous-items, s'ils existent
    const childNodes = node.items ? flattenNavigation(node.items) : [];

    // Retourner le nœud actuel suivi de ses sous-items
    return [currentNode, ...childNodes];
  });
};
const findBreadcrumbPath = (url: string, nodes: any[]): any[] | null => {
  for (const node of nodes) {
    // Vérifie si l'URL correspond exactement au nœud actuel
    if (node.url === url) {
      return [node];
    }

    // Recherche récursive dans les sous-items
    if (node.items) {
      const childPath = findBreadcrumbPath(url, node.items);
      if (childPath) {
        return [node, ...childPath];
      }
    }
  }

  return null; // Retourne null si aucun chemin correspondant n'est trouvé
};

const BreadcrumbCustomer = () => {
  const pathname = usePathname(); // Utilise le hook personnalisé
  const navigationNodes = flattenNavigation(data);
  const breadcrumbPath = findBreadcrumbPath(pathname, navigationNodes);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbPath ? (
          breadcrumbPath.map((node, index) => {
            const isLast = index === breadcrumbPath.length - 1;
            return (
              <React.Fragment key={node.url}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{node.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={node.url}>
                      {node.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })
        ) : (
          <BreadcrumbSeparator />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustomer;
