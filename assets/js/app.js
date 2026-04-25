/* ============================================================
   ABD Scooter Rental — Main JavaScript
   Features:
   - Multi-language (ID, EN, RU, DE, FR, ZH)
   - Light/Dark theme toggle
   - Pricing: Rp/USD toggle + duration toggle
   - BMI / Height-Weight Calculator + Scooter Recommender
   - Booking modal + WhatsApp integration
   - FAQ accordion
   - Fleet filter
   - AOS scroll animations
   - Navbar active link tracking
   ============================================================ */

'use strict';

/* ============================================================
   WHATSAPP CONFIG — ganti nomor di sini
============================================================ */
const WA_NUMBER = '6281322578318'; // Format: 62xxxxxxxxxx (tanpa +)

/* ============================================================
   PRICING DATA (IDR)
============================================================ */
const PRICING = {
  daily:   { scoopy: 100000, nmax: 150000, xmax: 300000 },
  weekly:  { scoopy: 450000, nmax: 900000, xmax: 1400000 },
  monthly: { scoopy: 900000, nmax: 1800000, xmax: 3700000 }
};

// USD exchange rate (approximate)
const USD_RATE = 16000;

/* ============================================================
   TRANSLATIONS
============================================================ */
const TRANSLATIONS = {
  id: {
    nav_fleet: 'Unit', nav_pricing: 'Harga', nav_calc: 'Kalkulator',
    nav_delivery: 'Delivery', nav_about: 'Tentang',
    btn_book_now: 'Booking Cepat', btn_start_book: 'Mulai Booking',
    btn_see_price: 'Lihat Harga',
    hero_badge: 'Bali • Tersedia Sekarang',
    hero_title_1: 'Explore Bali,', hero_title_2: 'Tanpa Ribet.',
    hero_desc: 'Sewa scooter yang <strong>terawat</strong>, booking <strong>cepat</strong>, dan bisa <strong>delivery</strong> ke hotel/villa kamu. Biar liburanmu fokus ke pengalaman — bukan drama transport.',
    hero_card_from: 'Mulai dari', hero_card_day: '/ hari',
    hero_most_booked: 'Paling sering dibooking', hero_touring: 'Touring friendly',
    chip_helmet: 'Helm Gratis', chip_fuel: 'Irit BBM',
    hero_delivery: 'Delivery', hero_free: 'Gratis', hero_to_hotel: 'ke hotel/villa',
    stat_happy: 'Happy Riders', stat_models: 'Model Scooter',
    stat_support: 'Support', stat_rating: 'Rating',
    scroll_down: 'Scroll ke bawah',
    trust_maintained: 'Unit servis berkala',
    trust_fast: 'Booking cepat via WhatsApp',
    trust_delivery: 'Delivery ke Canggu, Seminyak, Denpasar',
    trust_price: 'Harga transparan, no hidden cost',
    trust_24: 'Responsif 24/7',
    fleet_tag: 'Armada Kami', fleet_title: 'Pilihan Unit Scooter',
    fleet_desc: 'Dari city-ride santai sampai maxi scooter premium untuk touring. Semua terawat dan siap jalan.',
    filter_all: 'Semua', filter_city: 'City Ride', filter_maxi: 'Maxi Scooter',
    badge_best_val: 'Best Value', badge_most_booked: 'Most Booked', badge_premium: 'Premium',
    cat_city: 'City Ride', cat_maxi: 'Maxi Comfort', cat_premium: 'Premium Touring',
    scoopy_f1: 'Lincah di jalanan Bali', scoopy_f2: 'Cocok buat first timer',
    scoopy_f3: 'Harga paling ramah di kantong', scoopy_f4: 'Gampang parkir di mana aja',
    nmax_f1: 'Nyaman untuk perjalanan jauh', nmax_f2: 'Stabil dan enak dibawa',
    nmax_f3: 'Pas buat couple trip', nmax_f4: 'Pilihan paling populer di Bali',
    xmax_f1: 'Power dan postur mantap', xmax_f2: 'Cocok untuk long ride',
    xmax_f3: 'Kesan premium & berkelas', xmax_f4: 'Limited availability',
    from_text: 'Mulai dari', per_day: '/hari', btn_book: 'Book Sekarang',
    pricing_tag: 'Paket Harga', pricing_title: 'Harga Transparan, No Hidden Cost',
    pricing_desc: 'Pilih durasi yang paling cocok buat kamu. Semua harga sudah termasuk helm dan asuransi dasar.',
    dur_daily: 'Harian', dur_weekly: 'Mingguan', dur_monthly: 'Bulanan',
    pc_city_sub: 'Untuk city ride santai', pc_maxi_sub: 'Maxi comfort untuk touring',
    pc_premium_sub: 'Premium touring experience', pc_per_day: '/hari',
    most_popular: 'Paling Populer',
    inc_helmet: 'Helm gratis', inc_insurance: 'Asuransi dasar',
    inc_delivery: 'Delivery tersedia', inc_24: 'Support 24/7',
    inc_raincoat: 'Jas hujan tersedia', inc_priority: 'Priority booking',
    pricing_note: '* Harga bisa <strong>negotiable</strong> tergantung durasi, stok, dan periode. Chat aja langsung!',
    calc_tag: 'Smart Recommender', calc_title: 'Cari Scooter yang Pas buat Kamu',
    calc_desc: 'Masukkan tinggi dan berat badan kamu — kami rekomendasikan scooter yang paling nyaman dan aman.',
    calc_widget_title: 'Kalkulator Fisik & Rekomendasi Scooter',
    calc_widget_sub: 'Temukan scooter yang ergonomis untuk postur tubuh kamu',
    calc_unit_label: 'Satuan:', unit_metric: 'cm / kg', unit_imperial: 'ft / lbs',
    calc_height: 'Tinggi Badan', calc_weight: 'Berat Badan',
    bmi_label: 'BMI Index', bmi_category: 'Kategori',
    rec_title: '🛵 Rekomendasi Scooter', calc_btn: 'Hitung & Rekomendasikan',
    del_tag: 'Layanan Delivery', del_title: 'Delivery ke Hotel / Villa? Bisa.',
    del_desc: 'Tinggal kirim lokasi + jam, kita antar unit ke tempatmu. Biar kamu nggak buang waktu cari rental waktu liburan.',
    del_f1_title: 'Area Bali (sesuai kesepakatan)', del_f1_desc: 'Canggu, Seminyak, Kuta, Denpasar, Ubud & sekitarnya',
    del_f2_title: 'Penjadwalan Fleksibel', del_f2_desc: 'Atur waktu delivery sesuai jam landing atau check-in kamu',
    del_f3_title: 'Admin Super Responsif', del_f3_desc: 'Konfirmasi cepat via WhatsApp, no drama',
    del_f4_title: 'Sudah Termasuk Helm & Dokumen', del_f4_desc: 'Semua lengkap saat unit tiba di lokasi kamu',
    btn_req_del: 'Request Delivery via WhatsApp',
    del_card_title: 'Delivery ke mana aja di Bali',
    del_card_sub: 'Hotel, villa, bandara, port — tinggal bilang!',
    about_tag: 'Tentang Kami', about_title: 'ABD Scooter Rental', about_tagline: 'Bali, but make it freedom. 🌴',
    about_body: 'ABD Scooter Rental hadir untuk memberikan solusi transportasi yang praktis dan andal bagi siapapun yang ingin menjelajahi Bali dengan kebebasan penuh. Kami menawarkan koleksi scooter terawat yang nyaman untuk perjalanan wisata maupun aktivitas harian.<br><br>Layanan kami mencakup sewa harian, mingguan, dan bulanan dengan proses booking yang simpel dan cepat. Kami juga menyediakan layanan delivery ke hotel, villa, dan lokasi pilihan di seluruh Bali.',
    stat_customers: 'Customers', stat_years: 'Tahun Pengalaman',
    testi_tag: 'Ulasan Pelanggan', testi_title: 'Kata Mereka tentang ABD',
    testi_desc: 'Ribuan rider sudah mempercayakan perjalanan Bali mereka kepada kami.',
    testi_1: '"Best Bali bike rental indeed! Complete collection of bikes, friendly staffs, seamless processes. Definitely the best Bali bike rental in Canggu and Seminyak area."',
    testi_2: '"Great service! Responsive staff, bikes in a very good condition. Will be coming back again and can definitely recommend to everyone visiting Bali."',
    testi_3: '"Super easy booking via WhatsApp. The NMAX was in perfect condition, delivered right to my villa in Seminyak. 100% will use again next trip!"',
    testi_4: '"Sehr guter Service! Das Motorrad war in top Zustand und die Lieferung zum Hotel hat perfekt geklappt. Transparent pricing, keine versteckten Kosten!"',
    testi_5: '"Harga yang sangat bersahabat! Sewa sebulan penuh, NMAX terawat banget. Staff responsif dan proses booking cepat. Wajib coba kalau ke Bali!"',
    testi_6: '"Excellent! The XMAX was exactly what I needed for my 2-week Bali trip. Powerful, comfortable, and the delivery to Ubud was seamless. Highly recommend!"',
    faq_title: 'Pertanyaan yang Sering Muncul', faq_desc: 'Biar kamu makin yakin sebelum booking.',
    faq_q1: 'Bisa sewa harian / mingguan / bulanan?', faq_a1: 'Bisa. Kamu tinggal pilih durasi yang paling cocok — harga mengikuti durasi (lihat bagian Harga). Untuk sewa bulanan, harga bisa sangat kompetitif dan negotiable.',
    faq_q2: 'Bisa delivery ke hotel/villa?', faq_a2: 'Bisa. Kirim lokasi + jam yang diinginkan via WhatsApp, nanti kami atur pengantaran sesuai kesepakatan. Kami melayani area Canggu, Seminyak, Kuta, Denpasar, Ubud, dan sekitarnya.',
    faq_q3: 'Harga bisa nego?', faq_a3: 'Bisa negotiable untuk beberapa kondisi seperti durasi panjang, booking beberapa unit sekaligus, atau periode low season.',
    faq_q4: 'Cara booking paling cepat gimana?', faq_a4: 'Klik tombol "Booking Cepat" atau "Book Sekarang", isi form singkat, lalu pesan otomatis terformat akan dikirim ke WhatsApp kami.',
    faq_q5: 'Dokumen apa yang diperlukan?', faq_a5: 'Cukup KTP/Paspor dan SIM (A atau internasional). Kami menyiapkan rental agreement yang jelas dan transparan.',
    faq_q6: 'Apakah ada deposit?', faq_a6: 'Ada deposit kecil sebagai jaminan, dikembalikan penuh saat pengembalian unit dalam kondisi baik.',
    faq_q7: 'Pembayaran bisa pakai USD?', faq_a7: 'Bisa! Kami menerima pembayaran dalam IDR (Rupiah) maupun USD (Dollar). Kurs disesuaikan saat konfirmasi booking.',
    cta_title: 'Siap Explore Bali?', cta_desc: 'Booking sekarang via WhatsApp — proses cepat, unit siap jalan, dan kami siap antar ke lokasi kamu.',
    btn_chat_wa: 'Chat via WhatsApp', btn_quick_book: 'Booking Cepat',
    footer_tagline: 'Solusi transportasi praktis untuk menjelajahi Bali dengan kebebasan penuh.',
    footer_services: 'Layanan', footer_daily: 'Sewa Harian', footer_weekly: 'Sewa Mingguan',
    footer_monthly: 'Sewa Bulanan', footer_delivery_link: 'Delivery Service',
    footer_info: 'Informasi', footer_about: 'Tentang Kami', footer_pricing: 'Harga & Paket',
    footer_faq: 'FAQ', footer_testi: 'Ulasan',
    footer_contact: 'Kontak', footer_location: 'Bali, Indonesia',
    footer_copy: '© 2024 ABD Scooter Rental. All rights reserved.',
    modal_title: '🛵 Booking Cepat',
    form_name: 'Nama Lengkap', form_whatsapp: 'Nomor WhatsApp',
    form_scooter: 'Pilih Scooter', form_start: 'Tanggal Mulai',
    form_end: 'Tanggal Selesai', form_location: 'Lokasi Delivery (Hotel/Villa)',
    form_notes: 'Catatan Tambahan', btn_send_wa: 'Kirim via WhatsApp',
    bmi_underweight: 'Kurus', bmi_normal: 'Normal', bmi_overweight: 'Berlebih', bmi_obese: 'Obesitas',
  },
  en: {
    nav_fleet: 'Fleet', nav_pricing: 'Pricing', nav_calc: 'Calculator',
    nav_delivery: 'Delivery', nav_about: 'About',
    btn_book_now: 'Quick Book', btn_start_book: 'Start Booking', btn_see_price: 'See Pricing',
    hero_badge: 'Bali • Available Now',
    hero_title_1: 'Explore Bali,', hero_title_2: 'Hassle-Free.',
    hero_desc: 'Rent a well-<strong>maintained</strong> scooter, <strong>fast</strong> booking, and <strong>delivery</strong> to your hotel/villa. Keep your holiday focused on experiences — not transport drama.',
    hero_card_from: 'Starting from', hero_card_day: '/ day',
    hero_most_booked: 'Most booked', hero_touring: 'Touring friendly',
    chip_helmet: 'Free Helmet', chip_fuel: 'Fuel Efficient',
    hero_delivery: 'Delivery', hero_free: 'Free', hero_to_hotel: 'to hotel/villa',
    stat_happy: 'Happy Riders', stat_models: 'Scooter Models',
    stat_support: 'Support', stat_rating: 'Rating',
    scroll_down: 'Scroll down',
    trust_maintained: 'Regularly serviced units',
    trust_fast: 'Fast booking via WhatsApp',
    trust_delivery: 'Delivery to Canggu, Seminyak, Denpasar',
    trust_price: 'Transparent pricing, no hidden cost',
    trust_24: 'Responsive 24/7',
    fleet_tag: 'Our Fleet', fleet_title: 'Choose Your Scooter',
    fleet_desc: 'From casual city rides to premium maxi scooters for touring. All well-maintained and road-ready.',
    filter_all: 'All', filter_city: 'City Ride', filter_maxi: 'Maxi Scooter',
    badge_best_val: 'Best Value', badge_most_booked: 'Most Booked', badge_premium: 'Premium',
    cat_city: 'City Ride', cat_maxi: 'Maxi Comfort', cat_premium: 'Premium Touring',
    scoopy_f1: 'Nimble on Bali roads', scoopy_f2: 'Perfect for first timers',
    scoopy_f3: 'Most budget-friendly price', scoopy_f4: 'Easy to park everywhere',
    nmax_f1: 'Comfortable for long rides', nmax_f2: 'Stable and smooth to ride',
    nmax_f3: 'Perfect for couple trips', nmax_f4: 'Most popular choice in Bali',
    xmax_f1: 'Powerful and great posture', xmax_f2: 'Ideal for long rides',
    xmax_f3: 'Premium feel and class', xmax_f4: 'Limited availability',
    from_text: 'Starting from', per_day: '/day', btn_book: 'Book Now',
    pricing_tag: 'Pricing Plans', pricing_title: 'Transparent Pricing, No Hidden Cost',
    pricing_desc: 'Choose the duration that suits you best. All prices include helmet and basic insurance.',
    dur_daily: 'Daily', dur_weekly: 'Weekly', dur_monthly: 'Monthly',
    pc_city_sub: 'For casual city rides', pc_maxi_sub: 'Maxi comfort for touring',
    pc_premium_sub: 'Premium touring experience', pc_per_day: '/day',
    most_popular: 'Most Popular',
    inc_helmet: 'Free helmet', inc_insurance: 'Basic insurance',
    inc_delivery: 'Delivery available', inc_24: '24/7 support',
    inc_raincoat: 'Raincoat available', inc_priority: 'Priority booking',
    pricing_note: '* Prices are <strong>negotiable</strong> depending on duration, availability, and season.',
    calc_tag: 'Smart Recommender', calc_title: 'Find the Perfect Scooter for You',
    calc_desc: 'Enter your height and weight — we\'ll recommend the most comfortable and safe scooter.',
    calc_widget_title: 'Body & Scooter Recommender',
    calc_widget_sub: 'Find the most ergonomic scooter for your body type',
    calc_unit_label: 'Units:', unit_metric: 'cm / kg', unit_imperial: 'ft / lbs',
    calc_height: 'Height', calc_weight: 'Weight',
    bmi_label: 'BMI Index', bmi_category: 'Category',
    rec_title: '🛵 Scooter Recommendation', calc_btn: 'Calculate & Recommend',
    del_tag: 'Delivery Service', del_title: 'Delivery to Hotel / Villa? Absolutely.',
    del_desc: 'Just send us your location + time, and we\'ll deliver the unit to you. No time wasted hunting for a rental.',
    del_f1_title: 'All Bali Areas (by agreement)', del_f1_desc: 'Canggu, Seminyak, Kuta, Denpasar, Ubud & surroundings',
    del_f2_title: 'Flexible Scheduling', del_f2_desc: 'Schedule delivery to match your landing or check-in time',
    del_f3_title: 'Super Responsive Admin', del_f3_desc: 'Fast confirmation via WhatsApp, no drama',
    del_f4_title: 'Helmet & Documents Included', del_f4_desc: 'Everything ready when the unit arrives at your location',
    btn_req_del: 'Request Delivery via WhatsApp',
    del_card_title: 'Delivery anywhere in Bali',
    del_card_sub: 'Hotel, villa, airport, port — just say where!',
    about_tag: 'About Us', about_title: 'ABD Scooter Rental', about_tagline: 'Bali, but make it freedom. 🌴',
    about_body: 'ABD Scooter Rental provides a practical and reliable transportation solution for anyone who wants to explore Bali with greater freedom and flexibility. We offer a range of well-maintained scooters that are comfortable and ready to use for both travel and daily activities.<br><br>Our services include daily, weekly, and monthly scooter rentals with a simple and fast booking process. We also provide delivery to hotels, villas, and selected locations around Bali.',
    stat_customers: 'Customers', stat_years: 'Years Experience',
    testi_tag: 'Customer Reviews', testi_title: 'What They Say About ABD',
    testi_desc: 'Thousands of riders have trusted us for their Bali adventures.',
    testi_1: '"Best Bali bike rental indeed! Complete collection of bikes, friendly staffs, seamless processes. Definitely the best in Canggu and Seminyak area."',
    testi_2: '"Great service! Responsive staff, bikes in a very good condition. Will be coming back again and can definitely recommend to everyone visiting Bali."',
    testi_3: '"Super easy booking via WhatsApp. The NMAX was in perfect condition, delivered right to my villa in Seminyak. 100% will use again next trip!"',
    testi_4: '"Excellent service! The motorcycle was in top condition and hotel delivery worked perfectly. Transparent pricing, no hidden costs!"',
    testi_5: '"Very affordable prices! Monthly rental of NMAX, well-maintained. Responsive staff and fast booking process. A must-try when in Bali!"',
    testi_6: '"Excellent! The XMAX was exactly what I needed for my 2-week Bali trip. Powerful, comfortable, and the delivery to Ubud was seamless. Highly recommend!"',
    faq_title: 'Frequently Asked Questions', faq_desc: 'Everything you need to know before booking.',
    faq_q1: 'Can I rent daily / weekly / monthly?', faq_a1: 'Yes! Just choose the duration that suits you best — price follows duration (see Pricing section). For monthly rentals, prices are very competitive and negotiable.',
    faq_q2: 'Can you deliver to my hotel/villa?', faq_a2: 'Absolutely. Send us your location + preferred time via WhatsApp, and we\'ll arrange delivery. We serve Canggu, Seminyak, Kuta, Denpasar, Ubud, and surrounding areas.',
    faq_q3: 'Is the price negotiable?', faq_a3: 'Yes, prices are negotiable for certain conditions like long duration, booking multiple units, or low season periods.',
    faq_q4: 'What is the fastest way to book?', faq_a4: 'Click "Quick Book" or "Book Now", fill in the short form, and an auto-formatted message will be sent to our WhatsApp.',
    faq_q5: 'What documents are required?', faq_a5: 'Just your ID/Passport and driver\'s license (A or international). We prepare a clear rental agreement.',
    faq_q6: 'Is there a deposit?', faq_a6: 'There\'s a small deposit as security, fully returned when the unit is returned in good condition.',
    faq_q7: 'Can I pay in USD?', faq_a7: 'Yes! We accept both IDR (Rupiah) and USD (Dollar). Exchange rate will be confirmed at booking.',
    cta_title: 'Ready to Explore Bali?', cta_desc: 'Book now via WhatsApp — fast process, unit ready, and we\'ll deliver to your location.',
    btn_chat_wa: 'Chat via WhatsApp', btn_quick_book: 'Quick Book',
    footer_tagline: 'Practical transportation solution to explore Bali with full freedom.',
    footer_services: 'Services', footer_daily: 'Daily Rental', footer_weekly: 'Weekly Rental',
    footer_monthly: 'Monthly Rental', footer_delivery_link: 'Delivery Service',
    footer_info: 'Information', footer_about: 'About Us', footer_pricing: 'Pricing & Packages',
    footer_faq: 'FAQ', footer_testi: 'Reviews',
    footer_contact: 'Contact', footer_location: 'Bali, Indonesia',
    footer_copy: '© 2024 ABD Scooter Rental. All rights reserved.',
    modal_title: '🛵 Quick Booking',
    form_name: 'Full Name', form_whatsapp: 'WhatsApp Number',
    form_scooter: 'Choose Scooter', form_start: 'Start Date',
    form_end: 'End Date', form_location: 'Delivery Location (Hotel/Villa)',
    form_notes: 'Additional Notes', btn_send_wa: 'Send via WhatsApp',
    bmi_underweight: 'Underweight', bmi_normal: 'Normal', bmi_overweight: 'Overweight', bmi_obese: 'Obese',
  },
  ru: {
    nav_fleet: 'Мотоциклы', nav_pricing: 'Цены', nav_calc: 'Калькулятор',
    nav_delivery: 'Доставка', nav_about: 'О нас',
    btn_book_now: 'Быстрый заказ', btn_start_book: 'Забронировать', btn_see_price: 'Цены',
    hero_badge: 'Бали • Доступно сейчас',
    hero_title_1: 'Исследуй Бали,', hero_title_2: 'Без лишних хлопот.',
    hero_desc: 'Аренда <strong>ухоженного</strong> скутера, <strong>быстрое</strong> бронирование и <strong>доставка</strong> в отель/виллу.',
    hero_card_from: 'От', hero_card_day: '/ день',
    hero_most_booked: 'Самый популярный', hero_touring: 'Для туров',
    chip_helmet: 'Шлем бесплатно', chip_fuel: 'Экономичный',
    hero_delivery: 'Доставка', hero_free: 'Бесплатно', hero_to_hotel: 'в отель/виллу',
    stat_happy: 'Довольных клиентов', stat_models: 'Модели скутеров',
    stat_support: 'Поддержка', stat_rating: 'Рейтинг',
    scroll_down: 'Прокрутить вниз',
    trust_maintained: 'Регулярное техобслуживание',
    trust_fast: 'Быстрое бронирование через WhatsApp',
    trust_delivery: 'Доставка на Бали',
    trust_price: 'Прозрачные цены, без скрытых платежей',
    trust_24: 'Поддержка 24/7',
    fleet_tag: 'Наш Парк', fleet_title: 'Выберите Скутер',
    fleet_desc: 'От городских поездок до премиальных максискутеров. Все в отличном состоянии.',
    filter_all: 'Все', filter_city: 'Городской', filter_maxi: 'Макси-скутер',
    badge_best_val: 'Лучшая цена', badge_most_booked: 'Популярный', badge_premium: 'Премиум',
    cat_city: 'Городской', cat_maxi: 'Макси Комфорт', cat_premium: 'Премиум тур',
    scoopy_f1: 'Маневренный на дорогах Бали', scoopy_f2: 'Идеально для новичков',
    scoopy_f3: 'Самая доступная цена', scoopy_f4: 'Легко парковать везде',
    nmax_f1: 'Комфортен для длительных поездок', nmax_f2: 'Стабильный и плавный ход',
    nmax_f3: 'Идеален для пар', nmax_f4: 'Самый популярный выбор на Бали',
    xmax_f1: 'Мощный и удобная посадка', xmax_f2: 'Идеален для длинных маршрутов',
    xmax_f3: 'Премиальное ощущение', xmax_f4: 'Ограниченная доступность',
    from_text: 'От', per_day: '/день', btn_book: 'Забронировать',
    pricing_tag: 'Тарифные планы', pricing_title: 'Прозрачные цены, без скрытых платежей',
    pricing_desc: 'Выберите подходящую продолжительность. Все цены включают шлем и базовую страховку.',
    dur_daily: 'Ежедневно', dur_weekly: 'Еженедельно', dur_monthly: 'Ежемесячно',
    pc_city_sub: 'Для городских поездок', pc_maxi_sub: 'Макси-комфорт для туров',
    pc_premium_sub: 'Премиальный опыт', pc_per_day: '/день',
    most_popular: 'Самый популярный',
    inc_helmet: 'Шлем бесплатно', inc_insurance: 'Базовая страховка',
    inc_delivery: 'Доставка доступна', inc_24: 'Поддержка 24/7',
    inc_raincoat: 'Дождевик доступен', inc_priority: 'Приоритетное бронирование',
    pricing_note: '* Цены <strong>договорные</strong> в зависимости от продолжительности и сезона.',
    calc_tag: 'Умный подбор', calc_title: 'Найдите Идеальный Скутер',
    calc_desc: 'Введите рост и вес — мы порекомендуем наиболее удобный и безопасный скутер.',
    calc_widget_title: 'Калькулятор тела и подбор скутера',
    calc_widget_sub: 'Найдите эргономичный скутер для вашего типа телосложения',
    calc_unit_label: 'Единицы:', unit_metric: 'см / кг', unit_imperial: 'фут / фунт',
    calc_height: 'Рост', calc_weight: 'Вес',
    bmi_label: 'ИМТ', bmi_category: 'Категория',
    rec_title: '🛵 Рекомендация скутера', calc_btn: 'Рассчитать и Рекомендовать',
    del_tag: 'Служба доставки', del_title: 'Доставка в отель/виллу? Без проблем.',
    del_desc: 'Просто отправьте нам местоположение + время, и мы доставим скутер к вам.',
    del_f1_title: 'Весь Бали (по договоренности)', del_f1_desc: 'Чангу, Семиньяк, Кута, Денпасар, Убуд и окрестности',
    del_f2_title: 'Гибкое расписание', del_f2_desc: 'Выберите время доставки под ваш прилет или заезд',
    del_f3_title: 'Отзывчивый администратор', del_f3_desc: 'Быстрое подтверждение через WhatsApp',
    del_f4_title: 'Шлем и документы включены', del_f4_desc: 'Всё готово при прибытии скутера',
    btn_req_del: 'Запросить доставку через WhatsApp',
    del_card_title: 'Доставка куда угодно на Бали',
    del_card_sub: 'Отель, вилла, аэропорт — просто скажите куда!',
    about_tag: 'О нас', about_title: 'ABD Scooter Rental', about_tagline: 'Бали с полной свободой. 🌴',
    about_body: 'ABD Scooter Rental предоставляет практичное и надежное транспортное решение для тех, кто хочет исследовать Бали с полной свободой. Мы предлагаем ухоженные скутеры для путешествий и ежедневного использования.<br><br>Наши услуги включают ежедневную, еженедельную и ежемесячную аренду с простым процессом бронирования. Мы также доставляем скутеры в отели, виллы и выбранные места по всему Бали.',
    stat_customers: 'Клиентов', stat_years: 'Лет опыта',
    testi_tag: 'Отзывы', testi_title: 'Что говорят о нас',
    testi_desc: 'Тысячи райдеров доверили нам свои приключения на Бали.',
    testi_1: '"Лучшая аренда велосипедов на Бали! Полная коллекция байков, дружелюбный персонал, беспроблемные процессы."',
    testi_2: '"Отличный сервис! Отзывчивый персонал, байки в очень хорошем состоянии. Вернусь снова и советую всем!"',
    testi_3: '"Очень удобное бронирование через WhatsApp. NMAX в идеальном состоянии, доставлен прямо на виллу."',
    testi_4: '"Отличный сервис! Мотоцикл в топ состоянии, доставка в отель прошла идеально. Прозрачные цены!"',
    testi_5: '"Очень доступные цены! Месячная аренда NMAX, ухоженный. Отзывчивый персонал. Обязательно попробуйте!"',
    testi_6: '"Превосходно! XMAX был именно тем, что мне было нужно для 2-недельной поездки по Бали. Рекомендую!"',
    faq_title: 'Часто задаваемые вопросы', faq_desc: 'Всё, что нужно знать перед бронированием.',
    faq_q1: 'Можно арендовать на день/неделю/месяц?', faq_a1: 'Да! Просто выберите подходящую продолжительность.',
    faq_q2: 'Можно ли доставить в отель/виллу?', faq_a2: 'Конечно. Отправьте нам местоположение + время через WhatsApp.',
    faq_q3: 'Цена договорная?', faq_a3: 'Да, цены договорные при длительной аренде или нескольких единицах.',
    faq_q4: 'Как быстрее всего забронировать?', faq_a4: 'Нажмите "Быстрый заказ", заполните короткую форму.',
    faq_q5: 'Какие документы нужны?', faq_a5: 'Паспорт и водительское удостоверение (национальное или международное).',
    faq_q6: 'Есть ли залог?', faq_a6: 'Небольшой залог, возвращается полностью при возврате в хорошем состоянии.',
    faq_q7: 'Можно платить в долларах?', faq_a7: 'Да! Принимаем IDR и USD. Курс уточняется при бронировании.',
    cta_title: 'Готовы исследовать Бали?', cta_desc: 'Бронируйте сейчас через WhatsApp — быстрый процесс, скутер готов к доставке.',
    btn_chat_wa: 'Написать в WhatsApp', btn_quick_book: 'Быстрый заказ',
    footer_tagline: 'Практичное транспортное решение для исследования Бали с полной свободой.',
    footer_services: 'Услуги', footer_daily: 'Суточная аренда', footer_weekly: 'Недельная аренда',
    footer_monthly: 'Месячная аренда', footer_delivery_link: 'Служба доставки',
    footer_info: 'Информация', footer_about: 'О нас', footer_pricing: 'Цены и тарифы',
    footer_faq: 'FAQ', footer_testi: 'Отзывы',
    footer_contact: 'Контакты', footer_location: 'Бали, Индонезия',
    footer_copy: '© 2024 ABD Scooter Rental. Все права защищены.',
    modal_title: '🛵 Быстрое бронирование',
    form_name: 'Полное имя', form_whatsapp: 'Номер WhatsApp',
    form_scooter: 'Выберите скутер', form_start: 'Дата начала',
    form_end: 'Дата окончания', form_location: 'Место доставки (отель/вилла)',
    form_notes: 'Дополнительные заметки', btn_send_wa: 'Отправить в WhatsApp',
    bmi_underweight: 'Недостаточный вес', bmi_normal: 'Нормальный', bmi_overweight: 'Избыточный вес', bmi_obese: 'Ожирение',
  },
  de: {
    nav_fleet: 'Flotte', nav_pricing: 'Preise', nav_calc: 'Rechner',
    nav_delivery: 'Lieferung', nav_about: 'Über uns',
    btn_book_now: 'Schnell buchen', btn_start_book: 'Jetzt buchen', btn_see_price: 'Preise ansehen',
    hero_badge: 'Bali • Jetzt verfügbar',
    hero_title_1: 'Erkunde Bali,', hero_title_2: 'Stressfrei.',
    hero_desc: 'Miete einen gut <strong>gewarteten</strong> Roller, <strong>schnelle</strong> Buchung und <strong>Lieferung</strong> zu deinem Hotel/Villa.',
    hero_card_from: 'Ab', hero_card_day: '/ Tag',
    hero_most_booked: 'Am häufigsten gebucht', hero_touring: 'Tourenfreundlich',
    chip_helmet: 'Helm gratis', chip_fuel: 'Kraftstoffsparend',
    hero_delivery: 'Lieferung', hero_free: 'Kostenlos', hero_to_hotel: 'zum Hotel/Villa',
    stat_happy: 'Zufriedene Fahrer', stat_models: 'Rollermodelle',
    stat_support: 'Support', stat_rating: 'Bewertung',
    scroll_down: 'Nach unten scrollen',
    trust_maintained: 'Regelmäßig gewartet',
    trust_fast: 'Schnelle Buchung via WhatsApp',
    trust_delivery: 'Lieferung in ganz Bali',
    trust_price: 'Transparente Preise, keine versteckten Kosten',
    trust_24: 'Reaktionsschnell 24/7',
    fleet_tag: 'Unsere Flotte', fleet_title: 'Wähle deinen Roller',
    fleet_desc: 'Von entspannten Stadtfahrten bis zu Premium-Maxiscootern fürs Touring.',
    filter_all: 'Alle', filter_city: 'Stadtfahrt', filter_maxi: 'Maxi-Roller',
    badge_best_val: 'Bestes Preis-Leistungs', badge_most_booked: 'Am beliebtesten', badge_premium: 'Premium',
    cat_city: 'Stadtfahrt', cat_maxi: 'Maxi Komfort', cat_premium: 'Premium Touring',
    scoopy_f1: 'Wendig auf Balis Straßen', scoopy_f2: 'Ideal für Einsteiger',
    scoopy_f3: 'Günstigster Preis', scoopy_f4: 'Einfach überall zu parken',
    nmax_f1: 'Komfortabel für lange Fahrten', nmax_f2: 'Stabil und angenehm',
    nmax_f3: 'Perfekt für Paare', nmax_f4: 'Beliebteste Wahl in Bali',
    xmax_f1: 'Kraftvoll und tolle Sitzposition', xmax_f2: 'Ideal für Langstrecken',
    xmax_f3: 'Premium-Feeling', xmax_f4: 'Begrenzte Verfügbarkeit',
    from_text: 'Ab', per_day: '/Tag', btn_book: 'Jetzt buchen',
    pricing_tag: 'Preispläne', pricing_title: 'Transparente Preise, keine versteckten Kosten',
    pricing_desc: 'Wähle die Dauer, die am besten zu dir passt. Alle Preise inklusive Helm und Grundversicherung.',
    dur_daily: 'Täglich', dur_weekly: 'Wöchentlich', dur_monthly: 'Monatlich',
    pc_city_sub: 'Für entspannte Stadtfahrten', pc_maxi_sub: 'Maxi-Komfort fürs Touring',
    pc_premium_sub: 'Premium Touring Erfahrung', pc_per_day: '/Tag',
    most_popular: 'Am beliebtesten',
    inc_helmet: 'Helm gratis', inc_insurance: 'Grundversicherung',
    inc_delivery: 'Lieferung verfügbar', inc_24: '24/7 Support',
    inc_raincoat: 'Regenponcho verfügbar', inc_priority: 'Prioritätsbuchung',
    pricing_note: '* Preise sind <strong>verhandelbar</strong> je nach Dauer und Verfügbarkeit.',
    calc_tag: 'Intelligente Empfehlung', calc_title: 'Finde den perfekten Roller',
    calc_desc: 'Gib deine Körpergröße und dein Gewicht ein — wir empfehlen den komfortabelsten Roller.',
    calc_widget_title: 'Körper & Roller Empfehler',
    calc_widget_sub: 'Finde den ergonomischsten Roller für deinen Körpertyp',
    calc_unit_label: 'Einheiten:', unit_metric: 'cm / kg', unit_imperial: 'ft / lbs',
    calc_height: 'Körpergröße', calc_weight: 'Gewicht',
    bmi_label: 'BMI Index', bmi_category: 'Kategorie',
    rec_title: '🛵 Roller-Empfehlung', calc_btn: 'Berechnen & Empfehlen',
    del_tag: 'Lieferservice', del_title: 'Lieferung zum Hotel/Villa? Klar doch.',
    del_desc: 'Schick uns einfach Standort + Uhrzeit, wir liefern den Roller zu dir.',
    del_f1_title: 'Ganz Bali (nach Vereinbarung)', del_f1_desc: 'Canggu, Seminyak, Kuta, Denpasar, Ubud und Umgebung',
    del_f2_title: 'Flexible Terminplanung', del_f2_desc: 'Lieferzeit passend zu deiner Ankunft',
    del_f3_title: 'Schnelle Rückmeldung', del_f3_desc: 'Schnelle Bestätigung via WhatsApp',
    del_f4_title: 'Helm & Dokumente inklusive', del_f4_desc: 'Alles bereit wenn der Roller ankommt',
    btn_req_del: 'Lieferung via WhatsApp anfragen',
    del_card_title: 'Lieferung überall in Bali',
    del_card_sub: 'Hotel, Villa, Flughafen — einfach sagen wo!',
    about_tag: 'Über uns', about_title: 'ABD Scooter Rental', about_tagline: 'Bali, aber mach es zu Freiheit. 🌴',
    about_body: 'ABD Scooter Rental bietet eine praktische und zuverlässige Transportlösung für alle, die Bali mit größerer Freiheit erkunden möchten. Wir bieten gepflegte Roller für Reisen und Alltagsaktivitäten.<br><br>Unsere Dienste umfassen tägliche, wöchentliche und monatliche Rollermiete mit einem einfachen Buchungsprozess. Wir liefern auch zu Hotels, Villen und ausgewählten Orten in ganz Bali.',
    stat_customers: 'Kunden', stat_years: 'Jahre Erfahrung',
    testi_tag: 'Kundenbewertungen', testi_title: 'Was unsere Kunden sagen',
    testi_desc: 'Tausende Fahrer haben uns für ihre Bali-Abenteuer vertraut.',
    testi_1: '"Beste Fahrradverleih auf Bali! Vollständige Sammlung, freundliches Personal, reibungsloser Prozess."',
    testi_2: '"Toller Service! Reaktionsschnelles Personal, Roller in sehr gutem Zustand. Komme auf jeden Fall wieder!"',
    testi_3: '"Super einfache Buchung via WhatsApp. NMAX in perfektem Zustand, direkt zur Villa geliefert."',
    testi_4: '"Sehr guter Service! Das Motorrad war in Topzustand und die Lieferung zum Hotel klappte perfekt. Keine versteckten Kosten!"',
    testi_5: '"Sehr faire Preise! Monatsmiete des NMAX, gut gepflegt. Reaktionsschneller Mitarbeiter. Unbedingt ausprobieren!"',
    testi_6: '"Ausgezeichnet! Die XMAX war genau das, was ich für meinen 2-wöchigen Bali-Trip brauchte. Sehr empfehlenswert!"',
    faq_title: 'Häufig gestellte Fragen', faq_desc: 'Alles was du vor der Buchung wissen musst.',
    faq_q1: 'Kann ich täglich/wöchentlich/monatlich mieten?', faq_a1: 'Ja! Wähle einfach die passende Dauer.',
    faq_q2: 'Kann ich zum Hotel/Villa liefern lassen?', faq_a2: 'Natürlich. Schick uns Standort + Uhrzeit via WhatsApp.',
    faq_q3: 'Ist der Preis verhandelbar?', faq_a3: 'Ja, bei längerer Mietdauer oder mehreren Fahrzeugen.',
    faq_q4: 'Wie buche ich am schnellsten?', faq_a4: 'Klicke auf "Jetzt buchen", fülle das Formular aus.',
    faq_q5: 'Welche Dokumente werden benötigt?', faq_a5: 'Reisepass und Führerschein (national oder international).',
    faq_q6: 'Gibt es eine Kaution?', faq_a6: 'Kleine Kaution, wird vollständig zurückgegeben.',
    faq_q7: 'Kann ich in Dollar bezahlen?', faq_a7: 'Ja! Wir akzeptieren IDR und USD.',
    cta_title: 'Bereit, Bali zu erkunden?', cta_desc: 'Jetzt über WhatsApp buchen — schneller Prozess, Roller bereit zur Lieferung.',
    btn_chat_wa: 'Via WhatsApp chatten', btn_quick_book: 'Schnell buchen',
    footer_tagline: 'Praktische Transportlösung für Bali mit voller Freiheit.',
    footer_services: 'Dienste', footer_daily: 'Tagesmiete', footer_weekly: 'Wochenmiete',
    footer_monthly: 'Monatsmiete', footer_delivery_link: 'Lieferservice',
    footer_info: 'Informationen', footer_about: 'Über uns', footer_pricing: 'Preise & Pakete',
    footer_faq: 'FAQ', footer_testi: 'Bewertungen',
    footer_contact: 'Kontakt', footer_location: 'Bali, Indonesien',
    footer_copy: '© 2024 ABD Scooter Rental. Alle Rechte vorbehalten.',
    modal_title: '🛵 Schnellbuchung',
    form_name: 'Vollständiger Name', form_whatsapp: 'WhatsApp Nummer',
    form_scooter: 'Roller wählen', form_start: 'Startdatum',
    form_end: 'Enddatum', form_location: 'Lieferort (Hotel/Villa)',
    form_notes: 'Zusätzliche Anmerkungen', btn_send_wa: 'Via WhatsApp senden',
    bmi_underweight: 'Untergewicht', bmi_normal: 'Normal', bmi_overweight: 'Übergewicht', bmi_obese: 'Adipositas',
  },
  fr: {
    nav_fleet: 'Flotte', nav_pricing: 'Tarifs', nav_calc: 'Calculateur',
    nav_delivery: 'Livraison', nav_about: 'À propos',
    btn_book_now: 'Réservation rapide', btn_start_book: 'Réserver', btn_see_price: 'Voir les tarifs',
    hero_badge: 'Bali • Disponible maintenant',
    hero_title_1: 'Explorez Bali,', hero_title_2: 'Sans tracas.',
    hero_desc: 'Location de scooter bien <strong>entretenu</strong>, réservation <strong>rapide</strong> et <strong>livraison</strong> à votre hôtel/villa.',
    hero_card_from: 'À partir de', hero_card_day: '/ jour',
    hero_most_booked: 'Le plus réservé', hero_touring: 'Idéal pour les tours',
    chip_helmet: 'Casque gratuit', chip_fuel: 'Économique',
    hero_delivery: 'Livraison', hero_free: 'Gratuite', hero_to_hotel: 'à l\'hôtel/villa',
    stat_happy: 'Riders satisfaits', stat_models: 'Modèles de scooters',
    stat_support: 'Support', stat_rating: 'Note',
    scroll_down: 'Défiler vers le bas',
    trust_maintained: 'Entretien régulier', trust_fast: 'Réservation rapide via WhatsApp',
    trust_delivery: 'Livraison partout à Bali', trust_price: 'Prix transparents, sans frais cachés',
    trust_24: 'Réactif 24/7',
    fleet_tag: 'Notre Flotte', fleet_title: 'Choisissez votre Scooter',
    fleet_desc: 'Des balades en ville aux maxi-scooters premium pour les excursions.',
    filter_all: 'Tous', filter_city: 'Ville', filter_maxi: 'Maxi-Scooter',
    badge_best_val: 'Meilleur rapport', badge_most_booked: 'Le plus populaire', badge_premium: 'Premium',
    cat_city: 'Ville', cat_maxi: 'Maxi Confort', cat_premium: 'Tourisme Premium',
    scoopy_f1: 'Agile sur les routes de Bali', scoopy_f2: 'Parfait pour les débutants',
    scoopy_f3: 'Prix le plus abordable', scoopy_f4: 'Facile à garer partout',
    nmax_f1: 'Confortable pour les longues distances', nmax_f2: 'Stable et agréable à conduire',
    nmax_f3: 'Parfait pour les couples', nmax_f4: 'Choix le plus populaire à Bali',
    xmax_f1: 'Puissant et bonne position', xmax_f2: 'Idéal pour les longues routes',
    xmax_f3: 'Sensation premium', xmax_f4: 'Disponibilité limitée',
    from_text: 'À partir de', per_day: '/jour', btn_book: 'Réserver maintenant',
    pricing_tag: 'Forfaits', pricing_title: 'Prix Transparents, Sans Frais Cachés',
    pricing_desc: 'Choisissez la durée qui vous convient. Tous les prix incluent un casque et une assurance de base.',
    dur_daily: 'Quotidien', dur_weekly: 'Hebdomadaire', dur_monthly: 'Mensuel',
    pc_city_sub: 'Pour les balades en ville', pc_maxi_sub: 'Maxi confort pour les tours',
    pc_premium_sub: 'Expérience touring premium', pc_per_day: '/jour',
    most_popular: 'Le plus populaire',
    inc_helmet: 'Casque gratuit', inc_insurance: 'Assurance de base',
    inc_delivery: 'Livraison disponible', inc_24: 'Support 24/7',
    inc_raincoat: 'Imperméable disponible', inc_priority: 'Réservation prioritaire',
    pricing_note: '* Les prix sont <strong>négociables</strong> selon la durée et la disponibilité.',
    calc_tag: 'Recommandation intelligente', calc_title: 'Trouvez le Scooter Parfait',
    calc_desc: 'Entrez votre taille et votre poids — nous recommandons le scooter le plus confortable.',
    calc_widget_title: 'Calculateur corporel & recommandation',
    calc_widget_sub: 'Trouvez le scooter le plus ergonomique pour votre morphologie',
    calc_unit_label: 'Unités:', unit_metric: 'cm / kg', unit_imperial: 'pieds / livres',
    calc_height: 'Taille', calc_weight: 'Poids',
    bmi_label: 'Indice IMC', bmi_category: 'Catégorie',
    rec_title: '🛵 Recommandation scooter', calc_btn: 'Calculer & Recommander',
    del_tag: 'Service de livraison', del_title: 'Livraison à l\'hôtel/villa? Bien sûr.',
    del_desc: 'Envoyez-nous votre emplacement + heure, nous livrons le scooter chez vous.',
    del_f1_title: 'Tout Bali (selon accord)', del_f1_desc: 'Canggu, Seminyak, Kuta, Denpasar, Ubud et environs',
    del_f2_title: 'Horaires flexibles', del_f2_desc: 'Livraison calée sur votre arrivée',
    del_f3_title: 'Admin très réactif', del_f3_desc: 'Confirmation rapide via WhatsApp',
    del_f4_title: 'Casque & documents inclus', del_f4_desc: 'Tout prêt à l\'arrivée du scooter',
    btn_req_del: 'Demander livraison via WhatsApp',
    del_card_title: 'Livraison partout à Bali',
    del_card_sub: 'Hôtel, villa, aéroport — dites juste où!',
    about_tag: 'À propos', about_title: 'ABD Scooter Rental', about_tagline: 'Bali, mais en toute liberté. 🌴',
    about_body: 'ABD Scooter Rental offre une solution de transport pratique et fiable pour explorer Bali en toute liberté. Nous proposons des scooters bien entretenus pour les voyages et les activités quotidiennes.<br><br>Nos services incluent la location journalière, hebdomadaire et mensuelle avec un processus de réservation simple et rapide. Nous livrons également aux hôtels, villas et lieux sélectionnés à travers Bali.',
    stat_customers: 'Clients', stat_years: 'Ans d\'expérience',
    testi_tag: 'Avis clients', testi_title: 'Ce qu\'ils disent d\'ABD',
    testi_desc: 'Des milliers de riders nous ont fait confiance pour leurs aventures à Bali.',
    testi_1: '"Meilleure location de scooters à Bali! Collection complète, personnel sympathique, processus fluide."',
    testi_2: '"Excellent service! Personnel réactif, scooters en très bon état. Je reviendrai certainement!"',
    testi_3: '"Réservation super facile via WhatsApp. NMAX en parfait état, livré directement à ma villa."',
    testi_4: '"Très bon service! La moto était en top état et la livraison à l\'hôtel s\'est parfaitement déroulée."',
    testi_5: '"Prix très abordables! Location mensuelle du NMAX, bien entretenu. Personnel réactif. À essayer absolument!"',
    testi_6: '"Excellent! L\'XMAX était exactement ce qu\'il me fallait pour mon séjour de 2 semaines. Très recommandé!"',
    faq_title: 'Questions fréquemment posées', faq_desc: 'Tout ce que vous devez savoir avant de réserver.',
    faq_q1: 'Puis-je louer à la journée/semaine/mois?', faq_a1: 'Oui! Choisissez simplement la durée qui vous convient.',
    faq_q2: 'Pouvez-vous livrer à l\'hôtel/villa?', faq_a2: 'Absolument. Envoyez-nous l\'emplacement + l\'heure via WhatsApp.',
    faq_q3: 'Le prix est-il négociable?', faq_a3: 'Oui, selon la durée et les conditions.',
    faq_q4: 'Comment réserver le plus rapidement?', faq_a4: 'Cliquez sur "Réserver", remplissez le formulaire court.',
    faq_q5: 'Quels documents sont nécessaires?', faq_a5: 'Passeport et permis de conduire (national ou international).',
    faq_q6: 'Y a-t-il un dépôt?', faq_a6: 'Petit dépôt, entièrement remboursé au retour en bon état.',
    faq_q7: 'Peut-on payer en dollars?', faq_a7: 'Oui! Nous acceptons IDR et USD.',
    cta_title: 'Prêt à explorer Bali?', cta_desc: 'Réservez maintenant via WhatsApp — processus rapide, scooter prêt à livrer.',
    btn_chat_wa: 'Chatter via WhatsApp', btn_quick_book: 'Réservation rapide',
    footer_tagline: 'Solution transport pratique pour explorer Bali en toute liberté.',
    footer_services: 'Services', footer_daily: 'Location journalière', footer_weekly: 'Location hebdomadaire',
    footer_monthly: 'Location mensuelle', footer_delivery_link: 'Service de livraison',
    footer_info: 'Informations', footer_about: 'À propos', footer_pricing: 'Tarifs & Forfaits',
    footer_faq: 'FAQ', footer_testi: 'Avis',
    footer_contact: 'Contact', footer_location: 'Bali, Indonésie',
    footer_copy: '© 2024 ABD Scooter Rental. Tous droits réservés.',
    modal_title: '🛵 Réservation rapide',
    form_name: 'Nom complet', form_whatsapp: 'Numéro WhatsApp',
    form_scooter: 'Choisir scooter', form_start: 'Date de début',
    form_end: 'Date de fin', form_location: 'Lieu de livraison (hôtel/villa)',
    form_notes: 'Notes supplémentaires', btn_send_wa: 'Envoyer via WhatsApp',
    bmi_underweight: 'Insuffisance pondérale', bmi_normal: 'Normal', bmi_overweight: 'Surpoids', bmi_obese: 'Obèse',
  },
  zh: {
    nav_fleet: '车队', nav_pricing: '价格', nav_calc: '计算器',
    nav_delivery: '配送', nav_about: '关于我们',
    btn_book_now: '快速预订', btn_start_book: '开始预订', btn_see_price: '查看价格',
    hero_badge: '巴厘岛 • 现在可用',
    hero_title_1: '探索巴厘岛，', hero_title_2: '轻松自由。',
    hero_desc: '租一辆保养良好的<strong>踏板车</strong>，<strong>快速</strong>预订，可<strong>配送</strong>到您的酒店/别墅。',
    hero_card_from: '起价', hero_card_day: '/ 天',
    hero_most_booked: '最受欢迎', hero_touring: '旅游首选',
    chip_helmet: '免费头盔', chip_fuel: '省油',
    hero_delivery: '配送', hero_free: '免费', hero_to_hotel: '到酒店/别墅',
    stat_happy: '满意客户', stat_models: '踏板车型号',
    stat_support: '客服', stat_rating: '评分',
    scroll_down: '向下滚动',
    trust_maintained: '定期维护保养', trust_fast: '通过WhatsApp快速预订',
    trust_delivery: '全巴厘岛配送', trust_price: '价格透明，无隐藏费用',
    trust_24: '全天候响应',
    fleet_tag: '我们的车队', fleet_title: '选择您的踏板车',
    fleet_desc: '从休闲城市骑行到豪华踏板车旅行，全部经过良好维护，随时可用。',
    filter_all: '全部', filter_city: '城市骑行', filter_maxi: '豪华踏板车',
    badge_best_val: '最佳性价比', badge_most_booked: '最受欢迎', badge_premium: '高级',
    cat_city: '城市骑行', cat_maxi: '豪华舒适', cat_premium: '高级旅游',
    scoopy_f1: '在巴厘岛道路上灵活', scoopy_f2: '适合初学者',
    scoopy_f3: '最实惠的价格', scoopy_f4: '随处停车方便',
    nmax_f1: '长途骑行舒适', nmax_f2: '稳定流畅的骑行体验',
    nmax_f3: '非常适合情侣出行', nmax_f4: '巴厘岛最受欢迎的选择',
    xmax_f1: '动力强劲，骑姿舒适', xmax_f2: '长途骑行理想之选',
    xmax_f3: '尊贵豪华感', xmax_f4: '库存有限',
    from_text: '起价', per_day: '/天', btn_book: '立即预订',
    pricing_tag: '价格套餐', pricing_title: '透明定价，无隐藏费用',
    pricing_desc: '选择最适合您的租期。所有价格包含头盔和基本保险。',
    dur_daily: '日租', dur_weekly: '周租', dur_monthly: '月租',
    pc_city_sub: '休闲城市骑行', pc_maxi_sub: '豪华舒适旅游踏板车',
    pc_premium_sub: '高级旅游体验', pc_per_day: '/天',
    most_popular: '最受欢迎',
    inc_helmet: '免费头盔', inc_insurance: '基本保险',
    inc_delivery: '配送服务可用', inc_24: '全天候支持',
    inc_raincoat: '雨衣可用', inc_priority: '优先预订',
    pricing_note: '* 价格可根据租期和供应情况<strong>协商</strong>。',
    calc_tag: '智能推荐', calc_title: '找到适合您的踏板车',
    calc_desc: '输入您的身高和体重——我们推荐最舒适安全的踏板车。',
    calc_widget_title: '身体参数与踏板车推荐',
    calc_widget_sub: '为您的体型找到最符合人体工程学的踏板车',
    calc_unit_label: '单位：', unit_metric: 'cm / kg', unit_imperial: '英尺 / 磅',
    calc_height: '身高', calc_weight: '体重',
    bmi_label: 'BMI 指数', bmi_category: '类别',
    rec_title: '🛵 踏板车推荐', calc_btn: '计算并推荐',
    del_tag: '配送服务', del_title: '配送到酒店/别墅？当然可以。',
    del_desc: '只需发送位置+时间，我们将踏板车送到您身边。',
    del_f1_title: '全巴厘岛配送（按协议）', del_f1_desc: '坎古、水明漾、库塔、登巴萨、乌布及周边',
    del_f2_title: '灵活预约', del_f2_desc: '根据您的抵达或入住时间安排配送',
    del_f3_title: '超快响应管理员', del_f3_desc: '通过WhatsApp快速确认，无烦恼',
    del_f4_title: '头盔和文件已包含', del_f4_desc: '踏板车到达时一切就绪',
    btn_req_del: '通过WhatsApp申请配送',
    del_card_title: '全巴厘岛配送',
    del_card_sub: '酒店、别墅、机场——告诉我们在哪里！',
    about_tag: '关于我们', about_title: 'ABD踏板车租赁', about_tagline: '巴厘岛，自由出行。🌴',
    about_body: 'ABD踏板车租赁为想要更自由地探索巴厘岛的所有人提供实用可靠的交通解决方案。我们提供一系列保养良好的踏板车，适合旅游和日常活动。<br><br>我们的服务包括日租、周租和月租，预订流程简单快捷。我们还提供配送服务，可配送到全岛各地的酒店、别墅和选定地点。',
    stat_customers: '客户', stat_years: '年经验',
    testi_tag: '客户评价', testi_title: '他们对ABD的评价',
    testi_desc: '数千名骑手信任我们陪伴他们的巴厘岛探险。',
    testi_1: '"巴厘岛最好的租车！车型齐全，员工友好，流程顺畅。绝对是坎古和水明漾地区最好的租车行。"',
    testi_2: '"服务很棒！员工响应迅速，踏板车状况非常好。一定会再来，强烈推荐！"',
    testi_3: '"通过WhatsApp预订超方便。NMAX状态完美，直接送到了我的别墅。下次一定再来！"',
    testi_4: '"非常棒的服务！摩托车状态一流，酒店配送完美。透明定价，无隐藏费用！"',
    testi_5: '"价格非常实惠！租了一整月的NMAX，保养很好。员工响应快，预订流程方便。"',
    testi_6: '"出色！XMAX正是我2周巴厘岛之行所需要的。动力强劲，舒适，送到乌布也很顺畅。强烈推荐！"',
    faq_title: '常见问题', faq_desc: '预订前您需要了解的一切。',
    faq_q1: '可以按日/周/月租吗？', faq_a1: '可以！只需选择最适合您的租期即可。',
    faq_q2: '可以送到酒店/别墅吗？', faq_a2: '当然可以。通过WhatsApp发送位置+时间给我们。',
    faq_q3: '价格可以协商吗？', faq_a3: '可以，长期租用或同时租多辆时价格可商议。',
    faq_q4: '最快的预订方式是什么？', faq_a4: '点击"快速预订"，填写简短表格即可。',
    faq_q5: '需要什么证件？', faq_a5: '护照和驾驶证（国内或国际）即可。',
    faq_q6: '需要押金吗？', faq_a6: '有小额押金，归还时状态良好则全额退还。',
    faq_q7: '可以用美元支付吗？', faq_a7: '可以！我们接受印尼盾和美元。',
    cta_title: '准备好探索巴厘岛了吗？', cta_desc: '现在通过WhatsApp预订——流程快速，踏板车随时配送到您处。',
    btn_chat_wa: '通过WhatsApp聊天', btn_quick_book: '快速预订',
    footer_tagline: '为自由探索巴厘岛提供实用的交通解决方案。',
    footer_services: '服务', footer_daily: '日租', footer_weekly: '周租',
    footer_monthly: '月租', footer_delivery_link: '配送服务',
    footer_info: '信息', footer_about: '关于我们', footer_pricing: '价格与套餐',
    footer_faq: '常见问题', footer_testi: '评价',
    footer_contact: '联系方式', footer_location: '印度尼西亚巴厘岛',
    footer_copy: '© 2024 ABD踏板车租赁。保留所有权利。',
    modal_title: '🛵 快速预订',
    form_name: '全名', form_whatsapp: 'WhatsApp号码',
    form_scooter: '选择踏板车', form_start: '开始日期',
    form_end: '结束日期', form_location: '配送地点（酒店/别墅）',
    form_notes: '额外备注', btn_send_wa: '通过WhatsApp发送',
    bmi_underweight: '体重不足', bmi_normal: '正常', bmi_overweight: '超重', bmi_obese: '肥胖',
  }
};

