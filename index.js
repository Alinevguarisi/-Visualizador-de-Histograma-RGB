document.getElementById('inputImage').addEventListener('change', handleImage);

function handleImage(e) {
    const canvasRed = document.getElementById('histogramRed');
    const ctxRed = canvasRed.getContext('2d');

    const canvasGreen = document.getElementById('histogramGreen');
    const ctxGreen = canvasGreen.getContext('2d');

    const canvasBlue = document.getElementById('histogramBlue');
    const ctxBlue = canvasBlue.getContext('2d');

    const canvasGray = document.getElementById('histogramGray');
    const ctxGray = canvasGray.getContext('2d');

    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);

    img.onload = function() {
        // Red Histogram
        ctxRed.drawImage(img, 0, 0, canvasRed.width, canvasRed.height);
        const imageDataRed = ctxRed.getImageData(0, 0, canvasRed.width, canvasRed.height).data;
        const histogramDataRed = { red: [] };
        for (let i = 0; i < 256; i++) {
            histogramDataRed.red[i] = 0;
        }
        for (let i = 0; i < imageDataRed.length; i += 4) {
            histogramDataRed.red[imageDataRed[i]]++;
        }
        drawHistogram(ctxRed, histogramDataRed);

        // Green Histogram
        ctxGreen.drawImage(img, 0, 0, canvasGreen.width, canvasGreen.height);
        const imageDataGreen = ctxGreen.getImageData(0, 0, canvasGreen.width, canvasGreen.height).data;
        const histogramDataGreen = { green: [] };
        for (let i = 0; i < 256; i++) {
            histogramDataGreen.green[i] = 0;
        }
        for (let i = 0; i < imageDataGreen.length; i += 4) {
            histogramDataGreen.green[imageDataGreen[i + 1]]++;
        }
        drawHistogram(ctxGreen, histogramDataGreen);

        // Blue Histogram
        ctxBlue.drawImage(img, 0, 0, canvasBlue.width, canvasBlue.height);
        const imageDataBlue = ctxBlue.getImageData(0, 0, canvasBlue.width, canvasBlue.height).data;
        const histogramDataBlue = { blue: [] };
        for (let i = 0; i < 256; i++) {
            histogramDataBlue.blue[i] = 0;
        }
        for (let i = 0; i < imageDataBlue.length; i += 4) {
            histogramDataBlue.blue[imageDataBlue[i + 2]]++;
        }
        drawHistogram(ctxBlue, histogramDataBlue);

        // Gray Histogram
        ctxGray.drawImage(img, 0, 0, canvasGray.width, canvasGray.height);
        const imageDataGray = ctxGray.getImageData(0, 0, canvasGray.width, canvasGray.height).data;
        const histogramDataGray = { gray: [] };
        for (let i = 0; i < 256; i++) {
            histogramDataGray.gray[i] = 0;
        }
        for (let i = 0; i < imageDataGray.length; i += 4) {
            const average = (imageDataGray[i] + imageDataGray[i + 1] + imageDataGray[i + 2]) / 3;
            histogramDataGray.gray[Math.floor(average)]++;
        }
        drawHistogram(ctxGray, histogramDataGray);
    };
}

function drawHistogram(ctx, data) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const maxFrequency = Math.max(
        Math.max(...data.red || []),
        Math.max(...data.green || []),
        Math.max(...data.blue || []),
        Math.max(...data.gray || [])
    );

    for (let i = 0; i < 256; i++) {
        const redHeight = (data.red ? data.red[i] : 0) / maxFrequency * ctx.canvas.height;
        const greenHeight = (data.green ? data.green[i] : 0) / maxFrequency * ctx.canvas.height;
        const blueHeight = (data.blue ? data.blue[i] : 0) / maxFrequency * ctx.canvas.height;
        const grayHeight = (data.gray ? data.gray[i] : 0) / maxFrequency * ctx.canvas.height;

        if (data.red) {
            ctx.fillStyle = 'red';
            ctx.fillRect(i * 2, ctx.canvas.height - redHeight, 2, redHeight);
        }

        if (data.green) {
            ctx.fillStyle = 'green';
            ctx.fillRect(i * 2, ctx.canvas.height - greenHeight, 2, greenHeight);
        }

        if (data.blue) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(i * 2, ctx.canvas.height - blueHeight, 2, blueHeight);
        }

        if (data.gray) {
            ctx.fillStyle = 'gray';
            ctx.fillRect(i * 2, ctx.canvas.height - grayHeight, 2, grayHeight);
        }
    }
}
