import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Link href="/panier">
      <Button className="uppercase mt-auto w-full">page panier</Button>
    </Link>
  );
};

export default Footer;
