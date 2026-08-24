/**
 * Blog Data Management utilizing LocalStorage
 * Simulating a backend database for the demo.
 */

const BLOG_STORAGE_KEY = 'satujalan_blog_posts';

// Default Data (if empty)
const defaultPosts = [
    {
        id: '1',
        title: 'Tips Merawat Baterai Laptop Agar Awet',
        subtitle: 'Jangan biarkan baterai laptop bocor, ikuti cara ini!',
        content: `
            <p>Baterai laptop adalah komponen krusial yang sering kali cepat rusak jika tidak dirawat dengan benar. Berikut adalah beberapa tips untuk menjaga kesehatan baterai laptop Anda:</p>
            <h3>1. Jangan Biarkan Hingga 0%</h3>
            <p>Usahakan untuk mengisi daya sebelum baterai benar-benar habis. Idealnya, charge saat indikator menunjukkan 20%.</p>
            <h3>2. Hindari Overheat</h3>
            <p>Suhu panas adalah musuh utama baterai. Pastikan sirkulasi udara laptop lancar dan jangan menaruh laptop di atas kasur atau bantal saat digunakan.</p>
            <h3>3. Gunakan Charger Original</h3>
            <p>Charger non-original seringkali memiliki tegangan yang tidak stabil yang dapat merusak sel baterai.</p>
            <p>Jika baterai Anda sudah bocor atau drop, kamilah solusinya. Hubungi SatuJalan untuk penggantian baterai original bergaransi.</p>
        `,
        image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=800&q=80',
        video: '',
        date: '2026-02-01T10:00:00.000Z',
        createdAt: '2026-02-01T10:00:00.000Z',
        author: 'Rudi - Teknisi',
        category: 'Hardware',
        views: 125,
        likes: 12,
        dislikes: 0,
        comments: [
            { name: 'Budi', text: 'Sangat bermanfaat, terimakasih tipsnya gan!', date: '2026-02-01T12:00:00.000Z' }
        ]
    },
    {
        id: '2',
        title: 'Pentingnya Website untuk UMKM 2026',
        subtitle: 'Transformasi digital bukan lagi pilihan, tapi keharusan.',
        content: `
            <p>Di era digital 2026, perilaku konsumen telah berubah total. Mereka mencari produk dan jasa melalui internet sebelum memutuskan membeli.</p>
            <p>Memiliki website memberikan kredibilitas instan bagi bisnis Anda. Ini berfungsi sebagai kantor digital yang buka 24 jam sehari.</p>
            <ul>
                <li>Meningkatkan kepercayaan pelanggan.</li>
                <li>Menjangkau pasar yang lebih luas.</li>
                <li>Marketing yang lebih efektif dan terukur.</li>
            </ul>
            <p>SatuJalan menawarkan paket pembuatan website mulai dari Rp 259rb. Tidak ada alasan untuk menunda go online!</p>
        `,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        video: '',
        date: '2026-02-05T09:30:00.000Z',
        createdAt: '2026-02-05T09:30:00.000Z',
        author: 'Yopi - Developer',
        category: 'Web Dev',
        views: 89,
        likes: 5,
        dislikes: 0,
        comments: []
    },
    {
        id: '3',
        title: 'Cara Instal YouTube Downloader via Addoncrop & CRXEmulator',
        subtitle: 'Panduan bypass pasang ekstensi yang diblokir oleh Chrome Web Store.',
        content: `
            <p>Secara sederhana, gabungan dari kedua layanan tersebut berfungsi sebagai <strong>jalur alternatif (bypass) untuk memasang ekstensi browser yang diblokir oleh toko resmi (seperti Google Chrome Web Store).</strong></p>
            
            <p>Berikut adalah penjelasan fungsi masing-masing dan bagaimana keduanya bekerja sama:</p>
            
            <h3>1. Fungsi Addoncrop</h3>
            <p>Addoncrop adalah platform penyedia ekstensi <em>browser</em> pihak ketiga.</p>
            <ul>
                <li><strong>Fitur Utama:</strong> Mereka sangat terkenal dengan ekstensi <strong>YouTube Video Downloader</strong>.</li>
                <li><strong>Kendala:</strong> Karena kebijakan Google melarang keras adanya ekstensi yang bisa mengunduh video dari YouTube, ekstensi milik Addoncrop ini dihapus dan tidak bisa ditemukan di Chrome Web Store resmi.</li>
            </ul>
            
            <h3>2. Fungsi CRXEmulator</h3>
            <p>CRXEmulator (atau alat serupa seperti Foxified) bertindak sebagai "mesin virtual" atau jembatan pemasang untuk ekstensi <em>browser</em>.</p>
            <ul>
                <li><strong>Membaca File CRX:</strong> Ekstensi Chrome memiliki format file <code>.crx</code>. Browser biasanya menolak menginstal file <code>.crx</code> yang diunduh dari luar toko resmi dengan alasan keamanan.</li>
                <li><strong>Manipulasi Sistem:</strong> Emulator ini berfungsi untuk menipu <em>browser</em> agar mau menerima, membaca, dan menjalankan skrip dari file <code>.crx</code> pihak ketiga tersebut tanpa memunculkan peringatan keamanan (<em>error</em> atau <em>blocked</em>).</li>
            </ul>
            
            <hr />
            
            <h3>3. Fungsi Gabungan (Alur Kerja)</h3>
            <p>Jika digabungkan, alur kerjanya menjadi sebuah sistem instalasi yang mulus untuk alat pengunduh video:</p>
            <ol>
                <li>Pengguna ingin memasang pengunduh video YouTube dari <strong>Addoncrop</strong>.</li>
                <li>Karena tidak ada di Chrome Web Store, pengguna menginstal <strong>CRXEmulator</strong> terlebih dahulu (yang biasanya memiliki izin resmi di toko ekstensi).</li>
                <li>Addoncrop kemudian mengirimkan file berekstensi <code>.crx</code> miliknya ke dalam browser.</li>
                <li><strong>CRXEmulator menangkap file tersebut</strong> dan mengeksekusinya.</li>
                <li><strong>Hasil Akhir:</strong> Ekstensi pengunduh video Addoncrop berhasil terpasang dan tombol <em>download</em> akan muncul di bawah setiap video YouTube yang diputar, seolah-olah ekstensi tersebut diinstal secara normal.</li>
            </ol>
            <p>Singkatnya, <strong>CRXEmulator adalah "kendaraan" yang digunakan oleh Addoncrop agar alat pengunduhnya bisa menyusup dan bekerja di dalam browser pengguna.</strong></p>
            
            <hr />
            
            <h3>Cara Pemasangan Addoncrop menggunakan Emulator</h3>
            <p>Berikut adalah panduan lengkap dan mudah untuk memasang Addoncrop menggunakan bantuan Emulator (Foxified/Crosspilot) di browser Google Chrome atau Microsoft Edge:</p>
            
            <h4>Langkah 1: Proses Instalasi CRXEmulator</h4>
            <p>Agar Addoncrop dapat berjalan, Anda <strong>wajib</strong> memasang CRXEmulator terlebih dahulu sebagai jembatannya. Silakan klik tombol <strong>biru</strong> ini untuk menginstal:</p>
            <div style="margin: 20px 0;">
                <a href="https://crxemulator.com/welcome" target="_blank" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.5); text-transform: uppercase;">
                    <i class="fas fa-plug"></i> Install CRXEmulator
                </a>
            </div>
            <ol>
                <li>Buka browser Google Chrome di komputer Anda.</li>
                <li>Setelah mengklik tombol biru di atas, Anda mungkin diarahkan ke halaman Chrome Web Store.</li>
                <li>Klik tombol bertuliskan "Add to Chrome" (Tambahkan ke Chrome).</li>
                <li>Jika muncul kotak peringatan kecil, klik "Add extension" (Tambahkan Ekstensi). Tunggu hingga terpasang.</li>
            </ol>
            
            <h4>Langkah 2: Download YouTube Downloader via Addoncrop</h4>
            <p>Setelah emulator berhasil terpasang, langkah selanjutnya adalah mengunduh alat pengunduh videonya. Klik tombol <strong>orange</strong> di bawah ini:</p>
            <div style="margin: 20px 0;">
                <a href="https://addoncrop.com/v34/" target="_blank" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.5); text-transform: uppercase;">
                    <i class="fas fa-download"></i> Download Addoncrop di Sini
                </a>
            </div>
            <p>Di halaman web Addoncrop, cari dan klik tombol untuk memasang ekstensi (biasanya bertuliskan "Install via CRXEmulator" atau semacamnya).</p>
            
            <h4>Langkah 3: Berikan Izin Skrip Addoncrop</h4>
            <p>Inilah momen di mana Emulator bekerja memasukkan sistem Addoncrop ke dalam browser.</p>
            <ol>
                <li>Setelah emulator terpasang, browser biasanya akan otomatis membuka tab baru dari Addoncrop.</li>
                <li>Di layar tersebut, akan muncul permintaan izin (Permissions) untuk memasang skrip YouTube Downloader.</li>
                <li>Klik tombol "Grant Permissions" atau "Allow" (Izinkan).</li>
                <li>Selesai! Sistem pengunduh video sudah berhasil disusupkan ke dalam browser.</li>
            </ol>
            
            <h4>Langkah 4: Cara Mengunduh Video YouTube</h4>
            <p>Sekarang waktunya mencoba apakah alatnya sudah bekerja:</p>
            <ol>
                <li>Buka situs <a href="https://www.youtube.com/" target="_blank">YouTube</a> dan putar video apa saja.</li>
                <li>Perhatikan area di bawah pemutar video (di barisan tombol Like, Dislike, Share).</li>
                <li>Anda akan melihat ada tombol baru bergambar Kamera / Download.</li>
                <li>Klik tombol tersebut. Akan muncul daftar pilihan resolusi (mulai dari 360p, 720p, 1080p, hingga 4K), dan bahkan ada pilihan untuk mengunduh format MP3 jika hanya ingin mengambil audionya saja.</li>
                <li>Klik kualitas yang diinginkan, dan video akan langsung terunduh ke ruang penyimpanan lokal.</li>
            </ol>
            
            <p><strong>Catatan Penting:</strong> Terkadang, karena ini bukan fitur resmi Google, tombol tersebut bisa hilang jika YouTube memperbarui tampilan situs webnya. Jika itu terjadi, cukup tunggu beberapa hari, sistem ekstensi ini biasanya akan melakukan pembaruan otomatis di latar belakang.</p>
        `,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
        video: '',
        date: '2026-08-24T09:00:00.000Z',
        createdAt: '2026-08-24T09:00:00.000Z',
        author: 'Admin',
        category: 'Extension Browser',
        views: 0,
        likes: 0,
        dislikes: 0,
        comments: []
    }
];

