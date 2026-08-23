// Canvas Engine using Fabric.js for Client-Side Rendering

let canvas;
const CANVAS_SIZE = 1080;

function initCanvas() {
    canvas = new fabric.Canvas('design-canvas', {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        backgroundColor: '#0f172a' // Default background
    });
    
    // Scale canvas dynamically based on window size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const wrapper = document.getElementById('canvas-wrapper');
    const containerWidth = wrapper.parentElement.clientWidth - 64; // Padding
    const containerHeight = wrapper.parentElement.clientHeight - 100;
    
    // Calculate scale to fit the preview panel
    let scale = Math.min(containerWidth / CANVAS_SIZE, containerHeight / CANVAS_SIZE);
    
    // Max scale 1
    if (scale > 1) scale = 1;
    
    const canvasWrap = document.querySelector('.canvas-container');
    if (canvasWrap) {
        canvasWrap.style.transform = `scale(${scale})`;
        canvasWrap.style.transformOrigin = 'center center';
        
        // Adjust wrapper size so it doesn't take 1080px space
        wrapper.style.width = `${CANVAS_SIZE * scale}px`;
        wrapper.style.height = `${CANVAS_SIZE * scale}px`;
    }
}

function updateCanvasContent(texts, imageFile, bgColor) {
    // Clear previous items
    canvas.clear();
    
    // Set Background
    canvas.backgroundColor = bgColor;
    
    // Premium Design Elements (Glassmorphism blobs/shapes)
    const bgBlob1 = new fabric.Circle({
        radius: 400,
        fill: 'rgba(255, 255, 255, 0.03)',
        left: -150,
        top: -200,
        selectable: false
    });
    
    const bgBlob2 = new fabric.Circle({
        radius: 300,
        fill: 'rgba(255, 255, 255, 0.02)',
        left: 700,
        top: 600,
        selectable: false
    });
    
    canvas.add(bgBlob1, bgBlob2);
    
    // Render Text Group (Left Side)
    const headline = new fabric.Textbox(texts.headline, {
        left: 80,
        top: 150,
        width: 850,
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'Inter',
        fill: '#ffffff',
        lineHeight: 1.1
    });
    
    const desc = new fabric.Textbox(texts.desc, {
        left: 80,
        top: headline.top + headline.height + 40, // Auto spacing
        width: 500,
        fontSize: 32,
        fontWeight: 400,
        fontFamily: 'Inter',
        fill: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 1.4
    });
    
    // CTA Button Style
    const btnTop = desc.top + desc.height + 60;
    
    const ctaBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 320,
        height: 80,
        fill: '#3b82f6',
        rx: 40,
        ry: 40,
        shadow: new fabric.Shadow({
            color: 'rgba(59, 130, 246, 0.5)',
            blur: 20,
            offsetY: 10
        })
    });
    
    const ctaText = new fabric.Text(texts.cta, {
        left: 160,
        top: 40,
        fontSize: 26,
        fontWeight: 700,
        fontFamily: 'Inter',
        fill: '#ffffff',
        originX: 'center',
        originY: 'center'
    });
    
    const ctaGroup = new fabric.Group([ctaBg, ctaText], {
        left: 80,
        top: btnTop,
        hoverCursor: 'pointer'
    });
    
    canvas.add(headline, desc, ctaGroup);
    
    // Process Image
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(f) {
            const data = f.target.result;
            fabric.Image.fromURL(data, function(img) {
                // Resize image to fit right section
                if (img.width > 500) {
                    img.scaleToWidth(500);
                }
                
                // Position image on right side
                img.set({
                    left: 600,
                    top: 250,
                    shadow: new fabric.Shadow({
                        color: 'rgba(0, 0, 0, 0.3)',
                        blur: 30,
                        offsetX: 0,
                        offsetY: 15
                    })
                });
                
                canvas.add(img);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Placeholder if no image uploaded
        const placeholderImg = new fabric.Rect({
            left: 600,
            top: 250,
            width: 400,
            height: 500,
            fill: 'rgba(255, 255, 255, 0.05)',
            rx: 20,
            ry: 20,
            stroke: 'rgba(255, 255, 255, 0.1)',
            strokeWidth: 2,
            strokeDashArray: [10, 10]
        });
        
        const placeholderText = new fabric.Text("Area Foto\nProduk", {
            left: 800,
            top: 500,
            fontSize: 24,
            fontFamily: 'Inter',
            fill: 'rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            originX: 'center',
            originY: 'center'
        });
        
        canvas.add(placeholderImg, placeholderText);
        canvas.renderAll();
    }
}

function exportCanvasToPNG() {
    // Generate data URL at 1080x1080
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
    });
    
    // Trigger download
    const link = document.createElement('a');
    link.download = 'DesignStudio_Export_' + new Date().getTime() + '.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
