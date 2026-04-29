// ==========================================
// ملف الربط الديناميكي (Controller)
// يربط واجهة المستخدم (HTML) بملف المعادلات (calculator.js)
// ==========================================

// ننتظر حتى يتم تحميل صفحة HTML بالكامل
document.addEventListener('DOMContentLoaded', () => {
    
    // ربط زر "احسب الأحمال" المتواجد في HTML
    const calculateBtn = document.getElementById('calculate-btn');

    // عندما يقوم المستخدم بالضغط على الزر، نفذ الآتي:
    calculateBtn.addEventListener('click', () => {
        
        // 1. جلب الأرقام التي أدخلها المستخدم
        const L = parseFloat(document.getElementById('room-length').value);
        const W = parseFloat(document.getElementById('room-width').value);
        const H = parseFloat(document.getElementById('room-height').value);
        const tIn = parseFloat(document.getElementById('temp-in').value);
        const tOut = parseFloat(document.getElementById('temp-out').value);

        // حساب المساحات الأساسية
        const areaRoof = L * W; // مساحة السقف
        const areaWalls = (2 * L * H) + (2 * W * H); // مساحة الجدران الأربعة
        const cltd = tOut - tIn; // فرق درجات الحرارة

        // 2. حساب أحمال التوصيل للجدران والسقف
        // ملاحظة: وضعنا قيمة U مؤقتة (0.5) للتجربة، في التحديث القادم سنربطها بقائمة المواد من data.js
        const uValueDefault = 0.5;
        const qRoof = Calculator.calculateTransmissionLoad(uValueDefault, areaRoof, cltd);
        const qWalls = Calculator.calculateTransmissionLoad(uValueDefault, areaWalls, cltd);
        const totalTransmission = qRoof + qWalls;

        // 3. حسابات تجريبية للأحمال الداخلية (بناءً على الأرقام الافتراضية في إكسل الدكتور)
        // إضاءة: 110 مصباح * 100 وات، 8 ساعات
        // أشخاص: 150 شخص * 97 وات (مستريح)، 8 ساعات
        // معدات: 4 معدات * 90 وات، 8 ساعات
        const internalLoads = Calculator.calculateInternalLoads(11000, 8, 150, 97, 8, 360, 8);

        // 4. تجميع الأحمال الكلية (مبدئياً)
        const totalHeatGain = totalTransmission + internalLoads.total;

        // 5. حساب سعة المنظومة بالطن التبريدي (معامل أمان 10%، تشغيل 24 ساعة)
        const systemCapacity = Calculator.calculateSystemCapacity(totalHeatGain, 10, 24);

        // 6. عرض النتائج على الشاشة في القسم الأيسر
        document.getElementById('res-walls').innerText = totalTransmission.toFixed(2) + " W";
        document.getElementById('res-solar').innerText = "0.00 W"; // سنضيفه لاحقاً
        document.getElementById('res-internal').innerText = internalLoads.total.toFixed(2) + " W";
        document.getElementById('res-products').innerText = "0.00 W"; // سنضيفه لاحقاً
        document.getElementById('res-air').innerText = "0.00 W"; // سنضيفه لاحقاً

        document.getElementById('res-total-w').innerText = totalHeatGain.toFixed(2) + " W";
        document.getElementById('res-total-ton').innerText = systemCapacity.tons.toFixed(2) + " TR";
        
        // تنبيه بسيط للمستخدم أن الحساب تم
        console.log("تم الحساب بنجاح!");
    });
});