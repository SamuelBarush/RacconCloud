export default class FileIconMapper {
    constructor() {
      // Definir el mapa de extensiones e íconos
      this.iconMap = {
        pdf: require('@/assets/icons/pdf.png'),
        docx: require('@/assets/icons/docx.png'),
        doc: require('@/assets/icons/docx.png'),
        xls: require('@/assets/icons/xlsx.png'),
        xlsx: require('@/assets/icons/xlsx.png'),
        ppt: require('@/assets/icons/pptx.png'),
        pptx: require('@/assets/icons/pptx.png'),
        png: require('@/assets/icons/png.png'),
        jpg: require('@/assets/icons/png.png'),
        mp3: require('@/assets/icons/mp3.png'),
        mp4: require('@/assets/icons/mp4.png'),
        txt: require('@/assets/icons/txt.png'),
        sh : require('@/assets/icons/sh.png'),
        bat : require('@/assets/icons/bat.png'),
        c : require('@/assets/icons/c.png'),
        cs : require('@/assets/icons/cs.png'),
        cpp : require('@/assets/icons/cpp.png'),
        java : require('@/assets/icons/java.png'),
        py : require('@/assets/icons/py.png'),
        html : require('@/assets/icons/html.png'),
        css : require('@/assets/icons/css.png'),
        js : require('@/assets/icons/js.png'),
        php : require('@/assets/icons/php.png'),
        sql : require('@/assets/icons/sql.png'),
        json : require('@/assets/icons/json.png'),
        xml : require('@/assets/icons/xml.png'),
        zip : require('@/assets/icons/zip.png'),
        rar : require('@/assets/icons/rar.png'),
        ai : require('@/assets/icons/ai.png'),
        psd : require('@/assets/icons/psd.png'),
        csv : require('@/assets/icons/csv.png'),

        // Puedes añadir más extensiones e íconos aquí
      };
  
      // Definir el ícono por defecto
      this.defaultIcon = require('@/assets/icons/default.png');
    }
  
    // Método para obtener el ícono según la extensión del archivo
    getIcon(extension) {
      // Devuelve el ícono correspondiente a la extensión, o el ícono por defecto
      return this.iconMap[extension.toLowerCase()] || this.defaultIcon;
    }
  }
  