// Initialize Storage
function initBlog() {
    if (!localStorage.getItem(BLOG_STORAGE_KEY)) {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaultPosts));
    } else {
        // Migration & Sanitization
        let posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
        let updated = false;
        posts = posts.map(p => {
            // Sanitize corrupt data
            if (typeof p.likes === 'object') { p.likes = 0; updated = true; }
            if (typeof p.dislikes === 'object') { p.dislikes = 0; updated = true; }
            if (typeof p.views === 'object') { p.views = 0; updated = true; }
            
            // Migrate Category for ID 3
            if (p.id === '3' && p.category === 'Tutorial') {
                p.category = 'Extension Browser';
                updated = true;
            }

            if (!p.createdAt) {
                p.createdAt = new Date().toISOString();
                p.views = 0;
                p.likes = 0;
                p.dislikes = 0;
                p.comments = [];
                updated = true;
            }
            return p;
        });
        if (updated) localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    }
}

function getPosts(sort = 'newest') {
    initBlog();
    let posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY)) || [];
    
    if (sort === 'newest') {
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
        posts.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sort === 'oldest') {
        posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return posts;
}

function getPostById(id) {
    initBlog();
    const posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY)) || [];
    return posts.find(p => p.id === id);
}

// --- Engagement Functions ---

