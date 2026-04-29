// ==========================================
// ملف الربط الديناميكي (Controller)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', () => {
        
        // 1. جلب الأبعاد والحرارة
        const L = parseFloat(document.getElementById('room-length').value) || 0;
        const W = parseFloat(document.getElementById('room-width').value) || 0;
        const H = parseFloat(document.getElementById('room-height').value) || 0;
        const tIn = parseFloat(document.getElementById('temp-in').value) || 0;
        const tOut = parseFloat(document.getElementById('temp-out').value) || 0;

        // 2. جلب سماكة مواد البناء
        const thkConcrete = parseFloat(document.getElementById('thk-concrete').value) || 0;
        const thkInsulation = parseFloat(document.getElementById('thk-insulation').value) || 0;
        const thkCement = parseFloat(document.getElementById('thk-cement').value) || 0;

        const areaRoof = L * W; 
        const areaWalls = (2 * L * H) + (2 * W * H); 
        const cltd = tOut - tIn; 

        // 3. بناء طبقات الجدار/السقف للبرنامج لكي يحسبها
        // نستدعي قيم k من ملف data.js
        const buildingLayers = [
            { thickness: thkConcrete, k: materialsData.conc.k },      // الخرسانة (k = 1.23)
            { thickness: thkInsulation, k: materialsData.poly_s.k }, // العازل (k = 0.029)
            { thickness: thkCement, k: materialsData.cem.k }         // الأسمنت (k = 0.72)
        ];

        // 4. حساب U-Value الحقيقي!
        // معاملات انتقال الحرارة للهواء الداخلي والخارجي (كما في إكسل الدكتور)
        const ho = 22.7; // هواء خارجي متحرك
        const hi = 9.37; // هواء داخلي 

        const realUValue = Calculator.calculateUValue(buildingLayers, hi, ho);

        // 5. حساب أحمال التوصيل بالـ U-Value الحقيقي
        const qRoof = Calculator.calculateTransmissionLoad(realUValue, areaRoof, cltd);
        const qWalls = Calculator.calculateTransmissionLoad(realUValue, areaWalls, cltd);
        const totalTransmission = qRoof + qWalls;

        // 6. الأحمال الداخلية الثابتة (للتجربة)
        const internalLoads = Calculator.calculateInternalLoads(11000, 8, 150, 97, 8, 360, 8);

        // 7. تجميع الأحمال الكلية
        const totalHeatGain = totalTransmission + internalLoads.total;
        const systemCapacity = Calculator.calculateSystemCapacity(totalHeatGain, 10, 24);

        // 8. عرض النتائج
        document.getElementById('res-walls').innerText = totalTransmission.toFixed(2) + " W";
        document.getElementById('res-solar').innerText = "0.00 W"; 
        document.getElementById('res-internal').innerText = internalLoads.total.toFixed(2) + " W";
        document.getElementById('res-products').innerText = "0.00 W"; 
        document.getElementById('res-air').innerText = "0.00 W"; 

        document.getElementById('res-total-w').innerText = totalHeatGain.toFixed(2) + " W";
        document.getElementById('res-total-ton').innerText = systemCapacity.tons.toFixed(2) + " TR";
        
        console.log("تم حساب U-Value بنجاح: " + realUValue.toFixed(3));
    });
});