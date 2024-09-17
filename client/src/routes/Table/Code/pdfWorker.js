importScripts('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js');

self.onmessage = async function (e) {
    const { imgData, imgWidth, imgHeight, options } = e.data;

    // jsPDF доступен напрямую после импорта через importScripts
    const { jsPDF } = jspdf;

    // Создание PDF
    const doc = new jsPDF(options.jsPDF);

    // Добавляем изображение с фиксированной шириной и вычисленной высотой
    doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    const pdfBlob = doc.output('blob');

    // Отправляем PDF обратно в основной поток
    self.postMessage(pdfBlob);
};
