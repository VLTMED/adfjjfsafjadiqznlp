// ==========================================
// قاعدة البيانات الشاملة (100% مطابقة لملف د. رحيم)
// تحتوي على جميع جداول ASHRAE والمنتجات
// ==========================================

const ASHRAE_DATA = {
    // جدول (2-1) معاملات التوصيل الحراري (k)[W/m.K]
    materials: {
        "poly_smooth": { name: "بوليستيرين ( ناعم )", k: 0.029 },
        "poly_cut": { name: "بوليستيرين ( قطع )", k: 0.036 },
        "polyurethane": { name: "بوليريثان", k: 0.025 },
        "cork": { name: "الفلين", k: 0.043 },
        "mosaic": { name: "موزاييك", k: 0.5 },
        "mineral_wool": { name: "صوف معدني", k: 0.039 },
        "wood": { name: "خشب", k: 0.043 },
        "glass_wool": { name: "صوف زجاجي", k: 0.036 },
        "concrete": { name: "الخرسانة", k: 1.23 },
        "cement_brick": { name: "المونة الأسمنتية ، طوب عادي", k: 0.72 },
        "gypsum": { name: "الجبس", k: 0.46 }
    },

    // جداول (2-5 إلى 2-8) متطلبات التخزين لجميع المنتجات
    // tf: درجة الانجماد | lat: الحرارة الكامنة | cp_b: تحت التجميد | cp_a: فوق التجميد | crf: معدل التبريد
    products: {
        // --- الفواكه ---
        "apple": { name: "تفاح", crf: 0.67, tf: -1.1, lat: 280, cp_b: 1.89, cp_a: 3.65 },
        "apricot": { name: "مشمش", crf: 0.67, tf: -1.1, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "avocado": { name: "افوكادو-خضراء", crf: 0.67, tf: -0.3, lat: 217, cp_b: 1.65, cp_a: 3.01 },
        "banana": { name: "موز", crf: 0.1, tf: -0.8, lat: 250, cp_b: 1.78, cp_a: 3.35 },
        "blackberry": { name: "العليق", crf: 0.67, tf: -0.8, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "blueberry": { name: "العنب البري", crf: 0.67, tf: -1.6, lat: 274, cp_b: 1.86, cp_a: 3.58 },
        "cantaloupe": { name: "كانتيلوب", crf: 0.9, tf: -1.2, lat: 307, cp_b: 1.99, cp_a: 3.92 },
        "watermelon": { name: "بطّيخ", crf: 0.9, tf: -1.1, lat: 310, cp_b: 2, cp_a: 3.95 },
        "coconut": { name: "جوز هند", crf: 0.67, tf: -0.9, lat: 157, cp_b: 1.43, cp_a: 2.41 },
        "cherry": { name: "الكرز", crf: 0.67, tf: -1.8, lat: 267, cp_b: 1.84, cp_a: 3.51 },
        "mulberry": { name: "التّوت", crf: 0.67, tf: -0.9, lat: 290, cp_b: 1.93, cp_a: 3.75 },
        "raisins": { name: "زبيب", crf: 0.67, tf: -1, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "dates": { name: "التمر", crf: 0.67, tf: -16, lat: 67, cp_b: 1.09, cp_a: 1.5 },
        "dewberry": { name: "دو بيري", crf: 0.67, tf: -1.3, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "fig_dry": { name: "تين جاف", crf: 0.67, tf: 0, lat: 77, cp_b: 1.12, cp_a: 1.61 },
        "fig_fresh": { name: "تين طازج", crf: 0.67, tf: -2.4, lat: 260, cp_b: 1.81, cp_a: 3.45 },
        "frozen_fruit": { name: "فواكة مجمدة", crf: 1.0, tf: 0, lat: 0, cp_b: 1.9, cp_a: 3.7 },
        "gooseberry": { name: "الجوز بيري", crf: 0.67, tf: -1.1, lat: 297, cp_b: 1.95, cp_a: 3.82 },
        "grape": { name: "العنب", crf: 0.8, tf: -2, lat: 274, cp_b: 1.86, cp_a: 3.58 },
        "honeydew": { name: "الشهد", crf: 0.9, tf: -0.9, lat: 310, cp_b: 2, cp_a: 3.95 },
        "lemon": { name: "الليمون", crf: 1, tf: -1.4, lat: 297, cp_b: 1.95, cp_a: 3.82 },
        "lime": { name: "الليمون الحامض", crf: 0.9, tf: -1.6, lat: 287, cp_b: 1.92, cp_a: 3.72 },
        "mango": { name: "المانجو", crf: 0.67, tf: -0.9, lat: 270, cp_b: 1.85, cp_a: 3.55 },
        "olive": { name: "الزيتون", crf: 0.67, tf: -1.4, lat: 250, cp_b: 1.78, cp_a: 3.35 },
        "orange": { name: "برتقال", crf: 0.7, tf: -0.8, lat: 290, cp_b: 1.93, cp_a: 3.75 },
        "orange_juice": { name: "عصير برتقال", crf: 1, tf: -1, lat: 297, cp_b: 1.95, cp_a: 3.82 },
        "papaya": { name: "ببو", crf: 0.67, tf: -0.8, lat: 304, cp_b: 1.98, cp_a: 3.88 },
        "peach": { name: "الدّراق", crf: 0.8, tf: -0.9, lat: 297, cp_b: 1.95, cp_a: 3.82 },
        "pear": { name: "كمثرى", crf: 0.8, tf: -1.6, lat: 277, cp_b: 1.88, cp_a: 3.61 },
        "melon": { name: "الشمام", crf: 0.9, tf: -0.8, lat: 310, cp_b: 2, cp_a: 3.95 },
        "persimmon": { name: "البريسمون", crf: 0.67, tf: -2.2, lat: 260, cp_b: 1.81, cp_a: 3.45 },
        "pineapple": { name: "انناس", crf: 0.67, tf: -1, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "plum": { name: "خوخ", crf: 0.67, tf: -0.8, lat: 287, cp_b: 1.92, cp_a: 3.72 },
        "pomegranate": { name: "الرمان", crf: 0.67, tf: -3, lat: 274, cp_b: 1.86, cp_a: 3.58 },
        "quince": { name: "السّفرجل", crf: 0.67, tf: -2, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "strawberry": { name: "الفراولة", crf: 0.67, tf: -0.8, lat: 300, cp_b: 1.97, cp_a: 3.85 },
        "tangerine": { name: "اليوسفيّ", crf: 0.67, tf: -1.1, lat: 290, cp_b: 1.93, cp_a: 3.75 },

        // --- الخضروات ---
        "artichoke": { name: "خرشوف", crf: 0.67, tf: -1.2, lat: 280, cp_b: 1.89, cp_a: 3.65 },
        "asparagus": { name: "الهليون", crf: 0.9, tf: -0.6, lat: 310, cp_b: 2, cp_a: 3.95 },
        "beans_green": { name: "فاصوليا خضراء", crf: 0.67, tf: -0.7, lat: 297, cp_b: 1.95, cp_a: 3.82 },
        "broccoli": { name: "بروكولي", crf: 0.67, tf: -0.8, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "cabbage": { name: "لهانة", crf: 0.67, tf: -0.9, lat: 307, cp_b: 1.99, cp_a: 3.92 },
        "carrot": { name: "جزر", crf: 0.8, tf: -1.4, lat: 294, cp_b: 1.94, cp_a: 3.78 },
        "cauliflower": { name: "قرنابيظ", crf: 0.8, tf: -0.8, lat: 307, cp_b: 1.99, cp_a: 3.92 },
        "celery": { name: "كرفس", crf: 1, tf: -0.5, lat: 314, cp_b: 2.02, cp_a: 3.98 },
        "corn_sweet": { name: "ذرة حلوة", crf: 0.67, tf: -0.6, lat: 247, cp_b: 1.76, cp_a: 3.31 },
        "cucumber": { name: "خيار", crf: 0.67, tf: -0.5, lat: 320, cp_b: 2.04, cp_a: 4.05 },
        "eggplant": { name: "باذنجان", crf: 0.67, tf: -0.8, lat: 310, cp_b: 2, cp_a: 3.95 },
        "endive": { name: "هندب", crf: 0.67, tf: -0.1, lat: 310, cp_b: 2, cp_a: 3.95 },
        "garlic_dry": { name: "ثوم-جاف", crf: 0.67, tf: -0.8, lat: 203, cp_b: 1.6, cp_a: 2.88 },
        "leek": { name: "كراث اخضر", crf: 0.7, tf: -0.7, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "lettuce": { name: "خس", crf: 0.67, tf: -0.2, lat: 317, cp_b: 2.03, cp_a: 4.02 },
        "mushroom": { name: "فطر", crf: 0.67, tf: -0.9, lat: 304, cp_b: 1.98, cp_a: 3.88 },
        "onion_dry": { name: "بصل جاف", crf: 0.3, tf: -0.8, lat: 294, cp_b: 1.94, cp_a: 3.78 },
        "parsley": { name: "مقدونس", crf: 0.67, tf: -1.1, lat: 284, cp_b: 1.9, cp_a: 3.68 },
        "peas_green": { name: "بازيليا-خضراء", crf: 0.67, tf: -0.6, lat: 247, cp_b: 1.76, cp_a: 3.31 },
        "pepper_sweet": { name: "فلفل-حلو", crf: 0.67, tf: -0.7, lat: 307, cp_b: 1.99, cp_a: 3.92 },
        "potato": { name: "بطاطا", crf: 0.67, tf: -0.7, lat: 260, cp_b: 1.81, cp_a: 3.45 },
        "potato_sweet": { name: "بطاطا-حلوة", crf: 0.67, tf: -1.3, lat: 230, cp_b: 1.7, cp_a: 3.15 },
        "radish": { name: "فجل", crf: 0.7, tf: -0.7, lat: 317, cp_b: 2.03, cp_a: 4.02 },
        "spinach": { name: "سبانغ", crf: 0.8, tf: -0.3, lat: 310, cp_b: 2, cp_a: 3.95 },
        "pumpkin": { name: "يقطين", crf: 0.67, tf: -0.5, lat: 314, cp_b: 2.02, cp_a: 3.98 },
        "tomato": { name: "طماطة", crf: 0.67, tf: -0.5, lat: 313, cp_b: 2.02, cp_a: 3.98 },
        "turnip": { name: "شلغم", crf: 0.67, tf: -1.1, lat: 307, cp_b: 1.99, cp_a: 3.92 },

        // --- اللحوم والأسماك ---
        "beef_fresh": { name: "بقر-طازج", crf: 0.67, tf: -2.7, lat: 257, cp_b: 1.8, cp_a: 3.4 },
        "beef_liver": { name: "بقر- كبده", crf: 0.56, tf: -1.7, lat: 233, cp_b: 1.71, cp_a: 3.18 },
        "veal": { name: "عجل", crf: 0.56, tf: -2.2, lat: 220, cp_b: 1.66, cp_a: 3.05 },
        "lamb_fresh": { name: "ضان-طازج", crf: 0.75, tf: -2.2, lat: 233, cp_b: 1.7, cp_a: 3.2 },
        "poultry_fresh": { name: "دواجن- طازجة", crf: 1, tf: -2.8, lat: 247, cp_b: 1.76, cp_a: 3.31 },
        "rabbit": { name: "أرانب", crf: 1, tf: -2.2, lat: 227, cp_b: 1.69, cp_a: 3.11 },
        "fish_fresh": { name: "سمك- طازج", crf: 1, tf: -2.2, lat: 270, cp_b: 1.85, cp_a: 3.55 },
        "shellfish": { name: "المحارات الصدفية", crf: 1, tf: -2.2, lat: 267, cp_b: 1.84, cp_a: 3.51 },
        "shrimp": { name: "الرّوبيان", crf: 1, tf: -2.2, lat: 270, cp_b: 1.85, cp_a: 3.55 },

        // --- مواد غذائية أخرى ---
        "bread_frozen": { name: "خبز-مجمد", crf: 1, tf: -9, lat: 123, cp_b: 1.27, cp_a: 1.99 },
        "butter": { name: "زبدة", crf: 1, tf: -20, lat: 53, cp_b: 1.04, cp_a: 1.37 },
        "cheese_cheddar": { name: "جبن-شدر", crf: 1, tf: -13, lat: 123, cp_b: 1.3, cp_a: 2.07 },
        "coffee": { name: "قهوة", crf: 1, tf: -2.2, lat: 50, cp_b: 1.03, cp_a: 1.34 },
        "eggs": { name: "بيض", crf: 0.85, tf: -2.2, lat: 220, cp_b: 1.66, cp_a: 3.05 },
        "honey": { name: "عسل", crf: 1, tf: -1.5, lat: 57, cp_b: 1.05, cp_a: 1.4 },
        "milk": { name: "حليب", crf: 0.85, tf: -0.6, lat: 290, cp_b: 1.93, cp_a: 3.75 },
        "nuts": { name: "مكسرات", crf: 1, tf: -2, lat: 20, cp_b: 0.91, cp_a: 1.04 }
    },

    // جدول (2-19) الحرارة النوعية لمواد التغليف
    packaging: {
        "fiber": { name: "الألياف", cp: 1.4 },
        "wood": { name: "الخشب", cp: 2.3 },
        "steel": { name: "الفولاذ", cp: 0.5 },
        "plastic": { name: "البلاستيك", cp: 1.6 },
        "aluminum": { name: "الألمنيوم", cp: 0.85 }
    },

    // جداول (2-20) و (2-21) حرارة الإنسان الكلية (W)
    people_heat: {
        "rest": { name: "جالس ومستريح", qt: 97 },
        "office": { name: "مكتب - عمل خفيف", qt: 117 },
        "stand": { name: "محلات - واقف", qt: 132 },
        "walk": { name: "بنك - يمشي ببطء", qt: 146 },
        "restaurant": { name: "مطعم - جالس", qt: 162 },
        "factory_light": { name: "مصنع - شغل بسيط", qt: 229 },
        "factory_heavy": { name: "مصنع - شغل ثقيل", qt: 425 },
        // حرارة الإنسان داخل المخازن الباردة (Table 2-21)
        "cold_10C": { name: "مخزن تبريد (10C)", qt: 200 },
        "cold_0C": { name: "مخزن تبريد (0C)", qt: 250 },
        "cold_minus10C": { name: "مخزن تجميد (-10C)", qt: 300 },
        "cold_minus20C": { name: "مخزن تجميد (-20C)", qt: 390 }
    },

    // جدول (2-15) معامل الامتصاص
    solar_absorbance: {
        "asphalt": { name: "الأسفلت", a: 0.89 },
        "concrete": { name: "الخرسانة", a: 0.65 },
        "brick_red": { name: "الطوب الأحمر", a: 0.77 },
        "brick_white": { name: "الطوب الأبيض", a: 0.26 },
        "cement": { name: "المونة الأسمنتية", a: 0.57 },
        "gypsum": { name: "المونة الجبسية", a: 0.40 },
        "insulation": { name: "العازل الحراري", a: 0.91 }
    },

    // جدول (2-14) معدلات التهوية (L/s/Person)
    ventilation: {
        "apartment": { name: "شقة", rate: 9.5 },
        "bank": { name: "بنك", rate: 7.5 },
        "salon": { name: "صالون", rate: 7 },
        "shops": { name: "محلات تجارية", rate: 3.5 },
        "factories": { name: "مصانع", rate: 5 },
        "hospital": { name: "مستشفيات / فنادق", rate: 14 },
        "meeting": { name: "غرف اجتماعات", rate: 24 },
        "office_pub": { name: "مكاتب عامة", rate: 12.5 },
        "restaurant": { name: "مطاعم", rate: 10 },
        "cafeteria": { name: "كافتيريا", rate: 6 }
    },

    // معامل الاستخدام (الطريقة المختصرة) - جدول 2-22 المبسط للحجم
    usage_factor: {
        "heavy": { name: "شاقة", factor: 3.97 },
        "medium": { name: "متوسطة", factor: 3.63 },
        "long_term": { name: "تخزين طويل", factor: 0.6 }
    }
};
