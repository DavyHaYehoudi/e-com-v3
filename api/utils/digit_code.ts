export const generateSixDigitCode = (): string => {
    // Générer un nombre aléatoire entre 100000 et 999999 (inclus)
    const code = String(Math.floor(100000 + Math.random() * 900000));
    return code;
  };
  