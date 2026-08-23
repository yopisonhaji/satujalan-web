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

// ... existing code ...

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