// User Voting History Key
const USER_VOTES_KEY = 'satujalan_user_votes';

function getUserVotes() {
    return JSON.parse(localStorage.getItem(USER_VOTES_KEY)) || {};
}

function checkUserVote(id) {
    const votes = getUserVotes();
    return votes[id] || null; // returns 'like', 'dislike', or null
}

function incrementView(id) {
    const posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        posts[index].views = (posts[index].views || 0) + 1;
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    }
}

// Toggle Like
function likePost(id) {
    const userVotes = getUserVotes();
    const posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return null;

    const currentVote = userVotes[id];

    if (currentVote === 'like') {
        // Toggle Off
        posts[index].likes = Math.max(0, (posts[index].likes || 0) - 1);
        delete userVotes[id];
    } else if (currentVote === 'dislike') {
        // Swap: Dislike -> Like
        posts[index].dislikes = Math.max(0, (posts[index].dislikes || 0) - 1);
        posts[index].likes = (posts[index].likes || 0) + 1;
        userVotes[id] = 'like';
    } else {
        // New Like
        posts[index].likes = (posts[index].likes || 0) + 1;
        userVotes[id] = 'like';
    }

    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotes));

    return { likes: posts[index].likes, dislikes: posts[index].dislikes };
}

// Toggle Dislike
function dislikePost(id) {
    const userVotes = getUserVotes();
    const posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return null;

    const currentVote = userVotes[id];

    if (currentVote === 'dislike') {
        // Toggle Off
        posts[index].dislikes = Math.max(0, (posts[index].dislikes || 0) - 1);
        delete userVotes[id];
    } else if (currentVote === 'like') {
        // Swap: Like -> Dislike
        posts[index].likes = Math.max(0, (posts[index].likes || 0) - 1);
        posts[index].dislikes = (posts[index].dislikes || 0) + 1;
        userVotes[id] = 'dislike';
    } else {
        // New Dislike
        posts[index].dislikes = (posts[index].dislikes || 0) + 1;
        userVotes[id] = 'dislike';
    }

    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotes));

    return { likes: posts[index].likes, dislikes: posts[index].dislikes };
}

function addComment(id, name, text) {
    const posts = JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        const newComment = {
            name,
            text,
            date: new Date().toISOString()
        };
        if (!posts[index].comments) posts[index].comments = [];
        posts[index].comments.unshift(newComment);
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
        return newComment; // Return comment object to render immediately
    }
    return null;
}

// Helper: Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback

    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Helper: Relative Time (e.g., "2 jam yang lalu")
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return Math.floor(seconds) + " detik lalu";
}
