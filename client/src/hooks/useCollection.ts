"use client";
import { useEffect, useState } from "react";
import { CollectionTypes } from "../types/CollectionTypes";
import { useFetch } from "@/service/hooks/useFetch";

const useCollection = () => {
  const [collections, setCollections] = useState<CollectionTypes[]>([]);
  const { data, triggerFetch } = useFetch<CollectionTypes[]>("/collections");
  const getCollections = async () => {
    await triggerFetch();
  };
  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);
  return { collections, getCollections };
};
export default useCollection;