/* ============================================================
   STATE
============================================================ */
let currentLang = localStorage.getItem('abd_lang') || 'id';
let currentTheme = localStorage.getItem('abd_theme') || 'dark';
let currentCurrency = 'idr'; // 'idr' | 'usd'
let currentDuration = 'daily';
let calcUnit = 'metric'; // 'metric' | 'imperial'

const LANG_META = {
  id: { flag: '🇮🇩', label: 'ID' },
  en: { flag: '🇬🇧', label: 'EN' },
  ru: { flag: '🇷🇺', label: 'RU' },
  de: { flag: '🇩🇪', label: 'DE' },
  fr: { flag: '🇫🇷', label: 'FR' },
  zh: { flag: '🇨🇳', label: 'ZH' },
};

/* ============================================================
   i18n — apply translations
============================================================ */
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update lang button display
  const meta = LANG_META[lang];
  const flagEl = document.getElementById('currentFlag');
  const labelEl = document.getElementById('currentLang');
  if (flagEl) flagEl.textContent = meta.flag;
  if (labelEl) labelEl.textContent = meta.label;

  // Update active state on options
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render prices with new per_day label
  updatePricingDisplay();
}

/* ============================================================
   LANGUAGE DROPDOWN
============================================================ */
function initLanguage() {
  const toggle = document.getElementById('langToggle');
  const menu = document.getElementById('langMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem('abd_lang', currentLang);
      applyTranslations(currentLang);
      menu.classList.remove('open');
      showToast('🌐 Language changed!');
    });
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('langDropdown').contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  applyTranslations(currentLang);
}

