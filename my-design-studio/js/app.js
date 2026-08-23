// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Fabric Canvas
    initCanvas();
    
    // Setup Sidebar Menu Interactions
    const menuItems = document.querySelectorAll('nav ul li a');
    const headerTitle = document.querySelector('header h2');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes from all items
            menuItems.forEach(nav => {
                nav.className = 'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors';
                nav.querySelector('i').classList.remove('text-blue-400');
            });
            
            // Add active classes to clicked item
            item.className = 'flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 text-blue-400';
            
            // Update header title
            const menuText = item.textContent.trim();
            headerTitle.textContent = `Editor - ${menuText}`;
        });
    });
    
    // Setup initial view
    const initialTexts = {
        headline: "Headline Produk\nAnda Disini",
        desc: "Deskripsi singkat yang menarik perhatian audiens akan muncul disini. Silakan isi form di sebelah kiri.",
        cta: "BELI SEKARANG"
    };
    updateCanvasContent(initialTexts, null, '#0f172a');
    
    // Handle Form Submission
    const form = document.getElementById('generator-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get Input Values
        const niche = document.getElementById('niche').value;
        const product = document.getElementById('product-name').value;
        const manfaat = document.getElementById('product-benefit').value;
        const target = document.getElementById('target-audience').value;
        const imageFile = document.getElementById('product-image').files[0];
        const bgColor = document.getElementById('bg-color').value;
        
        // Generate Text Variations using Copywriting DB
        const generatedTexts = generateCopywriting(niche, product, manfaat, target);
        
        // Show variations in UI
        displayTextVariations(generatedTexts, imageFile, bgColor);
        
        // Render Canvas using the first variation by default
        updateCanvasContent(generatedTexts[0], imageFile, bgColor);
    });
    
    // Handle Export
    const btnDownload = document.getElementById('btn-download');
    btnDownload.addEventListener('click', () => {
        // Change button state to indicate action
        const originalText = btnDownload.innerHTML;
        btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mengekspor...';
        
        setTimeout(() => {
            exportCanvasToPNG();
            btnDownload.innerHTML = originalText;
        }, 300); // Slight delay for UI feel
    });
});

/**
 * Display generated copywriting variations in the left panel
 */
function displayTextVariations(texts, imageFile, bgColor) {
    const wrapper = document.getElementById('text-variations');
    const container = document.getElementById('variations-container');
    
    // Clear previous variations
    container.innerHTML = '';
    wrapper.classList.remove('hidden');
    
    // Create card for each variation
    texts.forEach((textObj, index) => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition-all hover:bg-gray-800 group';
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <span class="text-xs font-semibold px-2 py-1 bg-gray-900 rounded text-gray-400 group-hover:text-blue-400">Opsi ${index + 1}</span>
            </div>
            <h4 class="font-bold text-white text-sm mb-1">${textObj.headline}</h4>
            <p class="text-xs text-gray-400 mb-3 line-clamp-2">${textObj.desc}</p>
            <span class="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-[10px] font-bold">${textObj.cta}</span>
        `;
        
        // Update canvas when card is clicked
        card.addEventListener('click', () => {
            // Re-fetch image and color in case user changed them without clicking generate
            const currentImg = document.getElementById('product-image').files[0];
            const currentBg = document.getElementById('bg-color').value;
            
            updateCanvasContent(textObj, currentImg, currentBg);
            
            // Visual feedback
            document.querySelectorAll('#variations-container > div').forEach(el => {
                el.classList.remove('border-blue-500', 'bg-gray-800');
                el.classList.add('border-gray-700');
            });
            card.classList.remove('border-gray-700');
            card.classList.add('border-blue-500', 'bg-gray-800');
        });
        
        container.appendChild(card);
    });
    
    // Highlight the first one by default
    container.firstElementChild.classList.remove('border-gray-700');
    container.firstElementChild.classList.add('border-blue-500', 'bg-gray-800');
}
