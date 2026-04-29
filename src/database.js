// ==========================================
// ملف قاعدة البيانات (جداول ASHRAE والمواصفات)
// ==========================================

// 1. جدول (2-1) معاملات التوصيل الحراري (k) بوحدة W/m.K
const materialsData = {
    "poly_s": { name: "بوليستيرين (ناعم)", k: 0.029 },
    "poly_c": { name: "بوليستيرين (قطع)", k: 0.036 },
    "poly_u": { name: "بوليريثان", k: 0.025 },
    "cork": { name: "الفلين", k: 0.043 },
    "conc": { name: "الخرسانة", k: 1.23 },
    "cem": { name: "المونة الأسمنتية / طوب عادي", k: 0.72 },
    "min_w": { name: "صوف معدني", k: 0.039 },
    "wood": { name: "خشب", k: 0.043 },
    "glass_f": { name: "صوف زجاجي", k: 0.036 },
    "clay": { name: "القرميد الطيني", k: 0.5 },
    "gyp": { name: "الجبس", k: 0.46 }
};

// 2. جداول (2-5 إلى 2-8) متطلبات تخزين المنتجات (فواكه، خضار، لحوم)
// tf: درجة الانجماد | cp_a: حرارة نوعية فوق التجميد | cp_b: تحت التجميد | lat: حرارة كامنة | crf: معامل التبريد | resp: حرارة التنفس
const productsData = {
    "apple": { name: "تفاح", tf: -1.1, cp_a: 3.65, cp_b: 1.89, lat: 280, crf: 0.67, resp: 15 },
    "apricot": { name: "مشمش", tf: -1.1, cp_a: 3.68, cp_b: 1.9, lat: 284, crf: 0.67, resp: 20 },
    "banana": { name: "موز", tf: -0.8, cp_a: 3.35, cp_b: 1.78, lat: 250, crf: 0.1, resp: 40 },
    "orange": { name: "برتقال", tf: -0.8, cp_a: 3.75, cp_b: 1.93, lat: 290, crf: 0.7, resp: 15 },
    "tomato": { name: "طماطة", tf: -0.5, cp_a: 3.98, cp_b: 2.02, lat: 313, crf: 0.8, resp: 20 },
    "potato": { name: "بطاطا", tf: -0.7, cp_a: 3.45, cp_b: 1.81, lat: 260, crf: 0.8, resp: 25 },
    "beef_fresh": { name: "بقر-طازج", tf: -2.7, cp_a: 3.4, cp_b: 1.8, lat: 257, crf: 0.67, resp: 0 },
    "poultry": { name: "دواجن-طازجة", tf: -2.8, cp_a: 3.31, cp_b: 1.76, lat: 247, crf: 1.0, resp: 0 },
    "fish": { name: "سمك-طازج", tf: -2.2, cp_a: 3.55, cp_b: 1.85, lat: 270, crf: 1.0, resp: 0 },
    "eggs": { name: "بيض", tf: -2.2, cp_a: 3.05, cp_b: 1.66, lat: 220, crf: 0.85, resp: 0 },
    "milk": { name: "حليب", tf: -0.6, cp_a: 3.75, cp_b: 1.93, lat: 290, crf: 0.85, resp: 0 }
};

// 3. جدول (2-20) الحرارة المحسوسة والكامنة للأشخاص (W)
const peopleHeatData = {
    "rest": { name: "جالس ومستريح", q: 97 },
    "office": { name: "عمل خفيف - مكتب/شقة", q: 117 },
    "stand": { name: "واقف يزاول عمل خفيف - متجر", q: 132 },
    "walk": { name: "يمشي ببطء - بنك", q: 146 },
    "restaurant": { name: "جالس - مطعم", q: 162 },
    "factory_light": { name: "شغل بسيط - مصنع", q: 229 },
    "factory_heavy": { name: "شغل ثقيل / رياضة", q: 425 }
};

// 4. جدول (2-14) معدلات التهوية (L/s/Person)
const ventilationData = {
    "meeting": { name: "غرف اجتماعات", rate: 24 },
    "salon": { name: "صالون", rate: 15 },
    "hospital": { name: "مستشفيات / فنادق", rate: 14 },
    "office": { name: "مكاتب عامة", rate: 12.5 },
    "restaurant": { name: "مطاعم / بنوك", rate: 7.5 },
    "shop": { name: "محلات تجارية", rate: 3.5 }
};

// 5. جدول (2-17) معامل انتقال الحرارة للزجاج (U-Value)
const glassUValueData = {
    "single": { name: "زجاج مفرد", u: 4.7 },
    "double_5": { name: "مزدوج - طبقة هواء 5 ملم", u: 3.2 },
    "double_6": { name: "مزدوج - طبقة هواء 6 ملم", u: 3.1 },
    "double_13": { name: "مزدوج - طبقة هواء 13 ملم", u: 2.8 }
};

// 6. جدول (2-15) معامل الامتصاص الشمسي (a)
const solarAbsorbanceData = {
    "asphalt": { name: "الأسفلت", a: 0.89 },
    "concrete": { name: "الخرسانة", a: 0.65 },
    "brick_red": { name: "الطوب الأحمر", a: 0.77 },
    "brick_white": { name: "الطوب الأبيض", a: 0.26 },
    "cement": { name: "المونة الأسمنتية", a: 0.57 },
    "gypsum": { name: "المونة الجبسية", a: 0.40 },
    "insulation": { name: "العازل الحراري", a: 0.91 }
};