/* ============================================================
   THEME TOGGLE
============================================================ */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (icon) { icon.classList.remove('bi-moon-stars'); icon.classList.add('bi-sun-fill'); }
  }

  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    currentTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('abd_theme', currentTheme);
    if (icon) {
      icon.classList.toggle('bi-moon-stars', !isLight);
      icon.classList.toggle('bi-sun-fill', isLight);
    }
  });
}

/* ============================================================
   PRICING — Duration + Currency
============================================================ */
function formatPrice(amount, currency) {
  if (currency === 'usd') {
    const usd = amount / USD_RATE;
    if (usd < 1) return (usd * 100).toFixed(0) + '¢';
    return '$' + usd.toFixed(2);
  }
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + 'Jt';
  }
  return (amount / 1000) + 'K';
}

function updatePricingDisplay() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
  const dur = currentDuration;
  const cur = currentCurrency;
  const prices = PRICING[dur];

  const periodMap = {
    daily: t.pc_per_day || '/hari',
    weekly: currentLang === 'en' ? '/week' : currentLang === 'fr' ? '/sem.' : currentLang === 'de' ? '/Woche' : currentLang === 'ru' ? '/нед.' : currentLang === 'zh' ? '/周' : '/minggu',
    monthly: currentLang === 'en' ? '/month' : currentLang === 'fr' ? '/mois' : currentLang === 'de' ? '/Monat' : currentLang === 'ru' ? '/мес.' : currentLang === 'zh' ? '/月' : '/bulan',
  };

  const period = periodMap[dur];
  const sym = cur === 'usd' ? '' : 'Rp';

  const slots = [
    { sym: 'pc1-sym', amount: 'pc1-amount', period: 'pc1-period', key: 'scoopy' },
    { sym: 'pc2-sym', amount: 'pc2-amount', period: 'pc2-period', key: 'nmax' },
    { sym: 'pc3-sym', amount: 'pc3-amount', period: 'pc3-period', key: 'xmax' },
  ];

  slots.forEach(s => {
    const symEl = document.getElementById(s.sym);
    const amtEl = document.getElementById(s.amount);
    const perEl = document.getElementById(s.period);
    if (!symEl || !amtEl) return;

    const raw = prices[s.key];
    symEl.textContent = sym;
    if (cur === 'usd') {
      const usd = raw / USD_RATE;
      amtEl.textContent = '$' + usd.toFixed(1);
    } else {
      amtEl.textContent = formatPrice(raw, 'idr');
    }
    if (perEl) perEl.textContent = period;
  });

  // Update fleet card prices
  const fleetMap = [
    { id: 'scoopyPrice', key: 'scoopy', dur: 'daily' },
    { id: 'nmaxPrice', key: 'nmax', dur: 'daily' },
    { id: 'xmaxPrice', key: 'xmax', dur: 'daily' },
  ];

  fleetMap.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    const raw = PRICING.daily[f.key];
    el.textContent = cur === 'usd'
      ? '$' + (raw / USD_RATE).toFixed(1)
      : 'Rp ' + formatPrice(raw, 'idr');
  });
}

