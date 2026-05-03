const propertyMapping: { [key: string]: string } = {
  "marcosmarti1980@gmail.com": "534648857", // Tienda de Tiendas (Admin)
  "tecnoeg@gmail.com": "534564663",        // Tecno EG
  "merakibiju@gmail.com": "534733481",     // Meraki
  "mbcompras@gmail.com": "534715172",      // MB Compras
  "elcampito@gmail.com": "534606659",      // El Campito
};

export function getPropertyIdByUser(email: string) {
  return propertyMapping[email] || null; 
}