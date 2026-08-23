// Template Database for Smart Copywriting Engine
// Runs locally for zero-latency generation

const copywritingDB = {
    "fnb": [
        { 
            headline: "Nikmati Kesegaran {product} Hari Ini!", 
            desc: "Dibuat dari bahan pilihan untuk menemani hari-harimu. Rasakan sensasi {manfaat} di setiap tegukan.", 
            cta: "PESAN SEKARANG" 
        },
        { 
            headline: "{product} Spesial Untukmu", 
            desc: "Cocok banget buat {target} yang butuh {manfaat}. Jangan sampai kehabisan promonya!", 
            cta: "BELI PROMO" 
        },
        { 
            headline: "Rasa Juara, Harga Bersahabat!", 
            desc: "Cobain {product} yang lagi viral ini. Bikin harimu makin {manfaat} dan semangat!", 
            cta: "ORDER VIA OJOL" 
        }
    ],
    "fashion": [
        { 
            headline: "Tampil Kece dengan {product}", 
            desc: "Desain eksklusif khusus untuk {target}. Bikin kamu makin {manfaat} di setiap momen berhargamu.", 
            cta: "BELI SEKARANG" 
        },
        { 
            headline: "Gaya Maksimal, Harga Minimal", 
            desc: "Lengkapi koleksi OOTD kamu dengan {product}. Dapatkan {manfaat} instan untuk gaya harianmu!", 
            cta: "CEK KOLEKSI" 
        },
        { 
            headline: "Pusat Perhatian Ada di Kamu", 
            desc: "Kenakan {product} dan rasakan {manfaat} sepanjang hari. Tren fashion terbaru untuk {target} masa kini.", 
            cta: "BELANJA SEKARANG" 
        }
    ],
    "skincare": [
        { 
            headline: "Kulit Sehat dengan {product}", 
            desc: "Rahasia {manfaat} untuk {target}. Buktikan sendiri hasilnya dan tampil lebih percaya diri!", 
            cta: "BELI SEKARANG" 
        },
        { 
            headline: "Glow Up Jalur Instan!", 
            desc: "Rutin pakai {product} bikin wajah makin {manfaat}. Formula alami yang aman untuk kulitmu.", 
            cta: "CEK PROMO" 
        },
        { 
            headline: "Sayangi Kulitmu Hari Ini", 
            desc: "Investasi terbaik dengan {product}. Dapatkan {manfaat} tanpa efek samping, diformulasikan untuk {target}.", 
            cta: "KONSULTASI GRATIS" 
        }
    ],
    "general": [
        { 
            headline: "Solusi Terbaik: {product}", 
            desc: "Dapatkan {manfaat} sekarang juga. Sangat pas dan direkomendasikan untuk {target}.", 
            cta: "COBA SEKARANG" 
        },
        { 
            headline: "Jangan Lewatkan {product}!", 
            desc: "Satu-satunya solusi yang memberikan {manfaat} maksimal untuk {target} masa kini.", 
            cta: "BELI SEKARANG" 
        },
        { 
            headline: "Tingkatkan Kualitas dengan {product}", 
            desc: "Rasakan perbedaan nyata dan nikmati {manfaat} setiap hari. Pilihan tepat untuk {target}.", 
            cta: "PESAN DISINI" 
        }
    ]
};

/**
 * Generates variations of copywriting based on user input
 */
function generateCopywriting(niche, product, manfaat, target) {
    const templates = copywritingDB[niche] || copywritingDB["general"];
    
    return templates.map(t => {
        return {
            headline: t.headline.replace(/{product}/g, product).replace(/{manfaat}/g, manfaat).replace(/{target}/g, target),
            desc: t.desc.replace(/{product}/g, product).replace(/{manfaat}/g, manfaat).replace(/{target}/g, target),
            cta: t.cta.replace(/{product}/g, product).replace(/{manfaat}/g, manfaat).replace(/{target}/g, target)
        }
    });
}