function initPricingControls() {
  // Duration buttons
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDuration = btn.dataset.dur;
      updatePricingDisplay();
    });
  });

  // Currency switch
  const currSwitch = document.getElementById('currSwitch');
  const label1 = document.getElementById('currLabel1');
  const label2 = document.getElementById('currLabel2');

  if (currSwitch) {
    currSwitch.addEventListener('change', () => {
      currentCurrency = currSwitch.checked ? 'usd' : 'idr';
      if (label1) label1.classList.toggle('active', !currSwitch.checked);
      if (label2) label2.classList.toggle('active', currSwitch.checked);
      updatePricingDisplay();
    });
  }

  updatePricingDisplay();
}

/* ============================================================
   BMI / HEIGHT-WEIGHT CALCULATOR
============================================================ */
function initCalculator() {
  const heightSlider = document.getElementById('heightSlider');
  const weightSlider = document.getElementById('weightSlider');
  const heightVal = document.getElementById('heightVal');
  const weightVal = document.getElementById('weightVal');

  if (!heightSlider || !weightSlider) return;

  heightSlider.addEventListener('input', () => {
    const v = parseFloat(heightSlider.value);
    if (heightVal) heightVal.textContent = calcUnit === 'imperial' ? ftIn(v) : v;
    updateSliderGradient(heightSlider);
  });

  weightSlider.addEventListener('input', () => {
    const v = parseFloat(weightSlider.value);
    if (weightVal) weightVal.textContent = calcUnit === 'imperial' ? lbs(v) : v;
    updateSliderGradient(weightSlider);
  });

  // Unit toggle
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcUnit = btn.dataset.unit;
      updateCalcUnits();
    });
  });

  updateSliderGradient(heightSlider);
  updateSliderGradient(weightSlider);
}

