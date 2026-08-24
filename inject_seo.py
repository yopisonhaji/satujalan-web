import re
import os

files_tags = {
    'about.html': """
    <meta name="description" content="Tentang SatuJalan IT Solutions, penyedia layanan IT dan servis elektronik 24 Jam terpercaya.">
    <meta name="keywords" content="Tentang SatuJalan, IT Solutions, Servis Elektronik, Profil Perusahaan, IT Support">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/about.html">
    <meta property="og:title" content="Tentang Kami - SatuJalan IT Solutions">
    <meta property="og:description" content="Tentang SatuJalan IT Solutions, penyedia layanan IT dan servis elektronik 24 Jam terpercaya.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">""",
    'blog.html': """
    <meta name="description" content="Blog SatuJalan IT Solutions - Temukan artikel menarik seputar teknologi, tutorial IT, dan tips servis elektronik.">
    <meta name="keywords" content="Blog IT, Artikel Teknologi, Tutorial Komputer, Tips Servis Elektronik, Berita IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/blog.html">
    <meta property="og:title" content="Blog & Artikel - SatuJalan IT Solutions">
    <meta property="og:description" content="Blog SatuJalan IT Solutions - Temukan artikel menarik seputar teknologi, tutorial IT, dan tips servis elektronik.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">""",
    'article.html': """
    <meta name="description" content="Baca artikel terbaru dari SatuJalan IT Solutions seputar perkembangan teknologi terkini.">
    <meta name="keywords" content="Artikel IT, Teknologi Terbaru, Info Gadget, Solusi IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.satujalan.id/article.html">
    <meta property="og:title" content="Artikel Teknologi - SatuJalan IT Solutions">
    <meta property="og:description" content="Baca artikel terbaru dari SatuJalan IT Solutions seputar perkembangan teknologi terkini.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">""",
    'tracking.html': """
    <meta name="description" content="Lacak status perbaikan perangkat Anda secara real-time di SatuJalan IT Solutions.">
    <meta name="keywords" content="Tracking Servis, Status Perbaikan, Cek Servis Elektronik, Lacak Perbaikan IT">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/tracking.html">
    <meta property="og:title" content="Tracking Servis - SatuJalan IT Solutions">
    <meta property="og:description" content="Lacak status perbaikan perangkat Anda secara real-time di SatuJalan IT Solutions.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">""",
    'tracking_en.html': """
    <meta name="description" content="Track the repair status of your device in real-time at SatuJalan IT Solutions.">
    <meta name="keywords" content="Service Tracking, Repair Status, Electronic Service Check, IT Repair Tracking">
    <meta name="author" content="SatuJalan IT Solutions">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.satujalan.id/tracking_en.html">
    <meta property="og:title" content="Service Tracking - SatuJalan IT Solutions">
    <meta property="og:description" content="Track the repair status of your device in real-time at SatuJalan IT Solutions.">
    <meta property="og:image" content="https://www.satujalan.id/logo.webp">""",
    'admin.html': """
    <meta name="robots" content="noindex, nofollow">"""
}

base_path = r"e:\SJ IMAGE"

for filename, tags in files_tags.items():
    filepath = os.path.join(base_path, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already injected
        if 'name="author" content="SatuJalan IT Solutions"' not in content and 'name="robots" content="noindex, nofollow"' not in content:
            # Inject tags after <title>
            match = re.search(r'(<title>.*?</title>)', content, re.IGNORECASE | re.DOTALL)
            if match:
                new_content = content[:match.end()] + tags + content[match.end():]
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Successfully injected SEO tags into {filename}")
            else:
                print(f"No <title> tag found in {filename}")
        else:
            print(f"SEO tags already seem to exist in {filename}")
    else:
        print(f"{filename} not found.")

