const fs = require('fs');
const path = require('path');

const filesTags = {
    'about.html': `
    <meta name="description" content="Tentang SatuJalan IT Solutions, penyedia layanan IT dan servis elektronik 24 Jam terpercaya.">
    <meta name="keywords" content="Tentang SatuJalan, IT Solutions, Servis Elektronik, Profil Perusahaan, IT Support">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/about.html">
    <meta property="og:title" content="Tentang Kami - SatuJalan IT Solutions">
    <meta property="og:description" content="Tentang SatuJalan IT Solutions, penyedia layanan IT dan servis elektronik 24 Jam terpercaya.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">`,
    'blog.html': `
    <meta name="description" content="Blog SatuJalan IT Solutions - Temukan artikel menarik seputar teknologi, tutorial IT, dan tips servis elektronik.">
    <meta name="keywords" content="Blog IT, Artikel Teknologi, Tutorial Komputer, Tips Servis Elektronik, Berita IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/blog.html">
    <meta property="og:title" content="Blog & Artikel - SatuJalan IT Solutions">
    <meta property="og:description" content="Blog SatuJalan IT Solutions - Temukan artikel menarik seputar teknologi, tutorial IT, dan tips servis elektronik.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">`,
    'article.html': `
    <meta name="description" content="Baca artikel terbaru dari SatuJalan IT Solutions seputar perkembangan teknologi terkini.">
    <meta name="keywords" content="Artikel IT, Teknologi Terbaru, Info Gadget, Solusi IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.satujalan.id/article.html">
    <meta property="og:title" content="Artikel Teknologi - SatuJalan IT Solutions">
    <meta property="og:description" content="Baca artikel terbaru dari SatuJalan IT Solutions seputar perkembangan teknologi terkini.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">`,
    'tracking.html': `
    <meta name="description" content="Lacak status perbaikan perangkat Anda secara real-time di SatuJalan IT Solutions.">
    <meta name="keywords" content="Tracking Servis, Status Perbaikan, Cek Servis Elektronik, Lacak Perbaikan IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/tracking.html">
    <meta property="og:title" content="Tracking Servis - SatuJalan IT Solutions">
    <meta property="og:description" content="Lacak status perbaikan perangkat Anda secara real-time di SatuJalan IT Solutions.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">`,
    'tracking_en.html': `
    <meta name="description" content="Track the repair status of your device in real-time at SatuJalan IT Solutions.">
    <meta name="keywords" content="Service Tracking, Repair Status, Electronic Service Check, IT Repair Tracking">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/tracking_en.html">
    <meta property="og:title" content="Service Tracking - SatuJalan IT Solutions">
    <meta property="og:description" content="Track the repair status of your device in real-time at SatuJalan IT Solutions.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">`,
    'admin.html': `
    <meta name="robots" content="noindex, nofollow">`
};

const basePath = 'e:\\\\SJ IMAGE';

Object.entries(filesTags).forEach(([filename, tags]) => {
    const filepath = path.join(basePath, filename);
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        
        if (!content.includes('name="author" content="SatuJalan IT Solutions"') && !content.includes('name="robots" content="noindex, nofollow"')) {
            const titleMatch = content.match(/<title>.*?<\/title>/is);
            if (titleMatch) {
                const insertIndex = titleMatch.index + titleMatch[0].length;
                const newContent = content.slice(0, insertIndex) + tags + content.slice(insertIndex);
                fs.writeFileSync(filepath, newContent, 'utf8');
                console.log(\`Successfully injected SEO tags into \${filename}\`);
            } else {
                console.log(\`No <title> tag found in \${filename}\`);
            }
        } else {
            console.log(\`SEO tags already seem to exist in \${filename}\`);
        }
    } else {
        console.log(\`\${filename} not found.\`);
    }
});