function ftIn(cm) {
  const inches = cm / 2.54;
  const ft = Math.floor(inches / 12);
  const inch = Math.round(inches % 12);
  return `${ft}'${inch}"`;
}

function lbs(kg) { return Math.round(kg * 2.20462); }

function updateCalcUnits() {
  const heightSlider = document.getElementById('heightSlider');
  const weightSlider = document.getElementById('weightSlider');
  const heightUnitEl = document.getElementById('heightUnit');
  const weightUnitEl = document.getElementById('weightUnit');
  const heightMinEl = document.getElementById('heightMin');
  const heightMaxEl = document.getElementById('heightMax');
  const weightMinEl = document.getElementById('weightMin');
  const weightMaxEl = document.getElementById('weightMax');
  const heightValEl = document.getElementById('heightVal');
  const weightValEl = document.getElementById('weightVal');

  if (calcUnit === 'imperial') {
    if (heightUnitEl) heightUnitEl.textContent = '';
    if (weightUnitEl) weightUnitEl.textContent = 'lbs';
    if (heightMinEl) heightMinEl.textContent = ftIn(140);
    if (heightMaxEl) heightMaxEl.textContent = ftIn(210);
    if (weightMinEl) weightMinEl.textContent = lbs(40) + ' lbs';
    if (weightMaxEl) weightMaxEl.textContent = lbs(150) + ' lbs';
    if (heightValEl && heightSlider) heightValEl.textContent = ftIn(parseFloat(heightSlider.value));
    if (weightValEl && weightSlider) weightValEl.textContent = lbs(parseFloat(weightSlider.value));
  } else {
    if (heightUnitEl) heightUnitEl.textContent = 'cm';
    if (weightUnitEl) weightUnitEl.textContent = 'kg';
    if (heightMinEl) heightMinEl.textContent = '140 cm';
    if (heightMaxEl) heightMaxEl.textContent = '210 cm';
    if (weightMinEl) weightMinEl.textContent = '40 kg';
    if (weightMaxEl) weightMaxEl.textContent = '150 kg';
    if (heightValEl && heightSlider) heightValEl.textContent = parseFloat(heightSlider.value);
    if (weightValEl && weightSlider) weightValEl.textContent = parseFloat(weightSlider.value);
  }
}

