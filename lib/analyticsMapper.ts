const propertyMapping: { [key: string]: string } = {
  "marcosmarti1980@gmail.com": "534648857", // Tienda de Tiendas (Admin)
  "marcosrenemarti@gmail.com": "534564663",        // Tecno EG
  "mguiyemo@gmail.com": "534564663",        // Tecno EG
  "marielabasualdo1985@gmail.com": "534733481",     // Meraki
  "mateolucamarti3072@gmail.com": "534733481",     // Meraki
  "axel2002@gmail.com": "534715172",      // MB Compras
  "tallergraficobuongusto@gmail.com": "534715172",      // MB Compras
  "elianamarti90@gmail.com": "534606659",      // El Campito
  "exequiel.devita@gmail.com": "534606659",      // El Campito
};

export function getPropertyIdByUser(email: string) {
  return propertyMapping[email] || null; 
}