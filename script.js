document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const dom = {
        judulScene: document.getElementById('judul-scene'),
        deskripsiKarakter: document.getElementById('deskripsi-karakter'),
        suaraKarakter: document.getElementById('suara-karakter'),
        aksiKarakter: document.getElementById('aksi-karakter'),
        ekspresiKarakter: document.getElementById('ekspresi-karakter'),
        latarTempat: document.getElementById('latar-tempat'),
        gerakanKamera: document.getElementById('gerakan-kamera'),
        detailVisual: document.getElementById('detail-visual'),
        suasana: document.getElementById('suasana'),
        suaraLingkungan: document.getElementById('suara-lingkungan'),
        dialogKarakter: document.getElementById('dialog-karakter'),
        negativePrompt: document.getElementById('negative-prompt'),
        generateBtn: document.getElementById('generate-btn'),
        outputId: document.getElementById('output-id'),
        outputEn: document.getElementById('output-en'),
        copyBtnId: document.getElementById('copy-btn-id'),
        copyBtnEn: document.getElementById('copy-btn-en'),
        mainTitle: document.getElementById('main-title'),
        changeStyleBtn: document.getElementById('change-style-btn'),
        changeTitleBtn: document.getElementById('change-title-btn'),
        gptNewStoryBtn: document.getElementById('gpt-new-story-btn'),
        gptNextSceneBtn: document.getElementById('gpt-next-scene-btn'),
        gptOutput: document.getElementById('gpt-output'),
        copyGptBtn: document.getElementById('copy-gpt-btn'),
        body: document.body
    };

    // --- DATA ---
    const cameraMovements = {
        'Static Shot': 'Gambar Diam',
        'Tracking Shot': 'Tembakan Pelacakan',
        '360 Orbit': 'Orbit 360 Derajat',
        '3D Rotation': 'Rotasi 3D',
        'Arc Left': 'Busur ke Kiri',
        'Arc Right': 'Busur ke Kanan',
        'Crane Down': 'Derek Turun',
        'Crane Up': 'Derek Naik',
        'Crash Zoom In': 'Zoom Cepat Masuk',
        'Crash Zoom Out': 'Zoom Cepat Keluar',
        'Dolly In': 'Dolly Masuk',
        'Dolly Out': 'Dolly Keluar',
        'Dolly Left': 'Dolly ke Kiri',
        'Dolly Right': 'Dolly ke Kanan',
        'Dolly Zoom In': 'Dolly Zoom Masuk',
        'Dutch Angle': 'Sudut Belanda',
        'FPV Drone': 'Drone FPV',
        'Handheld': 'Genggam',
        'Hyperlapse': 'Hyperlapse',
        'Lazy Susan': 'Lazy Susan / Meja Putar',
        'Snorricam': 'Snorricam',
        'Super Dolly In': 'Super Dolly Masuk',
        'Tilt Down': 'Miring ke Bawah',
        'Tilt Up': 'Miring ke Atas',
        'Whip Pan': 'Geser Cepat',
        'Zoom In': 'Perbesar',
        'Zoom Out': 'Perkecil'
    };
    
    const themes = ['theme-dark', 'theme-light', 'theme-blue'];
    let currentThemeIndex = 0;

    // --- INITIALIZATION ---
    function populateCameraMotions() {
        for (const [en, id] of Object.entries(cameraMovements)) {
            const option = document.createElement('option');
            option.value = en;
            option.textContent = `${en} (${id})`;
            dom.gerakanKamera.appendChild(option);
        }
    }

    function createToast() {
        const toast = document.createElement('div');
        toast.id = 'toast';
        dom.body.appendChild(toast);
        return toast;
    }
    const toastElement = createToast();

    // --- FUNCTIONS ---
    function showToast(message) {
        toastElement.textContent = message;
        toastElement.classList.add('show');
        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000);
    }

    function simpleTranslate(text) {
        // This is a very basic placeholder translation.
        // A real implementation would use a translation API.
        const translations = {
            'seorang': 'a', 'wanita': 'female', 'pria': 'male', 'muda': 'young', 'tua': 'old',
            'berusia': 'aged', 'tahun': 'years', 'tubuh': 'body', 'tinggi': 'height', 'warna': 'color',
            'kulit': 'skin', 'rambut': 'hair', 'wajah': 'face', 'mata': 'eyes', 'pakaian': 'clothing',
            'mengenakan': 'wearing', 'dan': 'and', 'di': 'at', 'dengan': 'with',
            // Add more common words as needed
        };
        // A simple word-by-word replacement
        // return text.split(' ').map(word => translations[word.toLowerCase().replace(/[,.]/g, '')] || word).join(' ');
        // For now, let's just return the original text as a better placeholder than a broken translation.
        return text;
    }

    function generatePrompt() {
        const inputs = {
            judul: dom.judulScene.value || dom.judulScene.placeholder.replace('Contoh: ', ''),
            karakter: dom.deskripsiKarakter.value || dom.deskripsiKarakter.placeholder.replace('Contoh: ', ''),
            suara: dom.suaraKarakter.value || dom.suaraKarakter.placeholder.replace('Contoh: ', ''),
            aksi: dom.aksiKarakter.value || dom.aksiKarakter.placeholder.replace('Contoh: ', ''),
            ekspresi: dom.ekspresiKarakter.value || dom.ekspresiKarakter.placeholder.replace('Contoh: ', ''),
            latar: dom.latarTempat.value || dom.latarTempat.placeholder.replace('Contoh: ', ''),
            gerakan: dom.gerakanKamera.value,
            visual: dom.detailVisual.value || dom.detailVisual.placeholder,
            suasana: dom.suasana.value || dom.suasana.placeholder.replace('Contoh: ', ''),
            lingkungan: dom.suaraLingkungan.value || dom.suaraLingkungan.placeholder.replace('Contoh: ', ''),
            dialog: dom.dialogKarakter.value || dom.dialogKarakter.placeholder.replace('Contoh: ', ''),
            negatif: dom.negativePrompt.value || dom.negativePrompt.placeholder.replace('Contoh: ', ''),
        };

        // --- Indonesian Prompt ---
        const promptId = `PROMPT KARAKTER KONSISTEN VEO3

[JUDUL SCENE: ${inputs.judul}]

[DESKRIPSI KARAKTER INTI]
${inputs.karakter}

[DETAIL SUARA KARAKTER]
${inputs.suara}

[AKSI KARAKTER]
${inputs.aksi}

[EKSPRESI KARAKTER]
${inputs.ekspresi}

[LATAR TEMPAT & WAKTU]
${inputs.latar}

[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: ${inputs.gerakan}.
${inputs.visual}

[SUASANA KESELURUHAN]
${inputs.suasana}

[SUARA LINGKUNGAN (AMBIENCE)]
${inputs.lingkungan}

[DIALOG KARAKTER]
${inputs.dialog}

[NEGATIVE PROMPT]
${inputs.negatif}`;
        
        dom.outputId.value = promptId;

        // --- English Prompt ---
        const promptEn = `CONSISTENT CHARACTER PROMPT VEO3

[SCENE TITLE: ${simpleTranslate(inputs.judul)}]

[CORE CHARACTER DESCRIPTION]
${simpleTranslate(inputs.karakter)}

[CHARACTER VOICE DETAILS]
${simpleTranslate(inputs.suara).replace('Bahasa Indonesia', 'Indonesian language')}

[CHARACTER ACTION]
${simpleTranslate(inputs.aksi)}

[CHARACTER EXPRESSION]
${simpleTranslate(inputs.ekspresi)}

[SETTING & TIME]
${simpleTranslate(inputs.latar)}

[ADDITIONAL VISUAL DETAILS]
Camera Movement: ${inputs.gerakan}.
${simpleTranslate(inputs.visual)}

[OVERALL ATMOSPHERE]
${simpleTranslate(inputs.suasana)}

[ENVIRONMENTAL SOUND (AMBIENCE)]
${simpleTranslate(inputs.lingkungan)}

[CHARACTER DIALOGUE]
${inputs.dialog}

[NEGATIVE PROMPT]
${simpleTranslate(inputs.negatif)}`;
        
        dom.outputEn.value = promptEn;
    }

    async function copyToClipboard(text, type) {
        if (!text) {
            showToast(`Tidak ada teks untuk disalin.`);
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            showToast(`Prompt ${type} berhasil disalin!`);
        } catch (err) {
            showToast('Gagal menyalin teks.');
            console.error('Failed to copy: ', err);
        }
    }
    
    function changeTheme() {
        dom.body.classList.remove(...themes);
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        dom.body.classList.add(newTheme);
        const themeName = newTheme.split('-')[1];
        showToast(`Tema diubah ke ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
    }

    function changeTitle() {
        const newTitle = prompt("Masukkan judul baru:", dom.mainTitle.textContent);
        if (newTitle) {
            dom.mainTitle.textContent = newTitle;
            showToast("Judul berhasil diubah.");
        }
    }
    
    function generateGptNewStoryPrompt() {
        const examplePrompt = dom.outputId.value || `PROMPT KARAKTER KONSISTEN VEO3

[JUDUL SCENE: terminal bus malam]
[DESKRIPSI KARAKTER INTI]
Seorang vlogger wanita muda asal Minang berusia 27 tahun.
Perawakan/Bentuk Tubuh: tubuh mungil, tinggi 158cm, bentuk badan proporsional.
warna kulit: sawo matang cerah.
Rambut: ikal sebahu, hitam kecokelatan, diikat setengah ke belakang.
Wajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural dengan sentuhan lip tint.
Pakaian: mengenakan jaket parasut warna kuning mustard dan celana panjang hitam, membawa ransel kecil.
[DETAIL SUARA KARAKTER]
Dia berbicara dengan suara wanita muda yang hangat dan penuh semangat.
Nada: mezzo-soprano.
Timbre: bersahabat dan enerjik.
Aksen/Logat: logat Indonesia dengan sentuhan khas Minang halus, berbicara murni dalam Bahasa Indonesia.
Cara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.
PENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.
[AKSI KARAKTER]
berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.
[EKSPRESI KARAKTER]
Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.
[LATAR TEMPAT & WAKTU]
latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.
Waktu: malam hari, hujan rintik-rintik.
[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: kamera tracking shot dari belakang karakter lalu menyamping dan ke depan, mengikuti langkahnya secara sinematik.
Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.
Gaya Video/Art Style: cinematic realistis.
Kualitas Visual: Resolusi 4K.
[SUASANA KESELURUHAN]
Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.
[SUARA LINGKUNGAN (AMBIENCE)]
SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.
[DIALOG KARAKTER]
DIALOG dalam Bahasa Indonesia: Karakter berkata: "Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai."
[NEGATIVE PROMPT]
Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah.`;

        const gptPrompt = `Tolong hasilkan prompt baru dengan cerita, karakter, dan lokasi yang benar-benar berbeda. Gunakan format yang sama persis seperti contoh di bawah ini. Pastikan semua bagian diisi dengan detail yang kreatif dan baru.

Contoh format:
${examplePrompt}`;
        dom.gptOutput.value = gptPrompt;
    }

    function generateGptNextScenePrompt() {
        const currentPrompt = dom.outputId.value;
        if (!currentPrompt) {
            showToast("Hasilkan prompt utama terlebih dahulu.");
            dom.gptOutput.value = "Hasilkan prompt utama di sebelah kiri, lalu klik tombol ini lagi untuk membuat prompt scene lanjutan.";
            return;
        }

        const gptPrompt = `Berikut adalah prompt untuk scene pertama. Tolong buatkan prompt untuk scene berikutnya yang konsisten dengan karakter, suara, dan gaya visual dari scene ini. Cukup ubah bagian [LATAR TEMPAT & WAKTU], [AKSI KARAKTER], [EKSPRESI KARAKTER], [GERAKAN KAMERA], dan [DIALOG KARAKTER] untuk melanjutkan cerita.

Scene Sebelumnya:
${currentPrompt}`;
        dom.gptOutput.value = gptPrompt;
    }


    // --- EVENT LISTENERS ---
    dom.generateBtn.addEventListener('click', generatePrompt);
    dom.copyBtnId.addEventListener('click', () => copyToClipboard(dom.outputId.value, 'Indonesia'));
    dom.copyBtnEn.addEventListener('click', () => copyToClipboard(dom.outputEn.value, 'English'));
    dom.changeStyleBtn.addEventListener('click', changeTheme);
    dom.changeTitleBtn.addEventListener('click', changeTitle);
    dom.gptNewStoryBtn.addEventListener('click', generateGptNewStoryPrompt);
    dom.gptNextSceneBtn.addEventListener('click', generateGptNextScenePrompt);
    dom.copyGptBtn.addEventListener('click', () => copyToClipboard(dom.gptOutput.value, 'Bantuan AI Chat'));

    // --- RUN ON STARTUP ---
    populateCameraMotions();
    generatePrompt(); // Generate initial prompt on load
}); 