function updateSliderGradient(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--orange) ${pct}%, var(--dark-4) ${pct}%)`;
}

function calculateBMI() {
  const heightSlider = document.getElementById('heightSlider');
  const weightSlider = document.getElementById('weightSlider');
  const bmiValEl = document.getElementById('bmiVal');
  const bmiCatEl = document.getElementById('bmiCat');
  const recScooterEl = document.getElementById('recScooter');
  const recDescEl = document.getElementById('recDesc');
  const resultEl = document.getElementById('calcResult');

  if (!heightSlider || !weightSlider) return;

  const heightCm = parseFloat(heightSlider.value);
  const weightKg = parseFloat(weightSlider.value);

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiRound = bmi.toFixed(1);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

  // BMI category
  let category, cssClass;
  if (bmi < 18.5) {
    category = t.bmi_underweight || 'Underweight';
    cssClass = 'bmi-underweight';
  } else if (bmi < 25) {
    category = t.bmi_normal || 'Normal';
    cssClass = 'bmi-normal';
  } else if (bmi < 30) {
    category = t.bmi_overweight || 'Overweight';
    cssClass = 'bmi-overweight';
  } else {
    category = t.bmi_obese || 'Obese';
    cssClass = 'bmi-obese';
  }

  // Scooter recommendation
  let scooter, desc;

  if (heightCm < 155) {
    // Short height
    if (weightKg < 60) {
      scooter = 'Honda Scoopy / Vario';
      desc = currentLang === 'id'
        ? 'Sempurna untuk postur kamu — ringan, lincah, dan sangat nyaman. Seat height rendah ideal untuk kamu.'
        : currentLang === 'en'
        ? 'Perfect for your build — lightweight, agile, and very comfortable. Low seat height is ideal for you.'
        : currentLang === 'ru'
        ? 'Идеально для вашей фигуры — легкий, маневренный и удобный. Низкая высота сиденья идеальна для вас.'
        : currentLang === 'de'
        ? 'Perfekt für Ihre Statur — leicht, wendig und sehr komfortabel. Niedrige Sitzhöhe ideal für Sie.'
        : currentLang === 'fr'
        ? 'Parfait pour votre silhouette — léger, agile et très confortable. Hauteur de selle basse idéale.'
        : '非常适合您的体型——轻巧灵活，非常舒适。低座椅高度非常适合您。';
    } else {
      scooter = 'Honda Scoopy / Vario';
      desc = currentLang === 'id'
        ? 'Untuk postur pendek, Scoopy/Vario paling mudah dikontrol meski berat badan lebih.'
        : 'For shorter riders, Scoopy/Vario is the easiest to control even with higher weight.';
    }
  } else if (heightCm >= 155 && heightCm < 175) {
    // Medium height
    if (weightKg < 85) {
      scooter = 'Yamaha NMAX / Honda PCX';
      desc = currentLang === 'id'
        ? 'Pilihan terbaik untuk postur kamu! NMAX/PCX memberikan posisi berkendara yang nyaman dan ergonomis.'
        : currentLang === 'en'
        ? 'Best choice for your build! NMAX/PCX provides a comfortable and ergonomic riding position.'
        : currentLang === 'ru'
        ? 'Лучший выбор для вашей фигуры! NMAX/PCX обеспечивает удобную и эргономичную посадку.'
        : currentLang === 'de'
        ? 'Beste Wahl für Ihre Statur! NMAX/PCX bietet eine komfortable und ergonomische Sitzposition.'
        : currentLang === 'fr'
        ? 'Meilleur choix pour votre silhouette! NMAX/PCX offre une position de conduite confortable et ergonomique.'
        : '最适合您的体型！NMAX/PCX提供舒适符合人体工学的骑行姿势。';
    } else {
      scooter = 'Yamaha XMAX 300';
      desc = currentLang === 'id'
        ? 'Dengan berat badan lebih berat, XMAX memberikan stabilitas dan kenyamanan yang lebih baik.'
        : 'With higher weight, XMAX provides better stability and comfort for your ride.';
    }
  } else {
    // Tall height (175+)
    if (weightKg < 100) {
      scooter = 'Yamaha XMAX 300';
      desc = currentLang === 'id'
        ? 'Untuk postur tinggi, XMAX adalah pilihan terbaik. Posisi kaki panjang dan setang tinggi memberikan kenyamanan optimal.'
        : currentLang === 'en'
        ? 'For taller riders, XMAX is the best choice. Long leg position and high handlebars give optimal comfort.'
        : currentLang === 'ru'
        ? 'Для высоких райдеров XMAX — лучший выбор. Длинная позиция ног и высокий руль обеспечивают оптимальный комфорт.'
        : currentLang === 'de'
        ? 'Für größere Fahrer ist die XMAX die beste Wahl. Lange Beinposition und hohe Lenker bieten optimalen Komfort.'
        : currentLang === 'fr'
        ? 'Pour les grands riders, la XMAX est le meilleur choix. Position longue des jambes et guidon haut pour un confort optimal.'
        : '对于身材较高的骑手，XMAX是最佳选择。长腿位置和高把手提供最佳舒适感。';
    } else {
      scooter = 'Yamaha XMAX 300';
      desc = currentLang === 'id'
        ? 'XMAX sangat direkomendasikan untuk postur tinggi besar — stabilitas, power, dan kenyamanan terbaik.'
        : 'XMAX is highly recommended for tall and heavy riders — best stability, power, and comfort.';
    }
  }

  // Animate values
  if (bmiValEl) {
    bmiValEl.textContent = '...';
    bmiValEl.className = 'result-item-val';
    setTimeout(() => {
      bmiValEl.textContent = bmiRound;
      bmiValEl.classList.add(cssClass);
    }, 300);
  }

  if (bmiCatEl) {
    bmiCatEl.textContent = '...';
    bmiCatEl.className = 'result-item-val';
    setTimeout(() => {
      bmiCatEl.textContent = category;
      bmiCatEl.classList.add(cssClass);
    }, 400);
  }

  if (recScooterEl) {
    setTimeout(() => { recScooterEl.textContent = scooter; }, 500);
  }

  if (recDescEl) {
    setTimeout(() => { recDescEl.innerHTML = desc; }, 600);
  }

  if (resultEl) {
    resultEl.classList.add('show');
  }
}

/* ============================================================
   FLEET FILTER
============================================================ */
function initFleetFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      document.querySelectorAll('.fleet-card').forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   FAQ ACCORDION
============================================================ */
function toggleFAQ(qEl) {
  const item = qEl.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    openItem.classList.remove('open');
  });

  // Toggle clicked
  if (!isOpen) {
    item.classList.add('open');
  }
}

/* ============================================================
   BOOKING MODAL
============================================================ */
function openModal() {
  document.getElementById('bookingModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const startEl = document.getElementById('bookStart');
  const endEl = document.getElementById('bookEnd');

  if (startEl && !startEl.value) {
    startEl.value = tomorrow.toISOString().split('T')[0];
  }
  if (endEl && !endEl.value) {
    endEl.value = nextWeek.toISOString().split('T')[0];
  }
}

function openBookingFor(scooterName) {
  openModal();
  const select = document.getElementById('bookScooter');
  if (select) {
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === scooterName || options[i].text.includes(scooterName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeModal() {
  document.getElementById('bookingModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('bookingModal');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
});

function submitBooking() {
  const name = (document.getElementById('bookName')?.value || '').trim();
  const wa = (document.getElementById('bookWA')?.value || '').trim();
  const scooter = document.getElementById('bookScooter')?.value || '';
  const start = document.getElementById('bookStart')?.value || '';
  const end = document.getElementById('bookEnd')?.value || '';
  const location = (document.getElementById('bookLocation')?.value || '').trim();
  const notes = (document.getElementById('bookNotes')?.value || '').trim();

  if (!name || !wa) {
    showToast('⚠️ Nama dan WhatsApp wajib diisi!');
    return;
  }

  // Build WhatsApp message
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
  let msg;

  if (currentLang === 'en') {
    msg = `Hello ABD Scooter Rental! 🛵\n\n*Booking Request*\n👤 Name: ${name}\n📱 WhatsApp: ${wa}\n🛵 Scooter: ${scooter}\n📅 Start: ${start}\n📅 End: ${end}\n📍 Delivery: ${location || 'TBD'}\n📝 Notes: ${notes || '-'}\n\nPlease confirm availability & price. Thank you!`;
  } else if (currentLang === 'ru') {
    msg = `Привет ABD Scooter Rental! 🛵\n\n*Запрос на бронирование*\n👤 Имя: ${name}\n📱 WhatsApp: ${wa}\n🛵 Скутер: ${scooter}\n📅 Начало: ${start}\n📅 Конец: ${end}\n📍 Доставка: ${location || 'Уточнить'}\n📝 Заметки: ${notes || '-'}\n\nПожалуйста, подтвердите наличие и цену. Спасибо!`;
  } else if (currentLang === 'de') {
    msg = `Hallo ABD Scooter Rental! 🛵\n\n*Buchungsanfrage*\n👤 Name: ${name}\n📱 WhatsApp: ${wa}\n🛵 Roller: ${scooter}\n📅 Start: ${start}\n📅 Ende: ${end}\n📍 Lieferung: ${location || 'Noch festzulegen'}\n📝 Anmerkungen: ${notes || '-'}\n\nBitte Verfügbarkeit & Preis bestätigen. Danke!`;
  } else if (currentLang === 'fr') {
    msg = `Bonjour ABD Scooter Rental! 🛵\n\n*Demande de réservation*\n👤 Nom: ${name}\n📱 WhatsApp: ${wa}\n🛵 Scooter: ${scooter}\n📅 Début: ${start}\n📅 Fin: ${end}\n📍 Livraison: ${location || 'À définir'}\n📝 Notes: ${notes || '-'}\n\nMerci de confirmer disponibilité & prix. Merci!`;
  } else if (currentLang === 'zh') {
    msg = `您好 ABD踏板车租赁！🛵\n\n*预订申请*\n👤 姓名：${name}\n📱 WhatsApp：${wa}\n🛵 踏板车：${scooter}\n📅 开始：${start}\n📅 结束：${end}\n📍 配送：${location || '待定'}\n📝 备注：${notes || '-'}\n\n请确认可用性和价格。谢谢！`;
  } else {
    msg = `Halo ABD Scooter Rental! 🛵\n\n*Request Booking*\n👤 Nama: ${name}\n📱 WhatsApp: ${wa}\n🛵 Scooter: ${scooter}\n📅 Mulai: ${start}\n📅 Selesai: ${end}\n📍 Delivery ke: ${location || 'Akan dikonfirmasi'}\n📝 Catatan: ${notes || '-'}\n\nMohon konfirmasi ketersediaan & harga. Terima kasih!`;
  }

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank');
  closeModal();
  showToast('✅ Redirecting to WhatsApp!');
}

function openWhatsApp() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
  let msg;
  if (currentLang === 'en') msg = 'Hello ABD Scooter Rental! I want to rent a scooter in Bali. Can you help me?';
  else if (currentLang === 'ru') msg = 'Привет ABD Scooter Rental! Хочу арендовать скутер на Бали. Можете помочь?';
  else if (currentLang === 'de') msg = 'Hallo ABD Scooter Rental! Ich möchte einen Roller in Bali mieten. Können Sie mir helfen?';
  else if (currentLang === 'fr') msg = 'Bonjour ABD Scooter Rental! Je voudrais louer un scooter à Bali. Pouvez-vous m\'aider?';
  else if (currentLang === 'zh') msg = '您好 ABD踏板车租赁！我想在巴厘岛租踏板车，能帮我吗？';
  else msg = 'Halo ABD Scooter Rental! Saya ingin tanya tentang sewa scooter di Bali. Bisa bantu?';

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function requestDelivery() {
  let msg;
  if (currentLang === 'en') msg = 'Hello! I would like to request scooter delivery to my location in Bali. Please assist.';
  else if (currentLang === 'ru') msg = 'Привет! Хочу заказать доставку скутера к моему местоположению на Бали.';
  else msg = 'Halo! Saya mau request delivery scooter ke lokasi saya di Bali. Terima kasih!';

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ============================================================
   MOBILE NAV
============================================================ */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const bars = toggle.querySelectorAll('span');
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close when link clicked
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      const bars = toggle.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });
}

/* ============================================================
   NAVBAR — active section tracking
============================================================ */
function initNavActiveTracking() {
  const sections = ['top', 'fleet', 'pricing', 'calculator', 'delivery', 'about', 'testimonials', 'faq'];
  const links = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-68px 0px 0px 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ============================================================
   NAVBAR — scroll shrink
============================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = '';
    }
  });
}

/* ============================================================
   TOAST NOTIFICATION
============================================================ */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;
  if (msgEl) msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ============================================================
   AOS — simple scroll animation
============================================================ */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   BOOKING BUTTONS wiring
============================================================ */
function initBookingButtons() {
  const openBtn = document.getElementById('openBooking');
  const heroBtn = document.getElementById('heroBookBtn');
  const ctaBtn = document.getElementById('ctaBookBtn');

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (heroBtn) heroBtn.addEventListener('click', openModal);
  if (ctaBtn) ctaBtn.addEventListener('click', openModal);
}

/* ============================================================
   SMOOTH SCROLL for anchor links
============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 76; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initPricingControls();
  initCalculator();
  initFleetFilter();
  initMobileNav();
  initNavActiveTracking();
  initNavbarScroll();
  initBookingButtons();
  initSmoothScroll();
  initAOS();

  console.log('%cABD Scooter Rental 🛵', 'font-size:1.2rem;font-weight:bold;color:#FF6B35;');
  console.log('%cWebsite loaded. Have a great ride in Bali! 🌴', 'color:#0FB8A9;');
});
